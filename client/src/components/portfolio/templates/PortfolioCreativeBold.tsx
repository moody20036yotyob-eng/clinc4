import type { PortfolioData } from '@shared/types/portfolio';

const CATEGORY_COLORS = ['#ff4d4f', '#ff7a45', '#ffc53d', '#73d13d', '#40a9ff', '#9254de', '#f759ab'];

export function PortfolioCreativeBold({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#ff3366';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];

  return (
    <div style={{ background: '#0a0a0a', color: '#fff', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Nav */}
      <nav style={{ padding: '1.5rem 4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 900, fontSize: '1.1rem', color: primary }}>{p.name || 'Creative'}</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['work', 'skills', 'contact'].map(l => (
            <a key={l} href={`#${l}`} style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</a>
          ))}
        </div>
      </nav>

      {/* Hero - full screen bold */}
      <section style={{ padding: '4rem 4rem 6rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '2rem', right: '4rem', width: '20rem', height: '20rem', borderRadius: '50%', background: primary, opacity: 0.1, filter: 'blur(60px)', pointerEvents: 'none' }} />
        <p style={{ color: primary, fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '2rem' }}>
          {p.title || 'Creative Professional'}
        </p>
        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.05em', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
          {(p.name || 'YOUR NAME').split(' ').map((word, i) => (
            <span key={i} style={{ display: 'block', color: i % 2 === 0 ? '#fff' : primary }}>
              {word}
            </span>
          ))}
        </h1>
        {p.bio && (
          <p style={{ color: '#666', maxWidth: '36rem', lineHeight: 1.8, fontSize: '1rem', marginBottom: '2.5rem' }}>{p.bio}</p>
        )}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {p.email && (
            <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '0.875rem 2.5rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 800, fontSize: '0.9rem' }}>
              Let's Work →
            </a>
          )}
          {p.behance && <a href={p.behance} target="_blank" rel="noopener noreferrer" style={{ border: `1px solid #333`, color: '#aaa', padding: '0.875rem 2rem', borderRadius: '2rem', textDecoration: 'none', fontSize: '0.9rem' }}>Behance</a>}
          {p.dribbble && <a href={p.dribbble} target="_blank" rel="noopener noreferrer" style={{ border: `1px solid #333`, color: '#aaa', padding: '0.875rem 2rem', borderRadius: '2rem', textDecoration: 'none', fontSize: '0.9rem' }}>Dribbble</a>}
        </div>
      </section>

      {/* Projects - large cards with color coding */}
      {projects.length > 0 && (
        <section id="work" style={{ padding: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <div style={{ height: '3px', width: '3rem', background: primary }} />
            <h2 style={{ fontWeight: 900, fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Work</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {projects.map((proj, i) => {
              const cat_color = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
              return (
                <div key={proj.id} style={{ borderRadius: '1rem', overflow: 'hidden', border: `1px solid #1a1a1a`, transition: 'transform 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
                  <div style={{ height: '14rem', background: proj.thumbnail ? undefined : `${cat_color}15`, position: 'relative', overflow: 'hidden' }}>
                    {proj.thumbnail ? (
                      <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '6rem', height: '6rem', borderRadius: '50%', background: `${cat_color}30`, border: `3px solid ${cat_color}` }} />
                      </div>
                    )}
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: cat_color, color: '#000', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '2rem' }}>
                      {proj.category || 'Project'}
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem', background: '#111' }}>
                    <h3 style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{proj.title}</h3>
                    <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>{proj.description}</p>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: cat_color, textDecoration: 'none', fontWeight: 700, fontSize: '0.8rem' }}>Live →</a>}
                      {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none', fontSize: '0.8rem' }}>Code</a>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Skills - visual blocks */}
      {skills.length > 0 && (
        <section id="skills" style={{ padding: '5rem 4rem', borderTop: '1px solid #1a1a1a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <div style={{ height: '3px', width: '3rem', background: primary }} />
            <h2 style={{ fontWeight: 900, fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Skills</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {skills.map((s, i) => (
              <span key={s.id} style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '0.5rem',
                background: `${CATEGORY_COLORS[i % CATEGORY_COLORS.length]}15`,
                border: `1px solid ${CATEGORY_COLORS[i % CATEGORY_COLORS.length]}40`,
                color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
                fontSize: '0.875rem', fontWeight: 700,
                transition: 'transform 0.2s'
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" style={{ padding: '6rem 4rem', textAlign: 'center', borderTop: '1px solid #1a1a1a' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '2rem', textTransform: 'uppercase' }}>
          Got a <span style={{ color: primary }}>project?</span>
        </h2>
        {p.email && (
          <a href={`mailto:${p.email}`} style={{ display: 'inline-block', background: primary, color: '#fff', padding: '1rem 3.5rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 900, fontSize: '1.1rem' }}>
            {p.email}
          </a>
        )}
      </section>
    </div>
  );
}
