import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Check, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { WhatsAppModal } from '@/components/ui/WhatsAppModal';
import { Skeleton } from '@/components/ui/Skeleton';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import type { PricingConfig } from '@shared/types/api';

export default function PricingPage() {
  const { t } = useTranslation();
  const [customModal, setCustomModal] = useState<'customCV' | 'customPortfolio' | null>(null);

  const { data: pricing, isLoading } = useQuery({
    queryKey: ['pricing'],
    queryFn: () => api.get<PricingConfig>('/settings/pricing'),
  });

  const plans = [
    {
      key: 'cv',
      name: t('pricing.cv.name'),
      price: pricing?.cvPrice ?? 119,
      badge: null,
      color: 'brand',
      features: t('pricing.cv.features', { returnObjects: true }) as string[],
      cta: t('pricing.cv.cta'),
      href: '/cv-templates',
    },
    {
      key: 'bundle',
      name: t('pricing.bundle.name'),
      price: pricing?.bundlePrice ?? 249,
      badge: t('pricing.bundle.badge'),
      color: 'accent',
      features: t('pricing.bundle.features', { returnObjects: true }) as string[],
      cta: t('pricing.bundle.cta'),
      href: '/cv-templates',
    },
    {
      key: 'portfolio',
      name: t('pricing.portfolio.name'),
      price: pricing?.portfolioPrice ?? 159,
      badge: null,
      color: 'success',
      features: t('pricing.portfolio.features', { returnObjects: true }) as string[],
      cta: t('pricing.portfolio.cta'),
      href: '/portfolio-templates',
    },
  ];

  const customServices = [
    {
      key: 'customCV',
      name: t('pricing.customCV.name'),
      range: t('pricing.customCV.range'),
      desc: t('pricing.customCV.desc'),
      onContact: () => setCustomModal('customCV'),
    },
    {
      key: 'customPortfolio',
      name: t('pricing.customPortfolio.name'),
      range: t('pricing.customPortfolio.range'),
      desc: t('pricing.customPortfolio.desc'),
      onContact: () => setCustomModal('customPortfolio'),
    },
  ];

  return (
    <div className="section-padding">
      <div className="container-tight">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="brand" className="mb-4">{t('pricing.badge')}</Badge>
          <h1 className="text-4xl font-bold text-surface-900 mb-3">{t('pricing.title')}</h1>
          <p className="text-surface-500 max-w-xl mx-auto">{t('pricing.subtitle')}</p>
        </div>

        {/* Plans */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[0, 1, 2].map((i) => <Skeleton key={i} className="h-96 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-start">
            {plans.map((plan) => (
              <div
                key={plan.key}
                className={`relative rounded-2xl border p-8 ${
                  plan.badge
                    ? 'border-accent-300 shadow-elevated bg-white ring-2 ring-accent-200 scale-105'
                    : 'border-surface-200 bg-white shadow-card'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                    <Badge variant="accent" className="shadow-sm">
                      <Zap className="h-3 w-3 me-1" />
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <h3 className="text-xl font-bold text-surface-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-surface-900">{plan.price}</span>
                  <span className="text-surface-500 ms-1">{t('pricing.sar')}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {(Array.isArray(plan.features) ? plan.features : []).map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-surface-600">
                      <Check className="h-4 w-4 text-success-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full" variant={plan.badge ? 'default' : 'outline'}>
                  <Link to={plan.href}>{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Custom services */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-surface-900 mb-2">{t('pricing.customTitle')}</h2>
          <p className="text-surface-500 text-sm">{t('pricing.customSubtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
          {customServices.map((svc) => (
            <div key={svc.key} className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900 text-sm">{svc.name}</h3>
                  <span className="text-xs text-brand-600 font-medium">{svc.range}</span>
                </div>
              </div>
              <p className="text-surface-500 text-sm mb-4">{svc.desc}</p>
              <Button variant="outline" size="sm" onClick={svc.onContact} className="w-full">
                {t('pricing.contactWhatsApp')}
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ teaser */}
        <div className="text-center bg-surface-50 rounded-2xl p-10">
          <h2 className="text-xl font-bold text-surface-900 mb-2">{t('pricing.faqTitle')}</h2>
          <p className="text-surface-500 text-sm mb-4">{t('pricing.faqSubtitle')}</p>
          <Button variant="outline" asChild>
            <a href="/#faq">{t('pricing.viewFaq')}</a>
          </Button>
        </div>
      </div>

      {customModal && (
        <WhatsAppModal open={true} onClose={() => setCustomModal(null)} type={customModal} />
      )}
    </div>
  );
}
