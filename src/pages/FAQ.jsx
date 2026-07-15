import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import t from '../i18n/translations'
import { api } from '../lib/api'
import SEO from '../components/SEO'
import { BreadcrumbSchema, FAQSchema } from '../components/StructuredData'

const CAT_ORDER = ['general', 'treatment', 'payment', 'emergency', 'children']

const CAT_ICONS = {
  general: '💬',
  treatment: '🔬',
  payment: '💳',
  emergency: '🚨',
  children: '👶',
}

function AccordionItem({ q, a, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false)
  return (
    <div className="border-b" style={{ borderColor: 'var(--ivory-dark)' }}>
      <button onClick={() => setOpen(o => !o)}
        className="flex items-start justify-between w-full py-5 text-start gap-4">
        <span className="font-medium text-base leading-snug" style={{ color: 'var(--text)' }}>{q}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-none mt-0.5"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', color: 'var(--forest-light)' }}>
          <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      <div style={{ maxHeight: open ? '600px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease, opacity 0.3s', opacity: open ? 1 : 0 }}>
        <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{a}</p>
      </div>
    </div>
  )
}

const TIPS = {
  en: [
    { icon: '🪥', tip: 'Brush for a full 2 minutes, twice a day. Most people only brush for 45 seconds.' },
    { icon: '🧵', tip: 'Flossing removes up to 40% of the plaque your toothbrush can\'t reach.' },
    { icon: '💧', tip: 'Drink water after every meal — it washes away food particles and neutralises acid.' },
    { icon: '⏰', tip: 'Replace your toothbrush every 3 months, or sooner if the bristles are frayed.' },
  ],
  ar: [
    { icon: '🪥', tip: 'افرش أسنانك لمدة دقيقتين كاملتين، مرتين في اليوم. معظم الناس يفرشون لمدة ٤٥ ثانية فقط.' },
    { icon: '🧵', tip: 'يزيل خيط الأسنان ما يصل إلى ٤٠٪ من البلاك الذي لا تستطيع فرشاة أسنانك الوصول إليه.' },
    { icon: '💧', tip: 'اشرب الماء بعد كل وجبة — يغسل جزيئات الطعام ويحيّد الحمض.' },
    { icon: '⏰', tip: 'استبدل فرشاة أسنانك كل ٣ أشهر، أو في وقت أبكر إذا كانت الشعيرات تالفة.' },
  ],
}

export default function FAQ() {
  const { lang } = useLang()
  const T = t[lang].faq
  const [allItems, setAllItems] = useState([])
  const [activeTab, setActiveTab] = useState('general')

  useEffect(() => {
    api.getContent().then(data => {
      setAllItems(data?.faq?.items || [])
    })
    document.title = `${T.pageTitle} | [Clinic Name]`
  }, [lang])

  const cats = CAT_ORDER.filter(c => allItems.some(i => i.cat === c))
  const filtered = allItems.filter(i => i.cat === activeTab)
  const tips = TIPS[lang]

  return (
    <>
      <SEO
        title="Frequently Asked Questions"
        description="Answers to common questions about dental treatments, payment plans, emergency care, children's dentistry, and visiting our clinic."
        path="/faq"
        lang={lang}
      />
      <BreadcrumbSchema crumbs={[{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }]} />
      <FAQSchema items={allItems} />
      {/* ── Header ── */}
      <section className="pt-32 pb-20" style={{ background: 'var(--forest)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-[0.15em] mb-4" style={{ color: 'var(--gold)' }}>
            {lang === 'ar' ? 'كل ما تريد معرفته' : 'Everything You Need to Know'}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-light italic text-white mb-5">{T.pageTitle}</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">{T.pageDesc}</p>
        </div>
      </section>

      {/* ── Category tabs ── */}
      <div className="sticky top-16 z-30 border-b shadow-sm" style={{ background: 'white', borderColor: 'var(--ivory-dark)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap gap-2">
          {cats.map(cat => (
            <button key={cat} onClick={() => setActiveTab(cat)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: activeTab === cat ? 'var(--forest)' : 'transparent',
                color: activeTab === cat ? 'white' : 'var(--muted)',
                border: `1px solid ${activeTab === cat ? 'var(--forest)' : 'var(--ivory-dark)'}`,
              }}>
              <span>{CAT_ICONS[cat]}</span>
              {T.cats[cat] || cat}
              <span className="text-xs opacity-60">
                ({allItems.filter(i => i.cat === cat).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── FAQ + Tips ── */}
      <section className="py-16" style={{ background: 'var(--ivory)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-10">

          {/* Accordion */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{CAT_ICONS[activeTab]}</span>
              <h2 className="font-semibold text-2xl" style={{ color: 'var(--forest)' }}>
                {T.cats[activeTab]}
              </h2>
            </div>

            <div className="rounded-2xl border" style={{ background: 'white', borderColor: 'var(--ivory-dark)' }}>
              <div className="px-6 sm:px-8">
                {filtered.length === 0 && (
                  <p className="text-center py-12" style={{ color: 'var(--muted)' }}>
                    {lang === 'ar' ? 'لا توجد أسئلة في هذا القسم بعد.' : 'No questions in this category yet.'}
                  </p>
                )}
                {filtered.map((item, i) => (
                  <AccordionItem
                    key={item.id || i}
                    q={item.q?.[lang] || item.q?.en || ''}
                    a={item.a?.[lang] || item.a?.en || ''}
                    defaultOpen={i === 0}
                  />
                ))}
              </div>
            </div>

            {/* "Still have questions?" */}
            <div className="mt-8 rounded-2xl p-7 border"
              style={{ background: 'var(--mint)', borderColor: 'var(--ivory-dark)' }}>
              <p className="font-semibold text-lg mb-2" style={{ color: 'var(--forest)' }}>
                {lang === 'ar' ? 'لا تزال لديك أسئلة؟' : 'Still Have Questions?'}
              </p>
              <p className="text-sm mb-5" style={{ color: 'var(--muted)' }}>
                {lang === 'ar'
                  ? 'تواصل مع فريقنا مباشرةً وسيسعدنا المساعدة.'
                  : 'Reach out to our team directly — we\'re happy to help.'}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/966500000000"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
                  style={{ background: '#25D366' }}>
                  💬 WhatsApp
                </a>
                <Link to="/contact"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border"
                  style={{ borderColor: 'var(--forest)', color: 'var(--forest)' }}>
                  {lang === 'ar' ? 'أرسل رسالة' : 'Send a Message'}
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">

            {/* Book CTA */}
            <div className="rounded-2xl p-7" style={{ background: 'var(--forest)' }}>
              <p className="font-display text-2xl text-white mb-3">
                {lang === 'ar' ? 'جاهز للبدء؟' : 'Ready to Get Started?'}
              </p>
              <p className="text-white/60 text-sm mb-5">
                {lang === 'ar'
                  ? 'احجز استشارتك المجانية واحصل على إجابات مخصصة من طبيبك.'
                  : 'Book your free consultation and get personalised answers from your doctor.'}
              </p>
              <Link to="/booking"
                className="block w-full text-center py-3 rounded-full font-semibold text-white"
                style={{ background: 'var(--gold)' }}>
                {lang === 'ar' ? 'احجز الآن' : 'Book Now — It\'s Free'}
              </Link>
            </div>

            {/* Oral health tips */}
            <div className="rounded-2xl border p-7" style={{ background: 'white', borderColor: 'var(--ivory-dark)' }}>
              <p className="font-semibold text-lg mb-5" style={{ color: 'var(--forest)' }}>
                {lang === 'ar' ? '💡 نصائح سريعة لصحة الفم' : '💡 Quick Oral Health Tips'}
              </p>
              {tips.map((t, i) => (
                <div key={i} className="flex items-start gap-3 mb-4">
                  <span className="text-xl flex-none">{t.icon}</span>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{t.tip}</p>
                </div>
              ))}
            </div>

            {/* Emergency */}
            <div className="rounded-2xl p-6" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
              <p className="font-semibold mb-1" style={{ color: '#b91c1c' }}>
                🚨 {lang === 'ar' ? 'طوارئ الأسنان؟' : 'Dental Emergency?'}
              </p>
              <p className="text-sm mb-3" style={{ color: '#991b1b' }}>
                {lang === 'ar'
                  ? 'لا تنتظر. اتصل بخط طوارئنا المتاح ٢٤/٧.'
                  : 'Don\'t wait. Call our 24/7 emergency line now.'}
              </p>
              <a href="tel:+966509999999"
                className="block w-full text-center py-2.5 rounded-full font-bold text-sm text-white"
                style={{ background: '#b91c1c' }}>
                +966 50 999 9999
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── All categories overview ── */}
      <section className="py-16" style={{ background: 'var(--mint)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl text-center mb-10" style={{ color: 'var(--forest)' }}>
            {lang === 'ar' ? 'تصفح حسب الموضوع' : 'Browse by Topic'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CAT_ORDER.filter(c => allItems.some(i => i.cat === c)).map(cat => (
              <button key={cat} onClick={() => { setActiveTab(cat); window.scrollTo({ top: 400, behavior: 'smooth' }) }}
                className="rounded-2xl p-6 text-center border hover:shadow-md transition-all"
                style={{ background: 'white', borderColor: activeTab === cat ? 'var(--forest)' : 'var(--ivory-dark)' }}>
                <span className="text-4xl block mb-3">{CAT_ICONS[cat]}</span>
                <p className="font-semibold text-sm" style={{ color: 'var(--forest)' }}>{T.cats[cat]}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
                  {allItems.filter(i => i.cat === cat).length} {lang === 'ar' ? 'سؤال' : 'questions'}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
