import type { PortfolioData, PortfolioTestimonial } from '@shared/types/portfolio';

export function PortfolioLuxuryWhite({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const testimonials = data.testimonials || [];
  const skills = data.skills || [];

  return (
    <div style={{ background: '#faf9f7', color: '#1a1a1a', fontFamily: '"Georgia", "Times New Roman", serif', minHeight: '100vh' }}>
      {/* Ultra-thin top bar */}
      <div style={{ height: '2px', background: '#1a1a1a' }} />

      {/* Nav */}
      <nav style={{ padding: '2rem 5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: '"Georgia", serif', fontSize: '1.1rem', fontWeight: 400, letterSpacing: '0.05em', fontStyle: 'italic' }}>{p.name || 'Portfolio'}</span>
        <div style={{ display: 'flex', gap: '3rem', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {p.email && <a href={`mailto:${p.email}`} style={{ color: '#888', textDecoration: 'none' }}>{p.email}</a>}
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none' }}>LinkedIn</a>}
        </div>
      </nav>

      {/* Thin line */}
      <div style={{ height: '1px', background: '#ddd', margin: '0 5rem' }} />

      {/* Hero */}
      <section style={{ padding: '8rem 5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '4rem' }}>
        <div>
          <h1 style={{ fontFamily: '"Georgia", serif', fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '2rem', color: '#1a1a1a' }}>{p.name || 'Your Name'}</h1>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#999', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{p.title}</p>
        </div>
        <div style={{ maxWidth: '28rem', textAlign: 'right' }}>
          {p.bio && <p style={{ lineHeight: 1.85, fontSize: '1rem', color: '#555', marginBottom: '2rem' }}>{p.bio}</p>}
          {p.email && <a href={`mailto:${p.email}`} style={{ fontFamily: 'Inter, system-ui, sans-serif', display: 'inline-block', border: '1px solid #1a1a1a', color: '#1a1a1a', padding: '0.875rem 2.5rem', textDecoration: 'none', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Enquire</a>}
        </div>
      </section>

      <div style={{ height: '1px', background: '#ddd', margin: '0 5rem' }} />

      {/* Projects - large white cards */}
      {projects.length > 0 && (
        <section style={{ padding: '6rem 5rem' }}>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#bbb', marginBottom: '3rem', textAlign: 'center' }}>Portfolio</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
            {projects.map((proj, i) => (
              <div key={proj.id} style={{ background: '#fff', boxShadow: '0 2px 30px rgba(0,0,0,0.06)', borderRadius: 0 }}>
                <div style={{ height: '18rem', background: `hsl(${(i * 40) % 360}, 10%, 95%)`, overflow: 'hidden' }}>
                  {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ height: '1px', background: primary, marginBottom: '1.5rem', width: '2rem' }} />
                  <h3 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, fontSize: '1rem', letterSpacing: '-0.01em', marginBottom: '0.5rem' }}>{proj.title}</h3>
                  <p style={{ color: '#888', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>{proj.category}</p>
                  <p style={{ color: '#666', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>{proj.description?.slice(0, 100)}{proj.description && proj.description.length > 100 ? '…' : ''}</p>
                  {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: primary, textDecoration: 'none', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>View Work →</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div style={{ height: '1px', background: '#ddd', margin: '0 5rem' }} />

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ padding: '5rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {skills.map((s, i) => (
              <span key={s.id} style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#888', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {s.name}{i < skills.length - 1 ? <span style={{ color: '#ccc', marginLeft: '1rem' }}>·</span> : null}
              </span>
            ))}
          </div>
        </section>
      )}

      <div style={{ height: '1px', background: '#ddd', margin: '0 5rem' }} />

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section style={{ padding: '6rem 5rem' }}>
          {testimonials.slice(0, 3).map((t: PortfolioTestimonial) => (
            <div key={t.id} style={{ padding: '3rem 0', borderBottom: '1px solid #eee', maxWidth: '700px' }}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#333', marginBottom: '1.5rem', fontStyle: 'italic' }}>"{t.content}"</p>
              <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.78rem', letterSpacing: '0.1em', color: '#888' }}>— {t.name}{t.position ? `, ${t.position}` : ''}{t.company ? `, ${t.company}` : ''}</p>
            </div>
          ))}
        </section>
      )}

      {/* Footer */}
      <div style={{ height: '1px', background: '#1a1a1a', margin: '0 5rem' }} />
      <footer style={{ padding: '2rem 5rem', display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.72rem', color: '#bbb', letterSpacing: '0.1em' }}>
        <span>{p.name}</span>
        {p.location && <span>{p.location}</span>}
        {p.email && <a href={`mailto:${p.email}`} style={{ color: primary, textDecoration: 'none' }}>{p.email}</a>}
      </footer>
      <div style={{ height: '2px', background: '#1a1a1a' }} />
    </div>
  );
}
