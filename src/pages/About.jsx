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

const MILESTONES = {
  en: [
    { year: '2004', title: 'Founded', body: '[Clinic Name] opened its doors with a single treatment room and a big vision.' },
    { year: '2008', title: 'First Expansion', body: 'We grew to 6 treatment rooms and introduced digital X-ray technology.' },
    { year: '2012', title: 'Implant Centre Launched', body: 'A dedicated oral-surgery suite opened, making us a full implant centre.' },
    { year: '2016', title: 'Invisalign Diamond Provider', body: 'Achieved Diamond status — placing us in the top 1% of Invisalign providers in the region.' },
    { year: '2019', title: 'Laser Dentistry Unit', body: 'Invested in full-suite laser technology for minimally invasive treatments across all disciplines.' },
    { year: '2022', title: 'Centre of Excellence Award', body: 'Saudi Dental Society recognised us as a Centre of Excellence — an honour we\'ve held every year since.' },
    { year: '2024', title: 'AI Diagnostics Integration', body: 'Became one of the first clinics in the region to integrate AI-assisted diagnostics into daily practice.' },
  ],
  ar: [
    { year: '٢٠٠٤', title: 'التأسيس', body: 'فتحت [اسم العيادة] أبوابها بغرفة علاج واحدة ورؤية كبيرة.' },
    { year: '٢٠٠٨', title: 'أول توسع', body: 'نمونا إلى ٦ غرف علاج وأدخلنا تقنية الأشعة السينية الرقمية.' },
    { year: '٢٠١٢', title: 'إطلاق مركز زراعة الأسنان', body: 'افتُتح جناح مخصص لجراحة الفم، مما جعلنا مركزاً متكاملاً لزراعة الأسنان.' },
    { year: '٢٠١٦', title: 'مزوّد ألماس Invisalign', body: 'حققنا مستوى الألماس — مما يضعنا في أفضل ١٪ من مزودي Invisalign في المنطقة.' },
    { year: '٢٠١٩', title: 'وحدة طب الأسنان بالليزر', body: 'استثمرنا في تقنية الليزر المتكاملة للعلاجات الأقل تدخلاً في جميع التخصصات.' },
    { year: '٢٠٢٢', title: 'جائزة مركز التميز', body: 'اعترفت الجمعية السعودية لطب الأسنان بنا كمركز تميّز — وهو شرف نحتفظ به كل عام منذ ذلك الحين.' },
    { year: '٢٠٢٤', title: 'دمج التشخيص بالذكاء الاصطناعي', body: 'أصبحنا من أوائل العيادات في المنطقة التي تدمج التشخيص بمساعدة الذكاء الاصطناعي في الممارسة اليومية.' },
  ],
}

const ACCREDITATIONS = [
  { name: 'Saudi Dental Society', icon: '🏅', detail: 'Centre of Excellence 2022–2024' },
  { name: 'ISO 9001:2015', icon: '📋', detail: 'Quality Management Certified' },
  { name: 'CBAHI', icon: '🏥', detail: 'Healthcare Accreditation' },
  { name: 'Invisalign Diamond', icon: '💎', detail: 'Top 1% Provider in Region' },
  { name: 'GCC Dental Awards', icon: '🏆', detail: 'Best Patient Experience 2023' },
  { name: 'Ministry of Health', icon: '✅', detail: 'Licensed & Fully Compliant' },
]

const CLINIC_FEATURES = {
  en: [
    { icon: '🛋️', title: 'Luxury Waiting Lounge', body: 'A calm, beautifully designed space with refreshments, iPads for children, and live ambient music.' },
    { icon: '🎧', title: 'In-Chair Entertainment', body: 'Noise-cancelling headphones and personal screens in every treatment chair — your choice of film or music.' },
    { icon: '🌡️', title: 'Climate-Controlled Suites', body: 'Individual climate control in every room. We know exactly the right temperature for your comfort.' },
    { icon: '🔒', title: 'Sterilisation Protocol', body: 'Hospital-grade autoclave sterilisation, barrier protection, and real-time air purification systems.' },
    { icon: '🅿️', title: 'Free Valet Parking', body: 'Complimentary valet service available from 9 AM to 9 PM at the main entrance.' },
    { icon: '♿', title: 'Fully Accessible', body: 'Step-free access throughout, elevator access, and specially equipped treatment rooms for patients with disabilities.' },
  ],
  ar: [
    { icon: '🛋️', title: 'صالة انتظار فاخرة', body: 'مساحة هادئة ومصممة بجمال مع مشروبات وأجهزة iPad للأطفال وموسيقى محيطية حية.' },
    { icon: '🎧', title: 'ترفيه أثناء العلاج', body: 'سماعات عازلة للضوضاء وشاشات شخصية في كل كرسي علاج — اختيارك للفيلم أو الموسيقى.' },
    { icon: '🌡️', title: 'أجنحة بتحكم مناخي', body: 'تحكم مناخي فردي في كل غرفة. نعرف بالضبط درجة الحرارة المناسبة لراحتك.' },
    { icon: '🔒', title: 'بروتوكول التعقيم', body: 'تعقيم بالأوتوكلاف بمستوى المستشفى، وحماية الحواجز، وأنظمة تنقية الهواء في الوقت الفعلي.' },
    { icon: '🅿️', title: 'خدمة صف سيارات مجانية', body: 'خدمة صف سيارات مجانية من الساعة ٩ صباحاً حتى ٩ مساءً عند المدخل الرئيسي.' },
    { icon: '♿', title: 'متاح بالكامل', body: 'وصول بدون درجات في جميع أنحاء المبنى، ومصعد، وغرف علاج مجهزة خصيصاً لذوي الاحتياجات الخاصة.' },
  ],
}

export default function About() {
  const { lang } = useLang()
  const T = t[lang].about
  const [doctors, setDoctors] = useState([])
  useReveal()

  useEffect(() => {
    api.getDoctors().then(d => setDoctors(d || []))
    document.title = `${T.pageTitle} | [Clinic Name]`
  }, [lang])

  const milestones = MILESTONES[lang]
  const features = CLINIC_FEATURES[lang]

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about [Clinic Name]'s 20-year history, our internationally trained specialist doctors, awards, and our commitment to patient-centred dental care."
        path="/about"
        lang={lang}
      />
      <BreadcrumbSchema crumbs={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]} />
      {/* ── Page Header ── */}
      <section className="pt-32 pb-20" style={{ background: 'var(--forest)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-[0.15em] mb-4" style={{ color: 'var(--gold)' }}>
            {lang === 'ar' ? 'قصتنا' : 'Our Story'}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-light italic text-white mb-5">{T.pageTitle}</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">{T.pageDesc}</p>
        </div>
      </section>

      {/* ── Quick stats ── */}
      <div style={{ background: 'var(--gold)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: '20+', label: lang === 'ar' ? 'عاماً من التميز' : 'Years of Excellence' },
            { value: '12', label: lang === 'ar' ? 'طبيب متخصص' : 'Specialist Doctors' },
            { value: '50k+', label: lang === 'ar' ? 'مريض تمت رعايته' : 'Patients Treated' },
            { value: '6', label: lang === 'ar' ? 'اعتمادات وجوائز' : 'Accreditations & Awards' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-bold text-2xl text-white">{s.value}</p>
              <p className="text-white/80 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Story ── */}
      <section className="py-24" style={{ background: 'var(--ivory)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <p className="text-xs uppercase tracking-[0.15em] mb-4" style={{ color: 'var(--gold)' }}>
              {lang === 'ar' ? 'كيف بدأنا' : 'How We Started'}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl mb-6" style={{ color: 'var(--forest)' }}>{T.storyTitle}</h2>
            <p className="leading-relaxed mb-5 text-base" style={{ color: 'var(--muted)' }}>{T.storyP1}</p>
            <p className="leading-relaxed mb-8 text-base" style={{ color: 'var(--muted)' }}>{T.storyP2}</p>
            <p className="leading-relaxed mb-8 text-base" style={{ color: 'var(--muted)' }}>
              {lang === 'ar'
                ? 'اليوم، يضم [اسم العيادة] أكثر من ١٢ طبيباً متخصصاً، وأحدث التقنيات، وعيادة فاخرة مصممة لجعل كل زيارة تجربة لا تُنسى. رعينا أكثر من ٥٠٠٠٠ مريض ونفخر بكوننا وجهة طب الأسنان المفضلة للعائلات في المنطقة.'
                : 'Today, [Clinic Name] houses more than 12 specialist doctors, the latest technology, and a luxury clinic designed to make every visit an experience to remember. We have cared for over 50,000 patients and are proud to be the region\'s favourite family dental destination.'}
            </p>
            <Link to="/booking"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-white"
              style={{ background: 'var(--gold)' }}>
              {lang === 'ar' ? 'احجز استشارتك' : 'Book a Consultation'}
            </Link>
          </div>
          <div className="reveal grid grid-cols-2 gap-4">
            {[
              { bg: 'var(--mint)', label: lang === 'ar' ? 'غرف علاج حديثة' : 'Modern Treatment Rooms', icon: '🏥' },
              { bg: 'var(--forest)', label: lang === 'ar' ? 'أطباء متخصصون' : 'Specialist Doctors', icon: '👨‍⚕️', light: true },
              { bg: 'var(--forest)', label: lang === 'ar' ? 'تقنية متطورة' : 'Advanced Technology', icon: '🔬', light: true },
              { bg: 'var(--mint)', label: lang === 'ar' ? 'رعاية شاملة' : 'Comprehensive Care', icon: '❤️' },
            ].map((c, i) => (
              <div key={i} className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-3 p-6 text-center"
                style={{ background: c.bg }}>
                <span className="text-4xl">{c.icon}</span>
                <p className="text-sm font-medium" style={{ color: c.light ? 'white' : 'var(--text)' }}>{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24" style={{ background: 'var(--mint)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'ar' ? 'ما يقودنا' : 'What Drives Us'}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl" style={{ color: 'var(--forest)' }}>{T.valuesTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {T.values.map((v, i) => (
              <div key={i}
                className="rounded-2xl p-8 border hover:shadow-md transition-shadow reveal"
                style={{ background: 'white', borderColor: 'var(--ivory-dark)', transitionDelay: `${i * 0.07}s` }}>
                <span className="text-4xl block mb-5">{v.icon}</span>
                <h3 className="font-semibold text-xl mb-3" style={{ color: 'var(--forest)' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24" style={{ background: 'var(--ivory)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'ar' ? 'تاريخنا' : 'Our History'}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl" style={{ color: 'var(--forest)' }}>
              {lang === 'ar' ? 'عشرون عاماً من التميز' : 'Twenty Years of Excellence'}
            </h2>
          </div>
          <div className="relative">
            <div className="absolute start-[72px] top-0 bottom-0 w-px"
              style={{ background: 'var(--ivory-dark)' }} />
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-8 mb-10 reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="flex-none text-end" style={{ width: 64 }}>
                  <span className="font-bold text-sm" style={{ color: 'var(--gold)' }}>{m.year}</span>
                </div>
                <div className="flex-none w-4 h-4 rounded-full mt-1 relative z-10"
                  style={{ background: 'var(--forest)', border: '3px solid var(--ivory)', marginTop: 2 }} />
                <div className="pb-2">
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--text)' }}>{m.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clinic Experience ── */}
      <section className="py-24" style={{ background: 'var(--forest)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'ar' ? 'تجربة العيادة' : 'The Clinic Experience'}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">
              {lang === 'ar' ? 'مصمّم لراحتك' : 'Designed Around Your Comfort'}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              {lang === 'ar'
                ? 'نؤمن بأن بيئة العيادة لها دور كبير في تجربة علاجك. إليك ما يجعلنا مختلفين.'
                : 'We believe the clinic environment plays a huge role in your treatment experience. Here\'s what makes us different.'}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i}
                className="rounded-2xl p-7 reveal"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', transitionDelay: `${i * 0.07}s` }}>
                <span className="text-3xl block mb-4">{f.icon}</span>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accreditations ── */}
      <section className="py-24" style={{ background: 'var(--mint)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'ar' ? 'اعتمادات وجوائز' : 'Accreditations & Awards'}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl" style={{ color: 'var(--forest)' }}>
              {lang === 'ar' ? 'معترف بنا عالمياً' : 'Globally Recognised'}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACCREDITATIONS.map((a, i) => (
              <div key={i}
                className="flex items-center gap-5 rounded-2xl p-6 border reveal"
                style={{ background: 'white', borderColor: 'var(--ivory-dark)', transitionDelay: `${i * 0.07}s` }}>
                <span className="text-3xl flex-none">{a.icon}</span>
                <div>
                  <p className="font-semibold" style={{ color: 'var(--text)' }}>{a.name}</p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>{a.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24" style={{ background: 'var(--ivory)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--gold)' }}>
              {lang === 'ar' ? 'تعرّف عليهم' : 'Meet Them'}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl mb-4" style={{ color: 'var(--forest)' }}>{T.teamTitle}</h2>
            <p style={{ color: 'var(--muted)' }}>{T.teamSub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doc, i) => (
              <div key={doc.id || i}
                className="rounded-2xl overflow-hidden border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 reveal"
                style={{ background: 'white', borderColor: 'var(--ivory-dark)', transitionDelay: `${(i % 3) * 0.07}s` }}>
                <div className="w-full flex items-center justify-center relative overflow-hidden"
                  style={{ height: 240, background: 'var(--mint)' }}>
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="36" r="24" fill="var(--forest-light)" opacity="0.25"/>
                    <ellipse cx="50" cy="85" rx="34" ry="22" fill="var(--forest-light)" opacity="0.15"/>
                  </svg>
                  <div className="absolute bottom-0 start-0 end-0 h-1" style={{ background: 'var(--gold)' }} />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color: 'var(--gold)' }}>
                    {doc.specialty?.[lang] || doc.specialty?.en || ''}
                  </p>
                  <h3 className="font-semibold text-xl mb-1" style={{ color: 'var(--text)' }}>
                    {doc.name?.[lang] || doc.name?.en || ''}
                  </h3>
                  <p className="text-sm mb-1" style={{ color: 'var(--muted)' }}>
                    {doc.credentials?.[lang] || doc.credentials?.en || ''}
                  </p>
                  <p className="text-xs font-medium mb-4 px-2 py-1 rounded-full inline-block"
                    style={{ background: 'var(--mint)', color: 'var(--forest)' }}>
                    {doc.years?.[lang] || doc.years?.en || ''}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {doc.bio?.[lang] || doc.bio?.en || ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: 'var(--forest)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center reveal">
          <h2 className="font-display text-4xl text-white mb-5">
            {lang === 'ar' ? 'مستعد لتجربة الفرق؟' : 'Ready to Experience the Difference?'}
          </h2>
          <p className="text-white/60 mb-8">
            {lang === 'ar' ? 'احجز استشارة مجانية اليوم وتعرّف على ما يمكننا فعله لابتسامتك.' : 'Book a free consultation today and discover what we can do for your smile.'}
          </p>
          <Link to="/booking"
            className="inline-block px-10 py-4 rounded-full font-semibold text-white text-lg"
            style={{ background: 'var(--gold)' }}>
            {lang === 'ar' ? 'احجز استشارة مجانية' : 'Book a Free Consultation'}
          </Link>
        </div>
      </section>
    </>
  )
}
