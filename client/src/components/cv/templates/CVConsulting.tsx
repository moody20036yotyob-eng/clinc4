import type { CVData } from '@shared/types/cv';

export function CVConsulting({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1e3a5f';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Clean minimal header */}
      <div style={{ padding: '32px 32px 20px', borderBottom: `1px solid ${primary}` }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: primary, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p style={{ fontSize: '11px', color: '#374151', margin: '0 0 10px', fontWeight: '500', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{personalInfo.jobTitle}</p>}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {personalInfo.email && <span style={{ fontSize: '9px', color: '#6b7280' }}>{personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '9px', color: '#6b7280' }}>{personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ fontSize: '9px', color: '#6b7280' }}>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span style={{ fontSize: '9px', color: primary }}>{personalInfo.linkedin}</span>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0' }}>
        {/* Left column: summary + education (consulting firms care about school) */}
        <div style={{ flex: '0 0 175px', borderRight: `1px solid #e5e7eb`, padding: '20px 18px 24px' }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '8px' }}>Executive Summary</h2>
              <p style={{ fontSize: '9px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
            </div>
          )}

          {/* Education at top — consulting firms prioritize this */}
          {education.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '10px', borderBottom: `1px solid ${primary}20`, paddingBottom: '4px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: primary, margin: '0 0 2px' }}>{edu.institution}</h3>
                  <p style={{ fontSize: '9px', color: '#374151', margin: '0 0 1px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0 }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                  {edu.gpa && <p style={{ fontSize: '8px', color: '#6b7280', margin: '2px 0 0', fontWeight: '700' }}>GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '10px', borderBottom: `1px solid ${primary}20`, paddingBottom: '4px' }}>Expertise</h2>
              {Array.from(new Set(skills.map(s => s.category || 'Core'))).map(cat => (
                <div key={cat} style={{ marginBottom: '8px' }}>
                  <p style={{ fontSize: '8px', color: '#9ca3af', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px' }}>{cat}</p>
                  {skills.filter(s => (s.category || 'Core') === cat).map(skill => (
                    <p key={skill.id} style={{ fontSize: '9px', color: '#374151', margin: '2px 0' }}>· {skill.name}</p>
                  ))}
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '8px', borderBottom: `1px solid ${primary}20`, paddingBottom: '4px' }}>Languages</h2>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '9px', color: '#374151' }}>{lang.name}</span>
                  <span style={{ fontSize: '8px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '8px', borderBottom: `1px solid ${primary}20`, paddingBottom: '4px' }}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '6px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: '#374151', margin: '0 0 1px' }}>{cert.name}</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0 }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column: experience */}
        <div style={{ flex: 1, padding: '20px 24px 24px' }}>
          {experience.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '12px', borderBottom: `1px solid ${primary}`, paddingBottom: '4px' }}>Professional Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '11px', fontWeight: '700', color: primary, margin: 0 }}>{exp.company}</h3>
                      <p style={{ fontSize: '10px', color: '#374151', fontWeight: '600', margin: '2px 0 1px' }}>{exp.position}</p>
                      <p style={{ fontSize: '8px', color: '#9ca3af', margin: '0 0 6px' }}>{exp.location}</p>
                    </div>
                    <span style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '10px', flexShrink: 0 }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  {exp.description && <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.6', margin: '0 0 6px' }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: '16px' }}>
                      {(exp.achievements || []).map((a, i) => (
                        <li key={i} style={{ fontSize: '9px', color: '#374151', marginBottom: '3px', lineHeight: '1.55' }}>{a}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
