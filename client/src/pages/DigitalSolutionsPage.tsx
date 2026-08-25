import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Globe, ShoppingCart, Smartphone, Palette, Server, CreditCard, Cloud, Wrench, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const SERVICE_ICONS: Record<string, React.ElementType> = {
  website: Globe,
  ecommerce: ShoppingCart,
  mobile: Smartphone,
  uiux: Palette,
  backend: Server,
  payments: CreditCard,
  hosting: Cloud,
  maintenance: Wrench,
};

const SERVICES = ['website', 'ecommerce', 'mobile', 'uiux', 'backend', 'payments', 'hosting', 'maintenance'];

export default function DigitalSolutionsPage() {
  const { t } = useTranslation();
  const { service } = useParams();

  const featuredService = service && SERVICES.includes(service) ? service : null;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900 text-white section-padding">
        <div className="container-tight text-center">
          <Badge variant="default" className="mb-6 bg-white/10 text-white border-white/20">
            {t('digitalSolutions.badge')}
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            {t('digitalSolutions.title')}
          </h1>
          <p className="text-surface-300 max-w-2xl mx-auto text-lg mb-8">
            {t('digitalSolutions.subtitle')}
          </p>
          <WhatsAppButton size="lg" variant="green" />
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-surface-900 mb-3">{t('digitalSolutions.servicesTitle')}</h2>
            <p className="text-surface-500">{t('digitalSolutions.servicesSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((svc) => {
              const Icon = SERVICE_ICONS[svc] || Globe;
              const isActive = featuredService === svc;
              return (
                <div
                  key={svc}
                  className={`rounded-2xl p-6 border transition-all ${
                    isActive
                      ? 'border-brand-300 bg-brand-50 shadow-brand-sm'
                      : 'border-surface-200 bg-white hover:border-brand-200 hover:shadow-card'
                  }`}
                >
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${isActive ? 'bg-brand-600' : 'bg-surface-100'}`}>
                    <Icon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-surface-500'}`} />
                  </div>
                  <h3 className="font-semibold text-surface-900 mb-2">
                    {t(`digitalSolutions.services.${svc}.title`)}
                  </h3>
                  <p className="text-surface-500 text-sm leading-relaxed mb-4">
                    {t(`digitalSolutions.services.${svc}.description`)}
                  </p>
                  <ul className="space-y-1.5 mb-5">
                    {(t(`digitalSolutions.services.${svc}.features`, { returnObjects: true }) as string[]).slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-surface-600">
                        <CheckCircle className="h-3.5 w-3.5 text-success-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-surface-50">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-surface-900 mb-3">{t('digitalSolutions.processTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="text-center">
                <div className="h-12 w-12 rounded-full bg-brand-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-semibold text-surface-900 mb-2">
                  {t(`digitalSolutions.process.step${step}.title`)}
                </h3>
                <p className="text-surface-500 text-sm">
                  {t(`digitalSolutions.process.step${step}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="rounded-3xl bg-gradient-brand p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-3">{t('digitalSolutions.ctaTitle')}</h2>
            <p className="text-brand-100 mb-8 max-w-xl mx-auto">{t('digitalSolutions.ctaSubtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton size="lg" variant="white" />
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                <a href="mailto:hello@ecotrove.sa">
                  {t('digitalSolutions.emailUs')}
                  <ArrowRight className="ms-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
