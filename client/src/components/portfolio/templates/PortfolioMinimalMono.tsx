import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioMinimalMono({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];

  return (
    <div style={{ background: '#fff', color: '#000', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 4rem', borderBottom: '2px solid #000' }}>
        <span style={{ fontWeight: 900, fontSize: '1rem', letterSpacing: '-0.02em' }}>{p.name || 'Portfolio'}</span>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['work', 'about', 'contact'].map(l => (
            <a key={l} href={`#${l}`} style={{ color: '#000', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</a>
          ))}
          {p.email && (
            <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '0.4rem 1rem', borderRadius: '2rem', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600 }}>
              Hire me
            </a>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section id="about" style={{ padding: '6rem 4rem', maxWidth: '80rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          {p.photo && (
            <img src={p.photo} alt={p.name} style={{ width: '10rem', height: '10rem', borderRadius: '50%', objectFit: 'cover', border: '3px solid #000' }} />
          )}
          <div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: '1rem' }}>
              {p.name || 'Your Name'}
            </h1>
            {p.title && <p style={{ fontSize: '1.1rem', color: primary, fontWeight: 600, marginBottom: '1rem' }}>{p.title}</p>}
            {p.bio && <p style={{ color: '#444', lineHeight: 1.7, maxWidth: '36rem', fontSize: '0.95rem' }}>{p.bio}</p>}
          </div>
        </div>
      </section>

      {/* Projects - horizontal cards alternating */}
      {projects.length > 0 && (
        <section id="work" style={{ borderTop: '2px solid #000' }}>
          {projects.map((proj, i) => (
            <div key={proj.id} style={{
              display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
              minHeight: '22rem', borderBottom: '1px solid #e5e5e5'
            }}>
              <div style={{ flex: '0 0 45%', background: proj.thumbnail ? undefined : (i % 2 === 0 ? '#f5f5f5' : '#000'), overflow: 'hidden' }}>
                {proj.thumbnail ? (
                  <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '4rem', color: i % 2 === 0 ? '#ccc' : '#333' }}>◻</span>
                  </div>
                )}
              </div>
              <div style={{ flex: 1, padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {proj.category && <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: primary, marginBottom: '0.75rem', fontWeight: 700 }}>{proj.category}</p>}
                <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>{proj.title}</h3>
                <p style={{ color: '#555', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '32rem', fontSize: '0.9rem' }}>{proj.description}</p>
                {(proj.technologies || []).length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {(proj.technologies || []).map(t => (
                      <span key={t} style={{ padding: '0.2rem 0.75rem', border: '1px solid #000', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 500 }}>{t}</span>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}>View Project →</a>}
                  {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none', fontSize: '0.85rem' }}>Code →</a>}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills - horizontal scroll */}
      {skills.length > 0 && (
        <section style={{ padding: '3rem 4rem', borderTop: '2px solid #000', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {skills.map(s => (
              <span key={s.id} style={{ padding: '0.4rem 1rem', background: '#f5f5f5', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: 500, whiteSpace: 'nowrap' }}>{s.name}</span>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ background: '#000', color: '#fff', padding: '3rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontWeight: 800, fontSize: '1rem' }}>{p.name || 'Portfolio'}</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {p.email && <a href={`mailto:${p.email}`} style={{ color: '#fff', textDecoration: 'none', fontSize: '0.85rem' }}>{p.email}</a>}
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.85rem' }}>GitHub</a>}
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.85rem' }}>LinkedIn</a>}
        </div>
      </footer>
    </div>
  );
}
