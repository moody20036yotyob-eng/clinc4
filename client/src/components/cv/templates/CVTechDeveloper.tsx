import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVTechDeveloper({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primaryColor = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  // Use a techy accent - if primaryColor is default, use cyan/green; else use primaryColor
  const accentColor = primaryColor === '#1a56db' ? '#00b894' : primaryColor;

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: '"Courier New", "Consolas", monospace', backgroundColor: '#0f1117', color: '#e2e8f0' }}>
      {/* Terminal-style header */}
      <div style={{ padding: '24px 28px', borderBottom: `1px solid ${accentColor}30` }}>
        {/* Terminal bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f57' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#febc2e' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28c840' }} />
          <span style={{ fontSize: '10px', color: '#4b5563', marginLeft: '8px' }}>cv.sh — {personalInfo.email || 'dev@example.com'}</span>
        </div>

        {/* Name as terminal prompt */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '70px', height: '70px', borderRadius: '6px', objectFit: 'cover', border: `1px solid ${accentColor}40`, marginRight: '8px' }} />
          )}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', color: accentColor }}>$</span>
              <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#f1f5f9', letterSpacing: '-0.01em' }}>{personalInfo.fullName || 'Your Name'}</h1>
            </div>
            {personalInfo.jobTitle && (
              <p style={{ fontSize: '12px', color: accentColor, marginBottom: '8px' }}>// {personalInfo.jobTitle}</p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              {personalInfo.email && <span style={{ fontSize: '10px', color: '#64748b' }}>{personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: '10px', color: '#64748b' }}>{personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: '10px', color: '#64748b' }}>{personalInfo.location}</span>}
              {personalInfo.github && <span style={{ fontSize: '10px', color: accentColor }}>github.com/{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>}
              {personalInfo.website && <span style={{ fontSize: '10px', color: accentColor }}>{personalInfo.website.replace(/^https?:\/\//, '')}</span>}
            </div>
          </div>
        </div>

        {personalInfo.summary && (
          <div style={{ marginTop: '14px', backgroundColor: '#1e2330', borderRadius: '4px', padding: '10px 14px', borderLeft: `3px solid ${accentColor}` }}>
            <p style={{ fontSize: '10px', color: '#94a3b8', lineHeight: '1.6', fontFamily: 'Inter, sans-serif' }}>{personalInfo.summary}</p>
          </div>
        )}
      </div>

      {/* Two column body */}
      <div style={{ display: 'flex' }}>
        {/* Left */}
        <div style={{ width: '40%', padding: '20px 16px 20px 28px', borderRight: `1px solid ${accentColor}20`, flexShrink: 0 }}>
          {/* Skills as code blocks */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '10px', fontWeight: '700', color: accentColor, marginBottom: '10px' }}>&gt; SKILLS</p>
              <div style={{ backgroundColor: '#1e2330', borderRadius: '4px', padding: '10px', fontFamily: '"Courier New", monospace' }}>
                {skills.map((skill, i) => (
                  <div key={skill.id} style={{ fontSize: '10px', color: '#e2e8f0', marginBottom: '3px' }}>
                    <span style={{ color: '#64748b' }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ color: '#f0883e', marginLeft: '8px' }}>{skill.name}</span>
                    {skill.level && <span style={{ color: '#64748b' }}> // {skill.level}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '10px', fontWeight: '700', color: accentColor, marginBottom: '10px' }}>&gt; LANGUAGES</p>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '10px' }}>
                  <span style={{ color: '#e2e8f0' }}>{lang.name}</span>
                  <span style={{ color: '#64748b' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <p style={{ fontSize: '10px', fontWeight: '700', color: accentColor, marginBottom: '10px' }}>&gt; EDUCATION</p>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px', backgroundColor: '#1e2330', borderRadius: '4px', padding: '8px 10px' }}>
                  <p style={{ fontSize: '10px', fontWeight: '600', color: '#e2e8f0' }}>{edu.degree}</p>
                  {edu.field && <p style={{ fontSize: '9px', color: '#64748b' }}>{edu.field}</p>}
                  <p style={{ fontSize: '9px', color: accentColor }}>{edu.institution}</p>
                  <p style={{ fontSize: '9px', color: '#475569' }}>{edu.startDate} — {edu.current ? 'now' : edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <div style={{ flex: 1, padding: '20px 28px 20px 16px' }}>
          {/* Projects first for dev template */}
          {projects.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '10px', fontWeight: '700', color: accentColor, marginBottom: '12px' }}>&gt; PROJECTS</p>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '12px', backgroundColor: '#1e2330', borderRadius: '4px', padding: '10px', borderLeft: `2px solid ${accentColor}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '600', color: '#f1f5f9' }}>{proj.name}</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {proj.github && <span style={{ fontSize: '9px', color: accentColor }}>gh</span>}
                      {proj.url && <span style={{ fontSize: '9px', color: accentColor }}>⊕</span>}
                    </div>
                  </div>
                  {proj.description && <p style={{ fontSize: '9px', color: '#94a3b8', lineHeight: '1.5', fontFamily: 'Inter, sans-serif' }}>{proj.description}</p>}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                      {proj.technologies.map((tech, i) => (
                        <span key={i} style={{ fontSize: '9px', padding: '1px 7px', backgroundColor: `${accentColor}20`, color: accentColor, borderRadius: '3px', border: `1px solid ${accentColor}40` }}>{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '10px', fontWeight: '700', color: accentColor, marginBottom: '12px' }}>&gt; EXPERIENCE</p>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '11px', fontWeight: '600', color: '#f1f5f9' }}>{exp.position}</h3>
                      <p style={{ fontSize: '10px', color: accentColor }}>{exp.company}</p>
                    </div>
                    <p style={{ fontSize: '9px', color: '#475569', whiteSpace: 'nowrap', marginLeft: '8px' }}>{exp.startDate} — {exp.current ? 'now' : exp.endDate}</p>
                  </div>
                  {exp.description && <p style={{ fontSize: '9px', color: '#94a3b8', marginTop: '4px', lineHeight: '1.5', fontFamily: 'Inter, sans-serif' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <p style={{ fontSize: '10px', fontWeight: '700', color: accentColor, marginBottom: '10px' }}>&gt; CERTIFICATIONS</p>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '6px', fontSize: '10px' }}>
                  <span style={{ color: '#f0883e' }}>{cert.name}</span>
                  <span style={{ color: '#64748b' }}> · {cert.issuer} · {cert.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
