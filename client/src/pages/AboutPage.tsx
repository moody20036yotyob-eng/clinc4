import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/Badge';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <div className="section-padding">
      <div className="container-tight max-w-3xl">
        <Badge variant="brand" className="mb-4">{t('about.badge')}</Badge>
        <h1 className="text-4xl font-bold text-surface-900 mb-4">{t('about.title')}</h1>
        <p className="text-surface-500 text-lg leading-relaxed mb-8">{t('about.description')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          {[
            { value: '5000+', label: t('about.stats.users') },
            { value: '80+', label: t('about.stats.templates') },
            { value: '3', label: t('about.stats.cities') },
            { value: '4.9', label: t('about.stats.rating') },
          ].map((stat) => (
            <div key={stat.label} className="text-center rounded-2xl bg-surface-50 p-5">
              <div className="text-2xl font-bold text-brand-600">{stat.value}</div>
              <div className="text-xs text-surface-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-surface-900 mb-3">{t('about.missionTitle')}</h2>
        <p className="text-surface-500 leading-relaxed mb-8">{t('about.missionText')}</p>
        <div className="flex justify-center">
          <WhatsAppButton size="lg" variant="green" />
        </div>
      </div>
    </div>
  );
}
