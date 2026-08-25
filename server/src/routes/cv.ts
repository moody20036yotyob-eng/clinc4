import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/authenticate';
import { AppError } from '../middleware/errorHandler';
import { v4 as uuid } from 'uuid';

export const cvRouter = Router();

cvRouter.use(authenticate);

// List user's CVs
cvRouter.get('/', async (req: AuthRequest, res, next) => {
  try {
    const cvs = await prisma.cV.findMany({
      where: { userId: req.user!.id, isActive: true },
      include: { template: { select: { id: true, name: true, slug: true, previewImage: true } } },
      orderBy: { updatedAt: 'desc' },
    });
    res.json({ success: true, data: cvs });
  } catch (err) {
    next(err);
  }
});

// Get single CV
cvRouter.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const cv = await prisma.cV.findFirst({
      where: { id: req.params.id, userId: req.user!.id },
      include: { template: true },
    });
    if (!cv) throw new AppError('CV not found', 404);
    res.json({ success: true, data: cv });
  } catch (err) {
    next(err);
  }
});

// Create CV
cvRouter.post('/', async (req: AuthRequest, res, next) => {
  try {
    const body = z.object({
      templateId: z.string(),
      title: z.string().optional(),
      data: z.any(),
    }).parse(req.body);

    const template = await prisma.cVTemplate.findUnique({ where: { id: body.templateId } });
    if (!template) throw new AppError('Template not found', 404);

    // Check if user has access (has paid)
    const order = await prisma.order.findFirst({
      where: {
        userId: req.user!.id,
        productType: { in: ['CV', 'BUNDLE'] },
        status: 'PAID',
      },
    });
    if (!order) throw new AppError('Purchase required to create a CV', 403, 'PAYMENT_REQUIRED');

    const cv = await prisma.cV.create({
      data: {
        userId: req.user!.id,
        templateId: body.templateId,
        title: body.title || 'My CV',
        data: body.data || {},
      },
      include: { template: true },
    });

    await prisma.cVTemplate.update({
      where: { id: body.templateId },
      data: { useCount: { increment: 1 } },
    });

    res.status(201).json({ success: true, data: cv });
  } catch (err) {
    next(err);
  }
});

// Update CV data
cvRouter.put('/:id', async (req: AuthRequest, res, next) => {
  try {
    const body = z.object({
      title: z.string().optional(),
      data: z.any().optional(),
      templateId: z.string().optional(),
    }).parse(req.body);

    const existing = await prisma.cV.findFirst({
      where: { id: req.params.id, userId: req.user!.id },
    });
    if (!existing) throw new AppError('CV not found', 404);

    // Save version before update
    const versions = await prisma.cVVersion.count({ where: { cvId: req.params.id } });
    if (versions < 50) {
      await prisma.cVVersion.create({
        data: {
          cvId: req.params.id,
          data: existing.data as object,
          version: versions + 1,
        },
      });
    }

    const cv = await prisma.cV.update({
      where: { id: req.params.id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.data && { data: body.data }),
        ...(body.templateId && { templateId: body.templateId }),
        lastSavedAt: new Date(),
      },
      include: { template: true },
    });

    res.json({ success: true, data: cv });
  } catch (err) {
    next(err);
  }
});

// Delete CV
cvRouter.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    const existing = await prisma.cV.findFirst({
      where: { id: req.params.id, userId: req.user!.id },
    });
    if (!existing) throw new AppError('CV not found', 404);

    await prisma.cV.update({
      where: { id: req.params.id },
      data: { isActive: false },
    });

    res.json({ success: true, message: 'CV deleted' });
  } catch (err) {
    next(err);
  }
});

// Duplicate CV
cvRouter.post('/:id/duplicate', async (req: AuthRequest, res, next) => {
  try {
    const original = await prisma.cV.findFirst({
      where: { id: req.params.id, userId: req.user!.id },
    });
    if (!original) throw new AppError('CV not found', 404);

    const copy = await prisma.cV.create({
      data: {
        userId: req.user!.id,
        templateId: original.templateId,
        title: `${original.title} (Copy)`,
        data: original.data as object,
      },
      include: { template: true },
    });

    res.status(201).json({ success: true, data: copy });
  } catch (err) {
    next(err);
  }
});

// Get CV versions
cvRouter.get('/:id/versions', async (req: AuthRequest, res, next) => {
  try {
    const cv = await prisma.cV.findFirst({
      where: { id: req.params.id, userId: req.user!.id },
    });
    if (!cv) throw new AppError('CV not found', 404);

    const versions = await prisma.cVVersion.findMany({
      where: { cvId: req.params.id },
      orderBy: { version: 'desc' },
      take: 20,
    });
    res.json({ success: true, data: versions });
  } catch (err) {
    next(err);
  }
});
