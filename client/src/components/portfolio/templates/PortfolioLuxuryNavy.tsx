import type { PortfolioData, PortfolioService } from '@shared/types/portfolio';

const NAVY = '#0c1a3a';
const CREAM = '#f5f0e8';
const GOLD = '#c9a84c';

export function PortfolioLuxuryNavy({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const projects = data.projects || [];
  const services = data.services || [];
  const experience = data.experience || [];

  return (
    <div style={{ background: CREAM, color: '#1a1a1a', fontFamily: '"Georgia", "Times New Roman", serif', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ background: NAVY, color: CREAM, padding: '3rem 5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem' }}>
          <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD }}>{p.title || 'Professional'}</div>
          <div style={{ display: 'flex', gap: '3rem', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', color: `${CREAM}88` }}>
            {p.location && <span>{p.location}</span>}
            {p.email && <a href={`mailto:${p.email}`} style={{ color: GOLD, textDecoration: 'none' }}>{p.email}</a>}
          </div>
        </div>
        <h1 style={{ fontFamily: '"Georgia", serif', fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 400, letterSpacing: '0.05em', color: CREAM, marginBottom: '2rem', lineHeight: 1.1 }}>{p.name || 'Your Name'}</h1>
        {p.bio && <p style={{ color: `${CREAM}88`, maxWidth: '44rem', lineHeight: 1.8, fontSize: '0.95rem', borderTop: `1px solid ${GOLD}40`, paddingTop: '2rem' }}>{p.bio}</p>}
      </header>

      {/* Photo + credentials */}
      {p.photo && (
        <section style={{ background: NAVY, paddingBottom: '4rem', paddingLeft: '5rem', paddingRight: '5rem', display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: '-6px', border: `2px solid ${GOLD}`, transform: 'translate(6px, 6px)' }} />
            <img src={p.photo} alt={p.name} style={{ width: '200px', height: '250px', objectFit: 'cover', display: 'block', position: 'relative', zIndex: 1 }} />
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ padding: '5rem', background: CREAM }}>
          <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: '3rem' }}>Professional Experience</h2>
          <div style={{ display: 'grid', gap: '2.5rem', maxWidth: '700px' }}>
            {experience.map(exp => (
              <div key={exp.id} style={{ paddingLeft: '1.5rem', borderLeft: `2px solid ${GOLD}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h3 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>{exp.position}</h3>
                  <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.75rem', color: '#888' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontFamily: 'Inter, system-ui, sans-serif', color: GOLD, fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.5rem' }}>{exp.company}</p>
                {exp.description && <p style={{ color: '#555', fontSize: '0.88rem', lineHeight: 1.7 }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Services */}
      {services.length > 0 && (
        <section style={{ padding: '5rem', background: '#f0ebe0' }}>
          <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: NAVY, marginBottom: '3rem' }}>Services</h2>
          <div style={{ display: 'grid', gap: '0' }}>
            {services.map((svc: PortfolioService, i) => (
              <div key={svc.id} style={{ display: 'flex', gap: '3rem', padding: '2rem 0', borderBottom: '1px solid #d4c9b5', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'Inter, system-ui, sans-serif', width: '3rem', flexShrink: 0, color: GOLD, fontWeight: 700, fontSize: '0.85rem' }}>{String(i + 1).padStart(2, '0')}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{svc.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.88rem', lineHeight: 1.7 }}>{svc.description}</p>
                </div>
                {svc.price && <span style={{ fontFamily: 'Inter, system-ui, sans-serif', color: GOLD, fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>{svc.price}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects as achievements */}
      {projects.length > 0 && (
        <section style={{ padding: '5rem', background: CREAM }}>
          <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: '3rem' }}>Case Studies</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {projects.slice(0, 6).map((proj, i) => (
              <div key={proj.id} style={{ background: '#fff', padding: 0, boxShadow: '0 2px 20px rgba(12,26,58,0.08)', overflow: 'hidden' }}>
                {proj.thumbnail ? <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '11rem', objectFit: 'cover', display: 'block' }} /> : <div style={{ height: '8rem', background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: GOLD, fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Case Study</span></div>}
                <div style={{ padding: '1.5rem', borderTop: `3px solid ${GOLD}` }}>
                  <h3 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.5rem' }}>{proj.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.82rem', lineHeight: 1.65, marginBottom: '1rem' }}>{proj.description?.slice(0, 90)}{proj.description && proj.description.length > 90 ? '…' : ''}</p>
                  {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: GOLD, textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>View Case Study →</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <footer style={{ background: NAVY, color: CREAM, padding: '5rem', textAlign: 'center' }}>
        <div style={{ width: '2rem', height: '1px', background: GOLD, margin: '0 auto 2rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 400, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{p.name}</h2>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', color: GOLD, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem' }}>{p.title}</p>
        {p.email && <a href={`mailto:${p.email}`} style={{ fontFamily: 'Inter, system-ui, sans-serif', color: CREAM, textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.05em' }}>{p.email}</a>}
      </footer>
    </div>
  );
}
