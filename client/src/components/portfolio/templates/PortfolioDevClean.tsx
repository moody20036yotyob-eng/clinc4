import type { PortfolioData } from '@shared/types/portfolio';

const LEVEL_COLORS = ['#e2e8f0', '#bfdbfe', '#93c5fd', '#60a5fa', '#2563eb'];

function ContribSquares({ count, color }: { count: number; color: string }) {
  const squares = Array.from({ length: 52 * 7 }, (_, i) => {
    const val = Math.random();
    const intensity = val > 0.8 ? 4 : val > 0.6 ? 3 : val > 0.4 ? 2 : val > 0.2 ? 1 : 0;
    return intensity;
  });
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(52, 10px)`, gap: '2px', overflowX: 'auto' }}>
      {squares.slice(0, Math.min(count * 7, squares.length)).map((level, i) => (
        <div key={i} style={{ width: '10px', height: '10px', borderRadius: '2px', background: level === 0 ? '#e2e8f0' : LEVEL_COLORS[level] || color }} />
      ))}
    </div>
  );
}

export function PortfolioDevClean({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#2563eb';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];
  const experience = data.experience || [];

  const skillCategories = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    const cat = s.category || 'General';
    acc[cat] = acc[cat] || [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <div style={{ background: '#f6f8fa', color: '#24292f', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ background: '#24292f', color: '#fff', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>⌥ {p.name || 'Developer'}</span>
          {['projects', 'skills', 'experience', 'contact'].map(l => (
            <a key={l} href={`#${l}`} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.85rem' }}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '0.35rem 0.75rem', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.15)' }}>GitHub</a>}
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ background: primary, color: '#fff', padding: '0.35rem 0.75rem', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.8rem' }}>LinkedIn</a>}
        </div>
      </header>

      {/* Profile section */}
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Left: profile card */}
          <div style={{ width: '18rem', flexShrink: 0 }}>
            <div style={{ background: '#fff', border: '1px solid #d0d7de', borderRadius: '0.75rem', overflow: 'hidden', marginBottom: '1rem' }}>
              {p.photo ? (
                <img src={p.photo} alt={p.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', aspectRatio: '1', background: '#f6f8fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', color: '#d0d7de' }}>
                  👤
                </div>
              )}
              <div style={{ padding: '1.25rem' }}>
                <h1 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{p.name || 'Developer'}</h1>
                {p.title && <p style={{ color: '#57606a', fontSize: '0.875rem', marginBottom: '1rem' }}>{p.title}</p>}
                {p.bio && <p style={{ color: '#24292f', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>{p.bio}</p>}
                {p.email && <a href={`mailto:${p.email}`} style={{ display: 'block', textAlign: 'center', background: primary, color: '#fff', padding: '0.5rem', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>Contact</a>}
                <div style={{ fontSize: '0.8rem', color: '#57606a', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {p.location && <span>📍 {p.location}</span>}
                  {p.website && <a href={p.website} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none' }}>🔗 {p.website}</a>}
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: '#57606a', textDecoration: 'none' }}>⌥ {p.github.replace('https://github.com/', '')}</a>}
                  {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#57606a', textDecoration: 'none' }}>in {p.linkedin.replace('https://www.linkedin.com/in/', '').replace('https://linkedin.com/in/', '')}</a>}
                </div>
              </div>
            </div>
          </div>

          {/* Right: main content */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            {/* Contribution-style visual */}
            <div style={{ background: '#fff', border: '1px solid #d0d7de', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
              <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.75rem' }}>Activity</p>
              <div style={{ overflowX: 'auto' }}>
                <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
                  {Array.from({ length: Math.min(skills.length * 10 + projects.length * 5 + 50, 200) }).map((_, i) => {
                    const val = Math.sin(i * 0.3) * 0.5 + Math.random() * 0.5;
                    const level = val > 0.75 ? 4 : val > 0.5 ? 3 : val > 0.25 ? 2 : val > 0.1 ? 1 : 0;
                    const bg = level === 0 ? '#ebedf0' : level === 1 ? `${primary}30` : level === 2 ? `${primary}60` : level === 3 ? `${primary}90` : primary;
                    return <div key={i} style={{ width: '10px', height: '10px', borderRadius: '2px', background: bg }} />;
                  })}
                </div>
              </div>
            </div>

            {/* Pinned projects */}
            <section id="projects" style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.75rem', color: '#57606a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pinned Repositories</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ background: '#fff', border: '1px solid #d0d7de', borderRadius: '0.75rem', padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: primary, fontSize: '0.9rem' }}>⌥</span>
                      <a href={proj.github || proj.url || '#'} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>{proj.title}</a>
                      {proj.featured && <span style={{ border: '1px solid #d0d7de', borderRadius: '2rem', fontSize: '0.65rem', padding: '0.1rem 0.4rem', color: '#57606a' }}>Public</span>}
                    </div>
                    <p style={{ color: '#57606a', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>{proj.description}</p>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      {(proj.technologies || []).slice(0, 2).map(t => (
                        <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#57606a' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: primary, display: 'inline-block' }} />
                          {t}
                        </span>
                      ))}
                      {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: '#57606a', textDecoration: 'none' }}>↗ Demo</a>}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            {skills.length > 0 && (
              <section id="skills" style={{ background: '#fff', border: '1px solid #d0d7de', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem', color: '#57606a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Languages & Tools</h2>
                {Object.entries(skillCategories).map(([cat, catSkills]) => (
                  <div key={cat} style={{ marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.75rem', color: '#57606a', marginBottom: '0.5rem', fontWeight: 600 }}>{cat}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {catSkills.map(s => (
                        <span key={s.id} style={{ background: `${primary}12`, color: primary, fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '2rem', fontWeight: 600, border: `1px solid ${primary}25` }}>{s.name}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <section id="experience" style={{ background: '#fff', border: '1px solid #d0d7de', borderRadius: '0.75rem', padding: '1.25rem' }}>
                <h2 style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem', color: '#57606a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Experience</h2>
                {experience.map(exp => (
                  <div key={exp.id} style={{ paddingBottom: '1rem', borderBottom: '1px solid #f6f8fa', marginBottom: '1rem' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '0.9rem' }}>{exp.position}</h3>
                    <p style={{ color: primary, fontSize: '0.8rem', fontWeight: 600 }}>{exp.company}</p>
                    <p style={{ color: '#888', fontSize: '0.75rem', marginBottom: '0.4rem' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                    {exp.description && <p style={{ color: '#57606a', fontSize: '0.8rem', lineHeight: 1.6 }}>{exp.description}</p>}
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>

        {/* Contact */}
        <section id="contact" style={{ textAlign: 'center', padding: '3rem 0' }}>
          {p.email && (
            <a href={`mailto:${p.email}`} style={{ display: 'inline-block', background: primary, color: '#fff', padding: '0.75rem 2.5rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 700 }}>
              Get In Touch
            </a>
          )}
        </section>
      </div>
    </div>
  );
}
