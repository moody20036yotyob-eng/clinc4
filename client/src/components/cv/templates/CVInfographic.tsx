import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVInfographic({ data }: { data: CVData }) {
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

  const LANG_DOTS: Record<string, number> = {
    elementary: 1, limited: 2, professional: 3, full_professional: 4, native: 5,
  };

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', backgroundColor: '#fff', display: 'flex' }}>
      {/* Left visual column */}
      <div style={{ width: '38%', backgroundColor: '#f8fafc', padding: '28px 16px', flexShrink: 0, borderRight: `3px solid ${primaryColor}` }}>
        {/* Photo + Name */}
        {personalInfo.photo && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
            <img src={personalInfo.photo} alt="Photo" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${primaryColor}` }} />
          </div>
        )}
        <h1 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', textAlign: 'center', marginBottom: '2px', lineHeight: '1.2' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p style={{ fontSize: '10px', color: primaryColor, textAlign: 'center', fontWeight: '500', marginBottom: '16px' }}>{personalInfo.jobTitle}</p>
        )}

        {/* Contact */}
        <div style={{ marginBottom: '20px' }}>
          {personalInfo.email && <p style={{ fontSize: '9px', color: '#374151', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ color: primaryColor, fontWeight: '700' }}>✉</span> {personalInfo.email}</p>}
          {personalInfo.phone && <p style={{ fontSize: '9px', color: '#374151', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ color: primaryColor, fontWeight: '700' }}>✆</span> {personalInfo.phone}</p>}
          {personalInfo.location && <p style={{ fontSize: '9px', color: '#374151', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ color: primaryColor, fontWeight: '700' }}>⌖</span> {personalInfo.location}</p>}
          {personalInfo.linkedin && <p style={{ fontSize: '9px', color: '#374151', marginBottom: '4px', wordBreak: 'break-all' }}><span style={{ color: primaryColor, fontWeight: '700' }}>in</span> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</p>}
          {personalInfo.github && <p style={{ fontSize: '9px', color: '#374151', marginBottom: '4px', wordBreak: 'break-all' }}><span style={{ color: primaryColor, fontWeight: '700' }}>gh</span> {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</p>}
        </div>

        {/* Visual skill bars */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '10px', borderBottom: `1px solid ${primaryColor}30`, paddingBottom: '4px' }}>Skills</h2>
            {skills.map((skill) => (
              <div key={skill.id} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ fontSize: '9px', color: '#374151', fontWeight: '500' }}>{skill.name}</span>
                  <span style={{ fontSize: '8px', color: '#9ca3af' }}>{skill.level || ''}</span>
                </div>
                <div style={{ height: '5px', backgroundColor: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', backgroundColor: primaryColor, width: LEVEL_WIDTH[skill.level || 'intermediate'] || '50%', borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Language dots */}
        {languages.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '10px', borderBottom: `1px solid ${primaryColor}30`, paddingBottom: '4px' }}>Languages</h2>
            {languages.map((lang) => {
              const filled = LANG_DOTS[lang.level] || 3;
              return (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
                  <span style={{ fontSize: '9px', fontWeight: '500', color: '#374151' }}>{lang.name}</span>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: i <= filled ? primaryColor : '#e5e7eb' }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Education in sidebar */}
        {education.length > 0 && (
          <div>
            <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '10px', borderBottom: `1px solid ${primaryColor}30`, paddingBottom: '4px' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <p style={{ fontSize: '10px', fontWeight: '600', color: '#1a1a1a' }}>{edu.degree}</p>
                {edu.field && <p style={{ fontSize: '9px', color: '#6b7280' }}>{edu.field}</p>}
                <p style={{ fontSize: '9px', color: primaryColor }}>{edu.institution}</p>
                <p style={{ fontSize: '8px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: experience timeline */}
      <div style={{ flex: 1, padding: '28px 20px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '20px', backgroundColor: '#f0f7ff', borderRadius: '6px', padding: '12px', borderLeft: `3px solid ${primaryColor}` }}>
            <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.6' }}>{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '14px' }}>Experience</h2>
            {/* Timeline */}
            <div style={{ position: 'relative', paddingLeft: '20px' }}>
              {/* Vertical line */}
              <div style={{ position: 'absolute', left: '6px', top: '6px', bottom: '6px', width: '2px', backgroundColor: '#e5e7eb' }} />
              {experience.map((exp, idx) => (
                <div key={exp.id} style={{ position: 'relative', marginBottom: '16px' }}>
                  {/* Dot marker */}
                  <div style={{ position: 'absolute', left: '-17px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: primaryColor, border: '2px solid #fff', boxSizing: 'border-box' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#1a1a1a' }}>{exp.position}</h3>
                      <p style={{ fontSize: '10px', color: primaryColor, fontWeight: '500' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    </div>
                    <p style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                  {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', marginTop: '4px', lineHeight: '1.5' }}>{exp.description}</p>}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul style={{ marginTop: '4px', paddingLeft: '14px' }}>
                      {exp.achievements.slice(0, 3).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '10px' }}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: '600', color: '#1a1a1a' }}>{cert.name}</span>
                  <span style={{ fontSize: '9px', color: '#6b7280', marginLeft: '5px' }}>· {cert.issuer}</span>
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
