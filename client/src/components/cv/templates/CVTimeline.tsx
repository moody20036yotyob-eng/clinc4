import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVTimeline({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primaryColor = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  const hexToRgba = (hex: string, opacity: number) => {
    const n = parseInt(hex.replace('#', ''), 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return `rgba(${r},${g},${b},${opacity})`;
  };

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', backgroundColor: '#fff', display: 'flex' }}>
      {/* Year column left */}
      <div style={{ width: '20%', padding: '28px 0 28px 16px', flexShrink: 0, position: 'relative' }}>
        {/* Header area */}
        <div style={{ marginBottom: '20px', paddingRight: '8px' }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${primaryColor}`, marginBottom: '8px' }} />
          )}
        </div>
        {/* Vertical line */}
        <div style={{ position: 'absolute', right: 0, top: '100px', bottom: '20px', width: '1px', backgroundColor: '#e5e7eb' }} />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '28px 28px 28px 20px' }}>
        {/* Header */}
        <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: `3px solid ${primaryColor}` }}>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#111827', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.jobTitle && (
            <p style={{ fontSize: '13px', color: primaryColor, fontWeight: '600', marginBottom: '8px' }}>{personalInfo.jobTitle}</p>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {personalInfo.email && <span style={{ fontSize: '10px', color: '#6b7280' }}>{personalInfo.email}</span>}
            {personalInfo.phone && <span style={{ fontSize: '10px', color: '#6b7280' }}>{personalInfo.phone}</span>}
            {personalInfo.location && <span style={{ fontSize: '10px', color: '#6b7280' }}>{personalInfo.location}</span>}
            {personalInfo.website && <span style={{ fontSize: '10px', color: primaryColor }}>{personalInfo.website.replace(/^https?:\/\//, '')}</span>}
            {personalInfo.linkedin && <span style={{ fontSize: '10px', color: primaryColor }}>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
          </div>
          {personalInfo.summary && (
            <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.65', marginTop: '10px' }}>{personalInfo.summary}</p>
          )}
        </div>

        {/* Timeline experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '14px' }}>Professional Timeline</h2>
            <div style={{ position: 'relative' }}>
              {/* Central timeline line */}
              <div style={{ position: 'absolute', left: '-28px', top: '8px', bottom: '8px', width: '2px', backgroundColor: hexToRgba(primaryColor, 0.2) }} />

              {experience.map((exp, idx) => (
                <div key={exp.id} style={{ position: 'relative', marginBottom: '18px', paddingLeft: '12px' }}>
                  {/* Timeline dot */}
                  <div style={{ position: 'absolute', left: '-34px', top: '4px', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: primaryColor, border: '3px solid #fff', boxShadow: `0 0 0 1px ${primaryColor}` }} />
                  {/* Year label - positions in left margin */}
                  <div style={{ position: 'absolute', left: '-100px', top: '2px', width: '60px', textAlign: 'right' }}>
                    <span style={{ fontSize: '9px', color: primaryColor, fontWeight: '700' }}>{exp.startDate.split('/').pop() || exp.startDate.split('-').pop() || exp.startDate}</span>
                  </div>

                  <div style={{ backgroundColor: '#fff', border: `1px solid ${hexToRgba(primaryColor, 0.15)}`, borderRadius: '8px', padding: '12px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#1a1a1a' }}>{exp.position}</h3>
                        <p style={{ fontSize: '11px', color: primaryColor, fontWeight: '500' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                      </div>
                      <span style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px', backgroundColor: '#f9fafb', padding: '2px 8px', borderRadius: '10px' }}>
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', marginTop: '6px', lineHeight: '1.55' }}>{exp.description}</p>}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul style={{ marginTop: '5px', paddingLeft: '14px' }}>
                        {exp.achievements.slice(0, 3).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education timeline */}
        {education.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '10px' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', padding: '8px 12px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                <div>
                  <h3 style={{ fontSize: '11px', fontWeight: '600', color: '#1a1a1a' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '10px', color: primaryColor }}>{edu.institution}</p>
                  {edu.gpa && <p style={{ fontSize: '9px', color: '#9ca3af' }}>GPA: {edu.gpa}</p>}
                </div>
                <p style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills + Languages row */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
          {skills.length > 0 && (
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '8px' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ fontSize: '10px', padding: '3px 9px', backgroundColor: hexToRgba(primaryColor, 0.1), color: primaryColor, borderRadius: '12px', fontWeight: '500' }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ width: '35%', flexShrink: 0 }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '8px' }}>Languages</h2>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '500', color: '#374151' }}>{lang.name}</span>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '8px' }}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: '600', color: '#1a1a1a' }}>{cert.name}</span>
                  <span style={{ fontSize: '10px', color: '#6b7280', marginLeft: '5px' }}>· {cert.issuer}</span>
                </div>
                <span style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>{cert.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
