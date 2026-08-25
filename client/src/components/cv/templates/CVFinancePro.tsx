import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVFinancePro({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: '"Arial", "Helvetica Neue", sans-serif', backgroundColor: '#fff', color: '#000', padding: '20mm 20mm' }}>
      {/* Header */}
      <div style={{ marginBottom: '12px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#000', letterSpacing: '0.02em', marginBottom: '2px' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p style={{ fontSize: '12px', color: '#333', fontWeight: '400', marginBottom: '8px' }}>{personalInfo.jobTitle}</p>
        )}
        {/* Contact: single clean line */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '10px', color: '#333' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
          {personalInfo.website && <span>| {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
        </div>
      </div>

      {/* Heavy rule */}
      <div style={{ borderBottom: '2px solid #000', marginBottom: '14px' }} />

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: '14px' }}>
          <p style={{ fontSize: '10px', color: '#1a1a1a', lineHeight: '1.6' }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience - table-like structure */}
      {experience.length > 0 && (
        <div style={{ marginBottom: '14px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#000', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px' }}>Professional Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: 'top', width: '75%' }}>
                      <p style={{ fontSize: '11px', fontWeight: '700', color: '#000', margin: 0 }}>{exp.position}</p>
                      <p style={{ fontSize: '10px', color: '#333', margin: '1px 0' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    </td>
                    <td style={{ verticalAlign: 'top', textAlign: 'right', width: '25%' }}>
                      <p style={{ fontSize: '10px', color: '#333', margin: 0, whiteSpace: 'nowrap' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              {exp.description && <p style={{ fontSize: '10px', color: '#1a1a1a', marginTop: '4px', lineHeight: '1.55' }}>{exp.description}</p>}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul style={{ marginTop: '4px', paddingLeft: '16px' }}>
                  {exp.achievements.map((a, i) => (
                    <li key={i} style={{ fontSize: '10px', color: '#1a1a1a', marginBottom: '2px' }}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: '14px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#000', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: 'top', width: '75%' }}>
                      <p style={{ fontSize: '11px', fontWeight: '700', color: '#000', margin: 0 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
                      <p style={{ fontSize: '10px', color: '#333', margin: '1px 0' }}>{edu.institution}</p>
                      {edu.gpa && <p style={{ fontSize: '9px', color: '#555', margin: '1px 0' }}>GPA: {edu.gpa}</p>}
                    </td>
                    <td style={{ verticalAlign: 'top', textAlign: 'right', width: '25%' }}>
                      <p style={{ fontSize: '10px', color: '#333', margin: 0, whiteSpace: 'nowrap' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* Skills section - no decorations */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '14px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#000', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px' }}>Key Competencies</h2>
          <div style={{ columns: 3, gap: '16px' }}>
            {skills.map((skill) => (
              <div key={skill.id} style={{ fontSize: '10px', color: '#1a1a1a', marginBottom: '4px', breakInside: 'avoid' }}>
                · {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages + Certifications */}
      {(languages.length > 0 || certifications.length > 0) && (
        <div style={{ display: 'flex', gap: '32px', marginBottom: '14px' }}>
          {languages.length > 0 && (
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#000', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '8px' }}>Languages</h2>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '3px' }}>
                  <span style={{ color: '#1a1a1a' }}>{lang.name}</span>
                  <span style={{ color: '#555' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div style={{ flex: 2 }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#000', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '8px' }}>Professional Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                  <div>
                    <span style={{ color: '#1a1a1a', fontWeight: '600' }}>{cert.name}</span>
                    <span style={{ color: '#555' }}> · {cert.issuer}</span>
                  </div>
                  <span style={{ color: '#555', whiteSpace: 'nowrap', marginLeft: '8px' }}>{cert.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
