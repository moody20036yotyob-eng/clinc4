import type { CVData } from '@shared/types/cv';

export function CVCreativeBold({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#dc2626';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Big colored header */}
      <div style={{ backgroundColor: primary, padding: '32px 32px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#fff', margin: '0 0 4px', lineHeight: '1', letterSpacing: '-0.02em' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', fontWeight: '600', margin: 0, letterSpacing: '0.02em' }}>{personalInfo.jobTitle}</p>
            )}
          </div>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '80px', height: '80px', borderRadius: '6px', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)' }} />
          )}
        </div>
      </div>

      {/* Contact band */}
      <div style={{ backgroundColor: '#111827', padding: '10px 32px', display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
        {personalInfo.email && <span style={{ fontSize: '9px', color: '#9ca3af' }}>{personalInfo.email}</span>}
        {personalInfo.phone && <span style={{ fontSize: '9px', color: '#9ca3af' }}>{personalInfo.phone}</span>}
        {personalInfo.location && <span style={{ fontSize: '9px', color: '#9ca3af' }}>{personalInfo.location}</span>}
        {personalInfo.website && <span style={{ fontSize: '9px', color: primary }}>{personalInfo.website}</span>}
        {personalInfo.linkedin && <span style={{ fontSize: '9px', color: primary }}>{personalInfo.linkedin}</span>}
        {personalInfo.github && <span style={{ fontSize: '9px', color: primary }}>{personalInfo.github}</span>}
      </div>

      <div style={{ padding: '24px 32px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '22px' }}>
            <p style={{ fontSize: '12px', color: '#374151', lineHeight: '1.7' }}>{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            {/* Bold colored section header band */}
            <div style={{ backgroundColor: primary, padding: '6px 14px', marginBottom: '14px', display: 'inline-block', borderRadius: '3px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#fff', margin: 0 }}>Experience</h2>
            </div>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: `2px solid ${primary}20` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#111827' }}>{exp.position}</h3>
                  <span style={{ fontSize: '9px', color: '#9ca3af', fontWeight: '600', backgroundColor: '#f3f4f6', padding: '2px 7px', borderRadius: '4px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: '11px', color: primary, fontWeight: '700', marginBottom: '4px' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.55' }}>{exp.description}</p>}
                {(exp.achievements || []).length > 0 && (
                  <ul style={{ marginTop: '4px', paddingLeft: '14px' }}>
                    {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '10px', color: '#374151', marginBottom: '2px' }}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '24px' }}>
          {education.length > 0 && (
            <div style={{ flex: 1 }}>
              <div style={{ backgroundColor: primary, padding: '6px 14px', marginBottom: '14px', display: 'inline-block', borderRadius: '3px' }}>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#fff', margin: 0 }}>Education</h2>
              </div>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '11px', color: primary, fontWeight: '600' }}>{edu.institution}</p>
                  <p style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          <div style={{ flex: 1 }}>
            {skills.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ backgroundColor: primary, padding: '6px 14px', marginBottom: '12px', display: 'inline-block', borderRadius: '3px' }}>
                  <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#fff', margin: 0 }}>Skills</h2>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {skills.map((skill) => (
                    <span key={skill.id} style={{ fontSize: '9px', backgroundColor: `${primary}15`, color: primary, border: `1px solid ${primary}`, padding: '3px 8px', borderRadius: '4px', fontWeight: '700' }}>{skill.name}</span>
                  ))}
                </div>
              </div>
            )}

            {languages.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ backgroundColor: '#111827', padding: '6px 14px', marginBottom: '10px', display: 'inline-block', borderRadius: '3px' }}>
                  <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#fff', margin: 0 }}>Languages</h2>
                </div>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10px', color: '#374151', fontWeight: '600' }}>{lang.name}</span>
                    <span style={{ fontSize: '9px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <div style={{ backgroundColor: '#111827', padding: '6px 14px', marginBottom: '10px', display: 'inline-block', borderRadius: '3px' }}>
                  <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#fff', margin: 0 }}>Certs</h2>
                </div>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ marginBottom: '5px' }}>
                    <p style={{ fontSize: '10px', fontWeight: '700', color: '#111827' }}>{cert.name}</p>
                    <p style={{ fontSize: '9px', color: '#6b7280' }}>{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {projects.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <div style={{ backgroundColor: primary, padding: '6px 14px', marginBottom: '14px', display: 'inline-block', borderRadius: '3px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#fff', margin: 0 }}>Projects</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {projects.slice(0, 4).map((proj) => (
                <div key={proj.id} style={{ border: `2px solid ${primary}`, borderRadius: '6px', padding: '10px 12px' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', marginBottom: '3px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', lineHeight: '1.4' }}>{proj.description}</p>}
                  {proj.url && <p style={{ fontSize: '8px', color: primary, wordBreak: 'break-all', marginTop: '3px' }}>{proj.url}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
