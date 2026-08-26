import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioPersonalBrand({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];

  return (
    <div style={{ background: '#fff', color: '#111', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Hero - full screen */}
      <section style={{ minHeight: '100vh', background: p.photo ? undefined : `linear-gradient(135deg, ${primary}15 0%, ${primary}05 100%)`, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {p.photo && (
          <div style={{ position: 'absolute', inset: 0 }}>
            <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)' }} />
          </div>
        )}
        <div style={{ position: 'relative', zIndex: 1, padding: '4rem', color: p.photo ? '#fff' : '#111' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem', color: p.photo ? 'rgba(255,255,255,0.8)' : primary }}>{p.title || 'Personal Brand'}</p>
          <h1 style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.9, marginBottom: '2rem' }}>{p.name || 'Your Name'}</h1>
          {p.bio && <p style={{ maxWidth: '42rem', lineHeight: 1.75, fontSize: '1.1rem', marginBottom: '2.5rem', opacity: 0.85 }}>{p.bio}</p>}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {p.email && <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '0.875rem 2.5rem', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>Get in Touch</a>}
            {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ border: `2px solid ${p.photo ? 'rgba(255,255,255,0.5)' : primary}`, color: p.photo ? '#fff' : primary, padding: '0.875rem 2rem', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>LinkedIn</a>}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', color: p.photo ? 'rgba(255,255,255,0.5)' : '#bbb', fontSize: '1.5rem' }}>↓</div>
      </section>

      {/* Brand Story */}
      <section style={{ padding: '8rem 4rem', background: '#fff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: primary, fontWeight: 600, marginBottom: '1rem' }}>About Me</h2>
            {!p.photo && <div style={{ width: '100%', paddingTop: '100%', background: `${primary}15`, borderRadius: '1rem', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: primary }}>✦</div>
            </div>}
          </div>
          <div>
            {p.bio && <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#333', marginBottom: '2rem' }}>{p.bio}</p>}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {p.location && <div><p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#bbb', marginBottom: '0.25rem' }}>Location</p><p style={{ fontWeight: 600 }}>{p.location}</p></div>}
              {p.email && <div><p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#bbb', marginBottom: '0.25rem' }}>Email</p><a href={`mailto:${p.email}`} style={{ color: primary, textDecoration: 'none', fontWeight: 600 }}>{p.email}</a></div>}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise / Skills */}
      {skills.length > 0 && (
        <section style={{ padding: '5rem 4rem', background: '#f9fafb' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', marginBottom: '3rem' }}>Areas of Expertise</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {skills.map((s, i) => (
                <div key={s.id} style={{ background: '#fff', borderRadius: '0.75rem', padding: '1.5rem', border: `2px solid ${i % 3 === 0 ? primary : '#e5e7eb'}`, textAlign: 'center' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: i % 3 === 0 ? primary : '#111' }}>{s.name}</p>
                  {s.category && <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>{s.category}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Work / Media */}
      {projects.length > 0 && (
        <section style={{ padding: '6rem 4rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '3rem' }}>Featured Work</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {projects.slice(0, 6).map((proj, i) => (
                <div key={proj.id} style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
                  <div style={{ height: '12rem', background: `hsl(${(i * 60) % 360}, 30%, 92%)` }}>
                    {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>{proj.title}</h3>
                    <p style={{ color: '#666', fontSize: '0.82rem', lineHeight: 1.6 }}>{proj.description?.slice(0, 100)}{proj.description && proj.description.length > 100 ? '…' : ''}</p>
                    {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '1rem', color: primary, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}>Read More →</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section style={{ padding: '6rem 4rem', background: primary, textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1rem' }}>Let's Connect</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>Get in touch to collaborate or learn more.</p>
        {p.email && <a href={`mailto:${p.email}`} style={{ background: '#fff', color: primary, padding: '1rem 3rem', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', display: 'inline-block' }}>{p.email}</a>}
      </section>
    </div>
  );
}
