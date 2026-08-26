import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';

import { authRouter } from './routes/auth';
import { cvRouter } from './routes/cv';
import { portfolioRouter } from './routes/portfolio';
import { templatesRouter } from './routes/templates';
import { ordersRouter } from './routes/orders';
import { paymentsRouter } from './routes/payments';
import { adminRouter } from './routes/admin';
import { uploadRouter } from './routes/upload';
import { settingsRouter } from './routes/settings';
import { analyticsRouter } from './routes/analytics';
import { sitemapRouter } from './routes/sitemap';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';
import { requestLogger } from './middleware/requestLogger';

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Security
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(cors({
  origin: [CLIENT_URL, /\.ecotrove\.sa$/],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(rateLimiter);

// Body parsing
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(requestLogger);

// Static files for uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Serve portfolio sites via slug
app.use('/p/:slug', async (req, res, next) => {
  const { slug } = req.params;
  try {
    const { prisma } = await import('./lib/prisma');
    const portfolio = await prisma.portfolio.findUnique({
      where: { slug, isPublished: true },
    });
    if (!portfolio) {
      return res.status(404).json({ success: false, error: 'Portfolio not found' });
    }
    // Increment view count
    await prisma.portfolio.update({ where: { id: portfolio.id }, data: { viewCount: { increment: 1 } } });
    res.json({ success: true, data: portfolio });
  } catch (err) {
    next(err);
  }
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/cv', cvRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/templates', templatesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/analytics', analyticsRouter);

// Sitemap and robots
app.use('/', sitemapRouter);

// Health check
app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404
app.use('*', (_, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 EcoTrove API running on port ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
