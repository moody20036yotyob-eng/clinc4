import type { PortfolioData, PortfolioSkill } from '@shared/types/portfolio';

export function PortfolioPersonalWriter({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];

  return (
    <div style={{ background: '#fafaf8', color: '#1a1a1a', fontFamily: '"Georgia", "Times New Roman", serif', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <h1 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.1rem' }}>{p.name || 'Your Name'}</h1>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#888', fontSize: '0.82rem' }}>{p.title || 'Writer'}</p>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
          {p.twitter && <a href={p.twitter} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.82rem' }}>Twitter</a>}
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.82rem' }}>LinkedIn</a>}
          {p.email && <a href={`mailto:${p.email}`} style={{ color: primary, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600 }}>Contact</a>}
        </div>
      </header>

      {/* Bio - "About the Author" */}
      <section style={{ background: '#fff', padding: '5rem 4rem', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: p.photo ? '1fr 3fr' : '1fr', gap: '4rem', alignItems: 'start' }}>
        {p.photo && (
          <div>
            <img src={p.photo} alt={p.name} style={{ width: '100%', maxWidth: '180px', display: 'block', borderRadius: '0.5rem' }} />
          </div>
        )}
        <div>
          <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#bbb', marginBottom: '1.25rem' }}>About the Author</h2>
          {p.bio && <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: '#333', marginBottom: '1.5rem' }}>{p.bio}</p>}
          {p.location && <p style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#888', fontSize: '0.82rem' }}>Based in {p.location}</p>}
        </div>
      </section>

      {/* Writing categories */}
      {skills.length > 0 && (
        <section style={{ padding: '3rem 4rem', maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#bbb', marginBottom: '1.25rem' }}>Writing Categories</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {skills.map((s: PortfolioSkill) => (
              <span key={s.id} style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f0f0ed', color: '#555', borderRadius: '0.25rem', padding: '0.3rem 0.75rem', fontSize: '0.78rem' }}>{s.name}</span>
            ))}
          </div>
        </section>
      )}

      {/* Published pieces */}
      {projects.length > 0 && (
        <section style={{ padding: '3rem 4rem 5rem', maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#bbb', marginBottom: '2rem' }}>Published Work</h2>
          <div style={{ display: 'grid', gap: '0' }}>
            {projects.map((proj, i) => (
              <article key={proj.id} style={{ padding: '2rem 0', borderBottom: '1px solid #e5e7eb', display: 'grid', gridTemplateColumns: proj.thumbnail ? '1fr 3fr' : '1fr', gap: '2rem', alignItems: 'start' }}>
                {proj.thumbnail && (
                  <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', borderRadius: '0.375rem', objectFit: 'cover', aspectRatio: '4/3', display: 'block' }} />
                )}
                <div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', alignItems: 'center', flexWrap: 'wrap', fontFamily: 'Inter, system-ui, sans-serif' }}>
                    {proj.category && <span style={{ color: primary, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{proj.category}</span>}
                    {proj.endDate && <span style={{ color: '#bbb', fontSize: '0.72rem' }}>{proj.endDate}</span>}
                  </div>
                  {proj.url ? (
                    <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a', textDecoration: 'none', marginBottom: '0.75rem', lineHeight: 1.35, letterSpacing: '-0.01em' }}
                      onMouseEnter={e => (e.currentTarget.style.color = primary)}
                      onMouseLeave={e => (e.currentTarget.style.color = '#1a1a1a')}>{proj.title}</a>
                  ) : (
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: 1.35, letterSpacing: '-0.01em' }}>{proj.title}</h3>
                  )}
                  <p style={{ color: '#555', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: '0.75rem' }}>{proj.description}</p>
                  {proj.url && (
                    <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: primary, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}>Read full piece ↗</a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Contact for commissions */}
      <section style={{ background: '#fff', padding: '5rem 4rem', borderTop: '2px solid #111', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>Available for Commissions</h2>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#888', marginBottom: '2rem', fontSize: '0.92rem' }}>Essays · Long-form articles · Ghostwriting · Editing</p>
        {p.email && <a href={`mailto:${p.email}`} style={{ fontFamily: 'Inter, system-ui, sans-serif', display: 'inline-block', background: primary, color: '#fff', padding: '0.875rem 2.5rem', borderRadius: '0.375rem', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>Get in Touch</a>}
      </section>
    </div>
  );
}
