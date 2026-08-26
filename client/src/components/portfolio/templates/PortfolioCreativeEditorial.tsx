import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioCreativeEditorial({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];
  const experience = data.experience || [];

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ background: '#f5f2ec', color: '#1a1a1a', fontFamily: '"Georgia", "Times New Roman", serif', minHeight: '100vh' }}>
      {/* Editorial masthead */}
      <header style={{ borderBottom: '3px double #1a1a1a', borderTop: '3px double #1a1a1a', padding: '1.25rem 4rem', textAlign: 'center', background: '#fff' }}>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>
          {dateStr}
        </p>
        <h1 style={{ fontFamily: '"Georgia", serif', fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: '0.5rem' }}>
          {p.name || 'Portfolio'}
        </h1>
        {p.title && (
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666' }}>{p.title}</p>
        )}
        <nav style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          {['Work', 'About', 'Experience', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#444', textDecoration: 'none' }}>{l}</a>
          ))}
        </nav>
      </header>

      {/* Hero image block */}
      <section style={{ background: '#fff', position: 'relative' }}>
        {p.photo ? (
          <div style={{ position: 'relative', overflow: 'hidden', height: 'clamp(300px, 50vw, 600px)' }}>
            <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(15%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: '2rem', left: '3rem', right: '3rem', color: '#fff' }}>
              {p.bio && <p style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', lineHeight: 1.5, maxWidth: '36rem', fontStyle: 'italic' }}>"{p.bio.substring(0, 120)}{p.bio.length > 120 ? '…' : ''}"</p>}
            </div>
          </div>
        ) : (
          <div style={{ height: 'clamp(200px, 30vw, 400px)', background: `${primary}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
            {p.bio && <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)', lineHeight: 1.6, maxWidth: '40rem', textAlign: 'center', fontStyle: 'italic', color: '#333' }}>"{p.bio}"</p>}
          </div>
        )}
      </section>

      {/* Main editorial grid */}
      {projects.length > 0 && (
        <section id="work" style={{ padding: '4rem' }}>
          {/* Feature story - first project */}
          {projects[0] && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem', borderBottom: '1px solid #c8c0b0', paddingBottom: '3rem', flexWrap: 'wrap' }}>
              <div>
                {projects[0].thumbnail ? (
                  <img src={projects[0].thumbnail} alt={projects[0].title} style={{ width: '100%', objectFit: 'cover', aspectRatio: '4/3' }} />
                ) : (
                  <div style={{ background: `${primary}15`, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '4rem', opacity: 0.3 }}>◻</span>
                  </div>
                )}
              </div>
              <div style={{ paddingTop: '1rem' }}>
                <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: primary, marginBottom: '1rem', fontWeight: 700 }}>Feature</p>
                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1rem' }}>{projects[0].title}</h2>
                <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '0.95rem' }}>{projects[0].description}</p>
                {projects[0].url && <a href={projects[0].url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: primary, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em' }}>READ MORE →</a>}
              </div>
            </div>
          )}
          {/* Rest of projects - smaller grid */}
          {projects.length > 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2.5rem' }}>
              {projects.slice(1).map((proj) => (
                <div key={proj.id}>
                  {proj.thumbnail ? (
                    <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', objectFit: 'cover', aspectRatio: '4/3', marginBottom: '1rem' }} />
                  ) : (
                    <div style={{ background: '#e5e0d9', aspectRatio: '4/3', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '2rem', opacity: 0.3 }}>◻</span>
                    </div>
                  )}
                  {proj.category && <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: primary, marginBottom: '0.4rem', fontWeight: 700 }}>{proj.category}</p>}
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.5rem' }}>{proj.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6 }}>{proj.description}</p>
                  {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: primary, textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, display: 'block', marginTop: '0.75rem' }}>Read →</a>}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section id="experience" style={{ background: '#fff', padding: '4rem', borderTop: '1px solid #c8c0b0' }}>
          <h2 style={{ fontFamily: '"Georgia", serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', borderBottom: '1px solid #c8c0b0', paddingBottom: '1rem' }}>
            Career
          </h2>
          <div style={{ columns: '2 300px', gap: '3rem' }}>
            {experience.map(exp => (
              <div key={exp.id} style={{ breakInside: 'avoid', marginBottom: '2rem' }}>
                <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', marginBottom: '0.25rem' }}>
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </p>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{exp.position}</h3>
                <p style={{ color: primary, fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>{exp.company}</p>
                {exp.description && <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.7 }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ padding: '3rem 4rem', borderTop: '1px solid #c8c0b0', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <h3 style={{ fontFamily: '"Georgia", serif', fontSize: '1rem', fontWeight: 700, flexShrink: 0 }}>Expertise:</h3>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.875rem', color: '#555', lineHeight: 2 }}>
            {skills.map(s => s.name).join(' · ')}
          </p>
        </section>
      )}

      {/* Footer */}
      <footer id="contact" style={{ background: '#1a1a1a', color: '#fff', padding: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', borderTop: '3px solid #1a1a1a' }}>
        <div>
          <h2 style={{ fontFamily: '"Georgia", serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{p.name}</h2>
          {p.email && <a href={`mailto:${p.email}`} style={{ fontFamily: 'Inter, system-ui, sans-serif', color: primary, textDecoration: 'none', fontSize: '0.9rem' }}>{p.email}</a>}
        </div>
        <div style={{ fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', gap: '1.5rem' }}>
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.8rem' }}>LinkedIn</a>}
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.8rem' }}>GitHub</a>}
          {p.twitter && <a href={p.twitter} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.8rem' }}>Twitter</a>}
        </div>
      </footer>
    </div>
  );
}
