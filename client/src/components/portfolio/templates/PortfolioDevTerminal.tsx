import type { PortfolioData } from '@shared/types/portfolio';

export function PortfolioDevTerminal({ data }: { data: PortfolioData }) {
  const primary = data.settings?.primaryColor || '#00ff41';
  const p = data.personal;
  const projects = data.projects || [];
  const skills = data.skills || [];
  const experience = data.experience || [];

  return (
    <div style={{ background: '#0d0d0d', color: primary, fontFamily: '"Courier New", "Lucida Console", monospace', minHeight: '100vh', lineHeight: 1.6 }}>
      {/* Terminal title bar */}
      <div style={{ background: '#1a1a1a', padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: `1px solid ${primary}30` }}>
        <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
        <span style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
        <span style={{ marginLeft: '1rem', color: '#666', fontSize: '0.8rem' }}>portfolio.sh — {p.name || 'dev'}</span>
      </div>

      <div style={{ padding: '2rem 3rem', maxWidth: '80rem', margin: '0 auto' }}>
        {/* Welcome / about */}
        <section id="about">
          <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Last login: {new Date().toDateString()}</p>
          <br />
          <p><span style={{ color: '#666' }}>$ </span><span style={{ color: '#fff' }}>cat about.txt</span></p>
          <br />
          <pre style={{ color: primary, fontSize: 'clamp(0.6rem, 1.5vw, 0.9rem)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{`
  ██████╗ ███████╗██╗   ██╗
  ██╔══██╗██╔════╝██║   ██║
  ██║  ██║█████╗  ██║   ██║
  ██║  ██║██╔══╝  ╚██╗ ██╔╝
  ██████╔╝███████╗ ╚████╔╝
  ╚═════╝ ╚══════╝  ╚═══╝
          `}</pre>
          <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{p.name || 'Developer'}</p>
          {p.title && <p style={{ color: '#888', marginBottom: '0.5rem' }}># {p.title}</p>}
          {p.bio && <p style={{ color: '#ccc', marginBottom: '1rem', maxWidth: '60ch' }}># {p.bio}</p>}
          <div style={{ marginBottom: '1.5rem', color: '#666' }}>
            {p.email && <p>email="{p.email}"</p>}
            {p.location && <p>location="{p.location}"</p>}
            {p.github && <p>github=<a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none' }}>"{p.github}"</a></p>}
            {p.website && <p>website=<a href={p.website} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none' }}>"{p.website}"</a></p>}
          </div>
        </section>

        {/* Skills */}
        {skills.length > 0 && (
          <section id="skills" style={{ marginBottom: '3rem' }}>
            <p><span style={{ color: '#666' }}>$ </span><span style={{ color: '#fff' }}>npm list --global --depth=0</span></p>
            <br />
            <div style={{ paddingLeft: '1rem' }}>
              {skills.map(s => (
                <p key={s.id} style={{ color: primary, marginBottom: '0.2rem' }}>
                  <span style={{ color: '#666' }}>├── </span>
                  <span style={{ color: '#fff' }}>{s.name.toLowerCase().replace(/\s+/g, '-')}</span>
                  <span style={{ color: '#666' }}> @latest</span>
                </p>
              ))}
            </div>
            <br />
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section id="projects" style={{ marginBottom: '3rem' }}>
            <p><span style={{ color: '#666' }}>$ </span><span style={{ color: '#fff' }}>git log --oneline --all</span></p>
            <br />
            {projects.map((proj, i) => (
              <div key={proj.id} style={{ marginBottom: '1.5rem', border: `1px solid ${primary}20`, borderRadius: '0.375rem', padding: '1rem 1.25rem', background: '#111' }}>
                <p style={{ color: '#888', marginBottom: '0.25rem', fontSize: '0.8rem' }}>
                  <span style={{ color: '#febc2e' }}>{proj.github ? proj.github.split('/').pop() || `project-${i}` : `project-${i + 1}`}</span>
                  {proj.featured && <span style={{ color: '#ff5f57', marginLeft: '0.75rem' }}>★ featured</span>}
                </p>
                <p style={{ color: '#fff', fontWeight: 700, marginBottom: '0.25rem' }}>{proj.title}</p>
                <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{proj.description}</p>
                {(proj.technologies || []).length > 0 && (
                  <p style={{ color: '#666', fontSize: '0.8rem' }}>
                    tech: {(proj.technologies || []).join(', ')}
                  </p>
                )}
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                  {proj.github && <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none', fontSize: '0.8rem' }}>[github]</a>}
                  {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none', fontSize: '0.8rem' }}>[demo]</a>}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section id="experience" style={{ marginBottom: '3rem' }}>
            <p><span style={{ color: '#666' }}>$ </span><span style={{ color: '#fff' }}>cat work_history.json | jq '.'</span></p>
            <br />
            <div style={{ paddingLeft: '1rem', borderLeft: `2px solid ${primary}30` }}>
              {experience.map((exp, i) => (
                <div key={exp.id} style={{ marginBottom: '1.25rem' }}>
                  <p style={{ color: '#888', fontSize: '0.75rem' }}>{`{`}</p>
                  <p style={{ paddingLeft: '1rem', color: '#ccc', fontSize: '0.85rem' }}>
                    "company": "<span style={{ color: primary }}>{exp.company}</span>",
                  </p>
                  <p style={{ paddingLeft: '1rem', color: '#ccc', fontSize: '0.85rem' }}>
                    "role": "<span style={{ color: '#fff' }}>{exp.position}</span>",
                  </p>
                  <p style={{ paddingLeft: '1rem', color: '#ccc', fontSize: '0.85rem' }}>
                    "period": "<span style={{ color: '#888' }}>{exp.startDate} – {exp.current ? 'present' : exp.endDate}</span>"
                  </p>
                  <p style={{ color: '#888', fontSize: '0.75rem' }}>{`}${i < experience.length - 1 ? ',' : ''}`}</p>
                </div>
              ))}
            </div>
            <br />
          </section>
        )}

        {/* Contact */}
        <section id="contact" style={{ marginBottom: '3rem' }}>
          <p><span style={{ color: '#666' }}>$ </span><span style={{ color: '#fff' }}>./contact.sh</span></p>
          <br />
          <p style={{ color: '#888' }}>Sending message to:</p>
          {p.email && <p><span style={{ color: '#666' }}>→ </span><a href={`mailto:${p.email}`} style={{ color: primary, textDecoration: 'none' }}>{p.email}</a></p>}
          {p.linkedin && <p><span style={{ color: '#666' }}>→ </span><a href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: primary, textDecoration: 'none' }}>{p.linkedin}</a></p>}
          <br />
          <p style={{ color: '#666' }}>exit 0</p>
          <p style={{ color: '#666' }}>[Process completed]</p>
        </section>
      </div>
    </div>
  );
}
