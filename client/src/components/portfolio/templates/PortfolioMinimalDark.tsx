import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioMinimalDark({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];

  return (
    <div style={{ background: '#0f172a', color: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 3rem', borderBottom: '1px solid #1e293b' }}>
        <span style={{ fontWeight: 700, fontSize: '1.1rem', color: primary }}>{p.name || 'Portfolio'}</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['about', 'projects', 'skills', 'contact'].map((l) => (
            <a key={l} href={`#${l}`} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem', textTransform: 'capitalize', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f8fafc')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>
              {l}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section id="about" style={{ maxWidth: '56rem', margin: '0 auto', padding: '6rem 2rem' }}>
        {p.photo && (
          <img src={p.photo} alt={p.name} style={{ width: '5rem', height: '5rem', borderRadius: '50%', objectFit: 'cover', marginBottom: '2rem', border: `2px solid ${primary}` }} />
        )}
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          {p.name || 'Your Name'}
        </h1>
        {p.title && (
          <p style={{ fontSize: '1.25rem', color: primary, marginBottom: '1.5rem', fontWeight: 500 }}>{p.title}</p>
        )}
        {p.bio && (
          <p style={{ color: '#94a3b8', lineHeight: 1.8, maxWidth: '42rem', marginBottom: '2.5rem', fontSize: '1rem' }}>{p.bio}</p>
        )}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {p.email && (
            <a href={`mailto:${p.email}`} style={{ color: primary, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>{p.email}</a>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>GitHub ↗</a>
          )}
          {p.linkedin && (
            <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>LinkedIn ↗</a>
          )}
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section id="projects" style={{ padding: '4rem 3rem', borderTop: '1px solid #1e293b' }}>
          <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#64748b', marginBottom: '3rem', fontWeight: 600 }}>Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ position: 'relative', borderRadius: '0.75rem', overflow: 'hidden', background: '#1e293b', border: '1px solid #334155', cursor: 'pointer' }}
                  className="group">
                  <div style={{ height: '12rem', background: proj.thumbnail ? undefined : '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {proj.thumbnail ? (
                      <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ color: '#334155', fontSize: '3rem' }}>◻</span>
                    )}
                  </div>
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.92)', opacity: 0, transition: 'opacity 0.3s', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '0')}>
                    <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>{proj.title}</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>{proj.description}</p>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600 }}>Live ↗</a>}
                      {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', fontSize: '0.8rem', textDecoration: 'none' }}>Code ↗</a>}
                    </div>
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ fontWeight: 600, fontSize: '0.9rem' }}>{proj.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section id="skills" style={{ padding: '4rem 3rem', borderTop: '1px solid #1e293b' }}>
          <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#64748b', marginBottom: '2rem', fontWeight: 600 }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {skills.map((s) => (
                <span key={s.id} style={{ padding: '0.4rem 1rem', borderRadius: '2rem', border: '1px solid #334155', color: '#cbd5e1', fontSize: '0.875rem' }}>{s.name}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" style={{ padding: '4rem 3rem', borderTop: '1px solid #1e293b', textAlign: 'center' }}>
        <p style={{ color: '#64748b', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Contact</p>
        {p.email && (
          <a href={`mailto:${p.email}`} style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, color: '#f8fafc', textDecoration: 'none', borderBottom: `2px solid ${primary}`, paddingBottom: '0.25rem' }}>
            {p.email}
          </a>
        )}
      </section>
    </div>
  );
}
