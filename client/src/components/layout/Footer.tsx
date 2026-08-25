import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Mail } from 'lucide-react';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

function EcoTroveLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-white fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <span className="font-display font-bold text-lg text-white">
        Eco<span className="text-brand-300">Trove</span>
      </span>
    </div>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const sections = [
    {
      title: t('footer.products.title'),
      links: [
        { label: t('footer.products.cvBuilder'), to: '/cv-templates' },
        { label: t('footer.products.portfolio'), to: '/portfolio-templates' },
        { label: t('footer.products.bundle'), to: '/pricing' },
        { label: t('footer.products.pricing'), to: '/pricing' },
      ],
    },
    {
      title: t('footer.services.title'),
      links: [
        { label: t('footer.services.website'), to: '/digital-solutions/website' },
        { label: t('footer.services.ecommerce'), to: '/digital-solutions/ecommerce' },
        { label: t('footer.services.mobile'), to: '/digital-solutions/mobile' },
        { label: t('footer.services.uiux'), to: '/digital-solutions' },
      ],
    },
    {
      title: t('footer.company.title'),
      links: [
        { label: t('footer.company.about'), to: '/about' },
        { label: t('footer.company.contact'), to: '/contact' },
      ],
    },
    {
      title: t('footer.legal.title'),
      links: [
        { label: t('footer.legal.privacy'), to: '/privacy' },
        { label: t('footer.legal.terms'), to: '/terms' },
        { label: t('footer.legal.refund'), to: '/refund' },
      ],
    },
  ];

  return (
    <footer className="bg-surface-950 text-white">
      <div className="container-tight py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <EcoTroveLogo />
            <p className="text-surface-400 text-sm leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <WhatsAppButton variant="green" size="sm" />
              <a
                href="mailto:hello@ecotrove.sa"
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-surface-700 text-surface-300 hover:border-surface-500 hover:text-white transition-colors text-sm"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
            </div>
          </div>

          {/* Links */}
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-sm font-semibold text-white">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-surface-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-500">
            {t('footer.copyright', { year })}
          </p>
          <p className="text-xs text-surface-500">
            {t('footer.madeIn')}
          </p>
        </div>
      </div>
    </footer>
  );
}
