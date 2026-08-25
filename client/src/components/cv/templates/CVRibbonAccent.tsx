import type { CVData } from '@shared/types/cv';

export function CVRibbonAccent({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff', display: 'flex' }}>
      {/* Left ribbon */}
      <div style={{ width: '5px', backgroundColor: primary, flexShrink: 0 }} />

      {/* Main content */}
      <div style={{ flex: 1, padding: '0 28px 28px 24px' }}>
        {/* Header */}
        <div style={{ padding: '28px 0 20px', borderBottom: `1px solid ${primary}20`, marginBottom: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {personalInfo.photo && (
              <img src={personalInfo.photo} alt="Photo" style={{ width: '68px', height: '68px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${primary}`, flexShrink: 0 }} />
            )}
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#111827', margin: '0 0 3px', letterSpacing: '-0.02em' }}>{personalInfo.fullName || 'Your Name'}</h1>
              {personalInfo.jobTitle && <p style={{ fontSize: '12px', color: primary, fontWeight: '600', margin: '0 0 8px' }}>{personalInfo.jobTitle}</p>}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {personalInfo.email && <span style={{ fontSize: '9px', color: '#6b7280' }}>✉ {personalInfo.email}</span>}
                {personalInfo.phone && <span style={{ fontSize: '9px', color: '#6b7280' }}>☎ {personalInfo.phone}</span>}
                {personalInfo.location && <span style={{ fontSize: '9px', color: '#6b7280' }}>⌖ {personalInfo.location}</span>}
                {personalInfo.website && <span style={{ fontSize: '9px', color: primary }}>{personalInfo.website}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Sections — each labeled near left with ribbon proximity */}
        {personalInfo.summary && (
          <div style={{ marginBottom: '18px', paddingTop: '14px', borderLeft: `3px solid ${primary}`, paddingLeft: '12px' }}>
            <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, margin: '0 0 6px' }}>Profile</h2>
            <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Left column */}
          <div style={{ flex: 1 }}>
            {experience.length > 0 && (
              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <div style={{ width: '3px', height: '16px', backgroundColor: primary, borderRadius: '2px' }} />
                  <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#111827', margin: 0 }}>Experience</h2>
                </div>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                      <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '2px 0 4px' }}>{exp.company}</p>
                    {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
                    {(exp.achievements || []).length > 0 && (
                      <ul style={{ margin: '4px 0 0', paddingLeft: '14px' }}>
                        {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {education.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <div style={{ width: '3px', height: '16px', backgroundColor: primary, borderRadius: '2px' }} />
                  <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#111827', margin: 0 }}>Education</h2>
                </div>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                      <span style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                    </div>
                    <p style={{ fontSize: '10px', color: primary, fontWeight: '500', margin: '2px 0 0' }}>{edu.institution}</p>
                    {edu.gpa && <p style={{ fontSize: '9px', color: '#6b7280', margin: '2px 0 0' }}>GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column */}
          <div style={{ flex: '0 0 145px' }}>
            {skills.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '3px', height: '14px', backgroundColor: primary, borderRadius: '2px' }} />
                  <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#111827', margin: 0 }}>Skills</h2>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {skills.map((skill) => (
                    <span key={skill.id} style={{ fontSize: '8px', backgroundColor: `${primary}10`, color: primary, padding: '2px 7px', borderRadius: '10px', fontWeight: '600', border: `1px solid ${primary}20` }}>{skill.name}</span>
                  ))}
                </div>
              </div>
            )}

            {languages.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '3px', height: '14px', backgroundColor: primary, borderRadius: '2px' }} />
                  <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#111827', margin: 0 }}>Languages</h2>
                </div>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '10px', color: '#374151', fontWeight: '500' }}>{lang.name}</span>
                    <span style={{ fontSize: '8px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            )}

            {certifications.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '3px', height: '14px', backgroundColor: primary, borderRadius: '2px' }} />
                  <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#111827', margin: 0 }}>Certs</h2>
                </div>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ marginBottom: '6px' }}>
                    <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                    <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0 }}>{cert.issuer}</p>
                  </div>
                ))}
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '3px', height: '14px', backgroundColor: primary, borderRadius: '2px' }} />
                  <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#111827', margin: 0 }}>Projects</h2>
                </div>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ marginBottom: '7px' }}>
                    <p style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</p>
                    {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
