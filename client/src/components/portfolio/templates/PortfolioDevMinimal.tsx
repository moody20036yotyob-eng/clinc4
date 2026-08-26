import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioDevMinimal({ data }: { data: PortfolioData }) {
  const { personal } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const projects = data.projects || [];
  const skills = data.skills || [];
  const experience = data.experience || [];

  const ascii = `
 _______ _______
|       |       |
|    ___|_     _|
|   |___  |   |
|    ___| |   |
|   |___  |   |
|_______| |___|`.trim();

  return (
    <div style={{ background: '#0d0d0d', color: '#e0e0e0', fontFamily: 'Courier New, monospace', minHeight: '100vh', padding: '40px 60px' }}>
      {/* ASCII header */}
      <pre style={{ color: primary, fontSize: '11px', lineHeight: 1.4, marginBottom: 24 }}>{ascii}</pre>

      <div style={{ marginBottom: 32 }}>
        <div style={{ color: primary, fontSize: 13 }}>$ whoami</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginTop: 4 }}>{personal.name || 'Your Name'}</div>
        <div style={{ color: '#aaa', marginTop: 4 }}>{personal.title || 'Software Developer'}</div>
        {personal.bio && <div style={{ color: '#888', marginTop: 12, maxWidth: 600, lineHeight: 1.7 }}>{personal.bio}</div>}
      </div>

      {/* Contact */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ color: primary, fontSize: 13, marginBottom: 8 }}>$ cat contact.txt</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: '#aaa', fontSize: 13 }}>
          {personal.email && <span>✉ {personal.email}</span>}
          {personal.github && <span>⌥ {personal.github}</span>}
          {personal.linkedin && <span>in {personal.linkedin}</span>}
          {personal.website && <span>↗ {personal.website}</span>}
        </div>
      </div>

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ color: primary, fontSize: 13, marginBottom: 12 }}>$ ls projects/</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {projects.map((p) => (
              <div key={p.id} style={{ borderLeft: `2px solid ${primary}`, paddingLeft: 16 }}>
                <div style={{ color: '#fff', fontWeight: 600 }}>{p.title}</div>
                <div style={{ color: '#888', fontSize: 13, marginTop: 4 }}>{p.description}</div>
                <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
                  {p.url && <a href={p.url} style={{ color: primary, fontSize: 12, textDecoration: 'none' }}>→ live</a>}
                  {p.github && <a href={p.github} style={{ color: '#aaa', fontSize: 12, textDecoration: 'none' }}>⌥ source</a>}
                </div>
                {(p.technologies || []).length > 0 && (
                  <div style={{ marginTop: 6, fontSize: 12, color: '#666' }}>
                    [{(p.technologies || []).join(', ')}]
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ color: primary, fontSize: 13, marginBottom: 8 }}>$ npm ls --depth=0</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map((s) => (
              <span key={s.id} style={{ color: '#aaa', fontSize: 12 }}>├── {s.name}@latest</span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ color: primary, fontSize: 13, marginBottom: 12 }}>$ git log --oneline</div>
          {experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 12, paddingLeft: 16, borderLeft: `1px solid #333` }}>
              <div style={{ color: '#fff', fontSize: 13 }}>{e.position} @ {e.company}</div>
              <div style={{ color: '#666', fontSize: 12 }}>{e.startDate} → {e.current ? 'present' : e.endDate}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ color: '#555', fontSize: 12, marginTop: 40 }}>$ █</div>
    </div>
  );
}
