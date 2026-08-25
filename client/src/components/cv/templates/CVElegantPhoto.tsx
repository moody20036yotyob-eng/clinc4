import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVElegantPhoto({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primaryColor = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', backgroundColor: '#fff', color: '#333' }}>
      {/* Full-width header with soft blush/neutral background */}
      <div style={{ backgroundColor: '#f8f0ec', padding: '32px 32px 24px', textAlign: 'center', position: 'relative' }}>
        {/* Decorative accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: primaryColor }} />

        {personalInfo.photo && (
          <div style={{ display: 'inline-block', marginBottom: '16px' }}>
            <img src={personalInfo.photo} alt="Photo" style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }} />
          </div>
        )}
        <h1 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.02em', color: '#1a1a1a', marginBottom: '4px' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <div style={{ display: 'inline-block', backgroundColor: primaryColor, color: '#fff', fontSize: '11px', fontWeight: '600', padding: '3px 14px', borderRadius: '20px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>
            {personalInfo.jobTitle}
          </div>
        )}
        {personalInfo.summary && (
          <p style={{ fontSize: '11px', color: '#6b6b6b', lineHeight: '1.6', maxWidth: '460px', margin: '0 auto', marginBottom: '8px' }}>{personalInfo.summary}</p>
        )}
      </div>

      {/* Contact strip */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '10px 32px', display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
        {personalInfo.email && <span style={{ fontSize: '10px', color: '#6b7280' }}>✉ {personalInfo.email}</span>}
        {personalInfo.phone && <span style={{ fontSize: '10px', color: '#6b7280' }}>✆ {personalInfo.phone}</span>}
        {personalInfo.location && <span style={{ fontSize: '10px', color: '#6b7280' }}>⌖ {personalInfo.location}</span>}
        {personalInfo.website && <span style={{ fontSize: '10px', color: '#6b7280' }}>⊕ {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
        {personalInfo.linkedin && <span style={{ fontSize: '10px', color: '#6b7280' }}>in {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
      </div>

      {/* Two column body */}
      <div style={{ display: 'flex', padding: '24px 32px', gap: '24px' }}>
        {/* Left column */}
        <div style={{ width: '38%', flexShrink: 0 }}>
          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, borderBottom: `1px solid ${primaryColor}`, paddingBottom: '4px', marginBottom: '10px' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ fontSize: '10px', padding: '3px 10px', backgroundColor: '#f3f4f6', borderRadius: '12px', color: '#374151', fontWeight: '500' }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, borderBottom: `1px solid ${primaryColor}`, paddingBottom: '4px', marginBottom: '10px' }}>Languages</h2>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '500', color: '#374151' }}>{lang.name}</span>
                  <span style={{ fontSize: '10px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, borderBottom: `1px solid ${primaryColor}`, paddingBottom: '4px', marginBottom: '10px' }}>Education</h2>
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

        {/* Right column */}
        <div style={{ flex: 1 }}>
          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, borderBottom: `1px solid ${primaryColor}`, paddingBottom: '4px', marginBottom: '12px' }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#1a1a1a' }}>{exp.position}</h3>
                      <p style={{ fontSize: '11px', color: primaryColor, fontWeight: '500' }}>{exp.company}</p>
                    </div>
                    <p style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', marginTop: '4px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, borderBottom: `1px solid ${primaryColor}`, paddingBottom: '4px', marginBottom: '10px' }}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#1a1a1a' }}>{cert.name}</span>
                  <span style={{ fontSize: '10px', color: '#6b7280' }}> · {cert.issuer} · {cert.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
