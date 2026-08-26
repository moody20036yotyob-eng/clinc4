import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioCorporateModern({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];
  const services = data.services || [];
  const testimonials = data.testimonials || [];

  return (
    <div style={{ background: '#fff', color: '#111', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #f0f0f0', padding: '1rem 4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 800, fontSize: '1rem', color: primary }}>{p.name || 'Portfolio'}</span>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['Services', 'Work', 'About', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: '#555', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>{l}</a>
          ))}
          {p.email && (
            <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '2rem', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700 }}>
              Hire Me
            </a>
          )}
        </div>
      </nav>

      {/* Gradient Hero */}
      <section style={{ background: `linear-gradient(135deg, ${primary} 0%, ${primary}cc 60%, #7c3aed 100%)`, color: '#fff', padding: '8rem 4rem', textAlign: 'center' }}>
        {p.photo && (
          <img src={p.photo} alt={p.name} style={{ width: '7rem', height: '7rem', borderRadius: '50%', objectFit: 'cover', border: '4px solid rgba(255,255,255,0.4)', margin: '0 auto 2rem' }} />
        )}
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
          {p.name || 'Your Name'}
        </h1>
        {p.title && <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.85)', marginBottom: '1.5rem', fontWeight: 500 }}>{p.title}</p>}
        {p.bio && <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '40rem', margin: '0 auto 3rem', lineHeight: 1.8, fontSize: '1rem' }}>{p.bio}</p>}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {p.email && (
            <a href={`mailto:${p.email}`} style={{ background: '#fff', color: primary, padding: '0.75rem 2rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem' }}>
              Get In Touch
            </a>
          )}
          {p.linkedin && (
            <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ border: '2px solid rgba(255,255,255,0.4)', color: '#fff', padding: '0.75rem 2rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem' }}>
              LinkedIn
            </a>
          )}
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section id="services" style={{ padding: '6rem 4rem', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: '68rem', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: primary, fontWeight: 700, marginBottom: '0.75rem' }}>What I Offer</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Services</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {services.map(svc => (
                <div key={svc.id} style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{svc.icon || '⚡'}</div>
                  <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>{svc.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.83rem', lineHeight: 1.6 }}>{svc.description}</p>
                  {svc.price && <p style={{ color: primary, fontWeight: 700, marginTop: '1rem', fontSize: '0.875rem' }}>From {svc.price}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section id="work" style={{ padding: '6rem 4rem' }}>
          <div style={{ maxWidth: '68rem', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: primary, fontWeight: 700, marginBottom: '0.75rem' }}>Portfolio</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Recent Work</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {projects.map(proj => (
                <div key={proj.id} style={{ borderRadius: '1rem', overflow: 'hidden', border: '1px solid #f0f0f0', transition: 'box-shadow 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                  {proj.thumbnail ? (
                    <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '12rem', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ height: '12rem', background: `linear-gradient(135deg, ${primary}20, ${primary}08)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '3rem' }}>🖼️</span>
                    </div>
                  )}
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                      {(proj.technologies || []).slice(0, 3).map(t => (
                        <span key={t} style={{ fontSize: '0.7rem', background: `${primary}12`, color: primary, padding: '0.2rem 0.6rem', borderRadius: '0.25rem', fontWeight: 600 }}>{t}</span>
                      ))}
                    </div>
                    <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{proj.title}</h3>
                    <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6 }}>{proj.description}</p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                      {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700 }}>Live Demo →</a>}
                      {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.8rem' }}>Source →</a>}
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
        <section id="about" style={{ background: '#fafafa', padding: '5rem 4rem', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: '68rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2rem', letterSpacing: '-0.02em', textAlign: 'center' }}>Skills & Technologies</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              {skills.map(s => (
                <span key={s.id} style={{ padding: '0.5rem 1.25rem', background: '#fff', border: '1px solid #e5e5e5', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 500, color: '#333' }}>{s.name}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section style={{ padding: '6rem 4rem' }}>
          <div style={{ maxWidth: '68rem', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: primary, fontWeight: 700, marginBottom: '0.75rem' }}>Testimonials</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>What Clients Say</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {testimonials.slice(0, 3).map(t => (
                <div key={t.id} style={{ padding: '2rem', border: '1px solid #f0f0f0', borderRadius: '1rem', background: '#fff' }}>
                  <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>"{t.content}"</p>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{t.name}</p>
                    {(t.position || t.company) && (
                      <p style={{ color: primary, fontSize: '0.8rem' }}>{t.position}{t.position && t.company ? ', ' : ''}{t.company}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section id="contact" style={{ background: `linear-gradient(135deg, ${primary}, #7c3aed)`, color: '#fff', padding: '6rem 4rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '1rem' }}>Ready to start a project?</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Let's build something great together.</p>
        {p.email && (
          <a href={`mailto:${p.email}`} style={{ background: '#fff', color: primary, padding: '1rem 3rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 800, fontSize: '1rem', display: 'inline-block' }}>
            Start a Conversation
          </a>
        )}
      </section>
    </div>
  );
}
