import type { CVData } from '@shared/types/cv';

export function CVBorderFrame({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#6b21a8';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Georgia, serif', background: '#fff', padding: '8mm', boxSizing: 'border-box' }}>
      {/* Outer border */}
      <div style={{ border: `2px solid ${primary}`, height: '100%', minHeight: 'calc(297mm - 16mm)', padding: '6mm', position: 'relative', boxSizing: 'border-box' }}>
        {/* Inner border */}
        <div style={{ border: `1px solid ${primary}50`, height: '100%', minHeight: 'calc(297mm - 28mm)', padding: '10mm 10mm 8mm', position: 'relative', boxSizing: 'border-box' }}>
          {/* Corner accent marks */}
          <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '12px', height: '12px', borderTop: `3px solid ${primary}`, borderLeft: `3px solid ${primary}` }} />
          <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '12px', height: '12px', borderTop: `3px solid ${primary}`, borderRight: `3px solid ${primary}` }} />
          <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '12px', height: '12px', borderBottom: `3px solid ${primary}`, borderLeft: `3px solid ${primary}` }} />
          <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '12px', height: '12px', borderBottom: `3px solid ${primary}`, borderRight: `3px solid ${primary}` }} />

          {/* Header — centered */}
          <div style={{ textAlign: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: `1px solid ${primary}40` }}>
            {personalInfo.photo && (
              <img src={personalInfo.photo} alt="Photo" style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${primary}`, display: 'block', margin: '0 auto 10px' }} />
            )}
            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: '0 0 4px', letterSpacing: '0.04em' }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '11px', color: primary, fontWeight: '500', margin: '0 0 10px', fontStyle: 'italic', letterSpacing: '0.06em' }}>{personalInfo.jobTitle}</p>}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '14px' }}>
              {personalInfo.email && <span style={{ fontSize: '8.5px', color: '#4b5563' }}>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: '8.5px', color: '#4b5563' }}>☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: '8.5px', color: '#4b5563' }}>⌖ {personalInfo.location}</span>}
              {personalInfo.website && <span style={{ fontSize: '8.5px', color: '#4b5563' }}>⊕ {personalInfo.website}</span>}
            </div>
          </div>

          {/* Ornamental divider */}
          <div style={{ textAlign: 'center', marginBottom: '14px', fontSize: '12px', color: primary, letterSpacing: '6px' }}>✦ ✦ ✦</div>

          {/* Body — two columns */}
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              {personalInfo.summary && (
                <div style={{ marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, marginBottom: '7px', textAlign: 'center' }}>Profile</h2>
                  <p style={{ fontSize: '9.5px', color: '#374151', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>{personalInfo.summary}</p>
                </div>
              )}

              {experience.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `1px solid ${primary}`, textAlign: 'center' }}>Experience</h2>
                  {experience.map((exp) => (
                    <div key={exp.id} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h3 style={{ fontSize: '10.5px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                        <span style={{ fontSize: '8.5px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                      </div>
                      <p style={{ fontSize: '9.5px', color: primary, fontWeight: '600', margin: '1px 0 3px', fontStyle: 'italic' }}>{exp.company}</p>
                      {exp.description && <p style={{ fontSize: '9px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              {projects.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `1px solid ${primary}`, textAlign: 'center' }}>Projects</h2>
                  {projects.map((proj) => (
                    <div key={proj.id} style={{ marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                      {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ flex: '0 0 130px', borderLeft: `1px solid ${primary}30`, paddingLeft: '16px' }}>
              {education.length > 0 && (
                <div style={{ marginBottom: '14px' }}>
                  <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, marginBottom: '8px', textAlign: 'center' }}>Education</h2>
                  {education.map((edu) => (
                    <div key={edu.id} style={{ marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '9.5px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                      <p style={{ fontSize: '9px', color: primary, fontStyle: 'italic', margin: '0 0 1px' }}>{edu.institution}</p>
                      <span style={{ fontSize: '8px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                    </div>
                  ))}
                </div>
              )}
              {skills.length > 0 && (
                <div style={{ marginBottom: '14px' }}>
                  <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, marginBottom: '8px', textAlign: 'center' }}>Skills</h2>
                  {skills.map(skill => (
                    <div key={skill.id} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                      <span style={{ fontSize: '8px', color: primary }}>◆</span>
                      <span style={{ fontSize: '9px', color: '#374151' }}>{skill.name}</span>
                    </div>
                  ))}
                </div>
              )}
              {languages.length > 0 && (
                <div style={{ marginBottom: '14px' }}>
                  <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, marginBottom: '8px', textAlign: 'center' }}>Languages</h2>
                  {languages.map(lang => (
                    <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '9px', color: '#374151', fontWeight: '600' }}>{lang.name}</span>
                      <span style={{ fontSize: '8px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                    </div>
                  ))}
                </div>
              )}
              {certifications.length > 0 && (
                <div style={{ marginBottom: '14px' }}>
                  <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, marginBottom: '8px', textAlign: 'center' }}>Certifications</h2>
                  {certifications.map(cert => (
                    <div key={cert.id} style={{ marginBottom: '5px' }}>
                      <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                      <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              )}
              {awards.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, marginBottom: '8px', textAlign: 'center' }}>Awards</h2>
                  {awards.map(award => (
                    <div key={award.id} style={{ marginBottom: '5px' }}>
                      <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{award.title}</p>
                      <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{award.issuer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
