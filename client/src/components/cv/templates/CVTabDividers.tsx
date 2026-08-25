import type { CVData } from '@shared/types/cv';

export function CVTabDividers({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#b45309';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  const TabSection = ({ title, children, offset = '0px' }: { title: string; children: React.ReactNode; offset?: string }) => (
    <div style={{ marginBottom: '16px', position: 'relative' }}>
      {/* Tab */}
      <div style={{ display: 'inline-block', backgroundColor: primary, padding: '5px 16px 5px', marginLeft: offset, position: 'relative', borderRadius: '4px 4px 0 0' }}>
        <span style={{ fontSize: '9px', fontWeight: '800', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{title}</span>
        {/* Tab triangle */}
        <div style={{ position: 'absolute', right: '-8px', top: 0, width: 0, height: 0, borderStyle: 'solid', borderWidth: '28px 0 0 8px', borderColor: `transparent transparent transparent ${primary}` }} />
      </div>
      {/* Content area that looks like the tabbed paper */}
      <div style={{ border: `1px solid ${primary}40`, borderTop: `2px solid ${primary}`, padding: '12px 16px', backgroundColor: '#fffbf5' }}>
        {children}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Header */}
      <div style={{ padding: '24px 24px 18px', backgroundColor: '#1c1917', borderBottom: `4px solid ${primary}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '68px', height: '68px', borderRadius: '4px', objectFit: 'cover', border: `2px solid ${primary}`, flexShrink: 0 }} />
          )}
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#fff', margin: '0 0 3px', letterSpacing: '-0.02em' }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '11px', color: primary, fontWeight: '600', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{personalInfo.jobTitle}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              {personalInfo.email && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)' }}>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)' }}>☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)' }}>⌖ {personalInfo.location}</span>}
              {personalInfo.website && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)' }}>⊕ {personalInfo.website}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed sections */}
      <div style={{ padding: '20px 20px 24px' }}>
        {personalInfo.summary && (
          <TabSection title="Profile" offset="0px">
            <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
          </TabSection>
        )}

        {experience.length > 0 && (
          <TabSection title="Experience" offset="16px">
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '2px 0 3px' }}>{exp.company}</p>
                {exp.description && <p style={{ fontSize: '9.5px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
                {(exp.achievements || []).length > 0 && (
                  <ul style={{ margin: '3px 0 0', paddingLeft: '14px' }}>
                    {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </TabSection>
        )}

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            {education.length > 0 && (
              <TabSection title="Education" offset="32px">
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '9px' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <p style={{ fontSize: '9.5px', color: primary, fontWeight: '500', margin: '0 0 1px' }}>{edu.institution}</p>
                    <span style={{ fontSize: '8.5px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                ))}
              </TabSection>
            )}

            {projects.length > 0 && (
              <TabSection title="Projects" offset="16px">
                {projects.map((proj) => (
                  <div key={proj.id} style={{ marginBottom: '7px' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                    {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
                  </div>
                ))}
              </TabSection>
            )}
          </div>

          <div style={{ flex: '0 0 140px' }}>
            {skills.length > 0 && (
              <TabSection title="Skills" offset="48px">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {skills.map(skill => (
                    <span key={skill.id} style={{ fontSize: '8px', backgroundColor: `${primary}20`, color: primary, padding: '2px 7px', borderRadius: '2px', fontWeight: '600' }}>{skill.name}</span>
                  ))}
                </div>
              </TabSection>
            )}
            {languages.length > 0 && (
              <TabSection title="Languages" offset="32px">
                {languages.map(lang => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '9.5px', color: '#374151', fontWeight: '600' }}>{lang.name}</span>
                    <span style={{ fontSize: '8px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </TabSection>
            )}
            {certifications.length > 0 && (
              <TabSection title="Certifications" offset="16px">
                {certifications.map(cert => (
                  <div key={cert.id} style={{ marginBottom: '5px' }}>
                    <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                    <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{cert.issuer}</p>
                  </div>
                ))}
              </TabSection>
            )}
            {awards.length > 0 && (
              <TabSection title="Awards" offset="0px">
                {awards.map(award => (
                  <div key={award.id} style={{ marginBottom: '5px' }}>
                    <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{award.title}</p>
                    <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{award.issuer}</p>
                  </div>
                ))}
              </TabSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
