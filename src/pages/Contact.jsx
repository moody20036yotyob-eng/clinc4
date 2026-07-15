import { useEffect, useState } from 'react'
import { useLang } from '../context/LanguageContext'
import t from '../i18n/translations'
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

const HOURS = {
  en: [
    { day: 'Saturday', time: '9:00 AM – 9:00 PM', open: true },
    { day: 'Sunday', time: '9:00 AM – 9:00 PM', open: true },
    { day: 'Monday', time: '9:00 AM – 9:00 PM', open: true },
    { day: 'Tuesday', time: '9:00 AM – 9:00 PM', open: true },
    { day: 'Wednesday', time: '9:00 AM – 9:00 PM', open: true },
    { day: 'Thursday', time: '9:00 AM – 6:00 PM', open: true },
    { day: 'Friday', time: 'Closed', open: false },
  ],
  ar: [
    { day: 'السبت', time: '٩:٠٠ ص – ٩:٠٠ م', open: true },
    { day: 'الأحد', time: '٩:٠٠ ص – ٩:٠٠ م', open: true },
    { day: 'الاثنين', time: '٩:٠٠ ص – ٩:٠٠ م', open: true },
    { day: 'الثلاثاء', time: '٩:٠٠ ص – ٩:٠٠ م', open: true },
    { day: 'الأربعاء', time: '٩:٠٠ ص – ٩:٠٠ م', open: true },
    { day: 'الخميس', time: '٩:٠٠ ص – ٦:٠٠ م', open: true },
    { day: 'الجمعة', time: 'مغلق', open: false },
  ],
}

const CONTACT_CHANNELS = {
  en: [
    { icon: '📞', label: 'Phone', value: '+966 50 000 0000', href: 'tel:+966500000000', sub: 'Mon–Thu: 9 AM – 9 PM' },
    { icon: '💬', label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/966500000000', sub: 'Fastest response' },
    { icon: '✉️', label: 'Email', value: 'hello@clinicdemo.com', href: 'mailto:hello@clinicdemo.com', sub: 'Reply within 4 hours' },
    { icon: '🚨', label: 'Emergency Line', value: '+966 50 999 9999', href: 'tel:+966509999999', sub: 'Available 24/7' },
  ],
  ar: [
    { icon: '📞', label: 'الهاتف', value: '٠٠٩٦٦٥٠٠٠٠٠٠٠٠', href: 'tel:+966500000000', sub: 'السبت–الخميس: ٩ص–٩م' },
    { icon: '💬', label: 'واتساب', value: 'تحدث معنا', href: 'https://wa.me/966500000000', sub: 'أسرع رد' },
    { icon: '✉️', label: 'البريد', value: 'hello@clinicdemo.com', href: 'mailto:hello@clinicdemo.com', sub: 'رد خلال ٤ ساعات' },
    { icon: '🚨', label: 'خط الطوارئ', value: '٠٠٩٦٦٥٠٩٩٩٩٩٩٩', href: 'tel:+966509999999', sub: 'متاح ٢٤/٧' },
  ],
}

const FAQ_TEASER = {
  en: [
    { q: 'Do you accept walk-ins?', a: 'We welcome walk-ins during off-peak hours, but we recommend booking to guarantee your preferred time slot.' },
    { q: 'Is parking free?', a: 'Yes — complimentary valet parking is available at the main entrance daily from 9 AM to 9 PM.' },
    { q: 'Do you see children?', a: 'Absolutely. Our paediatric specialist Dr. Nora Al-Shehri sees patients from age 1 upward.' },
  ],
  ar: [
    { q: 'هل تقبلون الزوار بدون حجز مسبق؟', a: 'نرحب بالزوار في أوقات الهدوء، لكننا نوصي بالحجز المسبق لضمان الوقت المفضل لك.' },
    { q: 'هل التوقف مجاني؟', a: 'نعم — خدمة صف السيارات المجانية متاحة عند المدخل الرئيسي يومياً من الساعة ٩ صباحاً حتى ٩ مساءً.' },
    { q: 'هل تعالجون الأطفال؟', a: 'بالتأكيد. أخصائية طب الأسنان للأطفال، الدكتورة نورة الشهري، تستقبل المرضى من سن عام واحد فما فوق.' },
  ],
}

export default function Contact() {
  const { lang } = useLang()
  const T = t[lang].contact
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  useReveal()

  useEffect(() => {
    document.title = `${T.pageTitle} | [Clinic Name]`
  }, [lang])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const handleSubmit = (e) => { e.preventDefault(); setSent(true) }

  const channels = CONTACT_CHANNELS[lang]
  const hours = HOURS[lang]
  const faqTeaser = FAQ_TEASER[lang]

  // Determine today's day index (0=Sun, 6=Sat) mapped to our array
  const todayMap = [6, 0, 1, 2, 3, 4, 5] // Sun→index6(Fri), Mon→1, etc. Riyadh week starts Sat
  const todayIdx = new Date().getDay()

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with [Clinic Name]. Visit us at 123 Health Street, Riyadh, call +966 50 000 0000, or use our contact form. Emergency line available 24/7."
        path="/contact"
        lang={lang}
      />
      <BreadcrumbSchema crumbs={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]} />
      {/* ── Emergency Banner ── */}
      <div className="pt-16" style={{ background: '#c0392b' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-white text-sm font-medium">
            🚨 {lang === 'ar' ? 'طوارئ الأسنان؟ خط طوارئنا متاح ٢٤ ساعة يومياً ٧ أيام.' : 'Dental emergency? Our emergency line is open 24 hours, 7 days a week.'}
          </p>
          <a href="tel:+966509999999"
            className="text-white font-bold text-sm underline underline-offset-2">
            {lang === 'ar' ? '+٩٦٦ ٥٠ ٩٩٩ ٩٩٩٩' : '+966 50 999 9999'}
          </a>
        </div>
      </div>

      {/* ── Header ── */}
      <section className="pt-12 pb-20" style={{ background: 'var(--forest)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-[0.15em] mb-4" style={{ color: 'var(--gold)' }}>
            {lang === 'ar' ? 'نحن هنا لمساعدتك' : 'We\'re Here to Help'}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-light italic text-white mb-5">{T.pageTitle}</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">{T.pageDesc}</p>
        </div>
      </section>

      {/* ── Contact channels ── */}
      <section className="py-16" style={{ background: 'var(--ivory)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal">
            {channels.map((c, i) => (
              <a key={i} href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="rounded-2xl p-6 border flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all"
                style={{ background: 'white', borderColor: 'var(--ivory-dark)' }}>
                <span className="text-3xl">{c.icon}</span>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--gold)' }}>{c.label}</p>
                  <p className="font-semibold" style={{ color: 'var(--text)' }}>{c.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{c.sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="py-16" style={{ background: 'var(--mint)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12">

          {/* Left: info + map + hours */}
          <div>
            {/* Address */}
            <div className="rounded-2xl border p-7 mb-6 reveal"
              style={{ background: 'white', borderColor: 'var(--ivory-dark)' }}>
              <h2 className="font-semibold text-lg mb-5" style={{ color: 'var(--forest)' }}>{T.infoTitle}</h2>
              <div className="flex flex-col gap-4">
                {[
                  { icon: '📍', label: lang === 'ar' ? 'العنوان' : 'Address', value: T.address },
                  { icon: '📞', label: lang === 'ar' ? 'الهاتف' : 'Phone', value: T.phone, href: `tel:${T.phone}` },
                  { icon: '✉️', label: lang === 'ar' ? 'البريد' : 'Email', value: T.email, href: `mailto:${T.email}` },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-none"
                      style={{ background: 'var(--mint)' }}>
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'var(--gold)' }}>{item.label}</p>
                      {item.href
                        ? <a href={item.href} className="hover:underline font-medium" style={{ color: 'var(--text)' }}>{item.value}</a>
                        : <p className="font-medium" style={{ color: 'var(--text)' }}>{item.value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden mb-6 reveal"
              style={{ height: 240, background: 'var(--ivory-dark)', border: '1px solid var(--ivory-dark)' }}>
              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                  <path d="M26 4C17.163 4 10 11.163 10 20C10 32 26 48 26 48C26 48 42 32 42 20C42 11.163 34.837 4 26 4Z"
                    fill="var(--forest-light)" opacity="0.3"/>
                  <circle cx="26" cy="20" r="6" fill="var(--forest-light)" opacity="0.7"/>
                </svg>
                <p className="font-medium" style={{ color: 'var(--muted)' }}>{T.mapTitle}</p>
                <p className="text-xs text-center px-10" style={{ color: 'var(--muted)' }}>
                  {lang === 'ar' ? 'استبدل هذا المقطع بـ iframe خريطة Google الخاص بك' : 'Replace this block with your Google Maps iframe embed'}
                </p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                  className="text-xs px-4 py-1.5 rounded-full border font-medium"
                  style={{ borderColor: 'var(--forest-light)', color: 'var(--forest)' }}>
                  {lang === 'ar' ? 'افتح في الخرائط' : 'Open in Maps'}
                </a>
              </div>
            </div>

            {/* Opening hours */}
            <div className="rounded-2xl border p-7 reveal"
              style={{ background: 'white', borderColor: 'var(--ivory-dark)' }}>
              <h3 className="font-semibold text-lg mb-4" style={{ color: 'var(--forest)' }}>{T.hoursLabel}</h3>
              {hours.map((h, i) => (
                <div key={i}
                  className="flex justify-between items-center py-2.5 border-b"
                  style={{ borderColor: 'var(--ivory-dark)', opacity: h.open ? 1 : 0.5 }}>
                  <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{h.day}</span>
                  <span className="text-sm" style={{ color: h.open ? 'var(--forest)' : 'var(--muted)' }}>
                    {h.time}
                  </span>
                </div>
              ))}
              <p className="text-xs mt-4 p-3 rounded-xl" style={{ background: 'var(--mint)', color: 'var(--muted)' }}>
                {lang === 'ar'
                  ? '🚨 خط الطوارئ متاح ٢٤/٧ حتى في أيام العطل.'
                  : '🚨 Emergency line available 24/7, including public holidays.'}
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <div className="rounded-2xl border p-8 reveal"
              style={{ background: 'white', borderColor: 'var(--ivory-dark)' }}>
              <h2 className="font-display text-3xl mb-2" style={{ color: 'var(--forest)' }}>{T.formTitle}</h2>
              <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>
                {lang === 'ar' ? 'سنرد عليك خلال ساعتين في أوقات العمل.' : 'We\'ll respond within 2 hours during business hours.'}
              </p>

              {sent ? (
                <div className="rounded-2xl p-10 text-center" style={{ background: 'var(--mint)' }}>
                  <div className="text-5xl mb-4">✅</div>
                  <p className="font-semibold text-lg mb-2" style={{ color: 'var(--forest)' }}>{T.successMsg}</p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    {lang === 'ar' ? 'سنتواصل معك قريباً على البريد الإلكتروني أو رقم الهاتف الذي قدّمته.' : 'We\'ll reach out soon at the email or phone number you provided.'}
                  </p>
                  <button onClick={() => setSent(false)}
                    className="mt-6 text-sm underline" style={{ color: 'var(--muted)' }}>
                    {lang === 'ar' ? 'أرسل رسالة أخرى' : 'Send another message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>
                        {T.nameLabel} *
                      </label>
                      <input type="text" required value={form.name}
                        onChange={e => set('name', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border outline-none focus:border-[var(--forest-light)] transition-colors"
                        style={{ borderColor: 'var(--ivory-dark)' }} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>
                        {T.phoneLabel}
                      </label>
                      <input type="tel" value={form.phone}
                        onChange={e => set('phone', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border outline-none focus:border-[var(--forest-light)] transition-colors"
                        style={{ borderColor: 'var(--ivory-dark)' }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>
                      {T.emailLabel} *
                    </label>
                    <input type="email" required value={form.email}
                      onChange={e => set('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border outline-none transition-colors"
                      style={{ borderColor: 'var(--ivory-dark)' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>
                      {T.subjectLabel}
                    </label>
                    <select value={form.subject} onChange={e => set('subject', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border outline-none"
                      style={{ borderColor: 'var(--ivory-dark)' }}>
                      <option value="">{lang === 'ar' ? 'اختر موضوعاً…' : 'Select a subject…'}</option>
                      {(lang === 'ar'
                        ? ['حجز موعد', 'استفسار عن الأسعار', 'طوارئ', 'شكوى', 'أخرى']
                        : ['Book an Appointment', 'Pricing Enquiry', 'Emergency', 'Complaint', 'Other']
                      ).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>
                      {T.messageLabel} *
                    </label>
                    <textarea required rows={5} value={form.message}
                      onChange={e => set('message', e.target.value)}
                      placeholder={lang === 'ar' ? 'أخبرنا كيف يمكننا مساعدتك…' : 'Tell us how we can help…'}
                      className="w-full px-4 py-3 rounded-xl border outline-none resize-none transition-colors"
                      style={{ borderColor: 'var(--ivory-dark)' }} />
                  </div>
                  <button type="submit"
                    className="w-full py-3.5 rounded-full font-semibold text-white text-base"
                    style={{ background: 'var(--gold)' }}>
                    {T.sendBtn}
                  </button>
                  <p className="text-xs text-center" style={{ color: 'var(--muted)' }}>
                    {lang === 'ar'
                      ? '🔒 معلوماتك محفوظة وخاصة تماماً.'
                      : '🔒 Your information is completely private and secure.'}
                  </p>
                </form>
              )}
            </div>

            {/* Mini FAQ */}
            <div className="mt-6 rounded-2xl border p-7 reveal"
              style={{ background: 'white', borderColor: 'var(--ivory-dark)' }}>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--forest)' }}>
                {lang === 'ar' ? 'أسئلة شائعة عن الزيارة' : 'Common Visit Questions'}
              </h3>
              {faqTeaser.map((faq, i) => (
                <div key={i} className="border-b" style={{ borderColor: 'var(--ivory-dark)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex items-center justify-between w-full py-4 text-start gap-4">
                    <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{faq.q}</span>
                    <span className="flex-none text-lg leading-none" style={{ color: 'var(--muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>⌄</span>
                  </button>
                  {openFaq === i && (
                    <p className="pb-4 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Social / Final CTA ── */}
      <section className="py-16" style={{ background: 'var(--forest)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-3xl text-white mb-2">
              {lang === 'ar' ? 'تابعنا على وسائل التواصل' : 'Follow Us on Social Media'}
            </h2>
            <p className="text-white/60 text-sm">
              {lang === 'ar'
                ? 'نشارك نصائح الأسنان وتحولات الابتسامة والعروض الحصرية.'
                : 'We share dental tips, smile transformations, and exclusive offers.'}
            </p>
          </div>
          <div className="flex gap-3">
            {[
              { label: 'Instagram', icon: '📸', href: '#' },
              { label: 'Snapchat', icon: '👻', href: '#' },
              { label: 'TikTok', icon: '🎵', href: '#' },
              { label: 'X (Twitter)', icon: '𝕏', href: '#' },
            ].map((s, i) => (
              <a key={i} href={s.href}
                className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl text-center"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span className="text-xl">{s.icon}</span>
                <span className="text-xs text-white/60">{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
