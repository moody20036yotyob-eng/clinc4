import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export const analyticsRouter = Router();

analyticsRouter.post('/event', async (req, res, next) => {
  try {
    const body = z.object({
      type: z.string(),
      entityId: z.string().optional(),
      entityType: z.string().optional(),
      metadata: z.any().optional(),
    }).parse(req.body);

    await prisma.analyticsEvent.create({
      data: {
        type: body.type,
        entityId: body.entityId,
        entityType: body.entityType,
        metadata: body.metadata || {},
        ip: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});
