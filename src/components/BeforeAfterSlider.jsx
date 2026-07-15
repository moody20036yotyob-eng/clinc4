import { useRef, useState, useCallback } from 'react'
import { useLang } from '../context/LanguageContext'
import t from '../i18n/translations'

export default function BeforeAfterSlider() {
  const { lang, isRTL } = useLang()
  const T = t[lang].home
  const [pos, setPos] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const getPos = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect()
    let p = ((clientX - rect.left) / rect.width) * 100
    p = Math.max(0, Math.min(100, p))
    setPos(isRTL ? 100 - p : p)
  }, [isRTL])

  const onMouseDown = (e) => { dragging.current = true; e.preventDefault() }
  const onMouseMove = (e) => { if (dragging.current) getPos(e.clientX) }
  const onMouseUp = () => { dragging.current = false }
  const onTouchMove = (e) => { getPos(e.touches[0].clientX) }

  // Gradient placeholders simulating before/after
  const beforeBg = 'linear-gradient(135deg, #d4c5b0 0%, #c8b89a 100%)'
  const afterBg = 'linear-gradient(135deg, #e8f5f0 0%, #c0e0d4 100%)'

  return (
    <div
      ref={containerRef}
      className="ba-slider select-none"
      style={{ height: 400 }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseUp}
    >
      {/* Before */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ background: beforeBg }}>
        <span className="absolute top-4 start-4 px-3 py-1 rounded-full text-xs font-semibold text-white/90 uppercase tracking-wider"
          style={{ background: 'rgba(15,30,24,0.5)' }}>
          {T.baBefore}
        </span>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <ellipse cx="60" cy="75" rx="28" ry="18" fill="#c8a882" />
          {[40,48,56,64,72,80].map((x, i) => (
            <rect key={i} x={x} y="60" width="8" height="14" rx="2" fill="#d4b896" stroke="#b89060" strokeWidth="0.5"/>
          ))}
        </svg>
      </div>

      {/* After (clipped) */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ background: afterBg, clipPath: isRTL ? `inset(0 ${pos}% 0 0)` : `inset(0 ${100 - pos}% 0 0)` }}
      >
        <span className="absolute top-4 end-4 px-3 py-1 rounded-full text-xs font-semibold text-white/90 uppercase tracking-wider"
          style={{ background: 'rgba(15,30,24,0.5)' }}>
          {T.baAfter}
        </span>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <ellipse cx="60" cy="75" rx="28" ry="18" fill="#e0d8cc" />
          {[40,48,56,64,72,80].map((x, i) => (
            <rect key={i} x={x} y="60" width="8" height="14" rx="2" fill="white" stroke="#e0d8d0" strokeWidth="0.5"/>
          ))}
        </svg>
      </div>

      {/* Handle */}
      <div
        className="ba-handle"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      />
    </div>
  )
}
