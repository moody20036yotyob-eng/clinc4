import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVMarketingBold({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primaryColor = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  const hexToRgba = (hex: string, opacity: number) => {
    const n = parseInt(hex.replace('#', ''), 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return `rgba(${r},${g},${b},${opacity})`;
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const cat = skill.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', backgroundColor: '#fff' }}>
      {/* Bold header with large typography */}
      <div style={{ backgroundColor: '#fff', padding: '28px 32px 0', position: 'relative' }}>
        {/* Color block left edge */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', backgroundColor: primaryColor }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', paddingLeft: '16px' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '38px', fontWeight: '900', color: '#111827', lineHeight: '1.0', letterSpacing: '-0.03em', marginBottom: '6px' }}>
              {(personalInfo.fullName || 'Your Name').toUpperCase()}
            </h1>
            {personalInfo.jobTitle && (
              <p style={{ fontSize: '14px', color: primaryColor, fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>
                {personalInfo.jobTitle}
              </p>
            )}
          </div>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '85px', height: '85px', borderRadius: '8px', objectFit: 'cover', border: `3px solid ${primaryColor}`, flexShrink: 0 }} />
          )}
        </div>

        {/* Contact */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', paddingLeft: '16px', paddingBottom: '20px' }}>
          {personalInfo.email && <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: '500' }}>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: '500' }}>✆ {personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: '500' }}>⌖ {personalInfo.location}</span>}
          {personalInfo.website && <span style={{ fontSize: '10px', color: primaryColor, fontWeight: '500' }}>⊕ {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.linkedin && <span style={{ fontSize: '10px', color: primaryColor, fontWeight: '500' }}>in {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
        </div>
      </div>

      {/* Colorful section headers area */}
      {personalInfo.summary && (
        <div style={{ backgroundColor: hexToRgba(primaryColor, 0.06), padding: '14px 32px 14px 48px', marginBottom: '20px' }}>
          <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.65', fontWeight: '400' }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Two columns */}
      <div style={{ display: 'flex', padding: '0 32px 24px', gap: '24px' }}>
        {/* Left */}
        <div style={{ width: '38%', flexShrink: 0 }}>
          {/* Skills as bold categories */}
          {Object.entries(skillsByCategory).length > 0 && (
            <div style={{ marginBottom: '22px' }}>
              <div style={{ backgroundColor: primaryColor, padding: '4px 12px', marginBottom: '12px', display: 'inline-block' }}>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fff', margin: 0 }}>Skills</h2>
              </div>
              {Object.entries(skillsByCategory).map(([cat, catSkills]) => (
                <div key={cat} style={{ marginBottom: '10px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '5px' }}>{cat}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {catSkills.map((skill) => (
                      <span key={skill.id} style={{ fontSize: '10px', fontWeight: '700', color: '#1a1a1a', padding: '2px 0', display: 'block', width: '100%' }}>
                        → {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div style={{ marginBottom: '22px' }}>
              <div style={{ backgroundColor: primaryColor, padding: '4px 12px', marginBottom: '12px', display: 'inline-block' }}>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fff', margin: 0 }}>Languages</h2>
              </div>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#111827' }}>{lang.name}</span>
                  <span style={{ fontSize: '9px', color: '#9ca3af', fontWeight: '500' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <div style={{ backgroundColor: primaryColor, padding: '4px 12px', marginBottom: '12px', display: 'inline-block' }}>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fff', margin: 0 }}>Education</h2>
              </div>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827' }}>{edu.degree}</h3>
                  {edu.field && <p style={{ fontSize: '10px', color: '#6b7280' }}>{edu.field}</p>}
                  <p style={{ fontSize: '10px', color: primaryColor, fontWeight: '600' }}>{edu.institution}</p>
                  <p style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <div style={{ flex: 1 }}>
          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '22px' }}>
              <div style={{ backgroundColor: primaryColor, padding: '4px 12px', marginBottom: '14px', display: 'inline-block' }}>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fff', margin: 0 }}>Experience</h2>
              </div>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: `2px solid ${hexToRgba(primaryColor, 0.15)}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#111827', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{exp.position}</h3>
                      <p style={{ fontSize: '11px', color: primaryColor, fontWeight: '700' }}>{exp.company}</p>
                      {exp.location && <p style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.location}</p>}
                    </div>
                    <span style={{ fontSize: '9px', color: '#fff', backgroundColor: primaryColor, padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap', marginLeft: '8px', fontWeight: '600' }}>
                      {exp.startDate} – {exp.current ? 'Now' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', marginTop: '6px', lineHeight: '1.55' }}>{exp.description}</p>}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul style={{ marginTop: '5px', paddingLeft: '14px' }}>
                      {exp.achievements.map((a, i) => <li key={i} style={{ fontSize: '10px', color: '#4b5563', marginBottom: '2px', fontWeight: '500' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Certifications + Projects */}
          {certifications.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <div style={{ backgroundColor: primaryColor, padding: '4px 12px', marginBottom: '10px', display: 'inline-block' }}>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fff', margin: 0 }}>Certifications</h2>
              </div>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '5px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#111827' }}>{cert.name}</span>
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
