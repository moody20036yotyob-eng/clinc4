import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioCorporateBlue({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1e3a5f';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];
  const experience = data.experience || [];

  return (
    <div style={{ background: '#f8f9fc', color: '#1a202c', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Navy Header */}
      <header style={{ background: primary, color: '#fff', padding: '0 4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.5rem' }}>
          <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.01em' }}>{p.name || 'Portfolio'}</span>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            {['About', 'Experience', 'Projects', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>{l}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="about" style={{ background: '#fff', padding: '5rem 4rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '60rem', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          {p.photo ? (
            <img src={p.photo} alt={p.name} style={{ width: '10rem', height: '10rem', borderRadius: '50%', objectFit: 'cover', border: `4px solid ${primary}20`, flexShrink: 0 }} />
          ) : (
            <div style={{ width: '10rem', height: '10rem', borderRadius: '50%', background: `${primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '3rem' }}>👤</span>
            </div>
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem', color: '#0f172a' }}>
              {p.name || 'Your Name'}
            </h1>
            {p.title && <p style={{ fontSize: '1.1rem', color: primary, fontWeight: 600, marginBottom: '1rem' }}>{p.title}</p>}
            {p.bio && <p style={{ color: '#4a5568', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: '38rem' }}>{p.bio}</p>}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {p.email && <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '0.6rem 1.5rem', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}>Contact Me</a>}
              {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ border: `1px solid ${primary}`, color: primary, padding: '0.6rem 1.5rem', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}>LinkedIn</a>}
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      {experience.length > 0 && (
        <section id="experience" style={{ padding: '4rem', maxWidth: '68rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: '#0f172a' }}>Professional Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {experience.map(exp => (
              <div key={exp.id} style={{ background: '#fff', padding: '1.75rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', borderLeft: `4px solid ${primary}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>{exp.position}</h3>
                    <p style={{ color: primary, fontWeight: 600, fontSize: '0.875rem' }}>{exp.company}</p>
                  </div>
                  <span style={{ color: '#6b7280', fontSize: '0.8rem', background: '#f3f4f6', padding: '0.25rem 0.75rem', borderRadius: '2rem' }}>
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && <p style={{ color: '#4a5568', fontSize: '0.875rem', lineHeight: 1.7 }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section id="projects" style={{ padding: '4rem', background: '#fff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '68rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: '#0f172a' }}>Case Studies</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ background: '#f8f9fc', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #e2e8f0', transition: 'box-shadow 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                  {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '10rem', objectFit: 'cover' }} />}
                  <div style={{ padding: '1.5rem' }}>
                    {proj.category && <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: primary, fontWeight: 700 }}>{proj.category}</span>}
                    <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', marginTop: '0.5rem', color: '#0f172a' }}>{proj.title}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.6 }}>{proj.description}</p>
                    {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600, display: 'block', marginTop: '1rem' }}>View Case Study →</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ padding: '4rem', maxWidth: '68rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: '#0f172a' }}>Core Competencies</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {skills.map(s => (
              <span key={s.id} style={{ padding: '0.5rem 1.25rem', background: `${primary}10`, color: primary, borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: 600 }}>{s.name}</span>
            ))}
          </div>
        </section>
      )}

      {/* Contact footer */}
      <footer id="contact" style={{ background: primary, color: '#fff', padding: '3rem 4rem', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.75rem' }}>Ready to Work Together?</h2>
        {p.email && (
          <a href={`mailto:${p.email}`} style={{ color: '#fff', fontSize: '1rem', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.5)' }}>{p.email}</a>
        )}
        {p.location && <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>{p.location}</p>}
      </footer>
    </div>
  );
}
