import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioDesignerMinimal({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];

  return (
    <div style={{ background: '#fff', color: '#111', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ padding: '3rem 4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.04em' }}>{(p.name || 'Designer').split(' ')[0]}</span>
        <div style={{ width: '1.5rem', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ height: '2px', background: '#111' }} />
          <div style={{ height: '2px', background: '#111' }} />
          <div style={{ height: '2px', background: '#111' }} />
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '2rem 4rem 8rem' }}>
        <p style={{ color: '#bbb', fontSize: '0.85rem', marginBottom: '3rem', letterSpacing: '0.05em' }}>{p.title || 'Designer'}{p.location ? ` · ${p.location}` : ''}</p>
        {p.bio && <p style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', lineHeight: 1.55, color: '#333', maxWidth: '44rem', fontWeight: 300, letterSpacing: '-0.01em' }}>{p.bio}</p>}
      </section>

      {/* Projects - full-width alternating */}
      {projects.length > 0 && (
        <section style={{ borderTop: '1px solid #eee' }}>
          {projects.map((proj, i) => (
            <div key={proj.id} style={{ display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', borderBottom: '1px solid #eee', minHeight: '28rem' }}>
              <div style={{ flex: 1, background: proj.thumbnail ? undefined : `#f8f8f8`, overflow: 'hidden' }}>
                {proj.thumbnail ? (
                  <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: `hsl(${(i * 67) % 360}, 20%, 95%)` }} />
                )}
              </div>
              <div style={{ width: '36rem', padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                onMouseEnter={e => { const title = e.currentTarget.querySelector('.proj-title') as HTMLElement; if (title) title.style.color = primary; }}
                onMouseLeave={e => { const title = e.currentTarget.querySelector('.proj-title') as HTMLElement; if (title) title.style.color = '#111'; }}>
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#bbb', marginBottom: '1rem' }}>{proj.category || 'Project'}</span>
                <h2 className="proj-title" style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem', lineHeight: 1.1, transition: 'color 0.25s', color: '#111' }}>{proj.title}</h2>
                <p style={{ color: '#777', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: '2rem' }}>{proj.description}</p>
                {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>View Project →</a>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Footer */}
      <footer style={{ padding: '5rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#111' }}>{(p.name || 'Designer').split(' ')[0]}</span>
        {p.email && (
          <a href={`mailto:${p.email}`} style={{ color: primary, textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>{p.email}</a>
        )}
      </footer>
    </div>
  );
}
