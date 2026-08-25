import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { AppError } from './errorHandler';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export async function authenticate(
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) throw new AppError('Authentication required', 401);

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      role: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: payload.id, isActive: true },
      select: { id: true, email: true, role: true },
    });

    if (!user) throw new AppError('User not found', 401);

    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (err) {
    if (err instanceof AppError) return next(err);
    next(new AppError('Invalid or expired token', 401));
  }
}

export function requireAdmin(
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
): void {
  if (req.user?.role !== 'ADMIN') {
    next(new AppError('Admin access required', 403));
    return;
  }
  next();
}
