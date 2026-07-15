import { useState, useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext'

export default function DoctorCarousel({ doctors }) {
  const { lang, isRTL } = useLang()
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(3)
  const trackRef = useRef(null)

  useEffect(() => {
    const update = () => setVisible(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const max = Math.max(0, doctors.length - visible)
  const prev = () => setIdx(i => Math.max(0, i - 1))
  const next = () => setIdx(i => Math.min(max, i + 1))

  const specialty = (d) => d.specialty?.[lang] || d.specialty?.en || ''
  const name = (d) => d.name?.[lang] || d.name?.en || ''
  const credentials = (d) => d.credentials?.[lang] || d.credentials?.en || ''
  const years = (d) => d.years?.[lang] || d.years?.en || ''
  const bio = (d) => d.bio?.[lang] || d.bio?.en || ''

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={trackRef}>
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: isRTL
              ? `translateX(${idx * (100 / visible)}%)`
              : `translateX(-${idx * (100 / visible)}%)`,
            gap: '1.5rem',
          }}
        >
          {doctors.map((doc, i) => (
            <div
              key={doc.id || i}
              className="flex-none rounded-2xl overflow-hidden border"
              style={{
                width: `calc(${100 / visible}% - 1.5rem * ${(visible - 1) / visible})`,
                background: 'white',
                borderColor: 'var(--ivory-dark)',
              }}
            >
              {/* Photo placeholder */}
              <div
                className="w-full flex items-center justify-center"
                style={{ height: 240, background: 'var(--mint)' }}
              >
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="30" r="20" fill="var(--forest-light)" opacity="0.3" />
                  <ellipse cx="40" cy="70" rx="28" ry="18" fill="var(--forest-light)" opacity="0.2" />
                </svg>
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--gold)' }}>
                  {specialty(doc)}
                </p>
                <h3 className="font-semibold text-lg mb-0.5" style={{ color: 'var(--text)' }}>{name(doc)}</h3>
                <p className="text-sm mb-2" style={{ color: 'var(--muted)' }}>{credentials(doc)}</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>{years(doc)}</p>
                <p className="text-sm mt-3 leading-relaxed line-clamp-3" style={{ color: 'var(--muted)' }}>{bio(doc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={isRTL ? next : prev}
        disabled={idx === (isRTL ? max : 0)}
        className="absolute top-1/2 -translate-y-1/2 -start-5 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-opacity disabled:opacity-30"
        style={{ background: 'white', border: '1px solid var(--ivory-dark)' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d={isRTL ? 'M6 4l4 4-4 4' : 'M10 4L6 8l4 4'} stroke="var(--forest)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      <button
        onClick={isRTL ? prev : next}
        disabled={idx === (isRTL ? 0 : max)}
        className="absolute top-1/2 -translate-y-1/2 -end-5 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-opacity disabled:opacity-30"
        style={{ background: 'white', border: '1px solid var(--ivory-dark)' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d={isRTL ? 'M10 4L6 8l4 4' : 'M6 4l4 4-4 4'} stroke="var(--forest)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: max + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="w-2 h-2 rounded-full transition-all"
            style={{ background: i === idx ? 'var(--gold)' : 'var(--ivory-dark)', width: i === idx ? 24 : 8 }}
          />
        ))}
      </div>
    </div>
  )
}
