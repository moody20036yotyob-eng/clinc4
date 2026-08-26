import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioMinimalLine({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];
  const experience = data.experience || [];

  const sections = [
    { id: 'intro', label: null },
    { id: 'projects', label: 'Work' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div style={{ background: '#fff', color: '#111', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem 5rem 2rem 7rem', borderBottom: '1px solid #f0f0f0' }}>
        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{p.name || 'Portfolio'}</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {p.email && <a href={`mailto:${p.email}`} style={{ color: '#666', textDecoration: 'none', fontSize: '0.8rem' }}>{p.email}</a>}
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none', fontSize: '0.8rem' }}>GitHub ↗</a>}
        </div>
      </div>

      {/* Main with vertical line */}
      <div style={{ position: 'relative', paddingLeft: '5rem' }}>
        {/* Vertical line */}
        <div style={{ position: 'absolute', left: '3rem', top: 0, bottom: 0, width: '1px', background: '#e5e5e5' }} />

        {/* Hero */}
        <section id="intro" style={{ paddingLeft: '3rem', paddingTop: '6rem', paddingBottom: '6rem', paddingRight: '4rem', maxWidth: '60rem', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '-0.45rem', top: '6rem', width: '0.875rem', height: '0.875rem', borderRadius: '50%', background: primary, border: '2px solid #fff', boxShadow: `0 0 0 2px ${primary}` }} />
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
            {p.name || 'Your Name'}
          </h1>
          {p.title && <p style={{ color: primary, fontSize: '1.1rem', fontWeight: 500, marginBottom: '1.5rem' }}>{p.title}</p>}
          {p.bio && <p style={{ color: '#555', lineHeight: 1.8, maxWidth: '36rem', fontSize: '1rem' }}>{p.bio}</p>}
        </section>

        {/* Projects */}
        {projects.length > 0 && (
          <section id="projects" style={{ paddingLeft: '3rem', paddingBottom: '5rem', paddingRight: '4rem', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-0.45rem', top: '0.1rem', width: '0.875rem', height: '0.875rem', borderRadius: '50%', background: '#e5e5e5', border: '2px solid #fff', boxShadow: '0 0 0 2px #e5e5e5' }} />
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: '2.5rem', fontWeight: 600 }}>Work</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ border: '1px solid #f0f0f0', borderRadius: '0.75rem', padding: '1.5rem', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = primary)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#f0f0f0')}>
                  {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '9rem', objectFit: 'cover', borderRadius: '0.375rem', marginBottom: '1rem' }} />}
                  <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>{proj.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>{proj.description}</p>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, fontSize: '0.75rem', textDecoration: 'none', fontWeight: 600 }}>Live ↗</a>}
                    {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: '#999', fontSize: '0.75rem', textDecoration: 'none' }}>Code ↗</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section id="skills" style={{ paddingLeft: '3rem', paddingBottom: '5rem', paddingRight: '4rem', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-0.45rem', top: '0.1rem', width: '0.875rem', height: '0.875rem', borderRadius: '50%', background: '#e5e5e5', border: '2px solid #fff', boxShadow: '0 0 0 2px #e5e5e5' }} />
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: '2rem', fontWeight: 600 }}>Skills</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skills.map(s => (
                <span key={s.id} style={{ padding: '0.35rem 0.875rem', border: '1px solid #e5e5e5', borderRadius: '2rem', fontSize: '0.8rem', color: '#444' }}>{s.name}</span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section id="experience" style={{ paddingLeft: '3rem', paddingBottom: '5rem', paddingRight: '4rem', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-0.45rem', top: '0.1rem', width: '0.875rem', height: '0.875rem', borderRadius: '50%', background: '#e5e5e5', border: '2px solid #fff', boxShadow: '0 0 0 2px #e5e5e5' }} />
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: '2rem', fontWeight: 600 }}>Experience</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {experience.map(exp => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{exp.position}</h3>
                      <p style={{ color: '#555', fontSize: '0.85rem' }}>{exp.company}</p>
                    </div>
                    <span style={{ color: '#999', fontSize: '0.75rem' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  {exp.description && <p style={{ color: '#666', fontSize: '0.8rem', lineHeight: 1.6, marginTop: '0.5rem' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" style={{ paddingLeft: '3rem', paddingBottom: '6rem', paddingRight: '4rem', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '-0.45rem', top: '0.1rem', width: '0.875rem', height: '0.875rem', borderRadius: '50%', background: primary, border: '2px solid #fff', boxShadow: `0 0 0 2px ${primary}` }} />
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: '2rem', fontWeight: 600 }}>Contact</p>
          {p.email && (
            <a href={`mailto:${p.email}`} style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111', textDecoration: 'none', display: 'block', marginBottom: '1rem' }}>
              {p.email}
            </a>
          )}
          {p.location && <p style={{ color: '#888', fontSize: '0.85rem' }}>{p.location}</p>}
        </section>
      </div>
    </div>
  );
}
