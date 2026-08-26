import type { PortfolioData, PortfolioService } from '@shared/types/portfolio';

const GOLD_DARK = '#b8860b';
const GOLD_LIGHT = '#ffd700';
const GOLD_MID = '#d4a017';

export function PortfolioLuxuryGold({ data }: { data: PortfolioData }) {
  const p = data.personal;
  const projects = data.projects || [];
  const services = data.services || [];
  const skills = data.skills || [];
  const experience = data.experience || [];

  return (
    <div style={{ background: '#fff', color: '#1a1a1a', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Gold gradient header */}
      <header style={{ background: `linear-gradient(135deg, ${GOLD_DARK} 0%, ${GOLD_LIGHT} 100%)`, color: '#fff', padding: '0', overflow: 'hidden', position: 'relative', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'rgba(255,255,255,0.05)', clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
        <div style={{ position: 'absolute', top: '3rem', right: '4rem', display: 'flex', gap: '3rem', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)' }}>
          {p.email && <a href={`mailto:${p.email}`} style={{ color: 'rgba(0,0,0,0.6)', textDecoration: 'none' }}>Contact</a>}
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(0,0,0,0.6)', textDecoration: 'none' }}>LinkedIn</a>}
        </div>
        <div style={{ padding: '4rem 5rem', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', marginBottom: '1rem' }}>{p.title || 'Professional'}</p>
          <h1 style={{ fontFamily: '"Georgia", serif', fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.15)', marginBottom: '1.5rem' }}>{p.name || 'Your Name'}</h1>
          {p.bio && <p style={{ color: 'rgba(0,0,0,0.65)', maxWidth: '40rem', lineHeight: 1.75, fontSize: '0.95rem' }}>{p.bio}</p>}
        </div>
      </header>

      {/* Achievements & awards bar */}
      <div style={{ background: '#1a1a1a', color: '#fff', padding: '2rem 5rem', display: 'flex', gap: '3rem', overflowX: 'auto', flexWrap: 'wrap' }}>
        {[
          { val: `${experience.length || 8}+`, label: 'Years Experience' },
          { val: `${projects.length || 20}+`, label: 'Projects' },
          { val: '★★★★★', label: 'Client Rating' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexShrink: 0 }}>
            <span style={{ color: GOLD_MID, fontSize: '1.5rem', fontWeight: 900 }}>{item.val}</span>
            <span style={{ color: '#888', fontSize: '0.78rem', letterSpacing: '0.08em' }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Photo + bio */}
      {p.photo && (
        <section style={{ padding: '5rem', display: 'flex', gap: '4rem', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: '-4px', background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})`, borderRadius: '1rem', zIndex: 0 }} />
            <img src={p.photo} alt={p.name} style={{ width: '200px', height: '240px', objectFit: 'cover', borderRadius: '0.75rem', display: 'block', position: 'relative', zIndex: 1 }} />
          </div>
          <div>
            <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD_MID, marginBottom: '1.5rem' }}>About</h2>
            {p.bio && <p style={{ color: '#444', lineHeight: 1.85, fontSize: '1rem', maxWidth: '44rem' }}>{p.bio}</p>}
          </div>
        </section>
      )}

      {/* Skills - elegant horizontal list */}
      {skills.length > 0 && (
        <section style={{ padding: '4rem 5rem', background: '#fafaf8', borderBottom: '1px solid #f0f0f0' }}>
          <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD_MID, marginBottom: '2rem' }}>Expertise</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {skills.map((s, i) => (
              <span key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#444', fontSize: '0.85rem', paddingRight: i < skills.length - 1 ? '0.5rem' : 0 }}>
                <span style={{ color: GOLD_MID, fontSize: '0.6rem' }}>◆</span>
                {s.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Services with gold bullets */}
      {services.length > 0 && (
        <section style={{ padding: '5rem' }}>
          <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD_MID, marginBottom: '3rem' }}>Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {services.map((svc: PortfolioService) => (
              <div key={svc.id} style={{ padding: '2rem', background: '#fafaf8', borderTop: `3px solid ${GOLD_MID}` }}>
                <h3 style={{ fontFamily: '"Georgia", serif', fontWeight: 400, fontSize: '1.1rem', marginBottom: '0.75rem', color: '#1a1a1a' }}>{svc.title}</h3>
                <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.75, marginBottom: svc.price ? '1.25rem' : 0 }}>{svc.description}</p>
                {svc.price && <p style={{ color: GOLD_DARK, fontWeight: 700, fontSize: '0.88rem' }}>From {svc.price}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ padding: '5rem', background: '#fafaf8', borderTop: '1px solid #f0f0f0' }}>
          <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD_MID, marginBottom: '3rem' }}>Portfolio</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {projects.slice(0, 6).map((proj, i) => (
              <div key={proj.id} style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                <div style={{ height: '12rem', background: `linear-gradient(135deg, ${GOLD_DARK}18, ${GOLD_LIGHT}25)` }}>
                  {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ padding: '1.5rem', borderTop: `2px solid ${GOLD_MID}` }}>
                  <h3 style={{ fontFamily: '"Georgia", serif', fontWeight: 400, fontSize: '1rem', marginBottom: '0.5rem' }}>{proj.title}</h3>
                  <p style={{ color: '#888', fontSize: '0.78rem', marginBottom: '1rem', lineHeight: 1.6 }}>{proj.description?.slice(0, 80)}{proj.description && proj.description.length > 80 ? '…' : ''}</p>
                  {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: GOLD_DARK, textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>View Project →</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ background: `linear-gradient(135deg, ${GOLD_DARK} 0%, ${GOLD_LIGHT} 100%)`, padding: '4rem 5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontFamily: '"Georgia", serif', fontSize: '1.5rem', fontWeight: 400, color: '#fff', marginBottom: '0.25rem' }}>{p.name}</h2>
          <p style={{ color: 'rgba(0,0,0,0.55)', fontSize: '0.78rem', letterSpacing: '0.1em' }}>{p.location}</p>
        </div>
        {p.email && <a href={`mailto:${p.email}`} style={{ background: '#fff', color: GOLD_DARK, padding: '0.875rem 2.5rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', display: 'inline-block' }}>Get in Touch</a>}
      </footer>
    </div>
  );
}
