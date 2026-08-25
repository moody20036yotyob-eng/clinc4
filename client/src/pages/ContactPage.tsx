import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <div className="section-padding">
      <div className="container-tight max-w-3xl">
        <div className="text-center mb-12">
          <Badge variant="brand" className="mb-4">{t('contact.badge')}</Badge>
          <h1 className="text-4xl font-bold text-surface-900 mb-3">{t('contact.title')}</h1>
          <p className="text-surface-500">{t('contact.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Mail, label: t('contact.email'), value: 'hello@ecotrove.sa' },
            { icon: MapPin, label: t('contact.location'), value: t('contact.locationValue') },
            { icon: Clock, label: t('contact.hours'), value: t('contact.hoursValue') },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-surface-200 bg-white p-6 text-center shadow-card">
              <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-3">
                <item.icon className="h-5 w-5 text-brand-600" />
              </div>
              <div className="text-sm font-medium text-surface-900">{item.label}</div>
              <div className="text-sm text-surface-500 mt-0.5">{item.value}</div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-brand-50 border border-brand-100 p-8 text-center">
          <h2 className="text-xl font-bold text-surface-900 mb-2">{t('contact.whatsappTitle')}</h2>
          <p className="text-surface-500 text-sm mb-5">{t('contact.whatsappSubtitle')}</p>
          <WhatsAppButton size="lg" variant="green" />
        </div>
      </div>
    </div>
  );
}
