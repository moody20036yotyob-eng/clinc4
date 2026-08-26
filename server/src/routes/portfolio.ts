import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/authenticate';
import { AppError } from '../middleware/errorHandler';

export const portfolioRouter = Router();

portfolioRouter.use(authenticate);

// List user portfolios
portfolioRouter.get('/', async (req: AuthRequest, res, next) => {
  try {
    const portfolios = await prisma.portfolio.findMany({
      where: { userId: req.user!.id, isActive: true },
      include: {
        template: { select: { id: true, name: true, slug: true, previewImage: true } },
        hostingSubscription: true,
      },
      orderBy: { updatedAt: 'desc' },
    });
    res.json({ success: true, data: portfolios });
  } catch (err) {
    next(err);
  }
});

// Get single portfolio
portfolioRouter.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const portfolio = await prisma.portfolio.findFirst({
      where: { id: req.params.id, userId: req.user!.id },
      include: { template: true, hostingSubscription: true },
    });
    if (!portfolio) throw new AppError('Portfolio not found', 404);
    res.json({ success: true, data: { ...portfolio, templateSlug: portfolio.template.slug } });
  } catch (err) {
    next(err);
  }
});

// Create portfolio
portfolioRouter.post('/', async (req: AuthRequest, res, next) => {
  try {
    const body = z.object({
      templateId: z.string(),
      title: z.string().optional(),
      data: z.any().optional(),
    }).parse(req.body);

    const template = await prisma.portfolioTemplate.findUnique({ where: { id: body.templateId } });
    if (!template) throw new AppError('Template not found', 404);

    const order = await prisma.order.findFirst({
      where: {
        userId: req.user!.id,
        productType: { in: ['PORTFOLIO', 'BUNDLE'] },
        status: 'PAID',
      },
    });
    if (!order) throw new AppError('Purchase required', 403, 'PAYMENT_REQUIRED');

    // Generate unique slug
    const baseSlug = req.user!.email.split('@')[0].replace(/[^a-z0-9]/gi, '').toLowerCase();
    let slug = baseSlug;
    let attempts = 0;
    while (await prisma.portfolio.findUnique({ where: { slug } })) {
      slug = `${baseSlug}${++attempts}`;
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        userId: req.user!.id,
        templateId: body.templateId,
        title: body.title || 'My Portfolio',
        slug,
        data: body.data || {},
      },
      include: { template: true, hostingSubscription: true },
    });

    await prisma.portfolioTemplate.update({
      where: { id: body.templateId },
      data: { useCount: { increment: 1 } },
    });

    res.status(201).json({ success: true, data: portfolio });
  } catch (err) {
    next(err);
  }
});

// Import CV data into portfolio (bundle users only)
portfolioRouter.post('/:id/import-cv', async (req: AuthRequest, res, next) => {
  try {
    const body = z.object({ cvId: z.string() }).parse(req.body);

    // Verify user has bundle access
    const order = await prisma.order.findFirst({
      where: { userId: req.user!.id, productType: 'BUNDLE', status: 'PAID' },
    });
    if (!order) throw new AppError('Bundle purchase required for CV import', 403, 'BUNDLE_REQUIRED');

    const [portfolio, cv] = await Promise.all([
      prisma.portfolio.findFirst({ where: { id: req.params.id, userId: req.user!.id } }),
      prisma.cV.findFirst({ where: { id: body.cvId, userId: req.user!.id } }),
    ]);
    if (!portfolio) throw new AppError('Portfolio not found', 404);
    if (!cv) throw new AppError('CV not found', 404);

    const cvData = cv.data as Record<string, unknown>;
    const personalInfo = cvData['personalInfo'] as Record<string, unknown> | undefined;
    const skills = (cvData['skills'] as Array<Record<string, unknown>> | undefined) || [];
    const experience = (cvData['experience'] as Array<Record<string, unknown>> | undefined) || [];
    const education = (cvData['education'] as Array<Record<string, unknown>> | undefined) || [];

    // Map CV fields to portfolio fields
    const importedData: Record<string, unknown> = {
      personal: {
        name: personalInfo?.['fullName'] || personalInfo?.['name'] || '',
        nameAr: personalInfo?.['fullNameAr'] || '',
        title: personalInfo?.['jobTitle'] || personalInfo?.['title'] || '',
        titleAr: personalInfo?.['jobTitleAr'] || '',
        bio: personalInfo?.['summary'] || '',
        photo: personalInfo?.['photo'] || '',
        email: personalInfo?.['email'] || '',
        phone: personalInfo?.['phone'] || '',
        location: personalInfo?.['location'] || '',
        linkedin: personalInfo?.['linkedin'] || '',
        github: personalInfo?.['github'] || '',
        twitter: personalInfo?.['twitter'] || '',
        website: personalInfo?.['website'] || '',
      },
      skills: skills.map((s) => ({
        id: s['id'],
        name: s['name'],
        nameAr: s['nameAr'],
        category: s['category'],
        level: s['level'] ? 70 : undefined,
      })),
      experience: experience.map((e) => ({
        id: e['id'],
        company: e['company'],
        position: e['position'],
        startDate: e['startDate'],
        endDate: e['endDate'],
        current: e['current'],
        description: e['description'],
      })),
      education: education.map((edu) => ({
        id: edu['id'],
        institution: edu['institution'],
        degree: edu['degree'],
        field: edu['field'],
        startDate: edu['startDate'],
        endDate: edu['endDate'],
        current: edu['current'],
      })),
    };

    const existingData = (portfolio.data as Record<string, unknown>) || {};
    const merged = { ...existingData, ...importedData };

    const updated = await prisma.portfolio.update({
      where: { id: req.params.id },
      data: { data: merged as object },
      include: { template: true, hostingSubscription: true },
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

// Update portfolio
portfolioRouter.put('/:id', async (req: AuthRequest, res, next) => {
  try {
    const body = z.object({
      title: z.string().optional(),
      data: z.any().optional(),
      templateId: z.string().optional(),
    }).parse(req.body);

    const existing = await prisma.portfolio.findFirst({
      where: { id: req.params.id, userId: req.user!.id },
    });
    if (!existing) throw new AppError('Portfolio not found', 404);

    const versions = await prisma.portfolioVersion.count({ where: { portfolioId: req.params.id } });
    if (versions < 50) {
      await prisma.portfolioVersion.create({
        data: {
          portfolioId: req.params.id,
          data: existing.data as object,
          version: versions + 1,
        },
      });
    }

    const portfolio = await prisma.portfolio.update({
      where: { id: req.params.id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.data && { data: body.data }),
        ...(body.templateId && { templateId: body.templateId }),
      },
      include: { template: true, hostingSubscription: true },
    });

    res.json({ success: true, data: portfolio });
  } catch (err) {
    next(err);
  }
});

// Publish / Unpublish
portfolioRouter.post('/:id/publish', async (req: AuthRequest, res, next) => {
  try {
    const existing = await prisma.portfolio.findFirst({
      where: { id: req.params.id, userId: req.user!.id },
      include: { hostingSubscription: true },
    });
    if (!existing) throw new AppError('Portfolio not found', 404);

    if (!existing.hostingSubscription) {
      throw new AppError('Active hosting subscription required', 403, 'HOSTING_REQUIRED');
    }

    if (existing.hostingSubscription.status === 'EXPIRED') {
      throw new AppError('Hosting subscription has expired. Please renew.', 403, 'HOSTING_EXPIRED');
    }

    const portfolio = await prisma.portfolio.update({
      where: { id: req.params.id },
      data: { isPublished: true, publishedAt: new Date() },
      include: { template: true, hostingSubscription: true },
    });

    res.json({ success: true, data: portfolio });
  } catch (err) {
    next(err);
  }
});

portfolioRouter.post('/:id/unpublish', async (req: AuthRequest, res, next) => {
  try {
    const existing = await prisma.portfolio.findFirst({
      where: { id: req.params.id, userId: req.user!.id },
    });
    if (!existing) throw new AppError('Portfolio not found', 404);

    const portfolio = await prisma.portfolio.update({
      where: { id: req.params.id },
      data: { isPublished: false },
      include: { template: true, hostingSubscription: true },
    });

    res.json({ success: true, data: portfolio });
  } catch (err) {
    next(err);
  }
});

// Delete portfolio
portfolioRouter.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    const existing = await prisma.portfolio.findFirst({
      where: { id: req.params.id, userId: req.user!.id },
    });
    if (!existing) throw new AppError('Portfolio not found', 404);

    await prisma.portfolio.update({
      where: { id: req.params.id },
      data: { isActive: false, isPublished: false },
    });

    res.json({ success: true, message: 'Portfolio deleted' });
  } catch (err) {
    next(err);
  }
});

// Public portfolio endpoint
portfolioRouter.get('/public/:slug', async (req, res, next) => {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { slug: req.params.slug, isPublished: true, isActive: true },
      include: { template: true },
    });
    if (!portfolio) throw new AppError('Portfolio not found', 404);

    await prisma.portfolio.update({
      where: { id: portfolio.id },
      data: { viewCount: { increment: 1 } },
    });

    res.json({
      success: true,
      data: {
        id: portfolio.id,
        title: portfolio.title,
        slug: portfolio.slug,
        templateSlug: portfolio.template.slug,
        data: portfolio.data,
        viewCount: portfolio.viewCount,
      },
    });
  } catch (err) {
    next(err);
  }
});
