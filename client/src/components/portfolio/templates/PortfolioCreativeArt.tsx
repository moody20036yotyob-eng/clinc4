import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioCreativeArt({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];

  return (
    <div style={{ background: '#f9f7f4', color: '#1a1a1a', fontFamily: '"Georgia", serif', minHeight: '100vh' }}>
      {/* Gallery header */}
      <header style={{ borderBottom: '1px solid #d9d3cc', padding: '1.5rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, system-ui, sans-serif', marginBottom: '0.1rem' }}>
            {p.name || 'Artist Portfolio'}
          </h1>
          {p.title && <p style={{ fontSize: '0.75rem', color: '#888', fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.05em' }}>{p.title}</p>}
        </div>
        <nav style={{ display: 'flex', gap: '2.5rem', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.8rem', color: '#666' }}>
          {['gallery', 'about', 'contact'].map(l => (
            <a key={l} href={`#${l}`} style={{ color: '#666', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{l}</a>
          ))}
        </nav>
      </header>

      {/* Curator's note / bio */}
      <section id="about" style={{ padding: '5rem 8rem', maxWidth: '80rem', margin: '0 auto', borderBottom: '1px solid #e5e0d9' }}>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', fontFamily: 'Inter, system-ui, sans-serif', marginBottom: '2rem' }}>
          Curator's Statement
        </p>
        {p.bio && (
          <blockquote style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', lineHeight: 1.8, color: '#333', maxWidth: '50rem', fontStyle: 'italic', borderLeft: `3px solid ${primary}`, paddingLeft: '2rem' }}>
            {p.bio}
          </blockquote>
        )}
        {p.photo && (
          <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <img src={p.photo} alt={p.name} style={{ width: '5rem', height: '5rem', borderRadius: '50%', objectFit: 'cover', filter: 'grayscale(20%)' }} />
            <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{p.name}</p>
              {p.location && <p style={{ color: '#888', fontSize: '0.8rem' }}>{p.location}</p>}
            </div>
          </div>
        )}
      </section>

      {/* Gallery */}
      {projects.length > 0 && (
        <section id="gallery" style={{ padding: '5rem 4rem' }}>
          <p style={{ textAlign: 'center', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#999', marginBottom: '4rem' }}>
            Gallery — {projects.length} {projects.length === 1 ? 'Work' : 'Works'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '4rem' }}>
            {projects.map((proj, i) => (
              <div key={proj.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Frame */}
                <div style={{
                  padding: '1.25rem', background: '#fff',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
                  width: '100%'
                }}>
                  {proj.thumbnail ? (
                    <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '4/3' }} />
                  ) : (
                    <div style={{ width: '100%', aspectRatio: '4/3', background: `hsl(${i * 45},30%,90%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '4rem', opacity: 0.3 }}>◻</span>
                    </div>
                  )}
                </div>
                {/* Caption below */}
                <div style={{ marginTop: '1.25rem', textAlign: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{proj.title}</p>
                  {proj.category && <p style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>{proj.category}</p>}
                  <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: 1.6 }}>{proj.description}</p>
                  {proj.url && (
                    <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '0.75rem', color: primary, fontSize: '0.75rem', textDecoration: 'none', fontWeight: 600 }}>
                      View Work ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ padding: '3rem 4rem', borderTop: '1px solid #e5e0d9', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: '1.5rem' }}>
            Media & Skills
          </p>
          <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.9rem', color: '#555', lineHeight: 2 }}>
            {skills.map(s => s.name).join(' · ')}
          </p>
        </section>
      )}

      {/* Contact */}
      <footer id="contact" style={{ borderTop: '1px solid #d9d3cc', padding: '4rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', fontFamily: '"Georgia", serif' }}>Commission Enquiries</h2>
        {p.email && (
          <a href={`mailto:${p.email}`} style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '1rem', color: primary, textDecoration: 'none' }}>{p.email}</a>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem' }}>
          {p.behance && <a href={p.behance} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.8rem', color: '#888', textDecoration: 'none' }}>Behance</a>}
          {p.dribbble && <a href={p.dribbble} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.8rem', color: '#888', textDecoration: 'none' }}>Dribbble</a>}
          {p.twitter && <a href={p.twitter} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.8rem', color: '#888', textDecoration: 'none' }}>Twitter</a>}
        </div>
      </footer>
    </div>
  );
}
