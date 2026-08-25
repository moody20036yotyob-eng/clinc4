import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  ArrowRight, Check, Star, Zap, Globe2, Shield, Users, BarChart3,
  ChevronDown, ChevronUp, Sparkles, Code2, ShoppingCart, Smartphone,
  Palette, Server, Link2, FileText, Eye, Download, Upload, Award
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { WhatsAppModal } from '@/components/ui/WhatsAppModal';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

// ─── Animation Helpers ───────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const { t } = useTranslation();
  const [whatsappOpen, setWhatsappOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />

      <div className="container-tight relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="brand" className="text-sm py-1 px-4 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              {t('hero.badge')}
            </Badge>
          </motion.div>

          <motion.h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-surface-950 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('hero.headline').split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="text-gradient">{line}</span> : line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-4 text-xl text-brand-600 font-semibold tracking-wide"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('hero.subheadline')}
          </motion.p>

          <motion.p
            className="mt-6 text-lg text-surface-500 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size="xl" asChild leftIcon={<FileText className="h-5 w-5" />}>
              <Link to="/cv-templates">{t('hero.cta.primary')}</Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link to="/portfolio-templates">{t('hero.cta.secondary')}</Link>
            </Button>
            <WhatsAppButton size="lg" />
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {[
              { value: '80', label: t('hero.stats.templates') },
              { value: '40', label: t('hero.stats.portfolioTemplates') },
              { value: '1,200+', label: t('hero.stats.customers') },
              { value: '4.9★', label: t('hero.stats.rating') },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-surface-900 font-display">{value}</div>
                <div className="text-sm text-surface-500 mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero visual - CV preview mockup */}
        <motion.div
          className="mt-16 relative max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-surface-100 rounded-2xl p-4 border border-surface-200 shadow-elevated">
            <div className="flex gap-2 mb-3">
              <div className="h-3 w-3 rounded-full bg-error-400" />
              <div className="h-3 w-3 rounded-full bg-accent-400" />
              <div className="h-3 w-3 rounded-full bg-success-500" />
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-card">
              <div className="grid grid-cols-3 gap-0 h-64 sm:h-80">
                {/* Mock CV template cards */}
                {[
                  { bg: 'bg-surface-950', accent: 'bg-brand-600', name: 'Executive Pro' },
                  { bg: 'bg-white', accent: 'bg-brand-500', name: 'Nordic Clean' },
                  { bg: 'bg-brand-900', accent: 'bg-accent-400', name: 'Creative Bold' },
                ].map(({ bg, accent, name }, i) => (
                  <div key={i} className={`${bg} p-4 flex flex-col relative overflow-hidden`}>
                    <div className={`absolute top-0 start-0 w-1.5 h-full ${accent}`} />
                    <div className="ps-3 flex-1 flex flex-col gap-1.5">
                      <div className={`h-6 w-6 rounded-full ${accent} opacity-80`} />
                      <div className={`h-2.5 w-20 rounded-full ${i === 0 ? 'bg-white/30' : 'bg-surface-200'}`} />
                      <div className={`h-1.5 w-14 rounded-full ${i === 0 ? 'bg-white/20' : 'bg-surface-100'}`} />
                      <div className="mt-2 space-y-1">
                        {[1,2,3].map((j) => <div key={j} className={`h-1 rounded ${i === 0 ? 'bg-white/10' : 'bg-surface-100'}`} />)}
                      </div>
                    </div>
                    <span className={`text-xs font-medium ${i === 0 ? 'text-white/50' : 'text-surface-400'} ps-3`}>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <WhatsAppModal open={whatsappOpen} onClose={() => setWhatsappOpen(false)} type="general" />
    </section>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────

function ProductsSection() {
  const { t } = useTranslation();
  const [whatsappOpen, setWhatsappOpen] = useState<null | 'customCV' | 'customPortfolio'>(null);

  const products = [
    {
      key: 'cv',
      icon: <FileText className="h-7 w-7" />,
      to: '/cv-templates',
      color: 'bg-brand-50 text-brand-600',
      borderColor: 'border-brand-100',
    },
    {
      key: 'portfolio',
      icon: <Globe2 className="h-7 w-7" />,
      to: '/portfolio-templates',
      color: 'bg-success-50 text-success-600',
      borderColor: 'border-success-100',
    },
    {
      key: 'bundle',
      icon: <Sparkles className="h-7 w-7" />,
      to: '/pricing',
      featured: true,
      color: 'bg-accent-50 text-accent-600',
      borderColor: 'border-accent-200',
    },
  ];

  return (
    <section className="section-padding bg-surface-50">
      <div className="container-tight">
        <FadeUp className="text-center mb-14">
          <Badge variant="brand" className="mb-4">{t('products.title')}</Badge>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-surface-950">
            {t('products.subtitle')}
          </h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(({ key, icon, to, featured, color, borderColor }, i) => (
            <FadeUp key={key} delay={i * 0.1}>
              <div className={`relative rounded-2xl bg-white border-2 p-6 h-full flex flex-col transition-all duration-300 hover:shadow-elevated
                ${featured ? 'border-brand-500 shadow-brand-sm' : `${borderColor} shadow-card`}`}>
                {featured && (
                  <div className="absolute -top-3 start-6">
                    <Badge variant="dark" className="text-xs font-semibold px-3 py-1 shadow-sm">
                      {t('products.bundle.badge')}
                    </Badge>
                  </div>
                )}

                <div className={`h-14 w-14 rounded-2xl ${color} flex items-center justify-center mb-5`}>
                  {icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="text-xl font-bold text-surface-900 font-display">
                      {t(`products.${key}.title`)}
                    </h3>
                    <span className="text-xl font-bold text-brand-600 whitespace-nowrap">
                      {t(`products.${key}.price`)}
                    </span>
                  </div>

                  {key === 'bundle' && (
                    <span className="inline-flex text-xs font-medium text-success-700 bg-success-50 px-2 py-0.5 rounded-full border border-success-100 mb-2">
                      {t('products.bundle.save')}
                    </span>
                  )}

                  <p className="text-surface-500 text-sm mb-5">
                    {t(`products.${key}.description`)}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {(t(`products.${key}.features`, { returnObjects: true }) as string[]).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-surface-700">
                        <Check className="h-4 w-4 text-success-600 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant={featured ? 'primary' : 'outline'} asChild className="w-full">
                  <Link to={to}>
                    {t('pricing.cta')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Custom Services */}
        <FadeUp delay={0.3} className="mt-8 grid sm:grid-cols-2 gap-4">
          {(['customCV', 'customPortfolio'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setWhatsappOpen(key)}
              className="group flex items-center justify-between p-5 rounded-xl bg-white border border-surface-200 hover:border-brand-200 hover:shadow-card transition-all duration-200 text-start"
            >
              <div>
                <div className="font-semibold text-surface-900 group-hover:text-brand-700 transition-colors">
                  {t(`products.${key}.title`)}
                </div>
                <div className="text-sm text-brand-600 font-medium mt-0.5">
                  {t(`products.${key}.priceRange`)}
                </div>
                <div className="text-sm text-surface-500 mt-1">{t(`products.${key}.description`)}</div>
              </div>
              <div className="flex items-center gap-1 text-brand-600 font-medium text-sm whitespace-nowrap ms-4">
                {t(`products.${key}.cta`)}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </FadeUp>
      </div>

      <WhatsAppModal open={!!whatsappOpen} onClose={() => setWhatsappOpen(null)} type={whatsappOpen || 'general'} />
    </section>
  );
}

// ─── Template Preview Cards ───────────────────────────────────────────────────

function TemplatesShowcase() {
  const { t } = useTranslation();

  const mockTemplates = [
    { name: 'Executive Pro', category: 'Corporate', isATS: true, color: '#1e293b' },
    { name: 'Nordic Clean', category: 'Minimal', isATS: true, color: '#2d63f0' },
    { name: 'Creative Bold', category: 'Creative', isATS: false, color: '#f59e0b' },
    { name: 'Developer Pro', category: 'Technology', isATS: true, color: '#16a34a' },
    { name: 'Prime Modern', category: 'Modern', isATS: false, color: '#7c3aed' },
    { name: 'Elegant Serif', category: 'Elegant', isATS: false, color: '#be185d' },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-tight">
        <FadeUp className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <Badge variant="brand" className="mb-3">{t('templates.cvTemplates')}</Badge>
            <h2 className="font-display text-4xl font-bold text-surface-950">80 {t('templates.cvTemplates')}</h2>
          </div>
          <Button variant="outline" asChild>
            <Link to="/cv-templates">{t('templates.loadMore')} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {mockTemplates.map((template, i) => (
            <FadeUp key={template.name} delay={i * 0.08}>
              <Link to="/cv-templates" className="group block">
                <div className="rounded-2xl overflow-hidden border border-surface-200 shadow-card hover:shadow-elevated transition-all duration-300 bg-white">
                  <div
                    className="h-44 sm:h-52 flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: template.color + '10' }}
                  >
                    {/* Simplified template preview */}
                    <div className="w-28 sm:w-36 bg-white rounded-lg shadow-elevated p-3 transform group-hover:scale-105 transition-transform duration-300">
                      <div className="h-6 w-6 rounded-full mb-2" style={{ backgroundColor: template.color }} />
                      <div className="h-2 w-20 rounded bg-surface-200 mb-1" />
                      <div className="h-1.5 w-14 rounded bg-surface-100 mb-3" />
                      {[1,2,3].map((j) => (
                        <div key={j} className="h-1 w-full rounded bg-surface-100 mb-1 last:w-3/4" />
                      ))}
                      <div className="mt-2 flex gap-1">
                        <div className="h-3 w-10 rounded" style={{ backgroundColor: template.color + '40' }} />
                        <div className="h-3 w-8 rounded bg-surface-100" />
                      </div>
                    </div>
                    {template.isATS && (
                      <div className="absolute top-2 end-2">
                        <Badge variant="success">ATS</Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="font-semibold text-surface-900">{template.name}</div>
                    <div className="text-sm text-surface-400 mt-0.5">{template.category}</div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      {t('templates.useTemplate')}
                    </Button>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorksSection() {
  const { t } = useTranslation();
  const [active, setActive] = useState<'cv' | 'portfolio'>('cv');

  return (
    <section className="section-padding bg-surface-50">
      <div className="container-tight">
        <FadeUp className="text-center mb-12">
          <Badge variant="brand" className="mb-4">{t('howItWorks.title')}</Badge>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-surface-950">
            {t('howItWorks.subtitle')}
          </h2>
        </FadeUp>

        <FadeUp delay={0.1} className="flex justify-center mb-10">
          <div className="flex rounded-xl bg-white border border-surface-200 p-1 shadow-subtle">
            {(['cv', 'portfolio'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === tab ? 'bg-brand-600 text-white shadow-brand-sm' : 'text-surface-600 hover:text-surface-900'
                }`}
              >
                {t(`howItWorks.steps.${tab}.title`)}
              </button>
            ))}
          </div>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(t(`howItWorks.steps.${active}.steps`, { returnObjects: true }) as Array<{ step: string; label: string; description: string }>).map(
            ({ step, label, description }, i) => (
              <FadeUp key={step} delay={i * 0.1}>
                <div className="relative">
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-6 start-full w-full h-px bg-gradient-to-r from-brand-200 to-transparent z-0" />
                  )}
                  <div className="relative z-10 bg-white rounded-2xl border border-surface-200 p-6 shadow-card hover:shadow-elevated transition-shadow">
                    <div className="h-12 w-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-700 font-bold text-lg font-display mb-4">
                      {step}
                    </div>
                    <h3 className="font-semibold text-surface-900 mb-2">{label}</h3>
                    <p className="text-sm text-surface-500 leading-relaxed">{description}</p>
                  </div>
                </div>
              </FadeUp>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Preview ──────────────────────────────────────────────────────────

function PricingSection() {
  const { t } = useTranslation();
  const { data: pricing } = useQuery({
    queryKey: ['pricing'],
    queryFn: () => api.get<{ cv: number; portfolio: number; bundle: number; currency: string }>('/settings/pricing'),
  });

  const plans = [
    {
      key: 'cv',
      price: pricing?.cv || 119,
      icon: <FileText className="h-6 w-6" />,
      color: 'text-brand-600',
      bg: 'bg-brand-50',
    },
    {
      key: 'portfolio',
      price: pricing?.portfolio || 159,
      icon: <Globe2 className="h-6 w-6" />,
      color: 'text-success-600',
      bg: 'bg-success-50',
    },
    {
      key: 'bundle',
      price: pricing?.bundle || 249,
      icon: <Sparkles className="h-6 w-6" />,
      color: 'text-accent-600',
      bg: 'bg-accent-50',
      featured: true,
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-tight">
        <FadeUp className="text-center mb-14">
          <Badge variant="brand" className="mb-4">{t('pricing.title')}</Badge>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-surface-950">
            {t('pricing.subtitle')}
          </h2>
        </FadeUp>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map(({ key, price, icon, color, bg, featured }, i) => (
            <FadeUp key={key} delay={i * 0.1}>
              <div className={`rounded-2xl p-6 h-full flex flex-col border-2 transition-all hover:shadow-elevated
                ${featured ? 'border-brand-500 bg-brand-600 text-white shadow-brand' : 'border-surface-200 bg-white'}`}>
                {featured && (
                  <div className="text-xs font-bold text-brand-200 uppercase tracking-wider mb-3">
                    {t('pricing.mostPopular')}
                  </div>
                )}
                <div className={`h-12 w-12 rounded-xl ${featured ? 'bg-white/20' : bg} flex items-center justify-center mb-4 ${featured ? 'text-white' : color}`}>
                  {icon}
                </div>
                <div className="text-sm font-medium mb-1 opacity-80">{t(`products.${key}.title`)}</div>
                <div className="text-4xl font-bold font-display mb-1">
                  {price} <span className="text-lg font-normal opacity-60">{t('common.sar')}</span>
                </div>
                {key === 'bundle' && (
                  <div className={`text-xs font-medium mb-4 ${featured ? 'text-brand-200' : 'text-success-600'}`}>
                    {t('pricing.bundleSave', { amount: 29 })}
                  </div>
                )}
                <Button
                  variant={featured ? 'white' : 'primary'}
                  className={`mt-auto w-full ${featured ? 'text-brand-700' : ''}`}
                  asChild
                >
                  <Link to="/pricing">{t('pricing.cta')}</Link>
                </Button>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3} className="text-center mt-8">
          <Button variant="ghost" asChild>
            <Link to="/pricing" className="gap-1.5">
              {t('pricing.title')} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Digital Solutions ────────────────────────────────────────────────────────

function DigitalSolutionsSection() {
  const { t } = useTranslation();

  const services = [
    { key: 'website', icon: <Code2 className="h-6 w-6" />, to: '/digital-solutions/website' },
    { key: 'ecommerce', icon: <ShoppingCart className="h-6 w-6" />, to: '/digital-solutions/ecommerce' },
    { key: 'mobile', icon: <Smartphone className="h-6 w-6" />, to: '/digital-solutions/mobile' },
    { key: 'uiux', icon: <Palette className="h-6 w-6" />, to: '/digital-solutions' },
    { key: 'backend', icon: <Server className="h-6 w-6" />, to: '/digital-solutions' },
    { key: 'integration', icon: <Link2 className="h-6 w-6" />, to: '/digital-solutions' },
  ];

  return (
    <section className="section-padding bg-surface-950 text-white">
      <div className="container-tight">
        <FadeUp className="text-center mb-14">
          <Badge variant="white" className="mb-4 text-surface-700">{t('digitalSolutions.title')}</Badge>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            {t('digitalSolutions.title')}
          </h2>
          <p className="text-surface-400 mt-4 max-w-2xl mx-auto text-lg">
            {t('digitalSolutions.subtitle')}
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(({ key, icon, to }, i) => (
            <FadeUp key={key} delay={i * 0.08}>
              <Link
                to={to}
                className="group flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                <div className="h-12 w-12 shrink-0 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-300 group-hover:bg-brand-600/30 transition-colors">
                  {icon}
                </div>
                <div>
                  <div className="font-semibold text-white group-hover:text-brand-200 transition-colors">
                    {t(`digitalSolutions.services.${key}.title`)}
                  </div>
                  <div className="text-sm text-surface-400 mt-1 leading-relaxed">
                    {t(`digitalSolutions.services.${key}.description`)}
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3} className="mt-10 text-center">
          <WhatsAppButton size="lg" label={t('digitalSolutions.cta')} />
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Why EcoTrove ─────────────────────────────────────────────────────────────

function WhyUsSection() {
  const { t } = useTranslation();
  const icons = [<Zap />, <Globe2 />, <Eye />, <Download />, <Shield />, <Users />];

  return (
    <section className="section-padding bg-surface-50">
      <div className="container-tight">
        <FadeUp className="text-center mb-14">
          <Badge variant="brand" className="mb-4">{t('whyUs.title')}</Badge>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-surface-950">{t('whyUs.title')}</h2>
          <p className="text-surface-500 mt-4 text-lg">{t('whyUs.subtitle')}</p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(t('whyUs.reasons', { returnObjects: true }) as Array<{ title: string; description: string }>).map(
            ({ title, description }, i) => (
              <FadeUp key={title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 border border-surface-200 shadow-card hover:shadow-elevated transition-shadow">
                  <div className="h-12 w-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                    {icons[i]}
                  </div>
                  <h3 className="font-semibold text-surface-900 mb-2">{title}</h3>
                  <p className="text-sm text-surface-500 leading-relaxed">{description}</p>
                </div>
              </FadeUp>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: 'Ahmed Al-Rashidi', nameAr: 'أحمد الراشدي',
      role: 'Software Engineer', company: 'NEOM',
      content: 'EcoTrove helped me land interviews at top companies. The CV templates are incredibly professional and the editor is so intuitive.',
      rating: 5,
    },
    {
      name: 'Sara Al-Qahtani', nameAr: 'سارة القحطاني',
      role: 'UX Designer', company: 'Saudi Aramco',
      content: 'Finally a platform that understands the Saudi market. The Arabic support is perfect and my portfolio looks stunning.',
      rating: 5,
    },
    {
      name: 'Mohammed Al-Otaibi', nameAr: 'محمد العتيبي',
      role: 'Marketing Manager', company: 'STC',
      content: 'The bundle offer is unbeatable value. My CV and portfolio look like they were designed by a professional studio.',
      rating: 5,
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-tight">
        <FadeUp className="text-center mb-12">
          <Badge variant="brand" className="mb-4">{t('testimonials.title')}</Badge>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-surface-950">{t('testimonials.title')}</h2>
          <p className="text-surface-500 mt-4">{t('testimonials.subtitle')}</p>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.1}>
              <div className="bg-white border border-surface-200 rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-surface-700 text-sm leading-relaxed flex-1">"{t.content}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-surface-900 text-sm">{t.name}</div>
                    <div className="text-xs text-surface-500">{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQSection() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(null);
  const questions = t('faq.questions', { returnObjects: true }) as Array<{ question: string; answer: string }>;

  return (
    <section className="section-padding bg-surface-50">
      <div className="container-tight max-w-3xl mx-auto">
        <FadeUp className="text-center mb-12">
          <Badge variant="brand" className="mb-4">{t('faq.title')}</Badge>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-surface-950">{t('faq.title')}</h2>
          <p className="text-surface-500 mt-4">{t('faq.subtitle')}</p>
        </FadeUp>

        <div className="space-y-3">
          {questions.map(({ question, answer }, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="bg-white rounded-xl border border-surface-200 overflow-hidden shadow-subtle">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-start"
                >
                  <span className="font-medium text-surface-900">{question}</span>
                  {open === i ? (
                    <ChevronUp className="h-5 w-5 text-brand-600 shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-surface-400 shrink-0" />
                  )}
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-surface-600 text-sm leading-relaxed">
                    {answer}
                  </div>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function CTASection() {
  const { t } = useTranslation();
  return (
    <section className="section-padding bg-gradient-brand text-white">
      <div className="container-tight text-center">
        <FadeUp>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">{t('cta.title')}</h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">{t('cta.subtitle')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="xl" variant="white" className="text-brand-700" asChild>
              <Link to="/cv-templates">
                <FileText className="h-5 w-5" />
                {t('cta.primary')}
              </Link>
            </Button>
            <Button size="xl" className="border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white" asChild>
              <Link to="/portfolio-templates">{t('cta.secondary')}</Link>
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <TemplatesShowcase />
      <HowItWorksSection />
      <PricingSection />
      <DigitalSolutionsSection />
      <WhyUsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

export default HomePage;
