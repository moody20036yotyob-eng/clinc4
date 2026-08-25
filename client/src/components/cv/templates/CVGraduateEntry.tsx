import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVGraduateEntry({ data }: { data: CVData }) {
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

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', backgroundColor: '#fff' }}>
      {/* Light accent header */}
      <div style={{ backgroundColor: hexToRgba(primaryColor, 0.08), padding: '28px 32px', borderBottom: `3px solid ${primaryColor}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#1a1a1a', lineHeight: '1.1', marginBottom: '3px', letterSpacing: '-0.01em' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p style={{ fontSize: '13px', color: primaryColor, fontWeight: '500', marginBottom: '10px' }}>{personalInfo.jobTitle}</p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {personalInfo.email && <span style={{ fontSize: '10px', color: '#6b7280' }}>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: '10px', color: '#6b7280' }}>✆ {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: '10px', color: '#6b7280' }}>⌖ {personalInfo.location}</span>}
              {personalInfo.linkedin && <span style={{ fontSize: '10px', color: '#6b7280' }}>in {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
              {personalInfo.github && <span style={{ fontSize: '10px', color: '#6b7280' }}>gh {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>}
            </div>
          </div>
          {/* No photo in default for graduate template — show only if provided */}
          {personalInfo.photo && data.settings?.showPhoto && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '75px', height: '75px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${primaryColor}`, flexShrink: 0 }} />
          )}
        </div>
        {personalInfo.summary && (
          <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.65', marginTop: '12px' }}>{personalInfo.summary}</p>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '24px 32px' }}>
        {/* EDUCATION FIRST for graduate template */}
        {education.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Education
              <span style={{ flex: 1, height: '1px', backgroundColor: hexToRgba(primaryColor, 0.3), display: 'inline-block' }} />
            </h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px', padding: '10px 14px', backgroundColor: hexToRgba(primaryColor, 0.05), borderRadius: '8px', borderLeft: `3px solid ${primaryColor}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#1a1a1a' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <p style={{ fontSize: '11px', color: primaryColor, fontWeight: '500' }}>{edu.institution}</p>
                    {edu.gpa && <p style={{ fontSize: '10px', color: '#6b7280' }}>GPA: {edu.gpa}</p>}
                    {edu.description && <p style={{ fontSize: '10px', color: '#4b5563', marginTop: '3px' }}>{edu.description}</p>}
                  </div>
                  <p style={{ fontSize: '10px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills - prominent for graduate */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '10px' }}>
              Technical Skills
            </h2>
            {/* Group by category if available */}
            {(() => {
              const categorized = skills.reduce((acc, skill) => {
                const cat = skill.category || 'Other';
                if (!acc[cat]) acc[cat] = [];
                acc[cat].push(skill);
                return acc;
              }, {} as Record<string, typeof skills>);
              const cats = Object.entries(categorized);
              if (cats.length === 1) {
                return (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {skills.map((skill) => (
                      <span key={skill.id} style={{ fontSize: '10px', padding: '4px 12px', backgroundColor: hexToRgba(primaryColor, 0.1), color: primaryColor, borderRadius: '16px', fontWeight: '500' }}>{skill.name}</span>
                    ))}
                  </div>
                );
              }
              return cats.map(([cat, catSkills]) => (
                <div key={cat} style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '9px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '8px' }}>{cat}:</span>
                  {catSkills.map((skill) => (
                    <span key={skill.id} style={{ fontSize: '10px', padding: '2px 9px', backgroundColor: hexToRgba(primaryColor, 0.1), color: primaryColor, borderRadius: '12px', fontWeight: '500', marginRight: '5px', display: 'inline-block' }}>{skill.name}</span>
                  ))}
                </div>
              ));
            })()}
          </div>
        )}

        {/* Projects - emphasized */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '12px' }}>Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '12px', border: `1px solid ${hexToRgba(primaryColor, 0.2)}` }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#1a1a1a', marginBottom: '3px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', lineHeight: '1.5', marginBottom: '5px' }}>{proj.description}</p>}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                      {proj.technologies.slice(0, 4).map((tech, i) => <span key={i} style={{ fontSize: '8px', padding: '1px 6px', backgroundColor: hexToRgba(primaryColor, 0.1), color: primaryColor, borderRadius: '8px' }}>{tech}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience (if any) */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '10px' }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#1a1a1a' }}>{exp.position}</h3>
                    <p style={{ fontSize: '11px', color: primaryColor, fontWeight: '500' }}>{exp.company}</p>
                  </div>
                  <p style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                </div>
                {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', marginTop: '3px', lineHeight: '1.5' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Languages + Certs */}
        {(languages.length > 0 || certifications.length > 0) && (
          <div style={{ display: 'flex', gap: '24px' }}>
            {languages.length > 0 && (
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '8px' }}>Languages</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {languages.map((lang) => (
                    <span key={lang.id} style={{ fontSize: '10px', padding: '3px 10px', backgroundColor: '#f3f4f6', borderRadius: '12px', color: '#374151' }}>
                      {lang.name} <span style={{ color: '#9ca3af' }}>· {lang.level.replace(/_/g, ' ')}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
            {certifications.length > 0 && (
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '8px' }}>Certifications</h2>
                {certifications.map((cert) => (
                  <p key={cert.id} style={{ fontSize: '10px', color: '#374151', marginBottom: '4px' }}>
                    <strong>{cert.name}</strong> <span style={{ color: '#9ca3af' }}>· {cert.issuer} · {cert.date}</span>
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
