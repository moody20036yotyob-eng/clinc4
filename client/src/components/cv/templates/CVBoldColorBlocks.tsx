import type { CVData } from '@shared/types/cv';

export function CVBoldColorBlocks({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#2563eb';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  const SectionHeader = ({ title }: { title: string }) => (
    <div style={{ backgroundColor: primary, padding: '8px 20px', marginBottom: '0' }}>
      <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#fff', margin: 0 }}>{title}</h2>
    </div>
  );

  const SectionBlock = ({ children }: { children: React.ReactNode }) => (
    <div style={{ backgroundColor: '#f8fafc', padding: '14px 20px', marginBottom: '12px' }}>
      {children}
    </div>
  );

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Header block */}
      <div style={{ backgroundColor: primary, padding: '28px 24px 22px' }}>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Photo" style={{ width: '72px', height: '72px', borderRadius: '4px', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.8)', marginBottom: '12px', display: 'block' }} />
        )}
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#fff', margin: '0 0 4px', letterSpacing: '-0.02em' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', fontWeight: '500', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{personalInfo.jobTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
          {personalInfo.email && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)', fontWeight: '500' }}>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)', fontWeight: '500' }}>☎ {personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)', fontWeight: '500' }}>⌖ {personalInfo.location}</span>}
          {personalInfo.website && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)', fontWeight: '500' }}>⊕ {personalInfo.website}</span>}
        </div>
      </div>

      <div style={{ padding: '16px 0 24px' }}>
        {personalInfo.summary && (
          <>
            <SectionHeader title="Profile" />
            <SectionBlock>
              <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
            </SectionBlock>
          </>
        )}

        {experience.length > 0 && (
          <>
            <SectionHeader title="Experience" />
            <SectionBlock>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '2px 0 4px' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '9.5px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: '16px' }}>
                      {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </SectionBlock>
          </>
        )}

        <div style={{ display: 'flex', gap: '0', marginBottom: '0' }}>
          <div style={{ flex: 1 }}>
            {education.length > 0 && (
              <>
                <SectionHeader title="Education" />
                <SectionBlock>
                  {education.map((edu) => (
                    <div key={edu.id} style={{ marginBottom: '10px' }}>
                      <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                      <p style={{ fontSize: '9px', color: primary, fontWeight: '600', margin: '0 0 1px' }}>{edu.institution}</p>
                      <span style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                    </div>
                  ))}
                </SectionBlock>
              </>
            )}
          </div>
          <div style={{ flex: 1 }}>
            {skills.length > 0 && (
              <>
                <SectionHeader title="Skills" />
                <SectionBlock>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {skills.map(skill => (
                      <span key={skill.id} style={{ fontSize: '8.5px', backgroundColor: '#fff', color: primary, padding: '3px 8px', borderRadius: '2px', fontWeight: '600', border: `1px solid ${primary}30` }}>{skill.name}</span>
                    ))}
                  </div>
                </SectionBlock>
              </>
            )}
          </div>
        </div>

        {projects.length > 0 && (
          <>
            <SectionHeader title="Projects" />
            <SectionBlock>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', margin: 0, lineHeight: '1.6' }}>{proj.description}</p>}
                </div>
              ))}
            </SectionBlock>
          </>
        )}

        {(languages.length > 0 || certifications.length > 0 || awards.length > 0) && (
          <div style={{ display: 'flex', gap: '0' }}>
            {languages.length > 0 && (
              <div style={{ flex: 1 }}>
                <SectionHeader title="Languages" />
                <SectionBlock>
                  {languages.map(lang => (
                    <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '10px', color: '#111827', fontWeight: '600' }}>{lang.name}</span>
                      <span style={{ fontSize: '9px', color: '#6b7280' }}>{lang.level.replace(/_/g, ' ')}</span>
                    </div>
                  ))}
                </SectionBlock>
              </div>
            )}
            {certifications.length > 0 && (
              <div style={{ flex: 1 }}>
                <SectionHeader title="Certifications" />
                <SectionBlock>
                  {certifications.map(cert => (
                    <div key={cert.id} style={{ marginBottom: '6px' }}>
                      <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                      <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{cert.issuer}</p>
                    </div>
                  ))}
                </SectionBlock>
              </div>
            )}
            {awards.length > 0 && (
              <div style={{ flex: 1 }}>
                <SectionHeader title="Awards" />
                <SectionBlock>
                  {awards.map(award => (
                    <div key={award.id} style={{ marginBottom: '6px' }}>
                      <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{award.title}</p>
                      <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{award.issuer}</p>
                    </div>
                  ))}
                </SectionBlock>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
