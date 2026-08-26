import type { PortfolioData } from '@shared/types/portfolio';

const SECTION_COLORS = ['#fdf4ff', '#fff7ed', '#f0fdf4', '#eff6ff', '#fef9c3', '#fce7f3'];
const BORDER_COLORS = ['#d946ef', '#f97316', '#22c55e', '#3b82f6', '#eab308', '#ec4899'];

const SKILL_EMOJIS: Record<string, string> = {
  react: '⚛️', javascript: '🟨', typescript: '🔷', python: '🐍', design: '🎨',
  figma: '🖼️', css: '💅', html: '📄', node: '🟢', vue: '💚',
  angular: '🔴', swift: '🍎', kotlin: '📱', rust: '🦀', go: '🐹',
  default: '✨'
};

function getEmoji(name: string) {
  const lower = name.toLowerCase();
  for (const [key, emoji] of Object.entries(SKILL_EMOJIS)) {
    if (lower.includes(key)) return emoji;
  }
  return SKILL_EMOJIS.default;
}

export function PortfolioCreativePlayful({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#ec4899';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];
  const services = data.services || [];

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', color: '#111' }}>
      {/* Nav - white */}
      <nav style={{ background: '#fff', padding: '1.25rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #111' }}>
        <span style={{ fontWeight: 900, fontSize: '1rem' }}>{p.name || '✨ Portfolio'}</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['work', 'skills', 'contact'].map(l => (
            <a key={l} href={`#${l}`} style={{ color: '#555', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>{l}</a>
          ))}
        </div>
      </nav>

      {/* Hero - first pastel */}
      <section style={{ background: SECTION_COLORS[0], padding: '6rem 3rem', textAlign: 'center', position: 'relative', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }}>
        {p.photo && <img src={p.photo} alt={p.name} style={{ width: '6rem', height: '6rem', borderRadius: '50%', objectFit: 'cover', border: `4px solid ${primary}`, margin: '0 auto 1.5rem' }} />}
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem', lineHeight: 1 }}>
          {p.name || 'Hi, I\'m awesome 👋'}
        </h1>
        {p.title && <p style={{ fontSize: '1.2rem', color: primary, fontWeight: 700, marginBottom: '1rem' }}>{p.title} ✦</p>}
        {p.bio && <p style={{ color: '#666', maxWidth: '40rem', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>{p.bio}</p>}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {p.email && (
            <a href={`mailto:${p.email}`} style={{ background: '#111', color: '#fff', padding: '0.75rem 2rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 700 }}>Say hi! 👋</a>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ background: '#fff', color: '#111', padding: '0.75rem 2rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 700, border: '2px solid #111' }}>GitHub 🐙</a>
          )}
        </div>
      </section>

      {/* Projects - different pastel per row */}
      {projects.length > 0 && (
        <section id="work" style={{ background: SECTION_COLORS[1], padding: '5rem 3rem', marginTop: '-2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, textAlign: 'center', marginBottom: '0.5rem' }}>My Work 🚀</h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '3rem' }}>Things I've built</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '72rem', margin: '0 auto' }}>
            {projects.map((proj, i) => (
              <div key={proj.id} style={{
                background: '#fff', borderRadius: '1rem', overflow: 'hidden',
                border: `3px solid ${BORDER_COLORS[i % BORDER_COLORS.length]}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: `4px 4px 0 ${BORDER_COLORS[i % BORDER_COLORS.length]}`
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = `6px 6px 0 ${BORDER_COLORS[i % BORDER_COLORS.length]}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `4px 4px 0 ${BORDER_COLORS[i % BORDER_COLORS.length]}`; }}>
                {proj.thumbnail ? (
                  <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '10rem', objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: '10rem', background: `${BORDER_COLORS[i % BORDER_COLORS.length]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                    🎯
                  </div>
                )}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>{proj.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>{proj.description}</p>
                  {(proj.technologies || []).length > 0 && (
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                      {(proj.technologies || []).map(t => <span key={t} style={{ fontSize: '0.7rem', background: '#f5f5f5', padding: '0.2rem 0.5rem', borderRadius: '0.25rem' }}>{t}</span>)}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: BORDER_COLORS[i % BORDER_COLORS.length], textDecoration: 'none', fontWeight: 700, fontSize: '0.8rem' }}>Live ↗</a>}
                    {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.8rem' }}>Code ↗</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills - emoji + text */}
      {skills.length > 0 && (
        <section id="skills" style={{ background: SECTION_COLORS[2], padding: '5rem 3rem', clipPath: 'polygon(0 5%, 100% 0, 100% 95%, 0 100%)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, textAlign: 'center', marginBottom: '0.5rem' }}>My Skills 🛠️</h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '3rem' }}>Tools of the trade</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', justifyContent: 'center', maxWidth: '60rem', margin: '0 auto' }}>
            {skills.map((s, i) => (
              <span key={s.id} style={{
                padding: '0.6rem 1.25rem', background: '#fff',
                border: `2px solid ${BORDER_COLORS[i % BORDER_COLORS.length]}`,
                borderRadius: '2rem', fontSize: '0.9rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: `2px 2px 0 ${BORDER_COLORS[i % BORDER_COLORS.length]}`
              }}>
                <span>{getEmoji(s.name)}</span>
                <span>{s.name}</span>
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Services */}
      {services.length > 0 && (
        <section style={{ background: SECTION_COLORS[3], padding: '5rem 3rem', marginTop: '-2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, textAlign: 'center', marginBottom: '3rem' }}>What I Do 💡</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem', maxWidth: '68rem', margin: '0 auto' }}>
            {services.map((svc, i) => (
              <div key={svc.id} style={{ background: '#fff', padding: '1.75rem', borderRadius: '1rem', border: `2px solid ${BORDER_COLORS[i % BORDER_COLORS.length]}`, boxShadow: `3px 3px 0 ${BORDER_COLORS[i % BORDER_COLORS.length]}` }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{svc.icon || '✨'}</div>
                <h3 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>{svc.title}</h3>
                <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6 }}>{svc.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" style={{ background: '#111', color: '#fff', padding: '6rem 3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Let's Build Something! 🎉
        </h2>
        <p style={{ color: '#888', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Open to opportunities & collaborations</p>
        {p.email && (
          <a href={`mailto:${p.email}`} style={{ display: 'inline-block', background: primary, color: '#fff', padding: '1rem 3rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 900, fontSize: '1rem', boxShadow: `0 0 30px ${primary}60` }}>
            {p.email} 📬
          </a>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem' }}>
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem' }}>GitHub 🐙</a>}
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem' }}>LinkedIn 💼</a>}
          {p.twitter && <a href={p.twitter} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.875rem' }}>Twitter 🐦</a>}
        </div>
      </section>
    </div>
  );
}
