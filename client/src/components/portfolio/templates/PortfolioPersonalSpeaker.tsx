import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioPersonalSpeaker({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];
  const experience = data.experience || [];

  return (
    <div style={{ background: '#fff', color: '#111', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ background: '#0a0a0a', color: '#fff', padding: '5rem 4rem', display: 'flex', gap: '5rem', alignItems: 'center', minHeight: '70vh' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'inline-block', background: primary, color: '#fff', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.4rem 1rem', borderRadius: '0.25rem', marginBottom: '2rem' }}>Speaker &amp; Thought Leader</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '1.5rem' }}>{p.name || 'Your Name'}</h1>
          <p style={{ color: primary, fontSize: '1.15rem', fontWeight: 600, marginBottom: '1.5rem' }}>{p.title}</p>
          {p.bio && <p style={{ color: '#999', lineHeight: 1.8, maxWidth: '38rem', fontSize: '0.95rem', marginBottom: '2.5rem' }}>{p.bio}</p>}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {p.email && <a href={`mailto:${p.email}`} style={{ background: primary, color: '#fff', padding: '0.875rem 2.5rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>Book Me to Speak</a>}
            {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ border: '1px solid #333', color: '#ccc', padding: '0.875rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', fontSize: '0.9rem' }}>LinkedIn</a>}
          </div>
        </div>
        {p.photo && (
          <div style={{ flexShrink: 0, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-8px', border: `2px solid ${primary}`, borderRadius: '1.5rem' }} />
            <img src={p.photo} alt={p.name} style={{ width: '22rem', height: '28rem', objectFit: 'cover', borderRadius: '1.25rem', display: 'block' }} />
          </div>
        )}
      </section>

      {/* Topics */}
      {skills.length > 0 && (
        <section style={{ padding: '5rem 4rem', background: '#f9fafb' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>Topics I Cover</h2>
          <p style={{ color: '#888', marginBottom: '3rem', fontSize: '0.92rem' }}>Engaging talks on the following areas</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {skills.map((s, i) => (
              <div key={s.id} style={{ background: '#fff', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e5e7eb', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', background: `${primary}15`, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: primary, fontWeight: 900, fontSize: '1rem' }}>{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.25rem' }}>{s.name}</p>
                  {s.category && <p style={{ color: '#888', fontSize: '0.75rem' }}>{s.category}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Past engagements */}
      {experience.length > 0 && (
        <section style={{ padding: '5rem 4rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '3rem' }}>Experience</h2>
          <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '700px' }}>
            {experience.map(exp => (
              <div key={exp.id} style={{ paddingLeft: '1.5rem', borderLeft: `3px solid ${primary}` }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{exp.position}</h3>
                <p style={{ color: primary, fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>{exp.company}</p>
                <p style={{ color: '#999', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                {exp.description && <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.65 }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Media / Press - from projects */}
      {projects.length > 0 && (
        <section style={{ padding: '5rem 4rem', background: '#f9fafb' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '3rem' }}>Media &amp; Press</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {projects.slice(0, 6).map((proj, i) => (
              <div key={proj.id} style={{ background: '#fff', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '10rem', objectFit: 'cover' }} />}
                {!proj.thumbnail && <div style={{ height: '6rem', background: `hsl(${(i * 50) % 360}, 30%, 92%)` }} />}
                <div style={{ padding: '1.25rem' }}>
                  <p style={{ color: primary, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>{proj.category || 'Feature'}</p>
                  <h3 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>{proj.title}</h3>
                  {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none', fontSize: '0.78rem', fontWeight: 600 }}>Read Article →</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Booking CTA */}
      <section style={{ padding: '6rem 4rem', background: primary, color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem' }}>Book Me for Your Next Event</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1rem' }}>Keynotes · Panels · Workshops · Corporate Events</p>
        {p.email && <a href={`mailto:${p.email}`} style={{ background: '#fff', color: primary, padding: '1rem 3rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', display: 'inline-block' }}>Send a Booking Request</a>}
      </section>
    </div>
  );
}
