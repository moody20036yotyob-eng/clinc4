import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import t from '../i18n/translations'
import { api } from '../lib/api'
import SEO from '../components/SEO'
import { BreadcrumbSchema } from '../components/StructuredData'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

const PROCESS_STEPS = {
  en: ['Free Consultation & Scan', 'Personalised Treatment Plan', 'Comfortable Treatment', 'Follow-Up & Aftercare'],
  ar: ['استشارة مجانية ومسح', 'خطة علاج مخصصة', 'علاج مريح', 'متابعة ورعاية ما بعد العلاج'],
}

const GUARANTEES = {
  en: [
    { icon: '✅', text: 'Transparent pricing — full cost breakdown before you commit' },
    { icon: '⏰', text: 'Same-day emergency appointments available' },
    { icon: '🔄', text: 'Free follow-up visits included with every procedure' },
    { icon: '😌', text: 'Sedation options for anxious patients' },
    { icon: '💳', text: '0% instalment plans on treatments over SAR 2,000' },
    { icon: '🌍', text: 'Internationally trained doctors, locally committed' },
  ],
  ar: [
    { icon: '✅', text: 'تسعير شفاف — تفصيل كامل للتكلفة قبل الالتزام' },
    { icon: '⏰', text: 'مواعيد طوارئ في نفس اليوم متاحة' },
    { icon: '🔄', text: 'زيارات متابعة مجانية مع كل إجراء' },
    { icon: '😌', text: 'خيارات تخدير للمرضى القلقين' },
    { icon: '💳', text: 'خطط تقسيط بفائدة صفر على علاجات تزيد عن ٢٠٠٠ ريال' },
    { icon: '🌍', text: 'أطباء مدرّبون دولياً، ملتزمون محلياً' },
  ],
}

export default function Services() {
  const { lang } = useLang()
  const T = t[lang].services
  const [services, setServices] = useState([])
  useReveal()

  useEffect(() => {
    api.getServices().then(s => setServices(s || []))
    document.title = `${T.pageTitle} | [Clinic Name]`
  }, [lang])

  const steps = PROCESS_STEPS[lang]
  const guarantees = GUARANTEES[lang]

  return (
    <>
      <SEO
        title="Dental Services"
        description="Explore our full range of dental services: implants, Invisalign, veneers, whitening, gum treatment, root canal, paediatric dentistry and more. All under one roof."
        path="/services"
        lang={lang}
      />
      <BreadcrumbSchema crumbs={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]} />
      {/* ── Header ── */}
      <section className="pt-32 pb-20" style={{ background: 'var(--forest)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-[0.15em] mb-4" style={{ color: 'var(--gold)' }}>
            {lang === 'ar' ? 'رعاية شاملة' : 'Comprehensive Care'}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-light italic text-white mb-5">{T.pageTitle}</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">{T.pageDesc}</p>
        </div>
      </section>

      {/* ── Process strip ── */}
      <div style={{ background: 'var(--gold)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-center gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold text-white flex-none">
                  {i + 1}
                </span>
                <span className="text-white text-sm font-medium">{s}</span>
              </div>
              {i < steps.length - 1 && <span className="text-white/50 mx-2">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* ── Services Grid ── */}
      <section className="py-24" style={{ background: 'var(--ivory)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 reveal">
            <h2 className="font-display text-4xl sm:text-5xl mb-3" style={{ color: 'var(--forest)' }}>
              {lang === 'ar' ? 'جميع خدماتنا' : 'All Our Services'}
            </h2>
            <p style={{ color: 'var(--muted)' }}>
              {lang === 'ar'
                ? 'من الفحص الروتيني إلى تحويل الابتسامة الكامل — كل ما تحتاجه تحت سقف واحد.'
                : 'From routine check-ups to complete smile makeovers — everything you need under one roof.'}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <div key={svc.id || i}
                className="rounded-2xl border flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 reveal"
                style={{ background: 'white', borderColor: 'var(--ivory-dark)', transitionDelay: `${(i % 4) * 0.07}s` }}>
                {/* Card top color accent */}
                <div className="h-1.5 rounded-t-2xl" style={{ background: 'var(--gold)' }} />
                <div className="p-7 flex-1 flex flex-col">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6"
                    style={{ background: 'var(--mint)' }}>
                    {svc.icon || '🦷'}
                  </div>
                  <h3 className="font-semibold text-xl mb-3" style={{ color: 'var(--forest)' }}>
                    {svc.name?.[lang] || svc.name?.en || ''}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'var(--muted)' }}>
                    {svc.description?.[lang] || svc.description?.en || ''}
                  </p>
                  {(svc.tip?.[lang] || svc.tip?.en) && (
                    <div className="rounded-xl p-4 mb-5" style={{ background: 'var(--mint)', border: '1px solid var(--ivory-dark)' }}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-sm">💡</span>
                        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--gold)' }}>
                          {T.didYouKnow}
                        </p>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                        {svc.tip?.[lang] || svc.tip?.en}
                      </p>
                    </div>
                  )}
                  <Link
                    to={`/booking?service=${encodeURIComponent(svc.name?.en || '')}`}
                    className="w-full block text-center py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: 'var(--gold)' }}>
                    {T.bookBtn}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured highlight ── */}
      <section className="py-20" style={{ background: 'var(--mint)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl overflow-hidden grid lg:grid-cols-2"
            style={{ background: 'var(--forest)' }}>
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.15em] mb-4 block" style={{ color: 'var(--gold)' }}>
                {lang === 'ar' ? 'الأكثر طلباً' : 'Most Requested'}
              </span>
              <h2 className="font-display text-4xl font-light italic text-white mb-5">
                {lang === 'ar' ? 'تحويل الابتسامة الكامل' : 'Full Smile Makeover'}
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                {lang === 'ar'
                  ? 'جمع بين قشور البورسلان والتبييض الاحترافي وتصميم الابتسامة الرقمي في خطة علاجية واحدة شاملة. غيّر ابتسامتك إلى الأبد في بضع زيارات فقط.'
                  : 'Combine porcelain veneers, professional whitening, and digital smile design into one comprehensive treatment plan. Transform your smile permanently in just a few visits.'}
              </p>
              <ul className="flex flex-col gap-2 mb-8">
                {(lang === 'ar'
                  ? ['تصميم الابتسامة الرقمي المعاينة قبل العلاج', 'قشور بورسلان مخصصة', 'تبييض احترافي شامل', 'استشارة مجانية وخطة علاج']
                  : ['Digital smile preview before any treatment', 'Custom porcelain veneers', 'Comprehensive professional whitening', 'Free consultation & treatment plan']
                ).map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <span style={{ color: 'var(--gold)' }}>✦</span> {item}
                  </li>
                ))}
              </ul>
              <Link to="/booking?service=Smile Makeover"
                className="inline-block px-8 py-3.5 rounded-full font-semibold text-white self-start"
                style={{ background: 'var(--gold)' }}>
                {lang === 'ar' ? 'احجز استشارة مجانية' : 'Book a Free Consultation'}
              </Link>
            </div>
            <div className="hidden lg:flex items-center justify-center p-14">
              <div className="w-64 h-64 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <circle cx="60" cy="60" r="50" stroke="rgba(201,151,58,0.3)" strokeWidth="1"/>
                  <path d="M35 60 C35 42 46 30 60 30 C74 30 85 42 85 60 C85 78 74 90 60 90 C46 90 35 78 35 60Z"
                    fill="rgba(255,255,255,0.08)" />
                  <path d="M43 60 Q60 73 77 60" stroke="var(--gold)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <circle cx="60" cy="45" r="3" fill="rgba(255,255,255,0.3)"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Guarantees ── */}
      <section className="py-24" style={{ background: 'var(--ivory)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'ar' ? 'وعدنا لك' : 'Our Promise to You'}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl" style={{ color: 'var(--forest)' }}>
              {lang === 'ar' ? 'لماذا المرضى يثقون بنا' : 'Why Patients Trust Us'}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guarantees.map((g, i) => (
              <div key={i}
                className="flex items-start gap-4 p-6 rounded-2xl border reveal"
                style={{ background: 'white', borderColor: 'var(--ivory-dark)', transitionDelay: `${i * 0.07}s` }}>
                <span className="text-2xl flex-none">{g.icon}</span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Specialties breakdown ── */}
      <section className="py-20" style={{ background: 'var(--forest)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 reveal">
            <h2 className="font-display text-4xl text-white mb-3">
              {lang === 'ar' ? 'تخصصاتنا' : 'Our Specialties'}
            </h2>
            <p className="text-white/60">
              {lang === 'ar' ? 'متخصص مؤهل لكل فرع من فروع طب الأسنان.' : 'A qualified specialist for every branch of dentistry.'}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {(lang === 'ar'
              ? ['تقويم', 'زراعة', 'تجميل', 'أطفال', 'لثة', 'جذور']
              : ['Orthodontics', 'Implants', 'Cosmetics', 'Paediatrics', 'Periodontics', 'Endodontics']
            ).map((spec, i) => (
              <div key={i}
                className="rounded-xl p-4 text-center reveal"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', transitionDelay: `${i * 0.06}s` }}>
                <p className="text-sm font-medium text-white">{spec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: 'var(--ivory)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center reveal">
          <h2 className="font-display text-4xl mb-5" style={{ color: 'var(--forest)' }}>
            {lang === 'ar' ? 'لا تعرف من أين تبدأ؟' : 'Not Sure Where to Start?'}
          </h2>
          <p className="mb-8 text-lg" style={{ color: 'var(--muted)' }}>
            {lang === 'ar'
              ? 'احجز استشارة مجانية وسيرشدك طبيبنا إلى خطة العلاج المثالية لك.'
              : 'Book a free consultation and our doctor will guide you to the perfect treatment plan for your needs.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking"
              className="px-10 py-4 rounded-full font-semibold text-white"
              style={{ background: 'var(--gold)' }}>
              {lang === 'ar' ? 'احجز استشارة مجانية' : 'Book a Free Consultation'}
            </Link>
            <Link to="/faq"
              className="px-10 py-4 rounded-full font-medium border-2"
              style={{ borderColor: 'var(--forest)', color: 'var(--forest)' }}>
              {lang === 'ar' ? 'تصفح الأسئلة الشائعة' : 'Browse FAQs'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
