import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVDarkSidebar({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primaryColor = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  const LEVEL_WIDTH: Record<string, string> = {
    beginner: '20%', intermediate: '50%', advanced: '75%', expert: '95%',
  };

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', display: 'flex', backgroundColor: '#fff' }}>
      {/* Dark Sidebar */}
      <div style={{ width: '35%', backgroundColor: '#111827', color: '#fff', padding: '32px 20px', flexShrink: 0 }}>
        {/* Photo */}
        {personalInfo.photo && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <img src={personalInfo.photo} alt="Photo" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.2)' }} />
          </div>
        )}
        {/* Name */}
        <h1 style={{ fontSize: '18px', fontWeight: '700', lineHeight: '1.2', marginBottom: '4px', color: '#fff' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p style={{ fontSize: '11px', color: primaryColor, fontWeight: '500', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contact */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6b7280', marginBottom: '10px' }}>Contact</p>
          {personalInfo.email && <p style={{ fontSize: '10px', color: '#d1d5db', marginBottom: '6px', wordBreak: 'break-all' }}>✉ {personalInfo.email}</p>}
          {personalInfo.phone && <p style={{ fontSize: '10px', color: '#d1d5db', marginBottom: '6px' }}>✆ {personalInfo.phone}</p>}
          {personalInfo.location && <p style={{ fontSize: '10px', color: '#d1d5db', marginBottom: '6px' }}>⌖ {personalInfo.location}</p>}
          {personalInfo.website && <p style={{ fontSize: '10px', color: '#d1d5db', marginBottom: '6px', wordBreak: 'break-all' }}>⊕ {personalInfo.website.replace(/^https?:\/\//, '')}</p>}
          {personalInfo.linkedin && <p style={{ fontSize: '10px', color: '#d1d5db', marginBottom: '6px', wordBreak: 'break-all' }}>in {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</p>}
          {personalInfo.github && <p style={{ fontSize: '10px', color: '#d1d5db', marginBottom: '6px', wordBreak: 'break-all' }}>⌥ {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</p>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6b7280', marginBottom: '10px' }}>Skills</p>
            {skills.map((skill) => (
              <div key={skill.id} style={{ marginBottom: '8px' }}>
                <p style={{ fontSize: '10px', color: '#d1d5db', marginBottom: '3px' }}>{skill.name}</p>
                <div style={{ height: '3px', backgroundColor: '#374151', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', backgroundColor: primaryColor, width: LEVEL_WIDTH[skill.level || 'intermediate'] || '50%', borderRadius: '2px' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <p style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6b7280', marginBottom: '10px' }}>Languages</p>
            {languages.map((lang) => (
              <div key={lang.id} style={{ marginBottom: '4px' }}>
                <span style={{ fontSize: '10px', color: '#d1d5db', fontWeight: '500' }}>{lang.name}</span>
                <span style={{ fontSize: '9px', color: '#6b7280', marginLeft: '6px' }}>{lang.level.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Content */}
      <div style={{ flex: 1, padding: '32px 24px' }}>
        {/* Summary */}
        {personalInfo.summary && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '8px', borderBottom: `2px solid ${primaryColor}`, paddingBottom: '4px' }}>Profile</h2>
            <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.6' }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '12px', borderBottom: `2px solid ${primaryColor}`, paddingBottom: '4px' }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#111827' }}>{exp.position}</h3>
                    <p style={{ fontSize: '11px', color: primaryColor, fontWeight: '500' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                  </div>
                  <p style={{ fontSize: '10px', color: '#6b7280', whiteSpace: 'nowrap', marginLeft: '8px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                </div>
                {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', marginTop: '4px', lineHeight: '1.5' }}>{exp.description}</p>}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul style={{ marginTop: '4px', paddingLeft: '14px' }}>
                    {exp.achievements.map((a, i) => <li key={i} style={{ fontSize: '10px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '12px', borderBottom: `2px solid ${primaryColor}`, paddingBottom: '4px' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#111827' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '11px', color: primaryColor }}>{edu.institution}</p>
                  {edu.gpa && <p style={{ fontSize: '10px', color: '#6b7280' }}>GPA: {edu.gpa}</p>}
                </div>
                <p style={{ fontSize: '10px', color: '#6b7280', whiteSpace: 'nowrap', marginLeft: '8px' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '10px', borderBottom: `2px solid ${primaryColor}`, paddingBottom: '4px' }}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#111827' }}>{cert.name}</span>
                  <span style={{ fontSize: '10px', color: '#6b7280', marginLeft: '6px' }}>· {cert.issuer}</span>
                </div>
                <span style={{ fontSize: '10px', color: '#6b7280', whiteSpace: 'nowrap', marginLeft: '8px' }}>{cert.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
