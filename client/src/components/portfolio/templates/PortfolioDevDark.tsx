import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioDevDark({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#61dafb';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];
  const experience = data.experience || [];

  // Categorize skills
  const CATEGORIES = ['Languages', 'Frameworks', 'Tools', 'Cloud', 'Other'];
  const skillsByCategory = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    const cat = s.category || 'Other';
    const matched = CATEGORIES.find(c => c.toLowerCase() === cat.toLowerCase()) || 'Other';
    acc[matched] = acc[matched] || [];
    acc[matched].push(s);
    return acc;
  }, {});

  const activeCategories = CATEGORIES.filter(c => skillsByCategory[c] && skillsByCategory[c].length > 0);
  if (skills.length > 0 && activeCategories.length === 0) {
    skillsByCategory['Skills'] = skills;
    activeCategories.push('Skills');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#1e1e1e', color: '#d4d4d4', fontFamily: '"Segoe UI", Inter, system-ui, sans-serif' }}>
      {/* VS Code sidebar */}
      <div style={{ width: '14rem', background: '#252526', borderRight: '1px solid #3c3c3c', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        {/* Activity bar */}
        <div style={{ padding: '1rem 0.75rem', borderBottom: '1px solid #3c3c3c' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', marginBottom: '0.75rem', fontWeight: 600 }}>Explorer</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
            {[['PORTFOLIO', null], ['about.ts', 'about'], ['projects.tsx', 'projects'], ['skills.json', 'skills'], ['experience.md', 'experience'], ['contact.sh', 'contact']].map(([name, id]) => (
              <a key={name} href={id ? `#${id}` : undefined} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.2rem 0.5rem', color: id ? '#ccc' : '#bbb', textDecoration: 'none', fontSize: id ? '0.82rem' : '0.65rem', fontWeight: id ? 400 : 700, letterSpacing: id ? 0 : '0.08em', borderRadius: '0.25rem', cursor: id ? 'pointer' : 'default' }}
                onMouseEnter={e => id && (e.currentTarget.style.background = '#2a2d2e')}
                onMouseLeave={e => id && (e.currentTarget.style.background = 'transparent')}>
                {id ? <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{name?.endsWith('.ts') || name?.endsWith('.tsx') ? '📘' : name?.endsWith('.json') ? '📋' : name?.endsWith('.md') ? '📝' : '💻'}</span> : null}
                <span style={{ color: id ? '#ccc' : '#6c7a9c' }}>{name}</span>
              </a>
            ))}
          </div>
        </div>
        {/* Contact quick links */}
        <div style={{ padding: '1rem 0.75rem', marginTop: 'auto', borderTop: '1px solid #3c3c3c' }}>
          <p style={{ fontSize: '0.65rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Quick Links</p>
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: '#888', textDecoration: 'none', fontSize: '0.8rem', padding: '0.2rem 0' }}>GitHub ↗</a>}
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: '#888', textDecoration: 'none', fontSize: '0.8rem', padding: '0.2rem 0' }}>LinkedIn ↗</a>}
          {p.email && <a href={`mailto:${p.email}`} style={{ display: 'block', color: primary, textDecoration: 'none', fontSize: '0.8rem', padding: '0.2rem 0' }}>Email ↗</a>}
        </div>
      </div>

      {/* Main editor area */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        {/* Tab bar */}
        <div style={{ background: '#252526', borderBottom: '1px solid #3c3c3c', display: 'flex', alignItems: 'center' }}>
          {['about.ts', 'projects.tsx', 'skills.json'].map((tab, i) => (
            <div key={tab} style={{ padding: '0.6rem 1.25rem', fontSize: '0.8rem', color: i === 0 ? '#fff' : '#888', background: i === 0 ? '#1e1e1e' : 'transparent', borderRight: '1px solid #3c3c3c', cursor: 'pointer' }}>
              {tab}
            </div>
          ))}
        </div>

        <div style={{ padding: '2rem 3rem', maxWidth: '68rem' }}>
          {/* About */}
          <section id="about" style={{ marginBottom: '3rem', fontFamily: '"Courier New", monospace' }}>
            <p style={{ color: '#6a9955', marginBottom: '0.5rem' }}>// about.ts</p>
            <p style={{ color: '#c586c0' }}>const <span style={{ color: '#9cdcfe' }}>developer</span> = {'{'}</p>
            <div style={{ paddingLeft: '2rem' }}>
              {p.photo && <p style={{ marginBottom: '0.25rem' }}>
                <span style={{ color: '#9cdcfe' }}>avatar</span>: <span style={{ color: '#ce9178' }}>"{p.photo}"</span>,
              </p>}
              <p style={{ marginBottom: '0.25rem' }}>
                <span style={{ color: '#9cdcfe' }}>name</span>: <span style={{ color: '#ce9178' }}>"{p.name || 'Developer'}"</span>,
              </p>
              {p.title && <p style={{ marginBottom: '0.25rem' }}>
                <span style={{ color: '#9cdcfe' }}>role</span>: <span style={{ color: '#ce9178' }}>"{p.title}"</span>,
              </p>}
              {p.bio && <p style={{ marginBottom: '0.25rem' }}>
                <span style={{ color: '#9cdcfe' }}>bio</span>: <span style={{ color: '#ce9178' }}>"{p.bio.substring(0, 100)}{p.bio.length > 100 ? '...' : ''}"</span>,
              </p>}
              {p.location && <p style={{ marginBottom: '0.25rem' }}>
                <span style={{ color: '#9cdcfe' }}>location</span>: <span style={{ color: '#ce9178' }}>"{p.location}"</span>,
              </p>}
              <p style={{ marginBottom: '0.25rem' }}>
                <span style={{ color: '#9cdcfe' }}>available</span>: <span style={{ color: '#569cd6' }}>true</span>
              </p>
            </div>
            <p>{'}'}</p>
          </section>

          {/* Projects */}
          {projects.length > 0 && (
            <section id="projects" style={{ marginBottom: '3rem' }}>
              <p style={{ color: '#6a9955', fontFamily: '"Courier New", monospace', marginBottom: '1rem' }}>// projects.tsx — {projects.length} repos</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '0.5rem', padding: '1.25rem', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = primary)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#3c3c3c')}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontWeight: 700, fontSize: '0.9rem', color: primary }}>{proj.title}</h3>
                      {proj.featured && (
                        <span style={{ color: '#febc2e', fontSize: '0.75rem' }}>★</span>
                      )}
                    </div>
                    <p style={{ color: '#888', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>{proj.description}</p>
                    {(proj.technologies || []).length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
                        {(proj.technologies || []).map(t => <span key={t} style={{ fontSize: '0.7rem', color: '#c586c0', background: '#2d2d2d', padding: '0.15rem 0.5rem', borderRadius: '0.25rem' }}>{t}</span>)}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.75rem' }}>⌥ Code</a>}
                      {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none', fontSize: '0.75rem' }}>↗ Demo</a>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills by category */}
          {skills.length > 0 && (
            <section id="skills" style={{ marginBottom: '3rem' }}>
              <p style={{ color: '#6a9955', fontFamily: '"Courier New", monospace', marginBottom: '1rem' }}>// skills.json</p>
              <div style={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '0.5rem', padding: '1.5rem', fontFamily: '"Courier New", monospace', fontSize: '0.85rem' }}>
                <p style={{ color: '#d4d4d4' }}>{'{'}</p>
                {activeCategories.map((cat, ci) => (
                  <div key={cat} style={{ paddingLeft: '1.5rem' }}>
                    <p style={{ color: '#9cdcfe' }}>"{cat}": [</p>
                    <div style={{ paddingLeft: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {(skillsByCategory[cat] || []).map((s, si) => (
                        <span key={s.id} style={{ color: '#ce9178' }}>"{s.name}"{si < (skillsByCategory[cat] || []).length - 1 ? ', ' : ''}</span>
                      ))}
                    </div>
                    <p style={{ color: '#9cdcfe' }}>]{ci < activeCategories.length - 1 ? ',' : ''}</p>
                  </div>
                ))}
                <p style={{ color: '#d4d4d4' }}>{'}'}</p>
              </div>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section id="experience" style={{ marginBottom: '3rem' }}>
              <p style={{ color: '#6a9955', fontFamily: '"Courier New", monospace', marginBottom: '1rem' }}>// experience.md</p>
              {experience.map(exp => (
                <div key={exp.id} style={{ marginBottom: '1.5rem', paddingLeft: '1rem', borderLeft: `2px solid ${primary}` }}>
                  <h3 style={{ fontWeight: 700, color: '#fff' }}>{exp.position}</h3>
                  <p style={{ color: primary, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{exp.company}</p>
                  <p style={{ color: '#888', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                  {exp.description && <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.7 }}>{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Contact */}
          <section id="contact" style={{ marginBottom: '2rem', fontFamily: '"Courier New", monospace' }}>
            <p style={{ color: '#6a9955', marginBottom: '1rem' }}>// contact.sh</p>
            <div style={{ background: '#252526', border: '1px solid #3c3c3c', borderRadius: '0.5rem', padding: '1.5rem' }}>
              <p style={{ marginBottom: '0.5rem' }}><span style={{ color: '#888' }}>$ </span><span style={{ color: '#9cdcfe' }}>open</span> <span style={{ color: '#ce9178' }}>mailto:{p.email || 'hello@example.com'}</span></p>
              {p.email && <a href={`mailto:${p.email}`} style={{ display: 'inline-block', marginTop: '1rem', background: primary, color: '#000', padding: '0.6rem 1.5rem', borderRadius: '0.375rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem', fontFamily: 'Inter, system-ui, sans-serif' }}>Send Message</a>}
            </div>
          </section>
        </div>

        {/* Status bar */}
        <div style={{ background: primary, color: '#000', padding: '0.25rem 1.5rem', fontSize: '0.75rem', display: 'flex', gap: '1.5rem', position: 'sticky', bottom: 0 }}>
          <span>⌥ {p.name}</span>
          <span>{p.title}</span>
          {p.location && <span>📍 {p.location}</span>}
          <span style={{ marginLeft: 'auto' }}>UTF-8</span>
        </div>
      </main>
    </div>
  );
}
