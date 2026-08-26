import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioDevModern({ data }: { data: PortfolioData }) {
  const { personal } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const projects = data.projects || [];
  const skills = data.skills || [];
  const experience = data.experience || [];

  const categories = [...new Set(skills.map((s) => s.category || 'General'))];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fff', minHeight: '100vh', color: '#111' }}>
      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 48px', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, background: '#fff', zIndex: 10 }}>
        <span style={{ fontWeight: 700, fontSize: 16 }}>{personal.name?.split(' ')[0] || 'Dev'}</span>
        <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
          {['Projects', 'Skills', 'Experience', 'Contact'].map((l) => (
            <span key={l} style={{ color: '#555', cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '80px 48px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
          {personal.photo && (
            <img src={personal.photo} alt={personal.name} style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${primary}` }} />
          )}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0 }}>{personal.name || 'Your Name'}</h1>
              <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 12, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>Available for hire</span>
            </div>
            <p style={{ fontSize: 18, color: primary, fontWeight: 600, margin: '0 0 12px' }}>{personal.title || 'Software Developer'}</p>
            {personal.bio && <p style={{ color: '#555', lineHeight: 1.7, maxWidth: 560, margin: 0 }}>{personal.bio}</p>}
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {personal.github && <a href={personal.github} style={{ background: '#111', color: '#fff', padding: '8px 20px', borderRadius: 8, textDecoration: 'none', fontSize: 14 }}>GitHub</a>}
              {personal.linkedin && <a href={personal.linkedin} style={{ background: primary, color: '#fff', padding: '8px 20px', borderRadius: 8, textDecoration: 'none', fontSize: 14 }}>LinkedIn</a>}
              {personal.email && <a href={`mailto:${personal.email}`} style={{ border: '1px solid #ddd', color: '#333', padding: '8px 20px', borderRadius: 8, textDecoration: 'none', fontSize: 14 }}>Email Me</a>}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section style={{ padding: '60px 48px', background: '#f9fafb', maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Featured Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {projects.map((p) => (
              <div key={p.id} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ height: 140, background: p.featured ? primary : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {p.thumbnail ? (
                    <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: 32, opacity: 0.3 }}>⌥</span>
                  )}
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontWeight: 700, margin: '0 0 8px', fontSize: 16 }}>{p.title}</h3>
                  <p style={{ color: '#666', fontSize: 13, lineHeight: 1.6, margin: '0 0 12px' }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                    {(p.technologies || []).map((t) => (
                      <span key={t} style={{ background: '#f3f4f6', borderRadius: 6, padding: '2px 8px', fontSize: 11, color: '#555' }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {p.url && <a href={p.url} style={{ color: primary, fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>Live ↗</a>}
                    {p.github && <a href={p.github} style={{ color: '#555', fontSize: 13, textDecoration: 'none' }}>Source</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ padding: '60px 48px', maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Technical Skills</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {categories.map((cat) => (
              <div key={cat}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>{cat}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {skills.filter((s) => (s.category || 'General') === cat).map((s) => (
                    <span key={s.id} style={{ background: '#f3f4f6', borderRadius: 8, padding: '6px 14px', fontSize: 14, color: '#333', fontWeight: 500 }}>
                      {s.name}
                      {s.level && <span style={{ color: primary, marginLeft: 6, fontSize: 12 }}>{s.level}%</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ padding: '60px 48px', background: '#f9fafb', maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {experience.map((e) => (
              <div key={e.id} style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{e.position}</div>
                    <div style={{ color: primary, fontWeight: 600, fontSize: 14 }}>{e.company}</div>
                  </div>
                  <div style={{ color: '#888', fontSize: 13 }}>{e.startDate} – {e.current ? 'Present' : e.endDate}</div>
                </div>
                {e.description && <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{e.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ padding: '40px 48px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontWeight: 700, color: '#111' }}>{personal.name}</span>
        <div style={{ display: 'flex', gap: 20, fontSize: 14 }}>
          {personal.email && <a href={`mailto:${personal.email}`} style={{ color: '#555', textDecoration: 'none' }}>{personal.email}</a>}
          {personal.github && <a href={personal.github} style={{ color: primary, textDecoration: 'none' }}>GitHub</a>}
        </div>
      </footer>
    </div>
  );
}
