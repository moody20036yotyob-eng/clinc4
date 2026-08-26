import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/authenticate';
import { AppError } from '../middleware/errorHandler';

export const adminRouter = Router();
adminRouter.use(authenticate, requireAdmin);

// Dashboard overview
adminRouter.get('/overview', async (_req, res, next) => {
  try {
    const [
      totalUsers,
      totalOrders,
      totalRevenue,
      totalCVs,
      totalPortfolios,
      recentOrders,
      topCVTemplates,
      topPortfolioTemplates,
      expiringSoon,
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'USER' } }),
      prisma.order.count({ where: { status: 'PAID' } }),
      prisma.order.aggregate({ where: { status: 'PAID' }, _sum: { amount: true } }),
      prisma.cV.count({ where: { isActive: true } }),
      prisma.portfolio.count({ where: { isActive: true } }),
      prisma.order.findMany({
        where: { status: 'PAID' },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { user: { select: { name: true, email: true } } },
      }),
      prisma.cVTemplate.findMany({ orderBy: { useCount: 'desc' }, take: 5, select: { id: true, name: true, useCount: true } }),
      prisma.portfolioTemplate.findMany({ orderBy: { useCount: 'desc' }, take: 5, select: { id: true, name: true, useCount: true } }),
      prisma.hostingSubscription.findMany({
        where: {
          expiryDate: { lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
          status: 'ACTIVE',
        },
        include: { portfolio: { select: { title: true, slug: true, user: { select: { email: true } } } } },
        take: 10,
      }),
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalOrders,
        totalRevenue: Number(totalRevenue._sum.amount) || 0,
        totalCVs,
        totalPortfolios,
        recentOrders,
        topCVTemplates,
        topPortfolioTemplates,
        expiringSoon,
      },
    });
  } catch (err) {
    next(err);
  }
});

// Users
adminRouter.get('/users', async (req, res, next) => {
  try {
    const { page = '1', limit = '20', search } = req.query as Record<string, string>;
    const p = parseInt(page), l = Math.min(parseInt(limit), 100);
    const where = search ? {
      OR: [
        { email: { contains: search, mode: 'insensitive' as const } },
        { name: { contains: search, mode: 'insensitive' as const } },
      ],
    } : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: { id: true, email: true, name: true, role: true, isActive: true, emailVerified: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        skip: (p - 1) * l,
        take: l,
      }),
      prisma.user.count({ where }),
    ]);

    res.json({ success: true, data: { items: users, total, page: p, limit: l, totalPages: Math.ceil(total / l) } });
  } catch (err) {
    next(err);
  }
});

const updateUser = async (req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => {
  try {
    const body = z.object({ isActive: z.boolean().optional(), role: z.enum(['USER', 'ADMIN']).optional() }).parse(req.body);
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: body,
      select: { id: true, email: true, name: true, role: true, isActive: true },
    });
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
adminRouter.patch('/users/:id', updateUser);
adminRouter.put('/users/:id', updateUser);

// Templates - CV
adminRouter.get('/templates/cv', async (_req, res, next) => {
  try {
    const templates = await prisma.cVTemplate.findMany({ orderBy: { order: 'asc' } });
    res.json({ success: true, data: templates });
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/templates/cv', async (req, res, next) => {
  try {
    const body = z.object({
      slug: z.string(),
      name: z.string(),
      nameAr: z.string().optional(),
      description: z.string().optional(),
      descriptionAr: z.string().optional(),
      category: z.string(),
      componentName: z.string(),
      isATS: z.boolean().optional(),
      supportedLanguages: z.array(z.string()).optional(),
      isPremium: z.boolean().optional(),
      isFeatured: z.boolean().optional(),
      tags: z.array(z.string()).optional(),
      order: z.number().optional(),
    }).parse(req.body);

    const template = await prisma.cVTemplate.create({ data: body });
    res.status(201).json({ success: true, data: template });
  } catch (err) {
    next(err);
  }
});

const updateCVTemplate = async (req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => {
  try {
    const template = await prisma.cVTemplate.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, data: template });
  } catch (err) { next(err); }
};
adminRouter.patch('/templates/cv/:id', updateCVTemplate);
adminRouter.put('/templates/cv/:id', updateCVTemplate);

// Templates - Portfolio
adminRouter.get('/templates/portfolio', async (_req, res, next) => {
  try {
    const templates = await prisma.portfolioTemplate.findMany({ orderBy: { order: 'asc' } });
    res.json({ success: true, data: templates });
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/templates/portfolio', async (req, res, next) => {
  try {
    const body = z.object({
      slug: z.string(),
      name: z.string(),
      nameAr: z.string().optional(),
      description: z.string().optional(),
      category: z.string(),
      componentName: z.string(),
      isPremium: z.boolean().optional(),
      isFeatured: z.boolean().optional(),
      tags: z.array(z.string()).optional(),
    }).parse(req.body);
    const template = await prisma.portfolioTemplate.create({ data: body });
    res.status(201).json({ success: true, data: template });
  } catch (err) {
    next(err);
  }
});

const updatePortfolioTemplate = async (req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => {
  try {
    const template = await prisma.portfolioTemplate.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, data: template });
  } catch (err) { next(err); }
};
adminRouter.patch('/templates/portfolio/:id', updatePortfolioTemplate);
adminRouter.put('/templates/portfolio/:id', updatePortfolioTemplate);

// Settings
adminRouter.get('/settings', async (_req, res, next) => {
  try {
    const settings = await prisma.setting.findMany({ orderBy: { key: 'asc' } });
    res.json({ success: true, data: settings });
  } catch (err) {
    next(err);
  }
});

adminRouter.put('/settings', async (req, res, next) => {
  try {
    // Accept either { key, value } or Record<string, string>
    const body = req.body as { key?: string; value?: string } & Record<string, string>;
    let pairs: [string, string][] = [];
    if (body.key && body.value !== undefined) {
      pairs = [[body.key, body.value]];
    } else {
      pairs = Object.entries(body).filter(([k]) => !['key', 'value'].includes(k));
    }
    await Promise.all(
      pairs.map(([key, value]) =>
        prisma.setting.upsert({ where: { key }, create: { key, value }, update: { value } }),
      ),
    );
    res.json({ success: true, message: 'Settings updated' });
  } catch (err) {
    next(err);
  }
});

// Coupons
adminRouter.get('/coupons', async (_req, res, next) => {
  try {
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ success: true, data: coupons });
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/coupons', async (req, res, next) => {
  try {
    const body = z.object({
      code: z.string().toUpperCase(),
      type: z.enum(['PERCENTAGE', 'FIXED']),
      value: z.number().positive(),
      maxUses: z.number().optional(),
      expiresAt: z.string().optional(),
      applicableTo: z.enum(['CV', 'PORTFOLIO', 'BUNDLE']).optional(),
    }).parse(req.body);

    const coupon = await prisma.coupon.create({
      data: {
        ...body,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined,
      },
    });
    res.status(201).json({ success: true, data: coupon });
  } catch (err) {
    next(err);
  }
});

// Orders list
adminRouter.get('/orders', async (req, res, next) => {
  try {
    const { page = '1', limit = '20', status } = req.query as Record<string, string>;
    const p = parseInt(page), l = Math.min(parseInt(limit), 100);
    const where = status && status !== 'ALL' ? { status: status as 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'CANCELLED' } : {};
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (p - 1) * l,
        take: l,
        include: { user: { select: { email: true, name: true } } },
      }),
      prisma.order.count({ where }),
    ]);
    res.json({ success: true, data: { items: orders, total, page: p, limit: l, totalPages: Math.ceil(total / l) } });
  } catch (err) {
    next(err);
  }
});

// Hosting
adminRouter.get('/hosting', async (req, res, next) => {
  try {
    const { status } = req.query as Record<string, string>;
    const hosting = await prisma.hostingSubscription.findMany({
      where: status ? { status: status as 'ACTIVE' | 'EXPIRED' | 'SUSPENDED' } : {},
      include: { portfolio: { select: { title: true, slug: true, user: { select: { email: true, name: true } } } } },
      orderBy: { expiryDate: 'asc' },
    });
    res.json({ success: true, data: hosting });
  } catch (err) {
    next(err);
  }
});

// Analytics
adminRouter.get('/analytics', async (_req, res, next) => {
  try {
    const last30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const [events, revenueByDay] = await Promise.all([
      prisma.analyticsEvent.groupBy({ by: ['type'], _count: { type: true } }),
      prisma.order.groupBy({
        by: ['createdAt'],
        where: { status: 'PAID', createdAt: { gte: last30 } },
        _sum: { amount: true },
      }),
    ]);
    res.json({ success: true, data: { events, revenueByDay } });
  } catch (err) {
    next(err);
  }
});
