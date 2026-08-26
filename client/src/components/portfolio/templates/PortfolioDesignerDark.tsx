import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioDesignerDark({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];

  return (
    <div style={{ background: '#0a0a0a', color: '#fff', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ padding: '2rem 4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{p.name || 'Designer'}</span>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {p.behance && <a href={p.behance} target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.05em' }}>Behance ↗</a>}
          {p.dribbble && <a href={p.dribbble} target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.05em' }}>Dribbble ↗</a>}
          {p.email && <a href={`mailto:${p.email}`} style={{ color: primary, textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.05em' }}>Contact</a>}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '4rem 4rem 5rem' }}>
        <p style={{ color: '#444', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>{p.title || 'Visual Designer'}</p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '2rem' }}>{p.name || 'Your Name'}</h1>
        {p.bio && <p style={{ color: '#555', maxWidth: '40rem', lineHeight: 1.8, fontSize: '0.95rem' }}>{p.bio}</p>}
      </section>

      {/* Film-strip horizontal scroll */}
      {projects.length > 0 && (
        <section style={{ padding: '0 0 5rem' }}>
          <h2 style={{ padding: '0 4rem', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#444', marginBottom: '2rem' }}>Work</h2>
          <div style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', padding: '0 4rem', width: 'max-content' }}>
              {projects.map((proj, i) => (
                <div key={proj.id} style={{ width: '22rem', flexShrink: 0, background: '#111', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #1a1a1a' }}>
                  <div style={{ height: '14rem', background: proj.thumbnail ? undefined : `hsl(${(i * 60) % 360}, 30%, 15%)`, overflow: 'hidden', position: 'relative' }}>
                    {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <p style={{ color: primary, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>{proj.category || 'Design'}</p>
                    <h3 style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>{proj.title}</h3>
                    <p style={{ color: '#555', fontSize: '0.82rem', lineHeight: 1.6 }}>{proj.description?.slice(0, 100)}{proj.description && proj.description.length > 100 ? '…' : ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills as glowing pills */}
      {skills.length > 0 && (
        <section style={{ padding: '4rem', borderTop: '1px solid #111' }}>
          <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#444', marginBottom: '2rem' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {skills.map(s => (
              <span key={s.id} style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '2rem',
                border: `1px solid ${primary}60`,
                color: primary,
                fontSize: '0.82rem',
                fontWeight: 500,
                boxShadow: `0 0 12px ${primary}30, 0 0 4px ${primary}20`,
              }}>{s.name}</span>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section style={{ padding: '5rem 4rem', borderTop: '1px solid #111', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '2rem' }}>Let's create something.</h2>
        {p.email && (
          <a href={`mailto:${p.email}`} style={{ color: primary, textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.02em' }}>{p.email} ↗</a>
        )}
      </section>
    </div>
  );
}
