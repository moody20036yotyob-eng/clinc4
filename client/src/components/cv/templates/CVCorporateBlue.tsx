import type { CVData } from '@shared/types/cv';

export function CVCorporateBlue({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1e40af';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const certifications = data.certifications || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Arial, sans-serif', background: '#fff' }}>
      {/* Blue header */}
      <div style={{ backgroundColor: primary, padding: '28px 36px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#fff', margin: '0 0 4px', letterSpacing: '0.02em' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', margin: 0 }}>{personalInfo.jobTitle}</p>
        )}
      </div>

      {/* Contact bar */}
      <div style={{ backgroundColor: '#1e3a6e', padding: '8px 36px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {personalInfo.email && <span style={{ fontSize: '10px', color: '#cbd5e1' }}>{personalInfo.email}</span>}
        {personalInfo.phone && <span style={{ fontSize: '10px', color: '#cbd5e1' }}>{personalInfo.phone}</span>}
        {personalInfo.location && <span style={{ fontSize: '10px', color: '#cbd5e1' }}>{personalInfo.location}</span>}
        {personalInfo.linkedin && <span style={{ fontSize: '10px', color: '#cbd5e1' }}>{personalInfo.linkedin}</span>}
        {personalInfo.website && <span style={{ fontSize: '10px', color: '#cbd5e1' }}>{personalInfo.website}</span>}
      </div>

      {/* Content */}
      <div style={{ padding: '28px 36px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, marginBottom: '8px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Professional Summary</h2>
            <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.65' }}>{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, marginBottom: '12px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Professional Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{exp.position}</h3>
                  <span style={{ fontSize: '10px', color: '#6b7280' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: '11px', color: primary, fontWeight: '600', marginBottom: '4px' }}>{exp.company}{exp.location ? ` | ${exp.location}` : ''}</p>
                {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.55' }}>{exp.description}</p>}
                {(exp.achievements || []).length > 0 && (
                  <ul style={{ marginTop: '4px', paddingLeft: '16px' }}>
                    {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '10px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '24px' }}>
          {education.length > 0 && (
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, marginBottom: '12px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <span style={{ fontSize: '10px', color: '#6b7280' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: primary }}>{edu.institution}</p>
                  {edu.gpa && <p style={{ fontSize: '10px', color: '#6b7280' }}>GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}

          <div style={{ flex: 1 }}>
            {skills.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, marginBottom: '10px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Core Skills</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {skills.map((skill) => (
                    <span key={skill.id} style={{ fontSize: '10px', color: '#374151', backgroundColor: '#f1f5f9', padding: '3px 8px', borderRadius: '3px', border: '1px solid #e2e8f0' }}>{skill.name}</span>
                  ))}
                </div>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, marginBottom: '10px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Certifications</h2>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '600', color: '#111827' }}>{cert.name}</span>
                    <p style={{ fontSize: '10px', color: '#6b7280' }}>{cert.issuer} · {cert.date}</p>
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
