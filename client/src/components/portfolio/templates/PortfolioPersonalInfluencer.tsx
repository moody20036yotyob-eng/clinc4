import type { PortfolioData, PortfolioSkill } from '@shared/types/portfolio';

export function PortfolioPersonalInfluencer({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#e11d48';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];

  const SOCIAL_LINKS = [
    { label: 'Instagram', href: null, symbol: '📸' },
    { label: 'TikTok', href: null, symbol: '🎵' },
    { label: 'Twitter', href: p.twitter, symbol: '🐦' },
    { label: 'YouTube', href: null, symbol: '▶️' },
    { label: 'LinkedIn', href: p.linkedin, symbol: '💼' },
  ].filter(s => s.href);

  return (
    <div style={{ background: '#fafafa', color: '#111', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ background: `linear-gradient(180deg, #0a0a0a 0%, #111 100%)`, color: '#fff', padding: '5rem 3rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, ${primary}25 0%, transparent 70%)` }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {p.photo ? (
            <img src={p.photo} alt={p.name} style={{ width: '8rem', height: '8rem', borderRadius: '50%', objectFit: 'cover', marginBottom: '1.5rem', border: `3px solid ${primary}`, display: 'block', margin: '0 auto 1.5rem' }} />
          ) : (
            <div style={{ width: '8rem', height: '8rem', borderRadius: '50%', background: `${primary}30`, border: `3px solid ${primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '3rem' }}>✦</div>
          )}
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>{p.name || 'Your Name'}</h1>
          <p style={{ color: primary, fontWeight: 600, marginBottom: '1rem', fontSize: '1rem' }}>{p.title || 'Content Creator'}</p>
          {p.bio && <p style={{ color: '#aaa', maxWidth: '36rem', margin: '0 auto 2rem', lineHeight: 1.75, fontSize: '0.92rem' }}>{p.bio}</p>}

          {/* Social buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {p.twitter && <a href={p.twitter} target="_blank" rel="noopener noreferrer" style={{ background: '#1da1f2', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span>𝕏</span> Twitter</a>}
            {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ background: '#0077b5', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.82rem' }}>LinkedIn</a>}
            {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ background: '#333', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.82rem' }}>GitHub</a>}
            {p.behance && <a href={p.behance} target="_blank" rel="noopener noreferrer" style={{ background: '#1769ff', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.82rem' }}>Behance</a>}
            {p.dribbble && <a href={p.dribbble} target="_blank" rel="noopener noreferrer" style={{ background: '#ea4c89', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.82rem' }}>Dribbble</a>}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { val: '50K+', label: 'Followers' },
              { val: `${projects.length}+`, label: 'Collaborations' },
              { val: '4.9', label: 'Avg. Rating' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '2.5rem', fontWeight: 900, color: primary, letterSpacing: '-0.04em', lineHeight: 1 }}>{stat.val}</p>
                <p style={{ color: '#666', fontSize: '0.75rem', marginTop: '0.25rem' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content categories */}
      {skills.length > 0 && (
        <section style={{ padding: '4rem 3rem', background: '#fff' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center', marginBottom: '2rem' }}>Content Categories</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {skills.map((s: PortfolioSkill, i) => (
              <span key={s.id} style={{ background: `hsl(${(i * 37) % 360}, 80%, 95%)`, color: `hsl(${(i * 37) % 360}, 60%, 35%)`, border: `1px solid hsl(${(i * 37) % 360}, 60%, 80%)`, borderRadius: '2rem', padding: '0.5rem 1.25rem', fontSize: '0.85rem', fontWeight: 600 }}>{s.name}</span>
            ))}
          </div>
        </section>
      )}

      {/* Collaborations */}
      {projects.length > 0 && (
        <section style={{ padding: '5rem 3rem', background: '#fafafa' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '3rem', textAlign: 'center' }}>Past Collaborations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '1100px', margin: '0 auto' }}>
            {projects.slice(0, 6).map((proj, i) => (
              <div key={proj.id} style={{ background: '#fff', borderRadius: '1rem', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ height: '11rem', background: `hsl(${(i * 60) % 360}, 40%, 93%)` }}>
                  {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <span style={{ background: `${primary}15`, color: primary, fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '1rem' }}>{proj.category || 'Collab'}</span>
                  <h3 style={{ fontWeight: 700, fontSize: '0.92rem', margin: '0.6rem 0 0.4rem' }}>{proj.title}</h3>
                  <p style={{ color: '#777', fontSize: '0.78rem', lineHeight: 1.6 }}>{proj.description?.slice(0, 80)}{proj.description && proj.description.length > 80 ? '…' : ''}</p>
                  {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '0.75rem', color: primary, textDecoration: 'none', fontSize: '0.78rem', fontWeight: 600 }}>View ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Brand vibe / contact */}
      <section style={{ padding: '5rem 3rem', background: primary, color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem' }}>Let's Collaborate</h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', fontSize: '0.95rem' }}>Brand deals · Sponsored content · Partnerships</p>
        {p.email && <a href={`mailto:${p.email}`} style={{ background: '#fff', color: primary, padding: '0.875rem 2.5rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 800, fontSize: '1rem', display: 'inline-block' }}>{p.email}</a>}
      </section>
    </div>
  );
}
