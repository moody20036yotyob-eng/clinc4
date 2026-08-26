import type { PortfolioData, PortfolioSkill } from '@shared/types/portfolio';

const PALETTE = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#1dd1a1'];

export function PortfolioFreelancerCreative({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#ff6b6b';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];

  return (
    <div style={{ background: '#fff', color: '#111', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Hero - colorful */}
      <section style={{ background: `linear-gradient(135deg, ${primary} 0%, ${data.settings?.accentColor || '#feca57'} 100%)`, padding: '6rem 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-4rem', right: '-4rem', width: '20rem', height: '20rem', borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
        <div style={{ position: 'absolute', bottom: '-3rem', left: '30%', width: '14rem', height: '14rem', borderRadius: '50%', background: 'rgba(0,0,0,0.08)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          {p.photo && <img src={p.photo} alt={p.name} style={{ width: '6rem', height: '6rem', borderRadius: '50%', objectFit: 'cover', marginBottom: '1.5rem', border: '3px solid rgba(255,255,255,0.8)' }} />}
          <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>{p.title || 'Creative Freelancer'}</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 0.95, textShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '1.5rem' }}>{p.name || 'Your Name'}</h1>
          {p.bio && <p style={{ color: 'rgba(0,0,0,0.7)', maxWidth: '40rem', lineHeight: 1.75, fontSize: '1rem', marginBottom: '2.5rem' }}>{p.bio}</p>}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {p.email && <a href={`mailto:${p.email}`} style={{ background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '0.8rem 2rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>Hire Me</a>}
            {p.behance && <a href={p.behance} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.9)', color: '#111', padding: '0.8rem 2rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>Behance</a>}
            {p.dribbble && <a href={p.dribbble} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.9)', color: '#111', padding: '0.8rem 2rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>Dribbble</a>}
          </div>
        </div>
      </section>

      {/* Skills as colored category boxes */}
      {skills.length > 0 && (
        <section style={{ padding: '4rem', background: '#fafafa' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1.5rem', textAlign: 'center' }}>What I Do</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {skills.map((s: PortfolioSkill, i) => {
              const color = PALETTE[i % PALETTE.length];
              return (
                <div key={s.id} style={{ background: `${color}18`, border: `2px solid ${color}`, borderRadius: '0.75rem', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#222' }}>{s.name}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Work - asymmetric layout */}
      {projects.length > 0 && (
        <section style={{ padding: '5rem 4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '3rem' }}>Work Samples</h2>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {projects.slice(0, 5).map((proj, i) => {
              const color = PALETTE[i % PALETTE.length];
              const isEven = i % 2 === 0;
              return (
                <div key={proj.id} style={{ display: 'flex', flexDirection: isEven ? 'row' : 'row-reverse', gap: '2rem', alignItems: 'center', background: `${color}0d`, borderRadius: '1.5rem', overflow: 'hidden', padding: isEven ? '0 2rem 0 0' : '0 0 0 2rem' }}>
                  <div style={{ width: '40%', flexShrink: 0, aspectRatio: '4/3', background: `${color}30`, overflow: 'hidden' }}>
                    {proj.thumbnail ? <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', background: `${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>✦</div>}
                  </div>
                  <div style={{ flex: 1, padding: '2rem 0' }}>
                    <span style={{ display: 'inline-block', background: color, color: '#fff', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.25rem 0.75rem', borderRadius: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>{proj.category || 'Creative'}</span>
                    <h3 style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>{proj.title}</h3>
                    <p style={{ color: '#555', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: '1.25rem' }}>{proj.description}</p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ background: color, color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '2rem', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700 }}>View ↗</a>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Fun footer */}
      <footer style={{ background: '#111', color: '#fff', padding: '4rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✦</div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>{p.name}</h2>
        <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{p.title} · {p.location}</p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {p.email && <a href={`mailto:${p.email}`} style={{ color: primary, textDecoration: 'none', fontWeight: 600 }}>{p.email}</a>}
          {p.behance && <a href={p.behance} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none' }}>Behance</a>}
          {p.dribbble && <a href={p.dribbble} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none' }}>Dribbble</a>}
          {p.twitter && <a href={p.twitter} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none' }}>Twitter</a>}
        </div>
      </footer>
    </div>
  );
}
