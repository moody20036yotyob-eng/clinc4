import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import t from '../i18n/translations'

export default function Footer() {
  const { lang } = useLang()
  const T = t[lang]
  const nav = T.nav
  const F = T.footer

  return (
    <footer style={{ background: 'var(--forest)', color: 'white' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <p className="font-display text-2xl font-light mb-3">{nav.clinicName}</p>
          <p className="text-white/60 text-sm leading-relaxed">{F.tagline}</p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">{F.links}</h4>
          <ul className="flex flex-col gap-2">
            {[
              { to: '/', label: nav.home },
              { to: '/about', label: nav.about },
              { to: '/services', label: nav.services },
              { to: '/faq', label: nav.faq },
            ].map(l => (
              <li key={l.to}>
                <Link to={l.to} className="text-white/70 hover:text-white text-sm transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">{F.contact}</h4>
          <ul className="flex flex-col gap-2 text-sm text-white/70">
            <li>{F.address}</li>
            <li><a href={`tel:${F.phone}`} className="hover:text-white">{F.phone}</a></li>
            <li><a href={`mailto:${F.email}`} className="hover:text-white">{F.email}</a></li>
            <li className="text-white/50">{F.hours}</li>
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">{nav.booking}</h4>
          <Link
            to="/booking"
            className="inline-block px-6 py-2.5 rounded-full text-sm font-semibold text-white"
            style={{ background: 'var(--gold)' }}
          >
            {nav.booking}
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="text-center text-white/40 text-xs">{F.rights}</p>
      </div>
    </footer>
  )
}
