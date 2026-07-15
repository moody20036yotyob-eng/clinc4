import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import t from '../i18n/translations'

export default function Navbar() {
  const { lang, toggle } = useLang()
  const T = t[lang].nav
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: T.home },
    { to: '/about', label: T.about },
    { to: '/services', label: T.services },
    { to: '/booking', label: T.booking },
    { to: '/faq', label: T.faq },
    { to: '/contact', label: T.contact },
  ]

  return (
    <nav
      className="fixed top-0 start-0 end-0 z-50 transition-shadow duration-300"
      style={{
        background: 'var(--forest)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.25)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="font-display text-xl font-light text-white tracking-wide">
          {T.clinicName}
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-white/15'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/30 text-white/90 text-sm hover:bg-white/10 transition-colors"
          >
            {T.langSwitch}
          </button>
          <Link
            to="/booking"
            className="hidden sm:flex items-center px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
            style={{ background: 'var(--gold)', color: 'white' }}
          >
            {T.booking}
          </Link>
          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-white transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/10" style={{ background: 'var(--forest)' }}>
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm ${isActive ? 'bg-white/15 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="flex gap-2 mt-2 pt-2 border-t border-white/10">
              <button
                onClick={toggle}
                className="flex-1 py-2 rounded-lg border border-white/30 text-white/90 text-sm hover:bg-white/10"
              >
                {T.langSwitch}
              </button>
              <Link
                to="/booking"
                onClick={() => setOpen(false)}
                className="flex-1 py-2 rounded-lg text-center text-sm font-semibold text-white"
                style={{ background: 'var(--gold)' }}
              >
                {T.booking}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
