import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';

export const templatesRouter = Router();

// CV Templates
templatesRouter.get('/cv', async (req, res, next) => {
  try {
    const query = z.object({
      category: z.string().optional(),
      search: z.string().optional(),
      isATS: z.string().optional(),
      language: z.string().optional(),
      featured: z.string().optional(),
      page: z.string().default('1'),
      limit: z.string().default('20'),
    }).parse(req.query);

    const page = parseInt(query.page);
    const limit = Math.min(parseInt(query.limit), 50);
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { isActive: true };
    if (query.category) where['category'] = query.category;
    if (query.isATS === 'true') where['isATS'] = true;
    if (query.featured === 'true') where['isFeatured'] = true;
    if (query.language) where['supportedLanguages'] = { has: query.language };
    if (query.search) {
      where['OR'] = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { nameAr: { contains: query.search, mode: 'insensitive' } },
        { tags: { has: query.search } },
      ];
    }

    const [templates, total] = await Promise.all([
      prisma.cVTemplate.findMany({
        where,
        orderBy: [{ isFeatured: 'desc' }, { order: 'asc' }, { viewCount: 'desc' }],
        skip,
        take: limit,
        select: {
          id: true, slug: true, name: true, nameAr: true, description: true, descriptionAr: true,
          category: true, previewImage: true, isATS: true, supportedLanguages: true,
          isPremium: true, isFeatured: true, tags: true,
        },
      }),
      prisma.cVTemplate.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        items: templates,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
});

templatesRouter.get('/cv/:slug', async (req, res, next) => {
  try {
    const template = await prisma.cVTemplate.findUnique({
      where: { slug: req.params.slug },
    });
    if (!template) throw new AppError('Template not found', 404);

    await prisma.cVTemplate.update({
      where: { id: template.id },
      data: { viewCount: { increment: 1 } },
    });

    res.json({ success: true, data: template });
  } catch (err) {
    next(err);
  }
});

// Portfolio Templates
templatesRouter.get('/portfolio', async (req, res, next) => {
  try {
    const query = z.object({
      category: z.string().optional(),
      search: z.string().optional(),
      featured: z.string().optional(),
      page: z.string().default('1'),
      limit: z.string().default('20'),
    }).parse(req.query);

    const page = parseInt(query.page);
    const limit = Math.min(parseInt(query.limit), 50);
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { isActive: true };
    if (query.category) where['category'] = query.category;
    if (query.featured === 'true') where['isFeatured'] = true;
    if (query.search) {
      where['OR'] = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { nameAr: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const [templates, total] = await Promise.all([
      prisma.portfolioTemplate.findMany({
        where,
        orderBy: [{ isFeatured: 'desc' }, { order: 'asc' }],
        skip,
        take: limit,
        select: {
          id: true, slug: true, name: true, nameAr: true, description: true, descriptionAr: true,
          category: true, previewImage: true, isPremium: true, isFeatured: true, tags: true,
        },
      }),
      prisma.portfolioTemplate.count({ where }),
    ]);

    res.json({
      success: true,
      data: { items: templates, total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
});

templatesRouter.get('/portfolio/:slug', async (req, res, next) => {
  try {
    const template = await prisma.portfolioTemplate.findUnique({
      where: { slug: req.params.slug },
    });
    if (!template) throw new AppError('Template not found', 404);
    res.json({ success: true, data: template });
  } catch (err) {
    next(err);
  }
});
