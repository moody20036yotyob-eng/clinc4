import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioMinimalTypo({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];

  return (
    <div style={{ background: '#ffffff', color: '#111111', fontFamily: 'Georgia, "Times New Roman", serif', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ padding: '4rem 6rem 2rem', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>
              {p.name || 'Your Name'}
            </h1>
            {p.title && (
              <p style={{ fontSize: '1.1rem', color: '#666', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>{p.title}</p>
            )}
          </div>
          <nav style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.8rem', display: 'flex', gap: '2rem', color: '#999' }}>
            {['about', 'work', 'contact'].map((l) => (
              <a key={l} href={`#${l}`} style={{ color: '#999', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{l}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* About */}
      <section id="about" style={{ padding: '5rem 6rem', maxWidth: '80rem' }}>
        {p.bio && (
          <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', lineHeight: 1.7, maxWidth: '38rem', color: '#333' }}>{p.bio}</p>
        )}
      </section>

      {/* Work / Projects */}
      {projects.length > 0 && (
        <section id="work" style={{ padding: '2rem 6rem 5rem', borderTop: '1px solid #e5e5e5' }}>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: '3rem' }}>Selected Work</p>
          <div>
            {projects.map((proj, i) => (
              <div key={proj.id} style={{ display: 'flex', alignItems: 'baseline', gap: '2rem', padding: '1.5rem 0', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget.children[0] as HTMLElement).style.color = primary; }}
                onMouseLeave={e => { (e.currentTarget.children[0] as HTMLElement).style.color = '#999'; }}>
                <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.75rem', color: '#999', minWidth: '2.5rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>{proj.title}</h3>
                  <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.8rem', color: '#999', marginTop: '0.25rem' }}>{proj.category || 'Project'}</p>
                </div>
                <div style={{ maxWidth: '28rem', opacity: 0, transition: 'opacity 0.2s' }}>
                  <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.875rem', color: '#666', lineHeight: 1.6 }}>{proj.description}</p>
                </div>
                {proj.url && (
                  <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.75rem', color: primary, textDecoration: 'none' }}>↗</a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ padding: '3rem 6rem', borderTop: '1px solid #e5e5e5' }}>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: '1.5rem' }}>Expertise</p>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '1rem', color: '#555', lineHeight: 2 }}>
            {skills.map(s => s.name).join(' · ')}
          </p>
        </section>
      )}

      {/* Contact */}
      <section id="contact" style={{ padding: '5rem 6rem', borderTop: '1px solid #111' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>Let's talk.</h2>
        {p.email && (
          <a href={`mailto:${p.email}`} style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '1rem', color: primary, textDecoration: 'none' }}>{p.email}</a>
        )}
        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.8rem', color: '#999', textDecoration: 'none' }}>LinkedIn</a>}
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.8rem', color: '#999', textDecoration: 'none' }}>GitHub</a>}
          {p.twitter && <a href={p.twitter} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.8rem', color: '#999', textDecoration: 'none' }}>Twitter</a>}
        </div>
      </section>
    </div>
  );
}
