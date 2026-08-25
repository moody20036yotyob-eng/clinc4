import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/authenticate';
import { AppError } from '../middleware/errorHandler';
import { getPricing } from '../services/pricing';

export const ordersRouter = Router();

ordersRouter.use(authenticate);

ordersRouter.get('/', async (req: AuthRequest, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.id },
      include: { payments: { orderBy: { createdAt: 'desc' }, take: 1 } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
});

ordersRouter.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const order = await prisma.order.findFirst({
      where: { id: req.params.id, userId: req.user!.id },
      include: { payments: true, coupon: true },
    });
    if (!order) throw new AppError('Order not found', 404);
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});

ordersRouter.post('/', async (req: AuthRequest, res, next) => {
  try {
    const body = z.object({
      productType: z.enum(['CV', 'PORTFOLIO', 'BUNDLE']),
      couponCode: z.string().optional(),
    }).parse(req.body);

    const pricing = await getPricing();
    let amount = pricing[body.productType.toLowerCase() as 'cv' | 'portfolio' | 'bundle'];
    let discountAmount = 0;
    let couponId: string | undefined;

    if (body.couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: body.couponCode, isActive: true },
      });
      if (!coupon) throw new AppError('Invalid or expired coupon', 400);
      if (coupon.expiresAt && coupon.expiresAt < new Date()) throw new AppError('Coupon expired', 400);
      if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) throw new AppError('Coupon usage limit reached', 400);
      if (coupon.applicableTo && coupon.applicableTo !== body.productType) {
        throw new AppError('Coupon not applicable to this product', 400);
      }

      discountAmount = coupon.type === 'PERCENTAGE'
        ? amount * (Number(coupon.value) / 100)
        : Number(coupon.value);
      amount = Math.max(0, amount - discountAmount);
      couponId = coupon.id;
    }

    const orderNumber = `ECO-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: req.user!.id,
        productType: body.productType,
        amount,
        discountAmount: discountAmount > 0 ? discountAmount : undefined,
        couponId,
        status: 'PENDING',
        paymentStatus: 'PENDING',
      },
    });

    if (couponId) {
      await prisma.coupon.update({ where: { id: couponId }, data: { usedCount: { increment: 1 } } });
    }

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});
