import type { PortfolioData } from '@shared/types/portfolio';

const PLACEHOLDER_COLORS = ['#e0e7ff','#fce7f3','#d1fae5','#fef3c7','#dbeafe','#f3e8ff','#ffedd5','#ecfdf5'];

export function PortfolioMinimalGrid({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];

  return (
    <div style={{ background: '#fff', color: '#111', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Nav - centered minimal */}
      <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', gap: '3rem', borderBottom: '1px solid #f0f0f0' }}>
        <span style={{ fontWeight: 700, color: '#111', fontSize: '0.9rem', letterSpacing: '-0.01em' }}>{p.name || 'Portfolio'}</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['work', 'about', 'contact'].map(l => (
            <a key={l} href={`#${l}`} style={{ color: '#999', textDecoration: 'none', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section id="about" style={{ textAlign: 'center', padding: '5rem 2rem 3rem' }}>
        {p.photo && <img src={p.photo} alt={p.name} style={{ width: '4rem', height: '4rem', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1.5rem' }} />}
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>{p.name || 'Your Name'}</h1>
        {p.title && <p style={{ color: '#666', fontSize: '1rem', marginBottom: '1rem' }}>{p.title}</p>}
        {p.bio && <p style={{ color: '#888', maxWidth: '40rem', margin: '0 auto', lineHeight: 1.7, fontSize: '0.9rem' }}>{p.bio}</p>}
      </section>

      {/* Projects Grid */}
      {projects.length > 0 && (
        <section id="work" style={{ padding: '2rem 3rem 4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {projects.map((proj, i) => (
              <div key={proj.id} style={{ position: 'relative', borderRadius: '0.5rem', overflow: 'hidden', cursor: 'pointer', aspectRatio: i % 5 === 0 ? '4/3' : i % 3 === 0 ? '3/4' : '1/1' }}>
                <div style={{
                  width: '100%', height: '100%',
                  background: proj.thumbnail ? undefined : PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length],
                  minHeight: '180px'
                }}>
                  {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                {/* Hover overlay */}
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.25rem',
                  opacity: 0, transition: 'opacity 0.25s'
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0')}>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{proj.title}</h3>
                  {proj.category && <p style={{ color: '#ccc', fontSize: '0.75rem' }}>{proj.category}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section id="skills" style={{ padding: '3rem', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
          <p style={{ color: '#999', fontSize: '0.85rem', lineHeight: 2 }}>
            {skills.map(s => s.name).join('  ·  ')}
          </p>
        </section>
      )}

      {/* Contact */}
      <section id="contact" style={{ padding: '4rem 3rem', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
        {p.email && (
          <a href={`mailto:${p.email}`} style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 700, color: '#111', textDecoration: 'none', borderBottom: `3px solid ${primary}` }}>
            {p.email}
          </a>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem' }}>
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: '#999', textDecoration: 'none', fontSize: '0.8rem' }}>GitHub</a>}
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#999', textDecoration: 'none', fontSize: '0.8rem' }}>LinkedIn</a>}
          {p.twitter && <a href={p.twitter} target="_blank" rel="noopener noreferrer" style={{ color: '#999', textDecoration: 'none', fontSize: '0.8rem' }}>Twitter</a>}
        </div>
      </section>
    </div>
  );
}
