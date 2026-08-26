import type { PortfolioData } from '@shared/types/portfolio';
import { useState } from 'react';

export function PortfolioDesignerGrid({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#1a56db';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];
  const [selected, setSelected] = useState<string | null>(null);

  const selectedProj = projects.find(pr => pr.id === selected);

  return (
    <div style={{ background: '#fff', color: '#111', fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Nav */}
      <nav style={{ padding: '1.25rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', background: '#fff', position: 'sticky', top: 0, zIndex: 20 }}>
        <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em' }}>{p.name || 'Designer'}</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {p.behance && <a href={p.behance} target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none', fontSize: '0.82rem' }}>Behance</a>}
          {p.dribbble && <a href={p.dribbble} target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none', fontSize: '0.82rem' }}>Dribbble</a>}
          {p.email && <a href={`mailto:${p.email}`} style={{ color: '#fff', background: primary, padding: '0.45rem 1rem', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}>Hire Me</a>}
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside style={{ width: '280px', flexShrink: 0, borderRight: '1px solid #eee', padding: '2rem 1.5rem', position: 'sticky', top: '57px', alignSelf: 'flex-start', height: 'calc(100vh - 57px)', overflowY: 'auto' }}>
          {p.photo && <img src={p.photo} alt={p.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }} />}
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{p.name}</h2>
          <p style={{ color: primary, fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem' }}>{p.title}</p>
          {p.bio && <p style={{ color: '#666', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>{p.bio}</p>}
          {skills.length > 0 && (
            <div>
              <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999', marginBottom: '0.75rem' }}>Tools & Skills</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {skills.map(s => (
                  <span key={s.id} style={{ background: '#f5f5f5', color: '#444', fontSize: '0.72rem', padding: '0.25rem 0.6rem', borderRadius: '0.25rem' }}>{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Grid */}
        <main style={{ flex: 1, padding: '2rem' }}>
          {selectedProj ? (
            <div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: primary, fontSize: '0.85rem', fontWeight: 600, marginBottom: '2rem', padding: 0 }}>← Back to grid</button>
              {selectedProj.thumbnail && <img src={selectedProj.thumbnail} alt={selectedProj.title} style={{ width: '100%', maxHeight: '28rem', objectFit: 'cover', borderRadius: '0.75rem', marginBottom: '2rem' }} />}
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>{selectedProj.title}</h2>
              <p style={{ color: primary, fontSize: '0.8rem', marginBottom: '1rem' }}>{selectedProj.category}</p>
              <p style={{ color: '#555', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.5rem' }}>{selectedProj.description}</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {selectedProj.url && <a href={selectedProj.url} target="_blank" rel="noopener noreferrer" style={{ background: primary, color: '#fff', padding: '0.6rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>View Project ↗</a>}
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
              {projects.map((proj, i) => (
                <div key={proj.id} onClick={() => setSelected(proj.id)} style={{ cursor: 'pointer', borderRadius: '0.5rem', overflow: 'hidden', aspectRatio: '1', background: `hsl(${(i * 47) % 360}, 40%, 92%)`, position: 'relative' }}
                  onMouseEnter={e => { const ov = e.currentTarget.querySelector('.ov') as HTMLElement; if (ov) ov.style.opacity = '1'; }}
                  onMouseLeave={e => { const ov = e.currentTarget.querySelector('.ov') as HTMLElement; if (ov) ov.style.opacity = '0'; }}>
                  {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  <div className="ov" style={{ position: 'absolute', inset: 0, background: `${primary}cc`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.25s' }}>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', textAlign: 'center', padding: '0.5rem' }}>{proj.title}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
