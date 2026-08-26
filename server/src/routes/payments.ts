import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/authenticate';
import { AppError } from '../middleware/errorHandler';
import { createPaymentIntent, verifyPayment } from '../services/payment';
import { sendPurchaseConfirmationEmail } from '../services/email';

export const paymentsRouter = Router();

// Initiate payment
paymentsRouter.post('/initiate', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const body = z.object({
      orderId: z.string(),
      callbackUrl: z.string().url(),
    }).parse(req.body);

    const order = await prisma.order.findFirst({
      where: { id: body.orderId, userId: req.user!.id, status: 'PENDING' },
    });
    if (!order) throw new AppError('Order not found or already processed', 404);

    const paymentData = await createPaymentIntent({
      orderId: order.id,
      amount: Number(order.amount),
      currency: order.currency,
      callbackUrl: body.callbackUrl,
      customerEmail: req.user!.email,
    });

    await prisma.payment.create({
      data: {
        orderId: order.id,
        provider: paymentData.provider,
        providerTxId: paymentData.transactionId,
        amount: order.amount,
        currency: order.currency,
        status: 'PENDING',
        providerResponse: paymentData.raw as object,
      },
    });

    res.json({ success: true, data: paymentData });
  } catch (err) {
    next(err);
  }
});

// Webhook - verify payment from provider
paymentsRouter.post('/webhook', async (req, res, next) => {
  try {
    const result = await verifyPayment(req.body, req.headers);

    if (result.success && result.orderId) {
      await prisma.$transaction(async (tx) => {
        await tx.order.update({
          where: { id: result.orderId },
          data: { status: 'PAID', paymentStatus: 'PAID' },
        });
        await tx.payment.updateMany({
          where: { orderId: result.orderId },
          data: { status: 'PAID', providerTxId: result.transactionId },
        });

        const order = await tx.order.findUnique({
          where: { id: result.orderId },
          include: { user: { select: { email: true, name: true } } },
        });
        if (order) {
          sendPurchaseConfirmationEmail(
            order.user.email,
            order.user.name,
            order.orderNumber,
            order.productType,
            Number(order.amount),
            order.currency,
          ).catch(() => {});
        }

        if (order && order.portfolioId) {
          if (order.productType === 'PORTFOLIO' || order.productType === 'BUNDLE') {
            // Create 1-year hosting subscription on initial portfolio/bundle purchase
            const renewalPrice = await tx.setting.findUnique({ where: { key: 'hosting_renewal_price' } });
            await tx.hostingSubscription.upsert({
              where: { portfolioId: order.portfolioId },
              create: {
                portfolioId: order.portfolioId,
                startDate: new Date(),
                expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                status: 'ACTIVE',
                renewalPrice: renewalPrice ? parseFloat(renewalPrice.value) : 79,
              },
              update: {
                expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                status: 'ACTIVE',
              },
            });
          } else if (order.productType === 'HOSTING_RENEWAL') {
            // Extend hosting by 1 year from today (or from current expiry if still active)
            const existing = await tx.hostingSubscription.findUnique({ where: { portfolioId: order.portfolioId } });
            const baseDate = existing && existing.status === 'ACTIVE' && existing.expiryDate > new Date()
              ? existing.expiryDate
              : new Date();
            await tx.hostingSubscription.upsert({
              where: { portfolioId: order.portfolioId },
              create: {
                portfolioId: order.portfolioId,
                startDate: new Date(),
                expiryDate: new Date(baseDate.getTime() + 365 * 24 * 60 * 60 * 1000),
                status: 'ACTIVE',
                renewalPrice: order.amount as unknown as number,
              },
              update: {
                expiryDate: new Date(baseDate.getTime() + 365 * 24 * 60 * 60 * 1000),
                status: 'ACTIVE',
              },
            });
          }
        }
      });
    }

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// Verify payment status (client-side polling)
paymentsRouter.get('/status/:orderId', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const order = await prisma.order.findFirst({
      where: { id: req.params.orderId, userId: req.user!.id },
      include: { payments: { orderBy: { createdAt: 'desc' }, take: 1 } },
    });
    if (!order) throw new AppError('Order not found', 404);

    res.json({ success: true, data: { status: order.status, paymentStatus: order.paymentStatus } });
  } catch (err) {
    next(err);
  }
});
