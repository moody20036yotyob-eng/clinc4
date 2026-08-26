import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioCorporateDark({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#d4af37';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];
  const experience = data.experience || [];
  const testimonials = data.testimonials || [];

  return (
    <div style={{ background: '#1c1c1e', color: '#f5f5f0', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ padding: '1.5rem 4rem', borderBottom: '1px solid #2c2c2e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: primary }}>{p.name || 'Portfolio'}</span>
        <nav style={{ display: 'flex', gap: '2.5rem' }}>
          {['about', 'work', 'skills', 'testimonials', 'contact'].map(l => (
            <a key={l} href={`#${l}`} style={{ color: '#8a8a8e', textDecoration: 'none', fontSize: '0.825rem', textTransform: 'capitalize', fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f5f5f0')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8a8a8e')}>
              {l}
            </a>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <section id="about" style={{ padding: '7rem 4rem', maxWidth: '72rem', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5rem', flexWrap: 'wrap' }}>
          {p.photo && (
            <img src={p.photo} alt={p.name} style={{ width: '9rem', height: '9rem', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${primary}`, flexShrink: 0 }} />
          )}
          <div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1rem', color: '#fff' }}>
              {p.name || 'Your Name'}
            </h1>
            {p.title && <p style={{ color: primary, fontSize: '1.1rem', fontWeight: 500, marginBottom: '1.5rem' }}>{p.title}</p>}
            {p.bio && <p style={{ color: '#8a8a8e', lineHeight: 1.8, maxWidth: '38rem', marginBottom: '2rem' }}>{p.bio}</p>}
            <div style={{ display: 'flex', gap: '1rem' }}>
              {p.email && <a href={`mailto:${p.email}`} style={{ background: primary, color: '#000', padding: '0.65rem 1.75rem', borderRadius: '0.375rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem' }}>Contact</a>}
              {p.resume && <a href={p.resume} target="_blank" rel="noopener noreferrer" style={{ border: `1px solid ${primary}40`, color: primary, padding: '0.65rem 1.75rem', borderRadius: '0.375rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem' }}>Resume</a>}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#232325', borderTop: '1px solid #2c2c2e', borderBottom: '1px solid #2c2c2e', padding: '3rem 4rem' }}>
        <div style={{ display: 'flex', gap: '5rem', flexWrap: 'wrap', maxWidth: '72rem', margin: '0 auto' }}>
          {[
            { n: `${projects.length || 20}+`, label: 'Projects' },
            { n: `${skills.length || 15}+`, label: 'Skills' },
            { n: `${experience.length || 5}+`, label: 'Companies' },
            { n: `${testimonials.length || 10}+`, label: 'Happy Clients' },
          ].map(({ n, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '3rem', fontWeight: 900, color: primary, lineHeight: 1, marginBottom: '0.5rem' }}>{n}</p>
              <p style={{ fontSize: '0.75rem', color: '#8a8a8e', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section id="work" style={{ padding: '5rem 4rem', maxWidth: '72rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '3rem', color: '#fff' }}>Selected Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {projects.map(proj => (
              <div key={proj.id} style={{ background: '#232325', border: '1px solid #2c2c2e', borderRadius: '0.75rem', overflow: 'hidden', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = primary)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#2c2c2e')}>
                {proj.thumbnail ? (
                  <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '10rem', objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: '10rem', background: '#2c2c2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#3c3c3e', fontSize: '2.5rem' }}>◻</span>
                  </div>
                )}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{proj.title}</h3>
                  <p style={{ color: '#8a8a8e', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>{proj.description}</p>
                  {(proj.technologies || []).length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                      {(proj.technologies || []).map(t => <span key={t} style={{ fontSize: '0.7rem', color: primary, background: `${primary}15`, padding: '0.2rem 0.6rem', borderRadius: '0.25rem' }}>{t}</span>)}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}>Live ↗</a>}
                    {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: '#8a8a8e', textDecoration: 'none', fontSize: '0.8rem' }}>Code ↗</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section id="skills" style={{ background: '#232325', padding: '4rem', borderTop: '1px solid #2c2c2e' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem', color: '#fff' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {skills.map(s => (
                <span key={s.id} style={{ padding: '0.5rem 1.25rem', border: `1px solid ${primary}40`, borderRadius: '2rem', fontSize: '0.875rem', color: '#ccc' }}>{s.name}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section id="testimonials" style={{ padding: '5rem 4rem', maxWidth: '72rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '3rem', color: '#fff' }}>What People Say</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {testimonials.map(t => (
              <div key={t.id} style={{ background: '#232325', border: '1px solid #2c2c2e', borderRadius: '0.75rem', padding: '1.75rem' }}>
                <p style={{ color: '#ccc', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem', fontStyle: 'italic' }}>"{t.content}"</p>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff' }}>{t.name}</p>
                  {(t.position || t.company) && (
                    <p style={{ color: primary, fontSize: '0.75rem' }}>{t.position}{t.position && t.company ? ', ' : ''}{t.company}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <footer id="contact" style={{ background: '#111', padding: '4rem', textAlign: 'center', borderTop: '1px solid #2c2c2e' }}>
        <h2 style={{ fontWeight: 900, fontSize: '2rem', color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Let's Connect</h2>
        {p.email && (
          <a href={`mailto:${p.email}`} style={{ display: 'inline-block', background: primary, color: '#000', padding: '0.875rem 3rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 800, fontSize: '1rem' }}>
            {p.email}
          </a>
        )}
      </footer>
    </div>
  );
}
