import { useTranslation } from 'react-i18next';

export default function TermsPage() {
  const { t } = useTranslation();
  return (
    <div className="section-padding">
      <div className="container-tight max-w-3xl">
        <h1 className="text-3xl font-bold text-surface-900 mb-2">{t('legal.terms.title')}</h1>
        <p className="text-surface-400 text-sm mb-8">{t('legal.lastUpdated')}</p>
        <div className="space-y-6 text-surface-600 text-sm leading-relaxed">
          {[1, 2, 3, 4, 5].map((n) => (
            <section key={n}>
              <h2 className="text-lg font-semibold text-surface-900 mb-2">{t(`legal.terms.section${n}.title`)}</h2>
              <p>{t(`legal.terms.section${n}.content`)}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
