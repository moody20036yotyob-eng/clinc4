import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop || document.body.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setPct(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 start-0 end-0 z-[100] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full transition-all duration-100"
        style={{ width: `${pct}%`, background: 'var(--gold)' }}
      />
    </div>
  )
}
