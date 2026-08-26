import { api } from './api';

function track(type: string, entityId?: string, entityType?: string, metadata?: Record<string, unknown>) {
  api.post('/analytics/event', { type, entityId, entityType, metadata }).catch(() => {});
}

export const analytics = {
  templateView: (slug: string, kind: 'cv' | 'portfolio') =>
    track('template_view', slug, kind === 'cv' ? 'CVTemplate' : 'PortfolioTemplate'),

  checkoutStart: (productType: string) =>
    track('checkout_start', undefined, undefined, { productType }),

  portfolioView: (id: string, slug: string) =>
    track('portfolio_view', id, 'Portfolio', { slug }),

  cvDownload: (id: string) =>
    track('cv_download', id, 'CV'),
};
