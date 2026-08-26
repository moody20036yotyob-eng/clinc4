import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioLuxuryDark({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#e5373d';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];
  const experience = data.experience || [];

  const CHARCOAL = '#1c1c1e';
  const OFF_WHITE = '#f5f5f0';

  return (
    <div style={{ background: CHARCOAL, color: OFF_WHITE, fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Minimal nav */}
      <nav style={{ padding: '2rem 5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: `${CHARCOAL}f0`, backdropFilter: 'blur(10px)', zIndex: 10 }}>
        <span style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666' }}>{p.name}</span>
        {p.email && <a href={`mailto:${p.email}`} style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: primary, textDecoration: 'none' }}>Contact</a>}
      </nav>

      {/* Hero */}
      <section style={{ padding: '8rem 5rem', borderBottom: '1px solid #2a2a2c' }}>
        <p style={{ color: '#555', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '2rem' }}>{p.title || 'Creative Director'}</p>
        <h1 style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.9, marginBottom: '3rem', color: OFF_WHITE }}>
          {(p.name || 'Your Name').split(' ').map((word, i) => (
            <span key={i} style={{ display: 'block' }}>{word}</span>
          ))}
        </h1>
        {p.bio && <p style={{ color: '#888', maxWidth: '40rem', lineHeight: 1.8, fontSize: '1rem' }}>{p.bio}</p>}
      </section>

      {/* Full-width project heroes */}
      {projects.length > 0 && (
        <section>
          {projects.map((proj, i) => (
            <div key={proj.id} style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', borderBottom: '1px solid #2a2a2c' }}>
              {proj.thumbnail ? (
                <img src={proj.thumbnail} alt={proj.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)' }} />
              ) : (
                <div style={{ position: 'absolute', inset: 0, background: `hsl(${(i * 43) % 360}, 15%, 12%)` }} />
              )}
              <div style={{ position: 'relative', zIndex: 1, padding: '4rem 5rem', width: '100%' }}>
                <div style={{ width: '2.5rem', height: '2px', background: primary, marginBottom: '1.5rem' }} />
                <p style={{ color: '#888', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{proj.category || 'Project'}</p>
                <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, color: OFF_WHITE, marginBottom: '1rem' }}>{proj.title}</h2>
                <p style={{ color: '#999', maxWidth: '36rem', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '1.5rem' }}>{proj.description}</p>
                {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>View Project →</a>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills + Experience */}
      <section style={{ padding: '6rem 5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', borderBottom: '1px solid #2a2a2c' }}>
        {skills.length > 0 && (
          <div>
            <p style={{ color: primary, fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '2rem' }}>Skills</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {skills.map(s => (
                <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #2a2a2c' }}>
                  <span style={{ fontSize: '0.88rem', color: '#ccc' }}>{s.name}</span>
                  {s.level && <div style={{ display: 'flex', gap: '4px' }}>{[1,2,3,4,5].map(n => <div key={n} style={{ width: '6px', height: '6px', borderRadius: '50%', background: n <= (s.level ?? 0) ? primary : '#333' }} />)}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
        {experience.length > 0 && (
          <div>
            <p style={{ color: primary, fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '2rem' }}>Experience</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {experience.slice(0, 4).map(exp => (
                <div key={exp.id}>
                  <h3 style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.2rem', color: OFF_WHITE }}>{exp.position}</h3>
                  <p style={{ color: '#666', fontSize: '0.78rem' }}>{exp.company} · {exp.startDate}–{exp.current ? 'Now' : exp.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Contact */}
      <section style={{ padding: '8rem 5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '2rem', color: OFF_WHITE }}>
          Start a<br /><span style={{ color: primary }}>conversation</span>
        </h2>
        {p.email && <a href={`mailto:${p.email}`} style={{ display: 'inline-block', border: `1px solid ${primary}`, color: primary, padding: '1rem 3rem', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.email}</a>}
      </section>
    </div>
  );
}
