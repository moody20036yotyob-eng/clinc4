import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import SEO from '../components/SEO'
import { BreadcrumbSchema } from '../components/StructuredData'
import t from '../i18n/translations'
import { api } from '../lib/api'

const REASSURANCES = {
  en: [
    { icon: '🆓', text: 'Free consultation for new patients' },
    { icon: '⏱️', text: 'Confirmation within 2 hours' },
    { icon: '🔄', text: 'Free rescheduling up to 24 hrs before' },
    { icon: '😌', text: 'Sedation options available on request' },
    { icon: '💳', text: '0% instalment plans available' },
    { icon: '🚨', text: 'Same-day emergency slots reserved daily' },
  ],
  ar: [
    { icon: '🆓', text: 'استشارة مجانية للمرضى الجدد' },
    { icon: '⏱️', text: 'تأكيد خلال ساعتين' },
    { icon: '🔄', text: 'إعادة جدولة مجانية حتى ٢٤ ساعة قبل الموعد' },
    { icon: '😌', text: 'خيارات التخدير متاحة عند الطلب' },
    { icon: '💳', text: 'خطط تقسيط بفائدة صفر' },
    { icon: '🚨', text: 'خانات طوارئ في نفس اليوم محجوزة يومياً' },
  ],
}

const TIMES = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00']

export default function Booking() {
  const { lang } = useLang()
  const T = t[lang].booking
  const [params] = useSearchParams()
  const [step, setStep] = useState(1)
  const [services, setServices] = useState([])
  const [form, setForm] = useState({
    service: params.get('service') || '',
    name: '', phone: '', email: '',
    date: '', time: '', notes: '',
  })

  useEffect(() => {
    api.getServices().then(s => setServices(s || []))
    document.title = `${T.pageTitle} | [Clinic Name]`
  }, [lang])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const whatsappUrl = () => {
    const msg = `${T.whatsappMsg}${form.service}.\n${lang === 'ar' ? 'الاسم' : 'Name'}: ${form.name}\n${lang === 'ar' ? 'الهاتف' : 'Phone'}: ${form.phone}\n${lang === 'ar' ? 'التاريخ' : 'Date'}: ${form.date} ${form.time}`
    return `https://wa.me/966500000000?text=${encodeURIComponent(msg)}`
  }

  const steps = [T.step1, T.step2, T.step3]
  const reassurances = REASSURANCES[lang]

  return (
    <>
      <SEO
        title="Book an Appointment"
        description="Book your dental appointment online in 3 easy steps. Same-day emergency slots available. Free consultation for new patients."
        path="/booking"
        lang={lang}
      />
      <BreadcrumbSchema crumbs={[{ name: 'Home', path: '/' }, { name: 'Book Appointment', path: '/booking' }]} />
      {/* ── Header ── */}
      <section className="pt-32 pb-20" style={{ background: 'var(--forest)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-[0.15em] mb-4" style={{ color: 'var(--gold)' }}>
            {lang === 'ar' ? 'سريع وسهل' : 'Quick & Easy'}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-light italic text-white mb-5">{T.pageTitle}</h1>
          <p className="text-white/60 text-lg">{T.pageDesc}</p>
        </div>
      </section>

      <section className="py-16" style={{ background: 'var(--ivory)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── Wizard ── */}
            <div className="lg:col-span-2">

              {/* Step indicator */}
              <div className="flex items-center mb-10">
                {steps.map((s, i) => (
                  <div key={i} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all"
                        style={{
                          background: step > i + 1 ? 'var(--gold)' : step === i + 1 ? 'var(--forest)' : 'var(--ivory-dark)',
                          color: step >= i + 1 ? 'white' : 'var(--muted)',
                          boxShadow: step === i + 1 ? '0 0 0 4px rgba(26,60,46,0.15)' : 'none',
                        }}>
                        {step > i + 1 ? '✓' : i + 1}
                      </div>
                      <p className="text-xs mt-2 text-center hidden sm:block"
                        style={{ color: step === i + 1 ? 'var(--forest)' : 'var(--muted)', fontWeight: step === i + 1 ? 600 : 400 }}>
                        {s}
                      </p>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="flex-1 h-0.5 mx-3 transition-colors duration-500"
                        style={{ background: step > i + 1 ? 'var(--gold)' : 'var(--ivory-dark)' }} />
                    )}
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border p-8 sm:p-10"
                style={{ background: 'white', borderColor: 'var(--ivory-dark)' }}>

                {/* Step 1 — Choose service */}
                {step === 1 && (
                  <div>
                    <h2 className="font-semibold text-2xl mb-2" style={{ color: 'var(--forest)' }}>{T.selectService}</h2>
                    <p className="text-sm mb-7" style={{ color: 'var(--muted)' }}>
                      {lang === 'ar' ? 'اختر الخدمة المناسبة لك من القائمة أدناه.' : 'Choose the service that best suits your needs from the list below.'}
                    </p>
                    <div className="grid gap-3">
                      {services.map((svc, i) => {
                        const selected = form.service === (svc.name?.en || '')
                        return (
                          <button key={svc.id || i}
                            onClick={() => set('service', svc.name?.en || '')}
                            className="flex items-center gap-4 p-5 rounded-2xl border text-start transition-all"
                            style={{
                              borderColor: selected ? 'var(--forest)' : 'var(--ivory-dark)',
                              background: selected ? 'var(--mint)' : 'white',
                              boxShadow: selected ? '0 0 0 2px var(--forest)' : 'none',
                            }}>
                            <span className="text-2xl flex-none">{svc.icon || '🦷'}</span>
                            <div className="flex-1">
                              <p className="font-semibold" style={{ color: 'var(--text)' }}>
                                {svc.name?.[lang] || svc.name?.en || ''}
                              </p>
                              <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'var(--muted)' }}>
                                {(svc.description?.[lang] || svc.description?.en || '').slice(0, 70)}…
                              </p>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-none"
                              style={{ borderColor: selected ? 'var(--forest)' : 'var(--ivory-dark)', background: selected ? 'var(--forest)' : 'transparent' }}>
                              {selected && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                    <button onClick={() => form.service && setStep(2)}
                      disabled={!form.service}
                      className="mt-8 w-full py-4 rounded-full font-semibold text-white text-base disabled:opacity-40 transition-opacity"
                      style={{ background: 'var(--gold)' }}>
                      {T.nextBtn} →
                    </button>
                  </div>
                )}

                {/* Step 2 — Personal info */}
                {step === 2 && (
                  <div>
                    <h2 className="font-semibold text-2xl mb-2" style={{ color: 'var(--forest)' }}>{T.step2}</h2>
                    <p className="text-sm mb-7" style={{ color: 'var(--muted)' }}>
                      {lang === 'ar' ? 'ملء هذه التفاصيل يساعدنا على تجهيز زيارتك.' : 'These details help us prepare for your visit.'}
                    </p>
                    {/* Selected service chip */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
                      style={{ background: 'var(--mint)', border: '1px solid var(--ivory-dark)' }}>
                      <span>🦷</span>
                      <span className="text-sm font-medium" style={{ color: 'var(--forest)' }}>{form.service}</span>
                      <button onClick={() => setStep(1)} className="text-xs ms-1 underline" style={{ color: 'var(--muted)' }}>
                        {lang === 'ar' ? 'تغيير' : 'Change'}
                      </button>
                    </div>
                    <div className="grid gap-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>{T.nameLabel} *</label>
                          <input type="text" required placeholder={T.namePlaceholder}
                            value={form.name} onChange={e => set('name', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border outline-none transition-colors"
                            style={{ borderColor: 'var(--ivory-dark)' }} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>{T.phoneLabel} *</label>
                          <input type="tel" required placeholder={T.phonePlaceholder}
                            value={form.phone} onChange={e => set('phone', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border outline-none"
                            style={{ borderColor: 'var(--ivory-dark)' }} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>{T.emailLabel}</label>
                        <input type="email" placeholder={T.emailPlaceholder}
                          value={form.email} onChange={e => set('email', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border outline-none"
                          style={{ borderColor: 'var(--ivory-dark)' }} />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>{T.dateLabel}</label>
                          <input type="date" min={new Date().toISOString().split('T')[0]}
                            value={form.date} onChange={e => set('date', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border outline-none"
                            style={{ borderColor: 'var(--ivory-dark)' }} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>{T.timeLabel}</label>
                          <select value={form.time} onChange={e => set('time', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border outline-none"
                            style={{ borderColor: 'var(--ivory-dark)' }}>
                            <option value="">--</option>
                            {TIMES.map(h => <option key={h} value={h}>{h}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>{T.notesLabel}</label>
                        <textarea rows={3} placeholder={T.notesPlaceholder}
                          value={form.notes} onChange={e => set('notes', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border outline-none resize-none"
                          style={{ borderColor: 'var(--ivory-dark)' }} />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-8">
                      <button onClick={() => setStep(1)}
                        className="flex-none px-6 py-3 rounded-full border font-medium text-sm"
                        style={{ borderColor: 'var(--ivory-dark)', color: 'var(--muted)' }}>
                        ← {T.prevBtn}
                      </button>
                      <button onClick={() => (form.name && form.phone) && setStep(3)}
                        disabled={!form.name || !form.phone}
                        className="flex-1 py-3 rounded-full font-semibold text-white text-base disabled:opacity-40"
                        style={{ background: 'var(--gold)' }}>
                        {T.confirmBtn}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 — Confirmation */}
                {step === 3 && (
                  <div className="text-center py-4">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: 'var(--mint)' }}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <circle cx="20" cy="20" r="18" stroke="var(--forest-light)" strokeWidth="2"/>
                        <path d="M12 20l5 5 11-10" stroke="var(--forest)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl mb-3" style={{ color: 'var(--forest)' }}>{T.confirmTitle}</h2>
                    <p className="mb-8 text-base" style={{ color: 'var(--muted)' }}>{T.confirmMsg}</p>

                    {/* Summary */}
                    <div className="rounded-2xl p-6 text-start mb-8" style={{ background: 'var(--mint)' }}>
                      <p className="text-xs uppercase tracking-widest mb-4 font-semibold" style={{ color: 'var(--gold)' }}>
                        {lang === 'ar' ? 'ملخص الحجز' : 'Booking Summary'}
                      </p>
                      {[
                        [lang === 'ar' ? 'الخدمة' : 'Service', form.service],
                        [T.nameLabel, form.name],
                        [T.phoneLabel, form.phone],
                        form.email && [T.emailLabel, form.email],
                        form.date && [T.dateLabel, form.date],
                        form.time && [T.timeLabel, form.time],
                        form.notes && [T.notesLabel, form.notes],
                      ].filter(Boolean).map(([k, v]) => (
                        <div key={k} className="flex justify-between py-2 border-b text-sm gap-4"
                          style={{ borderColor: 'var(--ivory-dark)' }}>
                          <span style={{ color: 'var(--muted)' }}>{k}</span>
                          <span className="font-medium text-end" style={{ color: 'var(--text)' }}>{v}</span>
                        </div>
                      ))}
                    </div>

                    <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 rounded-full font-bold text-white mb-4"
                      style={{ background: '#25D366' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      {T.whatsappBtn}
                    </a>
                    <button
                      onClick={() => { setStep(1); setForm({ service: '', name: '', phone: '', email: '', date: '', time: '', notes: '' }) }}
                      className="text-sm underline" style={{ color: 'var(--muted)' }}>
                      {T.newBooking}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="flex flex-col gap-6">
              {/* Why book */}
              <div className="rounded-2xl border p-7" style={{ background: 'white', borderColor: 'var(--ivory-dark)' }}>
                <h3 className="font-semibold text-lg mb-5" style={{ color: 'var(--forest)' }}>
                  {lang === 'ar' ? '✦ لماذا تحجز معنا؟' : '✦ Why Book With Us?'}
                </h3>
                {reassurances.map((r, i) => (
                  <div key={i} className="flex items-start gap-3 mb-4">
                    <span className="text-xl flex-none">{r.icon}</span>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{r.text}</p>
                  </div>
                ))}
              </div>

              {/* Hours */}
              <div className="rounded-2xl border p-7" style={{ background: 'white', borderColor: 'var(--ivory-dark)' }}>
                <h3 className="font-semibold mb-4" style={{ color: 'var(--forest)' }}>
                  🕐 {lang === 'ar' ? 'ساعات العمل' : 'Opening Hours'}
                </h3>
                {[
                  { d: lang === 'ar' ? 'السبت – الأربعاء' : 'Sat – Wed', t: lang === 'ar' ? '٩ص – ٩م' : '9 AM – 9 PM' },
                  { d: lang === 'ar' ? 'الخميس' : 'Thursday', t: lang === 'ar' ? '٩ص – ٦م' : '9 AM – 6 PM' },
                  { d: lang === 'ar' ? 'الجمعة' : 'Friday', t: lang === 'ar' ? 'مغلق' : 'Closed', closed: true },
                ].map((h, i) => (
                  <div key={i} className="flex justify-between py-2.5 text-sm border-b"
                    style={{ borderColor: 'var(--ivory-dark)' }}>
                    <span style={{ color: 'var(--muted)' }}>{h.d}</span>
                    <span style={{ color: h.closed ? '#c0392b' : 'var(--forest)', fontWeight: 500 }}>{h.t}</span>
                  </div>
                ))}
              </div>

              {/* Emergency */}
              <div className="rounded-2xl p-6" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
                <p className="font-semibold mb-1" style={{ color: '#b91c1c' }}>
                  🚨 {lang === 'ar' ? 'حالة طارئة؟' : 'Having an emergency?'}
                </p>
                <p className="text-sm mb-3" style={{ color: '#991b1b' }}>
                  {lang === 'ar' ? 'لا تملأ النموذج. اتصل بنا مباشرةً.' : 'Don\'t fill the form. Call us directly.'}
                </p>
                <a href="tel:+966509999999"
                  className="block w-full text-center py-2.5 rounded-full font-bold text-sm text-white"
                  style={{ background: '#b91c1c' }}>
                  +966 50 999 9999
                </a>
              </div>

              {/* Explore */}
              <div className="rounded-2xl p-6" style={{ background: 'var(--mint)', border: '1px solid var(--ivory-dark)' }}>
                <p className="text-sm font-semibold mb-3" style={{ color: 'var(--forest)' }}>
                  {lang === 'ar' ? 'استكشف أولاً؟' : 'Want to explore first?'}
                </p>
                <div className="flex flex-col gap-2">
                  <Link to="/services" className="text-sm flex items-center gap-2" style={{ color: 'var(--forest-light)' }}>
                    → {lang === 'ar' ? 'عرض جميع الخدمات' : 'View All Services'}
                  </Link>
                  <Link to="/faq" className="text-sm flex items-center gap-2" style={{ color: 'var(--forest-light)' }}>
                    → {lang === 'ar' ? 'الأسئلة الشائعة' : 'Read Our FAQs'}
                  </Link>
                  <Link to="/about" className="text-sm flex items-center gap-2" style={{ color: 'var(--forest-light)' }}>
                    → {lang === 'ar' ? 'تعرّف على أطبائنا' : 'Meet Our Doctors'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
