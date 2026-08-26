import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioCorporateWhite({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];
  const services = data.services || [];
  const experience = data.experience || [];

  const yearsExp = experience.length > 0 ? new Date().getFullYear() - parseInt(experience[experience.length - 1]?.startDate?.substring(0, 4) || '2020') : 0;

  return (
    <div style={{ background: '#fff', color: '#111', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Top bar in primaryColor */}
      <div style={{ height: '4px', background: primary }} />

      {/* Header */}
      <header style={{ padding: '1.5rem 5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0' }}>
        <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>{p.name || 'Portfolio'}</span>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          {['About', 'Services', 'Work', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: '#555', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>{l}</a>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <section id="about" style={{ padding: '6rem 5rem', maxWidth: '75rem', margin: '0 auto' }}>
        <div style={{ maxWidth: '50rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: primary, fontWeight: 700, marginBottom: '1.5rem' }}>Professional Portfolio</p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1.5rem', color: '#0a0a0a' }}>
            {p.name || 'Your Name'}
          </h1>
          {p.title && <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '1.5rem', fontWeight: 400 }}>{p.title}</p>}
          {p.bio && <p style={{ color: '#666', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '0.95rem' }}>{p.bio}</p>}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {p.email && <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '0.75rem 2rem', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 700 }}>Get In Touch</a>}
            {p.resume && <a href={p.resume} target="_blank" rel="noopener noreferrer" style={{ border: '1px solid #ddd', color: '#333', padding: '0.75rem 2rem', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}>Download CV</a>}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#fafafa', padding: '3rem 5rem', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', maxWidth: '75rem', margin: '0 auto' }}>
          {[
            { n: yearsExp > 0 ? `${yearsExp}+` : '5+', label: 'Years Experience' },
            { n: `${projects.length}+`, label: 'Projects Completed' },
            { n: `${skills.length}+`, label: 'Skills Mastered' },
            { n: services.length > 0 ? `${services.length}` : '10+', label: 'Services Offered' },
          ].map(({ n, label }) => (
            <div key={label}>
              <p style={{ fontSize: '2.5rem', fontWeight: 900, color: primary, lineHeight: 1, marginBottom: '0.5rem' }}>{n}</p>
              <p style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section id="services" style={{ padding: '5rem', maxWidth: '75rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Services</h2>
          <p style={{ color: '#888', marginBottom: '3rem' }}>What I can do for you</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {services.map(svc => (
              <div key={svc.id} style={{ padding: '2rem', border: '1px solid #f0f0f0', borderRadius: '0.75rem', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.boxShadow = `0 4px 20px ${primary}15`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.boxShadow = 'none'; }}>
                {svc.icon && <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{svc.icon}</div>}
                <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>{svc.title}</h3>
                <p style={{ color: '#777', fontSize: '0.85rem', lineHeight: 1.6 }}>{svc.description}</p>
                {svc.price && <p style={{ color: primary, fontWeight: 700, marginTop: '1rem', fontSize: '0.9rem' }}>{svc.price}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section id="work" style={{ background: '#fafafa', padding: '5rem', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: '75rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '3rem', letterSpacing: '-0.02em' }}>Selected Work</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ background: '#fff', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                  {proj.thumbnail ? (
                    <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '11rem', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ height: '11rem', background: `${primary}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '2rem', color: `${primary}40` }}>◻</span>
                    </div>
                  )}
                  <div style={{ padding: '1.5rem' }}>
                    {proj.category && (
                      <span style={{ display: 'inline-block', background: `${primary}15`, color: primary, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '0.25rem', marginBottom: '0.75rem' }}>
                        {proj.category}
                      </span>
                    )}
                    <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{proj.title}</h3>
                    <p style={{ color: '#777', fontSize: '0.85rem', lineHeight: 1.6 }}>{proj.description}</p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                      {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}>Live →</a>}
                      {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.8rem' }}>Code →</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ padding: '4rem 5rem', maxWidth: '75rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem', letterSpacing: '-0.02em' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {skills.map(s => (
              <span key={s.id} style={{ padding: '0.4rem 1.1rem', border: '1px solid #e5e5e5', borderRadius: '2rem', fontSize: '0.85rem', color: '#444' }}>{s.name}</span>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer id="contact" style={{ background: '#111', color: '#fff', padding: '3rem 5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{p.name || 'Portfolio'}</p>
          {p.title && <p style={{ color: '#888', fontSize: '0.85rem' }}>{p.title}</p>}
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {p.email && <a href={`mailto:${p.email}`} style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.875rem' }}>{p.email}</a>}
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem' }}>LinkedIn</a>}
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem' }}>GitHub</a>}
        </div>
      </footer>
    </div>
  );
}
