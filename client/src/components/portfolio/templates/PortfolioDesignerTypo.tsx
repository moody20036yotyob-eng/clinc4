import type { PortfolioData } from '@shared/types/portfolio';
import { useState } from 'react';

export function PortfolioDesignerTypo({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{ background: '#fafaf8', color: '#111', fontFamily: '"Georgia", "Times New Roman", serif', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ padding: '5rem 5rem 3rem', borderBottom: '2px solid #111' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', fontWeight: 900, fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '-0.05em', lineHeight: 0.9, textTransform: 'uppercase', margin: 0 }}>
              {p.name || 'Your Name'}
            </h1>
            <p style={{ color: primary, fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '1.5rem', fontWeight: 600 }}>{p.title || 'Designer'}</p>
          </div>
          <div style={{ textAlign: 'right', fontFamily: 'Inter, system-ui, sans-serif' }}>
            {p.email && <a href={`mailto:${p.email}`} style={{ display: 'block', color: '#888', textDecoration: 'none', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{p.email}</a>}
            {p.behance && <a href={p.behance} target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: primary, textDecoration: 'none', fontSize: '0.8rem' }}>Behance ↗</a>}
          </div>
        </div>
      </header>

      {/* Bio */}
      {p.bio && (
        <section style={{ padding: '3rem 5rem', borderBottom: '1px solid #ddd', display: 'flex', gap: '4rem' }}>
          <div style={{ width: '6rem', flexShrink: 0, fontSize: '0.7rem', fontFamily: 'Inter, system-ui, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999', paddingTop: '0.3rem' }}>About</div>
          <p style={{ flex: 1, lineHeight: 1.85, fontSize: '1.05rem', color: '#333', maxWidth: '48rem' }}>{p.bio}</p>
        </section>
      )}

      {/* Projects - editorial list */}
      {projects.length > 0 && (
        <section style={{ padding: '0 5rem 5rem' }}>
          <div style={{ paddingTop: '3rem', marginBottom: '1rem', display: 'flex', gap: '4rem', fontSize: '0.65rem', fontFamily: 'Inter, system-ui, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999', borderBottom: '1px solid #ddd', paddingBottom: '0.75rem' }}>
            <span style={{ width: '4rem' }}>No.</span>
            <span style={{ flex: 1 }}>Project</span>
            <span style={{ width: '10rem' }}>Category</span>
            <span style={{ width: '5rem' }}>Year</span>
          </div>
          {projects.map((proj, i) => (
            <div key={proj.id}>
              <div onClick={() => setExpanded(expanded === proj.id ? null : proj.id)}
                style={{ display: 'flex', gap: '4rem', alignItems: 'center', padding: '1.5rem 0', borderBottom: '1px solid #eee', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget.querySelector('.proj-num') as HTMLElement)!.style.color = primary; }}
                onMouseLeave={e => { (e.currentTarget.querySelector('.proj-num') as HTMLElement)!.style.color = '#ccc'; }}>
                <span className="proj-num" style={{ width: '4rem', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '2rem', fontWeight: 900, color: '#ccc', lineHeight: 1, transition: 'color 0.2s' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ flex: 1, fontFamily: 'Inter, system-ui, sans-serif', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{proj.title}</span>
                <span style={{ width: '10rem', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.8rem', color: '#888' }}>{proj.category || 'Design'}</span>
                <span style={{ width: '5rem', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.8rem', color: '#888' }}>{proj.url ? '↗' : '—'}</span>
              </div>
              {expanded === proj.id && (
                <div style={{ padding: '1.5rem 0 2rem', display: 'flex', gap: '4rem', background: '#f5f5f3' }}>
                  <div style={{ width: '4rem' }} />
                  <div style={{ flex: 1 }}>
                    {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', maxHeight: '20rem', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1.25rem' }} />}
                    <p style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#555', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: '1rem' }}>{proj.description}</p>
                    <div style={{ display: 'flex', gap: '1rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600 }}>View Project ↗</a>}
                      {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.82rem' }}>GitHub ↗</a>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Footer */}
      <footer style={{ padding: '3rem 5rem', borderTop: '2px solid #111', display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.8rem', color: '#888' }}>
        <span>{p.name}</span>
        {p.location && <span>{p.location}</span>}
        {p.email && <a href={`mailto:${p.email}`} style={{ color: primary, textDecoration: 'none' }}>{p.email}</a>}
      </footer>
    </div>
  );
}
