import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { authenticate, AuthRequest } from '../middleware/authenticate';
import { authLimiter } from '../middleware/rateLimiter';
import {
  sendWelcomeEmail,
  sendEmailVerificationEmail,
  sendPasswordResetEmail,
} from '../services/email';

export const authRouter = Router();

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

authRouter.post('/register', authLimiter, async (req, res, next) => {
  try {
    const body = registerSchema.parse(req.body);

    const exists = await prisma.user.findUnique({ where: { email: body.email } });
    if (exists) throw new AppError('Email already registered', 409, 'EMAIL_EXISTS');

    const passwordHash = await bcrypt.hash(body.password, 12);
    const emailVerifyToken = crypto.randomBytes(32).toString('hex');
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        passwordHash,
        role: 'USER',
        emailVerifyToken,
      },
      select: { id: true, email: true, name: true, role: true, emailVerified: true, createdAt: true },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as Parameters<typeof jwt.sign>[2],
    );

    // Fire-and-forget emails
    sendWelcomeEmail(user.email, user.name).catch(() => {});
    sendEmailVerificationEmail(user.email, user.name, emailVerifyToken).catch(() => {});

    res.status(201).json({ success: true, data: { user, token } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      next(new AppError(err.errors[0].message, 400));
    } else {
      next(err);
    }
  }
});

authRouter.post('/login', authLimiter, async (req, res, next) => {
  try {
    const body = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: body.email },
      select: { id: true, email: true, name: true, passwordHash: true, role: true, emailVerified: true, isActive: true, createdAt: true },
    });

    if (!user || !user.isActive) throw new AppError('Invalid credentials', 401);
    const valid = await bcrypt.compare(body.password, user.passwordHash);
    if (!valid) throw new AppError('Invalid credentials', 401);

    const { passwordHash: _, ...userWithoutPw } = user;
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as Parameters<typeof jwt.sign>[2],
    );

    res.json({ success: true, data: { user: userWithoutPw, token } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      next(new AppError(err.errors[0].message, 400));
    } else {
      next(err);
    }
  }
});

authRouter.get('/me', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { id: true, email: true, name: true, nameAr: true, role: true, emailVerified: true, avatar: true, createdAt: true },
    });
    if (!user) throw new AppError('User not found', 404);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
});

authRouter.put('/profile', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const body = z.object({
      name: z.string().min(2).max(100).optional(),
      nameAr: z.string().optional(),
    }).parse(req.body);

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: body,
      select: { id: true, email: true, name: true, nameAr: true, role: true, emailVerified: true, avatar: true },
    });
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/change-password', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const body = z.object({
      currentPassword: z.string(),
      newPassword: z.string().min(8),
    }).parse(req.body);

    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (!user) throw new AppError('User not found', 404);

    const valid = await bcrypt.compare(body.currentPassword, user.passwordHash);
    if (!valid) throw new AppError('Current password is incorrect', 400);

    const newHash = await bcrypt.hash(body.newPassword, 12);
    await prisma.user.update({ where: { id: req.user!.id }, data: { passwordHash: newHash } });

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
});

// Email verification
authRouter.post('/verify-email', async (req, res, next) => {
  try {
    const { token } = z.object({ token: z.string() }).parse(req.body);
    const user = await prisma.user.findFirst({ where: { emailVerifyToken: token } });
    if (!user) throw new AppError('Invalid or expired verification token', 400);
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, emailVerifyToken: null },
    });
    res.json({ success: true, message: 'Email verified successfully' });
  } catch (err) {
    next(err);
  }
});

// Forgot password — sends reset link
authRouter.post('/forgot-password', authLimiter, async (req, res, next) => {
  try {
    const { email } = z.object({ email: z.string().email() }).parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    // Always respond OK to avoid user enumeration
    if (user) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      await prisma.user.update({
        where: { id: user.id },
        data: { resetToken, resetTokenExpiry: expiry },
      });
      sendPasswordResetEmail(user.email, user.name, resetToken).catch(() => {});
    }
    res.json({ success: true, message: 'If that email exists, a reset link has been sent.' });
  } catch (err) {
    next(err);
  }
});

// Reset password — consumes token
authRouter.post('/reset-password', authLimiter, async (req, res, next) => {
  try {
    const body = z.object({ token: z.string(), password: z.string().min(8) }).parse(req.body);
    const user = await prisma.user.findFirst({
      where: { resetToken: body.token, resetTokenExpiry: { gt: new Date() } },
    });
    if (!user) throw new AppError('Invalid or expired reset token', 400);
    const passwordHash = await bcrypt.hash(body.password, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash, resetToken: null, resetTokenExpiry: null },
    });
    res.json({ success: true, message: 'Password reset successfully' });
  } catch (err) {
    next(err);
  }
});
