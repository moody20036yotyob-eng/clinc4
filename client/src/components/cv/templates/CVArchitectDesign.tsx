import type { CVData } from '@shared/types/cv';

export function CVArchitectDesign({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1e3a5f';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: '"Courier New", Courier, monospace', background: '#fff', position: 'relative' }}>
      {/* Blueprint grid background — very subtle */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(30,58,95,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,95,0.04) 1px, transparent 1px)', backgroundSize: '8mm 8mm', pointerEvents: 'none' }} />

      {/* Header — technical drawing style */}
      <div style={{ position: 'relative', borderBottom: `2px solid ${primary}`, padding: '0' }}>
        {/* Title block like engineering drawing */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${primary}40` }}>
          <div style={{ flex: 1, padding: '20px 24px 14px', borderRight: `1px solid ${primary}40` }}>
            {personalInfo.photo && (
              <img src={personalInfo.photo} alt="Photo" style={{ width: '60px', height: '60px', objectFit: 'cover', border: `1px solid ${primary}`, float: 'right', marginLeft: '12px' }} />
            )}
            <div style={{ fontSize: '7px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>CURRICULUM VITAE — PROFESSIONAL PROFILE</div>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: primary, margin: '0 0 3px', letterSpacing: '0.04em' }}>{personalInfo.fullName || 'YOUR NAME'}</h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '10px', color: '#4b5563', fontWeight: '400', margin: '0', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{personalInfo.jobTitle}</p>}
          </div>
          <div style={{ flex: '0 0 120px', padding: '12px 14px', fontSize: '8px', color: '#374151', fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}>
            <div style={{ color: '#9ca3af', fontSize: '7px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Contact</div>
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.website && <div>{personalInfo.website}</div>}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ position: 'relative', padding: '16px 24px 24px', display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '16px', padding: '10px 12px', border: `1px solid ${primary}30` }}>
              <div style={{ fontSize: '7px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '5px' }}>PROFESSIONAL PROFILE</div>
              <p style={{ fontSize: '9.5px', color: '#374151', lineHeight: '1.65', margin: 0, fontFamily: 'Inter, sans-serif' }}>{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '7px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid ${primary}` }}>EXPERIENCE</div>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '12px', paddingLeft: '8px', borderLeft: `2px solid ${primary}40` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: primary, margin: 0, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{exp.position}</h3>
                    <span style={{ fontSize: '8px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>{exp.startDate} — {exp.current ? 'PRESENT' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '9.5px', color: '#4b5563', fontFamily: 'Inter, sans-serif', margin: '2px 0 4px' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '9px', color: '#4b5563', lineHeight: '1.6', margin: 0, fontFamily: 'Inter, sans-serif' }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: '14px', fontFamily: 'Inter, sans-serif' }}>
                      {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '7px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid ${primary}` }}>PROJECTS / WORKS</div>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '8px', display: 'flex', gap: '10px' }}>
                  <div style={{ flex: '0 0 8px', fontSize: '10px', color: primary, fontWeight: '700' }}>+</div>
                  <div>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: primary, margin: '0 0 2px', fontFamily: 'Inter, sans-serif' }}>{proj.name}</h3>
                    {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', margin: 0, fontFamily: 'Inter, sans-serif' }}>{proj.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ flex: '0 0 120px', borderLeft: `1px solid ${primary}30`, paddingLeft: '16px' }}>
          {education.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '7px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '7px' }}>EDUCATION</div>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '9px' }}>
                  <h3 style={{ fontSize: '9px', fontWeight: '700', color: primary, margin: '0 0 1px', fontFamily: 'Inter, sans-serif' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '8.5px', color: '#4b5563', margin: '0 0 1px', fontFamily: 'Inter, sans-serif' }}>{edu.institution}</p>
                  <span style={{ fontSize: '8px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>{edu.startDate} — {edu.current ? 'PRESENT' : edu.endDate}</span>
                </div>
              ))}
            </div>
          )}
          {certifications.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '7px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '7px' }}>CERTIFICATIONS</div>
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: '5px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: primary, margin: '0 0 1px', fontFamily: 'Inter, sans-serif' }}>{cert.name}</p>
                  <p style={{ fontSize: '8px', color: '#6b7280', margin: 0, fontFamily: 'Inter, sans-serif' }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}
          {skills.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '7px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '7px' }}>SOFTWARE / TOOLS</div>
              {skills.map(skill => (
                <div key={skill.id} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                  <span style={{ fontSize: '8px', color: primary }}>—</span>
                  <span style={{ fontSize: '8.5px', color: '#374151', fontFamily: 'Inter, sans-serif' }}>{skill.name}</span>
                </div>
              ))}
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '7px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '7px' }}>LANGUAGES</div>
              {languages.map(lang => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '9px', color: '#374151', fontFamily: 'Inter, sans-serif' }}>{lang.name}</span>
                  <span style={{ fontSize: '7.5px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}
          {awards.length > 0 && (
            <div>
              <div style={{ fontSize: '7px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '7px' }}>AWARDS</div>
              {awards.map(award => (
                <div key={award.id} style={{ marginBottom: '5px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: primary, margin: '0 0 1px', fontFamily: 'Inter, sans-serif' }}>{award.title}</p>
                  <p style={{ fontSize: '8px', color: '#6b7280', margin: 0, fontFamily: 'Inter, sans-serif' }}>{award.issuer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
