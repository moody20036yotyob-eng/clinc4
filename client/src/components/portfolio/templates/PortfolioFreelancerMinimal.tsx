import type { PortfolioData, PortfolioService } from '@shared/types/portfolio';

export function PortfolioFreelancerMinimal({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const services = data.services || [];

  return (
    <div style={{ background: '#fff', color: '#111', fontFamily: '"Georgia", serif', minHeight: '100vh', maxWidth: '680px', margin: '0 auto', padding: '6rem 2rem' }}>
      {/* Name & title */}
      <header style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid #e5e7eb' }}>
        <h1 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.25rem' }}>{p.name || 'Your Name'}</h1>
        <p style={{ color: '#888', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.9rem' }}>{p.title || 'Freelancer'}</p>
      </header>

      {/* Bio */}
      {p.bio && (
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ lineHeight: 1.9, fontSize: '1.05rem', color: '#333' }}>{p.bio}</p>
        </section>
      )}

      {/* Services */}
      {services.length > 0 && (
        <section style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#bbb', marginBottom: '1.25rem' }}>Services</h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {services.map((svc: PortfolioService) => (
              <li key={svc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.92rem', color: '#222' }}>{svc.title}</span>
                {svc.price && <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.8rem', color: primary, fontWeight: 600 }}>{svc.price}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects as text links */}
      {projects.length > 0 && (
        <section style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#bbb', marginBottom: '1.25rem' }}>Selected Work</h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {projects.slice(0, 8).map(proj => (
              <li key={proj.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  {proj.url ? (
                    <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.92rem', color: primary, textDecoration: 'none', fontWeight: 500 }}>{proj.title} ↗</a>
                  ) : (
                    <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.92rem', color: '#222' }}>{proj.title}</span>
                  )}
                </div>
                {proj.category && <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.78rem', color: '#bbb' }}>{proj.category}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Contact - email only */}
      <section>
        <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#bbb', marginBottom: '1.25rem' }}>Contact</h2>
        {p.email && (
          <a href={`mailto:${p.email}`} style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '1rem', color: primary, textDecoration: 'none', fontWeight: 600 }}>{p.email}</a>
        )}
      </section>
    </div>
  );
}
