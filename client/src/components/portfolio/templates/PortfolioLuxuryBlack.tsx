import type { PortfolioData, PortfolioService } from '@shared/types/portfolio';

const GOLD = '#d4af37';

export function PortfolioLuxuryBlack({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const projects = data.projects || [];
  const services = data.services || [];
  const skills = data.skills || [];

  return (
    <div style={{ background: '#0a0a0a', color: '#f0f0f0', fontFamily: '"Georgia", "Times New Roman", serif', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ padding: '2.5rem 5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1a1a1a' }}>
        <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD }}>{p.name || 'Portfolio'}</span>
        <div style={{ display: 'flex', gap: '3rem', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          {['Work', 'Services', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: '#666', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={e => (e.currentTarget.style.color = '#666')}>{l}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '10rem 5rem', textAlign: 'center', borderBottom: '1px solid #1a1a1a' }}>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', color: GOLD, fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '3rem' }}>{p.title || 'Creative Professional'}</p>
        <h1 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(3rem, 9vw, 8rem)', fontWeight: 100, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#f0f0f0', lineHeight: 1.1, marginBottom: '3rem' }}>{p.name || 'Your Name'}</h1>
        {p.bio && <p style={{ color: '#555', maxWidth: '36rem', margin: '0 auto 4rem', lineHeight: 1.9, fontSize: '0.92rem' }}>{p.bio}</p>}
        {p.email && <a href={`mailto:${p.email}`} style={{ fontFamily: 'Inter, system-ui, sans-serif', display: 'inline-block', border: `1px solid ${GOLD}`, color: GOLD, padding: '1rem 3rem', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Enquire</a>}
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section id="work" style={{ padding: '7rem 5rem', borderBottom: '1px solid #1a1a1a' }}>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', color: GOLD, fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '4rem', textAlign: 'center' }}>Selected Work</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2px' }}>
            {projects.map((proj, i) => (
              <div key={proj.id} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#111', cursor: 'pointer' }}
                onMouseEnter={e => { const info = e.currentTarget.querySelector('.lux-info') as HTMLElement; if (info) info.style.opacity = '1'; }}
                onMouseLeave={e => { const info = e.currentTarget.querySelector('.lux-info') as HTMLElement; if (info) info.style.opacity = '0'; }}>
                {proj.thumbnail ? <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} /> : <div style={{ width: '100%', height: '100%', background: `#${(0x111111 + i * 0x050505).toString(16).slice(-6)}` }} />}
                <div className="lux-info" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem', opacity: 0, transition: 'opacity 0.4s' }}>
                  <p style={{ fontFamily: 'Inter, system-ui, sans-serif', color: GOLD, fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{proj.category || 'Project'}</p>
                  <h3 style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#f0f0f0', fontWeight: 300, fontSize: '1.3rem', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>{proj.title}</h3>
                  {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: GOLD, textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>View →</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Services */}
      {services.length > 0 && (
        <section id="services" style={{ padding: '7rem 5rem', borderBottom: '1px solid #1a1a1a' }}>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', color: GOLD, fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '4rem', textAlign: 'center' }}>Services</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', background: '#1a1a1a' }}>
            {services.map((svc: PortfolioService) => (
              <div key={svc.id} style={{ background: '#0a0a0a', padding: '3rem', border: `1px solid ${GOLD}20` }}>
                <h3 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, fontSize: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD, marginBottom: '1rem' }}>{svc.title}</h3>
                <p style={{ color: '#555', lineHeight: 1.8, fontSize: '0.85rem', marginBottom: svc.price ? '1.5rem' : 0 }}>{svc.description}</p>
                {svc.price && <p style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#888', fontSize: '0.8rem' }}>From {svc.price}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ padding: '5rem', textAlign: 'center', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {skills.map(s => (
              <span key={s.id} style={{ fontFamily: 'Inter, system-ui, sans-serif', border: `1px solid #2a2a2a`, color: '#555', padding: '0.5rem 1.25rem', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{s.name}</span>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" style={{ padding: '10rem 5rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', color: GOLD, fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '2rem' }}>Contact</p>
        <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 100, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '3rem' }}>Let's Work Together</h2>
        {p.email && <a href={`mailto:${p.email}`} style={{ fontFamily: 'Inter, system-ui, sans-serif', color: GOLD, textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.1em' }}>{p.email}</a>}
      </section>
    </div>
  );
}
