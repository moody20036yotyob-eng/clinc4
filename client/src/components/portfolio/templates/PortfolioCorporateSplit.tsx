import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioCorporateSplit({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];
  const experience = data.experience || [];
  const education = data.education || [];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Fixed left sidebar */}
      <aside style={{
        width: '17rem', flexShrink: 0, background: '#1a202c', color: '#fff',
        padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '2rem',
        position: 'sticky', top: 0, height: '100vh', overflow: 'auto'
      }}>
        {p.photo ? (
          <img src={p.photo} alt={p.name} style={{ width: '6rem', height: '6rem', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${primary}` }} />
        ) : (
          <div style={{ width: '6rem', height: '6rem', borderRadius: '50%', background: `${primary}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '2.5rem' }}>👤</span>
          </div>
        )}
        <div>
          <h1 style={{ fontWeight: 800, fontSize: '1.2rem', lineHeight: 1.2, marginBottom: '0.25rem' }}>{p.name || 'Your Name'}</h1>
          {p.title && <p style={{ color: primary, fontSize: '0.8rem', fontWeight: 600 }}>{p.title}</p>}
        </div>
        {/* Nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[['About', 'about'], ['Experience', 'experience'], ['Projects', 'projects'], ['Skills', 'skills'], ['Contact', 'contact']].map(([label, id]) => (
            <a key={id} href={`#${id}`} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.85rem', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}>
              {label}
            </a>
          ))}
        </nav>
        {/* Contact info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
          {p.email && <a href={`mailto:${p.email}`} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', wordBreak: 'break-all' }}>{p.email}</a>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.website && <a href={p.website} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none' }}>{p.website}</a>}
        </div>
        {/* Social */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.8rem' }}>LinkedIn ↗</a>}
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.8rem' }}>GitHub ↗</a>}
          {p.twitter && <a href={p.twitter} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.8rem' }}>Twitter ↗</a>}
        </div>
      </aside>

      {/* Right scrollable content */}
      <main style={{ flex: 1, background: '#f7f8fa', overflow: 'auto' }}>
        {/* About */}
        <section id="about" style={{ background: '#fff', padding: '3.5rem', borderBottom: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1.5rem', fontWeight: 600 }}>About</h2>
          {p.bio && <p style={{ color: '#374151', lineHeight: 1.8, fontSize: '0.95rem', maxWidth: '50rem' }}>{p.bio}</p>}
        </section>

        {/* Experience */}
        {experience.length > 0 && (
          <section id="experience" style={{ padding: '3.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '2rem', fontWeight: 600 }}>Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {experience.map(exp => (
                <div key={exp.id} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '3px', background: primary, flexShrink: 0, alignSelf: 'stretch', borderRadius: '2px', minHeight: '3rem' }} />
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111' }}>{exp.position}</h3>
                    <p style={{ color: primary, fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>{exp.company}</p>
                    <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.75rem' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                    {exp.description && <p style={{ color: '#4a5568', fontSize: '0.85rem', lineHeight: 1.7 }}>{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section id="projects" style={{ padding: '3.5rem', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '2rem', fontWeight: 600 }}>Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {projects.map(proj => (
                <div key={proj.id} style={{ border: '1px solid #e2e8f0', borderRadius: '0.75rem', overflow: 'hidden', background: '#f7f8fa' }}>
                  {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '9rem', objectFit: 'cover' }} />}
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>{proj.title}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.8rem', lineHeight: 1.6 }}>{proj.description}</p>
                    {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, fontSize: '0.78rem', textDecoration: 'none', fontWeight: 600, display: 'block', marginTop: '0.75rem' }}>View →</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section id="skills" style={{ padding: '3.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '2rem', fontWeight: 600 }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {skills.map(s => (
                <span key={s.id} style={{ padding: '0.4rem 1rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '2rem', fontSize: '0.83rem', color: '#374151' }}>{s.name}</span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section style={{ padding: '3.5rem', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '2rem', fontWeight: 600 }}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{edu.degree} in {edu.field}</h3>
                <p style={{ color: primary, fontSize: '0.85rem', fontWeight: 600 }}>{edu.institution}</p>
                <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
              </div>
            ))}
          </section>
        )}

        {/* Contact */}
        <section id="contact" style={{ padding: '3.5rem', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.75rem' }}>Get In Touch</h2>
          {p.email && (
            <a href={`mailto:${p.email}`} style={{ display: 'inline-block', background: primary, color: '#fff', padding: '0.75rem 2.5rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>{p.email}</a>
          )}
        </section>
      </main>
    </div>
  );
}
