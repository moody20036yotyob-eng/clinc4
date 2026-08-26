import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioDesignerShowcase({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];

  return (
    <div style={{ background: '#fff', color: '#111', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ padding: '1.5rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, background: '#fff', zIndex: 10 }}>
        <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>{p.name || 'Designer'}</span>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {p.behance && <a href={p.behance} target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none', fontSize: '0.85rem' }}>Behance</a>}
          {p.dribbble && <a href={p.dribbble} target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'none', fontSize: '0.85rem' }}>Dribbble</a>}
          {p.email && <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '2rem', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}>Contact</a>}
        </div>
      </nav>

      {/* About */}
      <section style={{ padding: '5rem 3rem', display: 'flex', gap: '4rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        {p.photo && (
          <img src={p.photo} alt={p.name} style={{ width: '10rem', height: '10rem', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        )}
        <div>
          <p style={{ color: primary, fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{p.title || 'Designer'}</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem', lineHeight: 1.1 }}>{p.name}</h1>
          {p.bio && <p style={{ color: '#555', lineHeight: 1.8, maxWidth: '48rem', fontSize: '1rem' }}>{p.bio}</p>}
        </div>
      </section>

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ padding: '0 3rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {skills.map(s => (
              <span key={s.id} style={{ padding: '0.4rem 1rem', border: `1px solid ${primary}40`, borderRadius: '2rem', fontSize: '0.8rem', color: primary, fontWeight: 500 }}>{s.name}</span>
            ))}
          </div>
        </section>
      )}

      {/* Projects - masonry-style offset grid */}
      {projects.length > 0 && (
        <section id="work" style={{ padding: '4rem 3rem', maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '3rem' }}>Selected Work</h2>
          <div style={{ columns: '3', columnGap: '1.5rem' }}>
            {projects.map((proj, i) => (
              <div key={proj.id} style={{ breakInside: 'avoid', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden', borderRadius: '0.75rem', cursor: 'pointer', background: '#f5f5f5' }}
                onMouseEnter={e => { const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement; if (overlay) overlay.style.opacity = '1'; }}
                onMouseLeave={e => { const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement; if (overlay) overlay.style.opacity = '0'; }}>
                {proj.thumbnail ? (
                  <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', display: 'block' }} />
                ) : (
                  <div style={{ paddingTop: i % 3 === 0 ? '75%' : i % 3 === 1 ? '125%' : '100%', background: `hsl(${(i * 47) % 360}, 60%, 90%)` }} />
                )}
                <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem', opacity: 0, transition: 'opacity 0.3s' }}>
                  <span style={{ color: primary, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.4rem' }}>{proj.category || 'Design'}</span>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', margin: 0 }}>{proj.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #f0f0f0', padding: '3rem', textAlign: 'center' }}>
        <p style={{ color: '#888', fontSize: '0.85rem' }}>© {p.name} · {p.location && <span>{p.location} · </span>}{p.email}</p>
      </footer>
    </div>
  );
}
