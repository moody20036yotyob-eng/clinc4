import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import t from '../i18n/translations'
import { api } from '../lib/api'
import SEO from '../components/SEO'
import { BreadcrumbSchema } from '../components/StructuredData'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import DoctorCarousel from '../components/DoctorCarousel'

function useReveal() {
  useEffect(() => {
    const run = () => {
      const els = document.querySelectorAll('.reveal')
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
      }, { threshold: 0.1 })
      els.forEach(el => obs.observe(el))
      return () => obs.disconnect()
    }
    const cleanup = run()
    return cleanup
  }, [])
}

const WHY_US = {
  en: [
    { icon: '🏆', title: 'Award-Winning Care', body: 'Recognised by the Saudi Dental Society as a Centre of Excellence three years in a row.' },
    { icon: '🔬', title: 'Cutting-Edge Technology', body: 'Cone-beam CT, digital intraoral scanners, laser dentistry, and AI-assisted diagnostics.' },
    { icon: '🌍', title: 'Internationally Trained', body: 'Our doctors trained at top institutions in the UK, USA, Germany, and Canada.' },
    { icon: '😌', title: 'Pain-Free Promise', body: 'From sedation options to numbing gels, we eliminate anxiety before it begins.' },
    { icon: '💳', title: 'Flexible Payment', body: '0% instalment plans, insurance coordination, and transparent pricing — no surprises.' },
    { icon: '📞', title: '24/7 Emergency Line', body: 'Dental emergencies don\'t keep office hours. Neither do we. Call anytime.' },
  ],
  ar: [
    { icon: '🏆', title: 'رعاية حائزة على جوائز', body: 'معترف بها من الجمعية السعودية لطب الأسنان كمركز تميّز ثلاث سنوات متتالية.' },
    { icon: '🔬', title: 'تقنية متطورة', body: 'مقطعية الحزمة المخروطية، والماسحات الرقمية داخل الفم، وطب الأسنان بالليزر، والتشخيص بالذكاء الاصطناعي.' },
    { icon: '🌍', title: 'مدرّبون دولياً', body: 'تدرّب أطباؤنا في أعرق المؤسسات في المملكة المتحدة والولايات المتحدة وألمانيا وكندا.' },
    { icon: '😌', title: 'وعد بلا ألم', body: 'من خيارات التخدير إلى جيلات التخدير الموضعية، نقضي على القلق قبل أن يبدأ.' },
    { icon: '💳', title: 'دفع مرن', body: 'خطط تقسيط بدون فوائد، وتنسيق التأمين، وتسعير شفاف — بلا مفاجآت.' },
    { icon: '📞', title: 'خط طوارئ ٢٤/٧', body: 'حالات طوارئ الأسنان لا تلتزم بأوقات العمل. ونحن كذلك. اتصل في أي وقت.' },
  ],
}

const PROCESS = {
  en: [
    { num: '01', title: 'Book Online or by Phone', body: 'Choose a time that suits you — same-day slots often available.' },
    { num: '02', title: 'Comprehensive Consultation', body: 'Digital X-rays, 3D scans, and a full oral health assessment at your first visit.' },
    { num: '03', title: 'Personalised Treatment Plan', body: 'Your doctor presents a clear, costed plan with timelines — you decide the pace.' },
    { num: '04', title: 'Comfortable Treatment', body: 'State-of-the-art facilities, sedation options, and a caring team by your side.' },
    { num: '05', title: 'Aftercare & Follow-Up', body: 'We check in after every procedure and schedule free follow-ups as needed.' },
  ],
  ar: [
    { num: '01', title: 'احجز عبر الإنترنت أو الهاتف', body: 'اختر الوقت المناسب لك — غالباً ما تتوفر مواعيد في نفس اليوم.' },
    { num: '02', title: 'استشارة شاملة', body: 'أشعة سينية رقمية ومسح ثلاثي الأبعاد وتقييم كامل لصحة الفم في زيارتك الأولى.' },
    { num: '03', title: 'خطة علاج مخصصة', body: 'يقدم طبيبك خطة واضحة بتكاليف وجداول زمنية — أنت تقرر الوتيرة.' },
    { num: '04', title: 'علاج مريح', body: 'مرافق متطورة وخيارات تخدير وفريق رعاية بجانبك.' },
    { num: '05', title: 'رعاية ما بعد العلاج والمتابعة', body: 'نتابع معك بعد كل إجراء ونجدول متابعات مجانية حسب الحاجة.' },
  ],
}

const TECH = {
  en: [
    { icon: '📡', name: 'Cone-Beam CT (CBCT)', desc: '3D imaging for implants, root canals, and orthodontic planning with 90% less radiation.' },
    { icon: '🦾', name: 'Digital Intraoral Scanner', desc: 'Eliminate messy impressions. We capture perfect digital models in minutes.' },
    { icon: '💡', name: 'Laser Dentistry', desc: 'Minimally invasive gum treatment, cavity detection, and teeth whitening activation.' },
    { icon: '🤖', name: 'AI Diagnostics', desc: 'Artificial intelligence assists our doctors in detecting cavities and bone loss earlier than the naked eye.' },
  ],
  ar: [
    { icon: '📡', name: 'الأشعة المقطعية بالحزمة المخروطية', desc: 'تصوير ثلاثي الأبعاد لزراعة الأسنان والجذور والتقويم بتشعيع أقل بنسبة ٩٠٪.' },
    { icon: '🦾', name: 'الماسح الرقمي داخل الفم', desc: 'تخلّص من البصمات الفوضوية. نلتقط نماذج رقمية مثالية في دقائق.' },
    { icon: '💡', name: 'طب الأسنان بالليزر', desc: 'علاج اللثة بأدنى تدخل، وكشف التسوس، وتنشيط تبييض الأسنان.' },
    { icon: '🤖', name: 'التشخيص بالذكاء الاصطناعي', desc: 'يساعد الذكاء الاصطناعي أطباءنا في اكتشاف التسوس وفقدان العظام قبل العين المجردة.' },
  ],
}

const AWARDS = [
  'Saudi Dental Society — Centre of Excellence 2022–2024',
  'Top 10 Dental Clinics — Middle East Health Awards 2023',
  'Invisalign Diamond Provider',
  'ISO 9001:2015 Certified',
  'CBAHI Healthcare Accreditation',
  'Best Patient Experience — GCC Dental Awards 2023',
]

const TESTIMONIALS = [
  { name: 'Sarah Al-Rashid', nameAr: 'سارة الراشد', text: 'The team at [Clinic Name] transformed my smile completely. I had severe crowding and avoided smiling for years. After Invisalign, I can\'t stop smiling. Professional, caring, and absolutely worth every riyal!', textAr: 'غيّر فريق [اسم العيادة] ابتسامتي كلياً. كنت أعاني من ازدحام شديد وتجنّبت الابتسامة لسنوات. بعد Invisalign، لا أستطيع التوقف عن الابتسامة. محترفون ورعايتهم رائعة وتستحق كل ريال!', rating: 5 },
  { name: 'Mohammed Al-Ghamdi', nameAr: 'محمد الغامدي', text: 'I used to fear the dentist so much I hadn\'t gone in 8 years. The team here made every visit comfortable and stress-free. I had 4 implants done and the whole process was painless. I now bring my whole family here.', textAr: 'كنت أخشى طبيب الأسنان لدرجة أنني لم أذهب لمدة ٨ سنوات. جعل الفريق هنا كل زيارة مريحة وخالية من التوتر. أجريت ٤ زراعات وكانت العملية كلها غير مؤلمة. أحضر الآن عائلتي كلها إلى هنا.', rating: 5 },
  { name: 'Layla Hassan', nameAr: 'ليلى حسن', text: 'Outstanding results on my veneers. Dr. Khalid spent two full sessions just on the smile design before touching a single tooth. The attention to detail is extraordinary. I receive compliments on my smile every single day!', textAr: 'نتائج رائعة على قشور الأسنان. أمضى الدكتور خالد جلستين كاملتين فقط على تصميم الابتسامة قبل لمس أي سن. الاهتمام بالتفاصيل استثنائي. أتلقى الإطراء على ابتسامتي كل يوم!', rating: 5 },
  { name: 'Tariq Al-Otaibi', nameAr: 'طارق العتيبي', text: 'My daughter was terrified of dentists at age 6. Dr. Nora was incredible — she spent 20 minutes just playing and showing her the tools before any exam. My daughter now asks when her next dentist appointment is!', textAr: 'كانت ابنتي خائفة جداً من أطباء الأسنان في سن السادسة. كانت الدكتورة نورة رائعة — أمضت ٢٠ دقيقة تلعب معها وتريها الأدوات قبل أي فحص. ابنتي الآن تسأل متى موعدها القادم!', rating: 5 },
  { name: 'Reem Al-Sayed', nameAr: 'ريم السيد', text: 'I came in for a simple cleaning and left with a complete understanding of my oral health. The digital X-rays and the doctor\'s explanations were eye-opening. The facility is spotless, modern, and genuinely luxurious.', textAr: 'جئت لتنظيف بسيط وغادرت بفهم كامل لصحة فمي. كانت الأشعة الرقمية وشرح الطبيب مثيرة للاهتمام. المرفق نظيف وحديث وفاخر حقاً.', rating: 5 },
  { name: 'Faisal Al-Dossary', nameAr: 'فيصل الدوسري', text: 'Emergency cracked tooth on a Thursday night. I called, and they saw me within the hour. Root canal, crown fitted, zero drama. This is what genuine healthcare looks like. I won\'t go anywhere else.', textAr: 'كسر طارئ في الأسنان ليلة الخميس. اتصلت ورأوني خلال ساعة. علاج قناة جذر وتركيب تاج بدون أي متاعب. هذا ما تبدو عليه الرعاية الصحية الحقيقية. لن أذهب إلى أي مكان آخر.', rating: 5 },
]

export default function Home() {
  const { lang } = useLang()
  const T = t[lang].home
  const [doctors, setDoctors] = useState([])
  const [services, setServices] = useState([])
  useReveal()

  useEffect(() => {
    api.getDoctors().then(d => setDoctors(d || []))
    api.getServices().then(s => setServices((s || []).slice(0, 4)))
  }, [])

  const whyUs = WHY_US[lang]
  const process = PROCESS[lang]
  const tech = TECH[lang]

  const stats = [
    { value: '4.9★', label: T.statsRating },
    { value: '12', label: T.statsDoctors },
    { value: '20+', label: T.statsYears },
    { value: '50k+', label: T.statsPatients },
  ]

  return (
    <>
      <SEO
        title="[Clinic Name] — Dental Excellence"
        description="Award-winning dental clinic offering implants, Invisalign, veneers, whitening, and full family dental care. Book your free consultation today."
        path="/"
        lang={lang}
      />
      <BreadcrumbSchema crumbs={[{ name: 'Home', path: '/' }]} />
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center" style={{ background: 'var(--forest)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 75% 50%, rgba(201,151,58,0.10) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ background: 'rgba(201,151,58,0.18)', color: 'var(--gold)' }}>
              ✦ {lang === 'ar' ? 'مركز طب الأسنان المتميز' : 'Centre of Dental Excellence'}
            </p>
            <h1 className="font-display font-light italic leading-[1.1] mb-6 text-white"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)' }}>
              {T.heroTitle}
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">{T.heroSub}</p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/booking"
                className="px-8 py-3.5 rounded-full font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: 'var(--gold)' }}>
                {T.heroCTA}
              </Link>
              <Link to="/about"
                className="px-8 py-3.5 rounded-full font-medium text-white border border-white/30 hover:bg-white/10 transition-colors">
                {T.heroLearn}
              </Link>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              {['🏆 Award-Winning', '🔬 Laser Dentistry', '😌 Pain-Free Care'].map((b, i) => (
                <span key={i} className="text-xs text-white/50 flex items-center gap-1">{b}</span>
              ))}
            </div>
          </div>
          {/* Hero visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="w-[340px] h-[340px] rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                  <circle cx="90" cy="90" r="75" stroke="rgba(201,151,58,0.2)" strokeWidth="1"/>
                  <circle cx="90" cy="90" r="55" fill="rgba(201,151,58,0.07)"/>
                  <path d="M55 90 C55 65 70 50 90 50 C110 50 125 65 125 90 C125 115 110 130 90 130 C70 130 55 115 55 90Z"
                    fill="rgba(255,255,255,0.08)" />
                  <path d="M65 90 Q90 108 115 90" stroke="var(--gold)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <path d="M72 78 Q90 68 108 78" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              {/* Floating stat cards */}
              {[
                { label: lang === 'ar' ? 'مريض سعيد' : 'Happy Patients', value: '50,000+', pos: 'top-0 -start-16' },
                { label: lang === 'ar' ? 'نجاح العلاج' : 'Success Rate', value: '99.2%', pos: 'bottom-4 -end-12' },
              ].map((c, i) => (
                <div key={i} className={`absolute ${c.pos} rounded-xl px-4 py-3 shadow-xl`}
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}>
                  <p className="text-lg font-bold text-white">{c.value}</p>
                  <p className="text-xs text-white/50">{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 start-0 end-0"
          style={{ background: 'rgba(255,255,255,0.04)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-bold text-2xl text-white">{s.value}</p>
                <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards Strip ── */}
      <div style={{ background: 'var(--gold)', overflow: 'hidden' }}>
        <div className="flex items-center gap-10 py-3 px-6 whitespace-nowrap text-white/90 text-sm font-medium animate-marquee" style={{ animation: 'none' }}>
          {AWARDS.concat(AWARDS).map((a, i) => (
            <span key={i} className="flex items-center gap-3 flex-none">
              <span className="w-1 h-1 rounded-full bg-white/50 flex-none" />
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* ── Services Preview ── */}
      <section className="py-24" style={{ background: 'var(--ivory)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'ar' ? 'ما نقدمه' : 'What We Offer'}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl mb-4" style={{ color: 'var(--forest)' }}>{T.servicesTitle}</h2>
            <p className="max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>{T.servicesSub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {services.map((svc, i) => (
              <div key={svc.id || i}
                className="group rounded-2xl p-6 border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 reveal"
                style={{ background: 'white', borderColor: 'var(--ivory-dark)', transitionDelay: `${i * 0.08}s` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: 'var(--mint)' }}>
                  {svc.icon || '🦷'}
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text)' }}>
                  {svc.name?.[lang] || svc.name?.en || ''}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                  {svc.description?.[lang] || svc.description?.en || ''}
                </p>
                <Link to={`/booking?service=${encodeURIComponent(svc.name?.en || '')}`}
                  className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all"
                  style={{ color: 'var(--gold)' }}>
                  {lang === 'ar' ? 'احجز الآن' : 'Book Now'} →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center reveal">
            <Link to="/services"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 font-semibold transition-all hover:text-white hover:bg-[var(--forest)]"
              style={{ borderColor: 'var(--forest)', color: 'var(--forest)' }}>
              {lang === 'ar' ? 'عرض جميع الخدمات الثمانية' : 'View All 8 Services'} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24" style={{ background: 'var(--mint)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'ar' ? 'لماذا تختارنا' : 'Why Choose Us'}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl mb-4" style={{ color: 'var(--forest)' }}>
              {lang === 'ar' ? 'الفرق الذي تشعر به' : 'The Difference You\'ll Feel'}
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>
              {lang === 'ar'
                ? 'من أول اتصال إلى آخر متابعة، كل شيء مصمّم حولك.'
                : 'From first call to final follow-up, everything is designed around you.'}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <div key={i}
                className="rounded-2xl p-7 border hover:shadow-md transition-shadow reveal"
                style={{ background: 'white', borderColor: 'var(--ivory-dark)', transitionDelay: `${i * 0.07}s` }}>
                <span className="text-3xl block mb-4">{item.icon}</span>
                <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--forest)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before / After ── */}
      <section className="py-24" style={{ background: 'var(--ivory)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'ar' ? 'نتائج حقيقية' : 'Real Results'}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl mb-4" style={{ color: 'var(--forest)' }}>{T.baTitle}</h2>
            <p style={{ color: 'var(--muted)' }}>{T.baSub}</p>
          </div>
          <div className="reveal">
            <BeforeAfterSlider />
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 reveal">
            {[
              { num: '5,000+', label: lang === 'ar' ? 'عملية تحويل ابتسامة' : 'Smile Makeovers' },
              { num: '99.2%', label: lang === 'ar' ? 'رضا المرضى' : 'Patient Satisfaction' },
              { num: '15yr+', label: lang === 'ar' ? 'نتائج دائمة للقشور' : 'Veneer Longevity' },
            ].map((s, i) => (
              <div key={i} className="text-center p-5 rounded-2xl" style={{ background: 'var(--mint)' }}>
                <p className="font-bold text-2xl mb-1" style={{ color: 'var(--forest)' }}>{s.num}</p>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technology ── */}
      <section className="py-24" style={{ background: 'var(--forest)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'ar' ? 'أحدث التقنيات' : 'State-of-the-Art Technology'}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">
              {lang === 'ar' ? 'مجهزون بالأفضل' : 'Equipped With the Best'}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              {lang === 'ar'
                ? 'نستثمر في أحدث المعدات لأن دقة التشخيص وراحتك تستحقان لا شيء أقل من الأفضل.'
                : 'We invest in the latest equipment because diagnostic accuracy and your comfort deserve nothing less.'}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tech.map((item, i) => (
              <div key={i}
                className="rounded-2xl p-6 reveal"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', transitionDelay: `${i * 0.08}s` }}>
                <span className="text-3xl block mb-4">{item.icon}</span>
                <h3 className="font-semibold text-white mb-2">{item.name}</h3>
                <p className="text-sm leading-relaxed text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Patient Journey ── */}
      <section className="py-24" style={{ background: 'var(--ivory)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'ar' ? 'رحلتك معنا' : 'Your Journey With Us'}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl mb-4" style={{ color: 'var(--forest)' }}>
              {lang === 'ar' ? 'كيف نعمل' : 'How It Works'}
            </h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute start-8 top-0 bottom-0 w-px hidden sm:block"
              style={{ background: 'var(--ivory-dark)' }} />
            <div className="flex flex-col gap-8">
              {process.map((step, i) => (
                <div key={i} className="flex gap-6 items-start reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="flex-none w-16 h-16 rounded-full flex items-center justify-center font-bold text-sm relative z-10"
                    style={{ background: 'var(--forest)', color: 'var(--gold)', border: '3px solid var(--ivory)' }}>
                    {step.num}
                  </div>
                  <div className="pt-3">
                    <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--text)' }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Doctors ── */}
      {doctors.length > 0 && (
        <section className="py-24" style={{ background: 'var(--mint)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14 reveal">
              <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold)' }}>
                {lang === 'ar' ? 'فريقنا الطبي' : 'Our Medical Team'}
              </p>
              <h2 className="font-display text-4xl sm:text-5xl mb-4" style={{ color: 'var(--forest)' }}>{T.doctorsTitle}</h2>
              <p className="max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>{T.doctorsSub}</p>
            </div>
            <div className="reveal">
              <DoctorCarousel doctors={doctors} />
            </div>
            <div className="text-center mt-10 reveal">
              <Link to="/about"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 font-semibold transition-all hover:text-white hover:bg-[var(--forest)]"
                style={{ borderColor: 'var(--forest)', color: 'var(--forest)' }}>
                {lang === 'ar' ? 'تعرّف على الفريق الكامل' : 'Meet the Full Team'} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials ── */}
      <section className="py-24" style={{ background: 'var(--ivory)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'ar' ? 'آراء المرضى' : 'Patient Stories'}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl mb-4" style={{ color: 'var(--forest)' }}>{T.testTitle}</h2>
            <p style={{ color: 'var(--muted)' }}>{T.testSub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((item, i) => (
              <div key={i}
                className="rounded-2xl p-7 border hover:shadow-md transition-all reveal"
                style={{ background: 'white', borderColor: 'var(--ivory-dark)', transitionDelay: `${(i % 3) * 0.08}s` }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: item.rating }).map((_, s) => (
                    <svg key={s} width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1.5l1.55 3.14 3.47.5-2.51 2.45.59 3.45L8 9.27l-3.1 1.77.59-3.45L3 5.14l3.47-.5L8 1.5z"
                        fill="var(--gold)" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5 italic" style={{ color: 'var(--muted)' }}>
                  "{lang === 'ar' ? item.textAr : item.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'var(--ivory-dark)' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: 'var(--forest)' }}>
                    {(lang === 'ar' ? item.nameAr : item.name).charAt(0)}
                  </div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                    {lang === 'ar' ? item.nameAr : item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Google rating summary */}
          <div className="mt-12 text-center reveal">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
              style={{ background: 'var(--mint)', border: '1px solid var(--ivory-dark)' }}>
              <div className="flex gap-0.5">
                {Array.from({length:5}).map((_,i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5l1.55 3.14 3.47.5-2.51 2.45.59 3.45L8 9.27l-3.1 1.77.59-3.45L3 5.14l3.47-.5L8 1.5z"
                      fill="var(--gold)" />
                  </svg>
                ))}
              </div>
              <span className="font-bold" style={{ color: 'var(--forest)' }}>4.9 / 5.0</span>
              <span className="text-sm" style={{ color: 'var(--muted)' }}>
                {lang === 'ar' ? 'بناءً على ١٢٠٠+ تقييم' : 'Based on 1,200+ reviews'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Emergency Banner ── */}
      <div className="py-5" style={{ background: '#c0392b' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚨</span>
            <div>
              <p className="font-semibold text-white">
                {lang === 'ar' ? 'طوارئ الأسنان؟ متاحون ٢٤/٧' : 'Dental Emergency? We\'re Available 24/7'}
              </p>
              <p className="text-white/70 text-sm">
                {lang === 'ar' ? 'ألم شديد، كسر، أو ضياع تاج — اتصل بنا فوراً.' : 'Severe pain, broken tooth, or lost crown — call us immediately.'}
              </p>
            </div>
          </div>
          <a href="tel:+966500000000"
            className="px-6 py-2.5 rounded-full font-bold text-sm bg-white flex-none"
            style={{ color: '#c0392b' }}>
            {lang === 'ar' ? 'اتصل الآن' : 'Call Now: +966 50 000 0000'}
          </a>
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="py-24" style={{ background: 'var(--forest)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center reveal">
          <p className="text-xs uppercase tracking-[0.15em] mb-4" style={{ color: 'var(--gold)' }}>
            {lang === 'ar' ? 'ابدأ رحلتك' : 'Start Your Journey'}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-white mb-5">{T.ctaTitle}</h2>
          <p className="text-white/70 mb-10 text-lg">{T.ctaSub}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking"
              className="px-10 py-4 rounded-full font-semibold text-white text-lg"
              style={{ background: 'var(--gold)' }}>
              {T.ctaBtn}
            </Link>
            <a href="https://wa.me/966500000000"
              className="px-10 py-4 rounded-full font-medium text-white border border-white/30 hover:bg-white/10 transition-colors text-lg">
              {T.ctaWhatsApp}
            </a>
          </div>
          <p className="mt-6 text-white/40 text-sm">
            {lang === 'ar' ? 'رد مضمون خلال ٢ ساعة · تسعير شفاف · بدون رسوم خفية' : 'Response guaranteed within 2 hours · Transparent pricing · No hidden fees'}
          </p>
        </div>
      </section>
    </>
  )
}
