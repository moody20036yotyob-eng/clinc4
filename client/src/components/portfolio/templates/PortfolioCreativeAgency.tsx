import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioCreativeAgency({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#ff4500';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];
  const services = data.services || [];

  return (
    <div style={{ background: '#fff', color: '#111', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Dark header */}
      <header style={{ background: '#111', color: '#fff', padding: '5rem 5rem 8rem' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6rem' }}>
          <span style={{ fontWeight: 900, fontSize: '1rem', letterSpacing: '-0.01em' }}>{p.name || 'Studio'}</span>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {['work', 'about', 'services', 'contact'].map(l => (
              <a key={l} href={`#${l}`} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</a>
            ))}
            {p.email && (
              <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '2rem', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700 }}>
                Hire
              </a>
            )}
          </div>
        </nav>
        {/* Big tagline */}
        <div>
          {p.title && <p style={{ color: primary, fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.5rem' }}>{p.title}</p>}
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.04em', maxWidth: '16ch' }}>
            {p.bio ? p.bio.split(' ').slice(0, 5).join(' ') + '.' : (p.name || 'Creative Agency')}
          </h1>
        </div>
        {/* Social links */}
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '4rem' }}>
          {p.behance && <a href={p.behance} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.8rem' }}>Behance ↗</a>}
          {p.dribbble && <a href={p.dribbble} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.8rem' }}>Dribbble ↗</a>}
          {p.twitter && <a href={p.twitter} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.8rem' }}>Twitter ↗</a>}
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.8rem' }}>LinkedIn ↗</a>}
        </div>
      </header>

      {/* Work section - overlapping/offset cards */}
      {projects.length > 0 && (
        <section id="work" style={{ padding: '6rem 5rem', background: '#fafafa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em' }}>Selected Work</h2>
            <span style={{ color: '#888', fontSize: '0.85rem' }}>{projects.length} projects</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {projects.map((proj, i) => (
              <div key={proj.id} style={{
                display: 'flex', gap: '2.5rem', alignItems: 'flex-start',
                marginLeft: i % 2 === 0 ? 0 : '5rem',
                flexWrap: 'wrap'
              }}>
                <div style={{ flex: '0 0 40%', minWidth: '200px', borderRadius: '0.75rem', overflow: 'hidden', background: proj.thumbnail ? undefined : `hsl(${i * 60}, 50%, 90%)`, aspectRatio: '16/9' }}>
                  {proj.thumbnail ? (
                    <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '3rem', opacity: 0.3 }}>◻</span>
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: primary, fontWeight: 700 }}>{proj.category || 'Project'}</span>
                  <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0.5rem 0 0.75rem' }}>{proj.title}</h3>
                  <p style={{ color: '#666', lineHeight: 1.7, fontSize: '0.9rem', maxWidth: '32rem', marginBottom: '1.25rem' }}>{proj.description}</p>
                  {(proj.technologies || []).length > 0 && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      {(proj.technologies || []).map(t => <span key={t} style={{ fontSize: '0.75rem', background: '#f0f0f0', color: '#555', padding: '0.2rem 0.6rem', borderRadius: '2rem' }}>{t}</span>)}
                    </div>
                  )}
                  {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}>View Project ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About */}
      <section id="about" style={{ padding: '6rem 5rem', display: 'flex', gap: '6rem', alignItems: 'center', flexWrap: 'wrap', borderTop: '1px solid #f0f0f0' }}>
        {p.photo && <img src={p.photo} alt={p.name} style={{ width: '20rem', height: '20rem', objectFit: 'cover', borderRadius: '1rem', flexShrink: 0 }} />}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: '1.5rem' }}>About</p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>{p.name}</h2>
          {p.bio && <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1rem' }}>{p.bio}</p>}
          {p.location && <p style={{ color: '#999', fontSize: '0.85rem', marginTop: '1rem' }}>{p.location}</p>}
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section id="services" style={{ background: '#111', color: '#fff', padding: '6rem 5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '3rem', letterSpacing: '-0.03em' }}>Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem' }}>
            {services.map((svc, i) => (
              <div key={svc.id} style={{ borderTop: `2px solid ${primary}`, paddingTop: '1.5rem' }}>
                <p style={{ color: primary, fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>0{i + 1}</p>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem' }}>{svc.title}</h3>
                <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.6 }}>{svc.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ padding: '4rem 5rem', borderTop: '1px solid #f0f0f0' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: '1.5rem' }}>Skills</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {skills.map(s => (
              <span key={s.id} style={{ padding: '0.4rem 1rem', border: '1px solid #e5e5e5', borderRadius: '2rem', fontSize: '0.85rem', color: '#555' }}>{s.name}</span>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <footer id="contact" style={{ background: primary, color: '#fff', padding: '5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '2rem' }}>
          Start a project.
        </h2>
        {p.email && (
          <a href={`mailto:${p.email}`} style={{ display: 'inline-block', background: '#fff', color: primary, padding: '1rem 3rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 900, fontSize: '1rem' }}>
            {p.email}
          </a>
        )}
      </footer>
    </div>
  );
}
