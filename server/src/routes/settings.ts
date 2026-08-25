import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { getPricing } from '../services/pricing';

export const settingsRouter = Router();

// Public pricing
settingsRouter.get('/pricing', async (_req, res, next) => {
  try {
    const pricing = await getPricing();
    res.json({ success: true, data: pricing });
  } catch (err) {
    next(err);
  }
});

// Public config (whatsapp number, etc.)
settingsRouter.get('/public', async (_req, res, next) => {
  try {
    const settings = await prisma.setting.findMany({
      where: { key: { in: ['whatsapp_number', 'company_email', 'portfolio_base_url'] } },
    });
    const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
    res.json({
      success: true,
      data: {
        whatsappNumber: map['whatsapp_number'] || process.env.WHATSAPP_NUMBER || '966500000000',
        companyEmail: map['company_email'] || 'hello@ecotrove.sa',
        portfolioBaseUrl: map['portfolio_base_url'] || process.env.PORTFOLIO_BASE_URL || 'https://portfolio.ecotrove.sa',
      },
    });
  } catch (err) {
    next(err);
  }
});
