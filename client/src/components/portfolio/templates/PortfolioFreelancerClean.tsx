import type { PortfolioData, PortfolioService, PortfolioTestimonial } from '@shared/types/portfolio';

const SERVICE_SYMBOLS = ['◆', '●', '▲', '■', '★', '◉'];

export function PortfolioFreelancerClean({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const services = data.services || [];
  const testimonials = data.testimonials || [];

  return (
    <div style={{ background: '#f8f9fa', color: '#111', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ padding: '1.5rem 3rem', background: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <div>
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>{p.name || 'Freelancer'}</span>
          {p.title && <span style={{ color: '#888', marginLeft: '1rem', fontSize: '0.85rem' }}>· {p.title}</span>}
        </div>
        {p.email && (
          <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '0.55rem 1.25rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.82rem' }}>
            {p.email}
          </a>
        )}
      </nav>

      {/* Hero */}
      <section style={{ background: '#fff', padding: '7rem 3rem', textAlign: 'center' }}>
        {p.photo && <img src={p.photo} alt={p.name} style={{ width: '6rem', height: '6rem', borderRadius: '50%', objectFit: 'cover', marginBottom: '1.5rem', border: `3px solid ${primary}` }} />}
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '1rem' }}>{p.name || 'Your Name'}</h1>
        <p style={{ color: primary, fontWeight: 600, fontSize: '1rem', marginBottom: '1.5rem' }}>{p.title}</p>
        {p.bio && <p style={{ color: '#555', lineHeight: 1.8, maxWidth: '36rem', margin: '0 auto 2.5rem', fontSize: '0.95rem' }}>{p.bio}</p>}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {p.email && <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '0.75rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>Hire Me</a>}
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ border: '1px solid #e5e7eb', color: '#444', padding: '0.75rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', fontSize: '0.9rem' }}>LinkedIn</a>}
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section style={{ padding: '5rem 3rem', background: '#f8f9fa' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', marginBottom: '3rem' }}>Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
            {services.map((svc: PortfolioService, i) => (
              <div key={svc.id} style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '1.5rem', color: primary, marginBottom: '1rem' }}>{SERVICE_SYMBOLS[i % SERVICE_SYMBOLS.length]}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{svc.title}</h3>
                <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: svc.price ? '1rem' : 0 }}>{svc.description}</p>
                {svc.price && <span style={{ color: primary, fontWeight: 700, fontSize: '0.85rem' }}>{svc.price}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ padding: '5rem 3rem', background: '#fff' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '3rem', textAlign: 'center' }}>Case Studies</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
            {projects.slice(0, 6).map((proj, i) => (
              <div key={proj.id} style={{ background: '#f8f9fa', borderRadius: '1rem', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <div style={{ height: '11rem', background: `hsl(${(i * 60) % 360}, 30%, 92%)` }}>
                  {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ color: primary, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>{proj.category}</p>
                  <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>{proj.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.8rem', lineHeight: 1.65, marginBottom: '1rem' }}>{proj.description?.slice(0, 90)}{proj.description && proj.description.length > 90 ? '…' : ''}</p>
                  {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}>View →</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section style={{ padding: '5rem 3rem', background: '#f8f9fa' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', marginBottom: '3rem' }}>Testimonials</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
            {testimonials.map((t: PortfolioTestimonial) => (
              <div key={t.id} style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', border: '1px solid #e5e7eb' }}>
                <div style={{ color: primary, fontSize: '2rem', lineHeight: 1, marginBottom: '0.75rem' }}>"</div>
                <p style={{ color: '#333', lineHeight: 1.75, fontSize: '0.88rem', marginBottom: '1.5rem' }}>{t.content}</p>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{t.name}</p>
                  <p style={{ color: '#888', fontSize: '0.78rem' }}>{t.position}{t.company ? `, ${t.company}` : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ background: '#fff', borderTop: '1px solid #e5e7eb', padding: '3rem', textAlign: 'center' }}>
        <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{p.name}</p>
        {p.email && <a href={`mailto:${p.email}`} style={{ color: primary, textDecoration: 'none', fontSize: '0.9rem' }}>{p.email}</a>}
      </footer>
    </div>
  );
}
