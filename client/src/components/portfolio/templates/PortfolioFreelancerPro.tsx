import type { PortfolioData, PortfolioService, PortfolioTestimonial } from '@shared/types/portfolio';

export function PortfolioFreelancerPro({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const services = data.services || [];
  const testimonials = data.testimonials || [];

  return (
    <div style={{ background: '#fff', color: '#111', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ padding: '1.25rem 4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', position: 'sticky', top: 0, background: '#fff', zIndex: 10 }}>
        <span style={{ fontWeight: 700, fontSize: '1rem' }}>{p.name || 'Freelancer'}</span>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontSize: '0.85rem' }}>
          {['Work', 'Services', 'Testimonials', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: '#555', textDecoration: 'none' }}>{l}</a>
          ))}
          {p.email && <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.82rem' }}>Hire Me</a>}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, #f8faff 0%, #eff4ff 100%)`, padding: '6rem 4rem', display: 'flex', gap: '4rem', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#dcfce7', color: '#15803d', borderRadius: '2rem', padding: '0.4rem 1rem', fontSize: '0.78rem', fontWeight: 600, marginBottom: '2rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            Available for freelance work
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '1.25rem' }}>{p.name || 'Your Name'}</h1>
          <p style={{ color: primary, fontWeight: 600, fontSize: '1.1rem', marginBottom: '1.25rem' }}>{p.title || 'Freelance Professional'}</p>
          {p.bio && <p style={{ color: '#555', lineHeight: 1.8, maxWidth: '40rem', fontSize: '1rem', marginBottom: '2.5rem' }}>{p.bio}</p>}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {p.email && <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '0.875rem 2.5rem', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>Hire Me Now</a>}
            <a href="#work" style={{ border: '2px solid #e5e7eb', color: '#444', padding: '0.875rem 2rem', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>View Work</a>
          </div>
        </div>
        {p.photo && (
          <div style={{ flexShrink: 0 }}>
            <img src={p.photo} alt={p.name} style={{ width: '18rem', height: '18rem', borderRadius: '1.5rem', objectFit: 'cover', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }} />
          </div>
        )}
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section id="services" style={{ padding: '6rem 4rem', background: '#f9fafb' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>Services</h2>
          <p style={{ color: '#777', marginBottom: '3rem', fontSize: '0.95rem' }}>What I offer to help you succeed</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {services.map((svc: PortfolioService) => (
              <div key={svc.id} style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #e5e7eb' }}>
                {svc.icon && <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{svc.icon}</div>}
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.6rem' }}>{svc.title}</h3>
                <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>{svc.description}</p>
                {svc.price && <p style={{ color: primary, fontWeight: 700, fontSize: '0.9rem' }}>From {svc.price}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section id="work" style={{ padding: '6rem 4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '3rem' }}>Selected Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {projects.filter(pr => pr.featured || true).slice(0, 6).map((proj, i) => (
              <div key={proj.id} style={{ borderRadius: '1rem', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ height: '12rem', background: proj.thumbnail ? undefined : `hsl(${(i * 60) % 360}, 40%, 93%)` }}>
                  {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>{proj.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '1rem' }}>{proj.description?.slice(0, 100)}{proj.description && proj.description.length > 100 ? '…' : ''}</p>
                  {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600 }}>View Case Study →</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section id="testimonials" style={{ padding: '6rem 4rem', background: '#f9fafb' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '3rem', textAlign: 'center' }}>Client Love</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((t: PortfolioTestimonial) => (
              <div key={t.id} style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', border: '1px solid #e5e7eb' }}>
                <p style={{ color: '#333', lineHeight: 1.75, fontSize: '0.92rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>"{t.content}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{t.name[0]}</div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{t.name}</p>
                    <p style={{ color: '#888', fontSize: '0.78rem' }}>{t.position}{t.company ? `, ${t.company}` : ''}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" style={{ padding: '6rem 4rem', textAlign: 'center', background: primary }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1rem' }}>Ready to work together?</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', fontSize: '1rem' }}>Let's build something great.</p>
        {p.email && <a href={`mailto:${p.email}`} style={{ background: '#fff', color: primary, padding: '1rem 3rem', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', display: 'inline-block' }}>Send Me an Email</a>}
      </section>
    </div>
  );
}
