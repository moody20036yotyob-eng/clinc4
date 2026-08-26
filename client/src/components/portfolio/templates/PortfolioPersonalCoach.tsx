import type { PortfolioData, PortfolioService, PortfolioTestimonial } from '@shared/types/portfolio';

export function PortfolioPersonalCoach({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const services = data.services || [];
  const testimonials = data.testimonials || [];
  const experience = data.experience || [];

  return (
    <div style={{ background: '#fff', color: '#111', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ padding: '1.25rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 10 }}>
        <span style={{ fontWeight: 700, fontSize: '1rem' }}>{p.name || 'Coach'}</span>
        {p.email && <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.82rem' }}>Book a Call</a>}
      </nav>

      {/* Hero */}
      <section style={{ padding: '6rem 3rem', display: 'grid', gridTemplateColumns: p.photo ? '3fr 2fr' : '1fr', gap: '4rem', maxWidth: '1100px', margin: '0 auto', alignItems: 'center' }}>
        <div>
          <p style={{ color: primary, fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.08em', marginBottom: '1rem' }}>{p.title || 'Life & Career Coach'}</p>
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '1.5rem' }}>Hi, I'm {p.name || 'Your Name'}</h1>
          {p.bio && <p style={{ color: '#555', lineHeight: 1.85, fontSize: '1.05rem', marginBottom: '2.5rem', maxWidth: '44rem' }}>{p.bio}</p>}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {p.email && <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '0.875rem 2.5rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>Book a Free Call</a>}
          </div>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {[
              { val: `${experience.length || 5}+`, label: 'Years Experience' },
              { val: '200+', label: 'Clients Coached' },
              { val: '95%', label: 'Success Rate' },
            ].map(stat => (
              <div key={stat.label}>
                <p style={{ fontSize: '1.75rem', fontWeight: 900, color: primary, letterSpacing: '-0.04em', lineHeight: 1 }}>{stat.val}</p>
                <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        {p.photo && (
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: '-1rem', right: '-1rem', width: '80%', height: '80%', background: `${primary}15`, borderRadius: '1.5rem' }} />
            <img src={p.photo} alt={p.name} style={{ width: '100%', borderRadius: '1.5rem', objectFit: 'cover', position: 'relative', zIndex: 1, display: 'block' }} />
          </div>
        )}
      </section>

      {/* Services - coaching packages */}
      {services.length > 0 && (
        <section style={{ padding: '5rem 3rem', background: '#f9fafb' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', marginBottom: '0.75rem' }}>Coaching Packages</h2>
            <p style={{ color: '#888', textAlign: 'center', marginBottom: '3rem', fontSize: '0.95rem' }}>Choose the right support for your journey</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {services.map((svc: PortfolioService, i) => (
                <div key={svc.id} style={{ background: '#fff', borderRadius: '1.25rem', padding: '2.5rem', border: `2px solid ${i === 1 ? primary : '#e5e7eb'}`, position: 'relative', boxShadow: i === 1 ? `0 8px 30px ${primary}20` : 'none' }}>
                  {i === 1 && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: primary, color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '0.3rem 1rem', borderRadius: '2rem', whiteSpace: 'nowrap' }}>Most Popular</div>}
                  <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.75rem' }}>{svc.title}</h3>
                  {svc.price && <p style={{ fontSize: '2rem', fontWeight: 900, color: primary, letterSpacing: '-0.04em', marginBottom: '1rem' }}>{svc.price}</p>}
                  <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>{svc.description}</p>
                  {p.email && <a href={`mailto:${p.email}`} style={{ display: 'block', textAlign: 'center', background: i === 1 ? primary : 'transparent', border: `2px solid ${primary}`, color: i === 1 ? '#fff' : primary, padding: '0.7rem', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}>Get Started</a>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section style={{ padding: '5rem 3rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', marginBottom: '3rem' }}>Success Stories</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {testimonials.map((t: PortfolioTestimonial) => (
                <div key={t.id} style={{ background: '#f9fafb', borderRadius: '1rem', padding: '2rem', borderLeft: `4px solid ${primary}` }}>
                  {t.rating && (
                    <div style={{ marginBottom: '0.75rem' }}>
                      {'★'.repeat(t.rating).split('').map((star, si) => <span key={si} style={{ color: '#fbbf24', fontSize: '0.9rem' }}>{star}</span>)}
                    </div>
                  )}
                  <p style={{ color: '#333', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>"{t.content}"</p>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>{t.name[0]}</div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.85rem' }}>{t.name}</p>
                      <p style={{ color: '#888', fontSize: '0.75rem' }}>{t.position}{t.company ? `, ${t.company}` : ''}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: '6rem 3rem', textAlign: 'center', background: `linear-gradient(135deg, ${primary} 0%, ${data.settings?.accentColor || primary} 100%)`, color: '#fff' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem' }}>Ready to Transform Your Life?</h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2.5rem', fontSize: '1rem' }}>Book a free discovery call — no commitment required.</p>
        {p.email && <a href={`mailto:${p.email}`} style={{ background: '#fff', color: primary, padding: '1rem 3rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 800, fontSize: '1rem', display: 'inline-block' }}>Book Your Free Call</a>}
      </section>
    </div>
  );
}
