import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVMinimalistBorder({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primaryColor = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', backgroundColor: '#fff', padding: '20px' }}>
      {/* Thin border around entire page */}
      <div style={{ border: '1px solid #d1d5db', padding: '28px 32px', minHeight: 'calc(297mm - 40px)', display: 'flex', flexDirection: 'column' }}>
        {/* Name - very large, muted */}
        <div style={{ marginBottom: '16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '40px', fontWeight: '300', letterSpacing: '0.05em', color: primaryColor, lineHeight: '1.0' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.jobTitle && (
            <p style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '400', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '6px' }}>{personalInfo.jobTitle}</p>
          )}
        </div>

        {/* Thin horizontal rule */}
        <div style={{ borderBottom: '0.5px solid #d1d5db', marginBottom: '16px' }} />

        {/* Contact single line */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
          {personalInfo.email && <span style={{ fontSize: '10px', color: '#6b7280' }}>{personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '10px', color: '#6b7280' }}>{personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ fontSize: '10px', color: '#6b7280' }}>{personalInfo.location}</span>}
          {personalInfo.website && <span style={{ fontSize: '10px', color: '#6b7280' }}>{personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.linkedin && <span style={{ fontSize: '10px', color: '#6b7280' }}>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
        </div>

        {/* Thin horizontal rule */}
        <div style={{ borderBottom: '0.5px solid #d1d5db', marginBottom: '20px' }} />

        {/* Summary */}
        {personalInfo.summary && (
          <>
            <p style={{ fontSize: '11px', color: '#4b5563', lineHeight: '1.7', textAlign: 'center', maxWidth: '500px', margin: '0 auto 20px' }}>{personalInfo.summary}</p>
            <div style={{ borderBottom: '0.5px solid #d1d5db', marginBottom: '20px' }} />
          </>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#9ca3af', marginBottom: '12px', textAlign: 'center' }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: '500', color: '#1a1a1a' }}>{exp.position}</h3>
                    <span style={{ fontSize: '10px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                  {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.6' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
            <div style={{ borderBottom: '0.5px solid #d1d5db', marginBottom: '20px' }} />
          </>
        )}

        {/* Education */}
        {education.length > 0 && (
          <>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#9ca3af', marginBottom: '12px', textAlign: 'center' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '11px', fontWeight: '500', color: '#1a1a1a' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <p style={{ fontSize: '10px', color: '#6b7280' }}>{edu.institution}</p>
                  </div>
                  <span style={{ fontSize: '10px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                </div>
              ))}
            </div>
            <div style={{ borderBottom: '0.5px solid #d1d5db', marginBottom: '20px' }} />
          </>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#9ca3af', marginBottom: '12px', textAlign: 'center' }}>Skills</h2>
              <p style={{ fontSize: '11px', color: '#4b5563', textAlign: 'center', lineHeight: '1.8' }}>
                {skills.map((s, i) => (
                  <span key={s.id}>{s.name}{i < skills.length - 1 ? ' · ' : ''}</span>
                ))}
              </p>
            </div>
            {(languages.length > 0 || certifications.length > 0) && <div style={{ borderBottom: '0.5px solid #d1d5db', marginBottom: '20px' }} />}
          </>
        )}

        {/* Languages + Certifications row */}
        {(languages.length > 0 || certifications.length > 0) && (
          <div style={{ display: 'flex', gap: '32px' }}>
            {languages.length > 0 && (
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '9px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#9ca3af', marginBottom: '10px', textAlign: 'center' }}>Languages</h2>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10px', color: '#374151', fontWeight: '500' }}>{lang.name}</span>
                    <span style={{ fontSize: '10px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            )}
            {certifications.length > 0 && (
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '9px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#9ca3af', marginBottom: '10px', textAlign: 'center' }}>Certifications</h2>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ textAlign: 'center', marginBottom: '5px' }}>
                    <p style={{ fontSize: '10px', color: '#374151', fontWeight: '500' }}>{cert.name}</p>
                    <p style={{ fontSize: '9px', color: '#9ca3af' }}>{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
