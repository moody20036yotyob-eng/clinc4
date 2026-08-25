import type { CVData } from '@shared/types/cv';

export function CVMinimalCards({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#374151';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  const Card = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '14px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)', marginBottom: '12px', ...style }}>
      {children}
    </div>
  );

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Header — clean white, no card */}
      <div style={{ padding: '32px 28px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '16px' }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '68px', height: '68px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', flexShrink: 0 }} />
          )}
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#111827', margin: '0 0 3px', letterSpacing: '-0.02em' }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '12px', color: primary, fontWeight: '500', margin: 0 }}>{personalInfo.jobTitle}</p>}
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
          {personalInfo.email && <span style={{ fontSize: '9px', color: '#6b7280' }}>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '9px', color: '#6b7280' }}>☎ {personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ fontSize: '9px', color: '#6b7280' }}>⌖ {personalInfo.location}</span>}
          {personalInfo.website && <span style={{ fontSize: '9px', color: '#6b7280' }}>⊕ {personalInfo.website}</span>}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '0 28px 28px', display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          {personalInfo.summary && (
            <Card>
              <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
            </Card>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '8px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', marginBottom: '8px', marginLeft: '2px' }}>Experience</h2>
              {experience.map((exp) => (
                <Card key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: '8.5px', color: '#9ca3af', flexShrink: 0, marginLeft: '8px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: primary, fontWeight: '500', margin: '2px 0 5px' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '9.5px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <ul style={{ margin: '5px 0 0', paddingLeft: '16px' }}>
                      {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </Card>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div style={{ marginBottom: '8px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', marginBottom: '8px', marginLeft: '2px' }}>Education</h2>
              {education.map((edu) => (
                <Card key={edu.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: 0 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <span style={{ fontSize: '8.5px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                  <p style={{ fontSize: '9.5px', color: primary, fontWeight: '500', margin: '2px 0 0' }}>{edu.institution}</p>
                </Card>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', marginBottom: '8px', marginLeft: '2px' }}>Projects</h2>
              {projects.map((proj) => (
                <Card key={proj.id}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 3px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
                </Card>
              ))}
            </div>
          )}
        </div>

        <div style={{ flex: '0 0 140px' }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: '8px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', marginBottom: '8px', marginLeft: '2px' }}>Skills</h2>
              <Card>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {skills.map(skill => (
                    <span key={skill.id} style={{ fontSize: '8px', backgroundColor: '#fff', color: '#374151', padding: '3px 8px', borderRadius: '20px', fontWeight: '500', boxShadow: '0 1px 2px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb' }}>{skill.name}</span>
                  ))}
                </div>
              </Card>
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ marginBottom: '8px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', marginBottom: '8px', marginLeft: '2px' }}>Languages</h2>
              <Card>
                {languages.map(lang => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '9.5px', color: '#374151', fontWeight: '600' }}>{lang.name}</span>
                    <span style={{ fontSize: '8px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </Card>
            </div>
          )}
          {certifications.length > 0 && (
            <div style={{ marginBottom: '8px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', marginBottom: '8px', marginLeft: '2px' }}>Certifications</h2>
              <Card>
                {certifications.map(cert => (
                  <div key={cert.id} style={{ marginBottom: '6px' }}>
                    <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                    <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{cert.issuer}</p>
                  </div>
                ))}
              </Card>
            </div>
          )}
          {awards.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', marginBottom: '8px', marginLeft: '2px' }}>Awards</h2>
              <Card>
                {awards.map(award => (
                  <div key={award.id} style={{ marginBottom: '6px' }}>
                    <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{award.title}</p>
                    <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{award.issuer}</p>
                  </div>
                ))}
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
