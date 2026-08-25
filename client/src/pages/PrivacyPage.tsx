import { useTranslation } from 'react-i18next';

export default function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <div className="section-padding">
      <div className="container-tight max-w-3xl prose prose-surface">
        <h1 className="text-3xl font-bold text-surface-900 mb-2">{t('legal.privacy.title')}</h1>
        <p className="text-surface-400 text-sm mb-8">{t('legal.lastUpdated')}</p>
        <div className="space-y-6 text-surface-600 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-surface-900 mb-2">{t('legal.privacy.section1.title')}</h2>
            <p>{t('legal.privacy.section1.content')}</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-surface-900 mb-2">{t('legal.privacy.section2.title')}</h2>
            <p>{t('legal.privacy.section2.content')}</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-surface-900 mb-2">{t('legal.privacy.section3.title')}</h2>
            <p>{t('legal.privacy.section3.content')}</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-surface-900 mb-2">{t('legal.privacy.section4.title')}</h2>
            <p>{t('legal.privacy.section4.content')}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
