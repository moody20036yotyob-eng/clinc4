import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVProfessionalPhoto({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primaryColor = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', backgroundColor: '#fff' }}>
      {/* Header: photo left, name+contact right */}
      <div style={{ display: 'flex', alignItems: 'stretch', padding: '28px 32px', gap: '24px', borderBottom: '3px solid #c9a227' }}>
        {personalInfo.photo && (
          <div style={{ flexShrink: 0 }}>
            <img src={personalInfo.photo} alt="Photo" style={{ width: '100px', height: '120px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e5e7eb' }} />
          </div>
        )}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', letterSpacing: '-0.01em', marginBottom: '2px' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.jobTitle && (
            <p style={{ fontSize: '14px', color: '#c9a227', fontWeight: '600', marginBottom: '12px' }}>{personalInfo.jobTitle}</p>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {personalInfo.email && <span style={{ fontSize: '10px', color: '#6b7280' }}>✉ {personalInfo.email}</span>}
            {personalInfo.phone && <span style={{ fontSize: '10px', color: '#6b7280' }}>✆ {personalInfo.phone}</span>}
            {personalInfo.location && <span style={{ fontSize: '10px', color: '#6b7280' }}>⌖ {personalInfo.location}</span>}
            {personalInfo.website && <span style={{ fontSize: '10px', color: '#6b7280' }}>⊕ {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
            {personalInfo.linkedin && <span style={{ fontSize: '10px', color: '#6b7280' }}>in {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ padding: '16px 32px', borderBottom: '1px solid #f3f4f6' }}>
          <p style={{ fontSize: '11px', color: '#4b5563', lineHeight: '1.65' }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Two column body */}
      <div style={{ display: 'flex', padding: '0' }}>
        {/* Left: skills/education */}
        <div style={{ width: '38%', padding: '20px 20px 20px 32px', borderRight: '1px solid #f3f4f6', flexShrink: 0 }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#1a1a1a', borderBottom: '2px solid #c9a227', paddingBottom: '4px', marginBottom: '10px' }}>Skills</h2>
              {skills.map((skill) => (
                <div key={skill.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#c9a227', flexShrink: 0 }} />
                  <span style={{ fontSize: '10px', color: '#374151', fontWeight: '500' }}>{skill.name}</span>
                  {skill.level && <span style={{ fontSize: '9px', color: '#9ca3af', marginLeft: 'auto' }}>{skill.level}</span>}
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#1a1a1a', borderBottom: '2px solid #c9a227', paddingBottom: '4px', marginBottom: '10px' }}>Languages</h2>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '500', color: '#374151' }}>{lang.name}</span>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#1a1a1a', borderBottom: '2px solid #c9a227', paddingBottom: '4px', marginBottom: '10px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '600', color: '#1a1a1a' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '10px', color: primaryColor }}>{edu.institution}</p>
                  <p style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                  {edu.gpa && <p style={{ fontSize: '9px', color: '#9ca3af' }}>GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: experience */}
        <div style={{ flex: 1, padding: '20px 32px 20px 24px' }}>
          {experience.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#1a1a1a', borderBottom: '2px solid #c9a227', paddingBottom: '4px', marginBottom: '12px' }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f9f9f9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#1a1a1a' }}>{exp.position}</h3>
                      <p style={{ fontSize: '11px', color: primaryColor, fontWeight: '500' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    </div>
                    <p style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px', fontWeight: '600' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', marginTop: '5px', lineHeight: '1.55' }}>{exp.description}</p>}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul style={{ marginTop: '5px', paddingLeft: '14px' }}>
                      {exp.achievements.map((a, i) => <li key={i} style={{ fontSize: '10px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#1a1a1a', borderBottom: '2px solid #c9a227', paddingBottom: '4px', marginBottom: '10px' }}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: '600', color: '#1a1a1a' }}>{cert.name}</span>
                    <span style={{ fontSize: '10px', color: '#6b7280', marginLeft: '6px' }}>· {cert.issuer}</span>
                  </div>
                  <span style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>{cert.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
