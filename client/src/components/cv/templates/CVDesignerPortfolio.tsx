import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVDesignerPortfolio({ data }: { data: CVData }) {
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

  // Color palette for project blocks
  const blockColors = [primaryColor, '#e11d48', '#7c3aed', '#0891b2', '#d97706', '#059669'];

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Design';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', backgroundColor: '#fff' }}>
      {/* Visual-heavy header */}
      <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#111827', minHeight: '120px' }}>
        {/* Background shapes */}
        <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '180px', height: '180px', borderRadius: '50%', backgroundColor: hexToRgba(primaryColor, 0.4), zIndex: 0 }} />
        <div style={{ position: 'absolute', right: '100px', bottom: '-30px', width: '100px', height: '100px', borderRadius: '50%', backgroundColor: hexToRgba(primaryColor, 0.25), zIndex: 0 }} />
        <div style={{ position: 'absolute', left: '200px', top: '10px', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', zIndex: 0 }} />

        <div style={{ padding: '24px 32px', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
          {personalInfo.photo ? (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${primaryColor}`, flexShrink: 0 }} />
          ) : (
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: hexToRgba(primaryColor, 0.3), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `2px solid ${primaryColor}` }}>
              <span style={{ fontSize: '28px', color: '#fff', fontWeight: '700' }}>{(personalInfo.fullName || 'YN').split(' ').map((n: string) => n[0]).join('').slice(0, 2)}</span>
            </div>
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#fff', lineHeight: '1.1', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p style={{ fontSize: '13px', color: primaryColor, fontWeight: '600', marginBottom: '8px' }}>{personalInfo.jobTitle}</p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {personalInfo.email && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>{personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>{personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>{personalInfo.location}</span>}
              {personalInfo.website && <span style={{ fontSize: '10px', color: primaryColor }}>⊕ {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Summary tag line */}
      {personalInfo.summary && (
        <div style={{ padding: '14px 32px', backgroundColor: hexToRgba(primaryColor, 0.06), borderBottom: `1px solid ${hexToRgba(primaryColor, 0.15)}` }}>
          <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.6', fontStyle: 'italic' }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Skills as visual blocks by category */}
      {Object.keys(skillsByCategory).length > 0 && (
        <div style={{ padding: '18px 32px', borderBottom: '1px solid #f3f4f6' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '12px' }}>Expertise</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {Object.entries(skillsByCategory).map(([cat, catSkills], catIdx) => (
              <div key={cat} style={{ backgroundColor: hexToRgba(blockColors[catIdx % blockColors.length], 0.08), border: `1px solid ${hexToRgba(blockColors[catIdx % blockColors.length], 0.3)}`, borderRadius: '8px', padding: '10px 14px', minWidth: '100px' }}>
                <p style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: blockColors[catIdx % blockColors.length], marginBottom: '6px' }}>{cat}</p>
                {catSkills.map((skill) => (
                  <p key={skill.id} style={{ fontSize: '10px', color: '#374151', marginBottom: '2px', fontWeight: '500' }}>{skill.name}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project thumbnails - visual blocks */}
      {projects.length > 0 && (
        <div style={{ padding: '18px 32px', borderBottom: '1px solid #f3f4f6' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '12px' }}>Portfolio Highlights</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {projects.slice(0, 6).map((proj, idx) => (
              <div key={proj.id} style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #f3f4f6' }}>
                {/* Color block if no image */}
                <div style={{ height: '50px', backgroundColor: hexToRgba(blockColors[idx % blockColors.length], 0.85), display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)' }} />
                  <span style={{ fontSize: '10px', color: '#fff', fontWeight: '700', padding: '0 8px', textAlign: 'center' }}>{proj.name}</span>
                </div>
                <div style={{ padding: '8px' }}>
                  {proj.description && <p style={{ fontSize: '9px', color: '#6b7280', lineHeight: '1.4' }}>{proj.description.slice(0, 80)}{proj.description.length > 80 ? '…' : ''}</p>}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '4px' }}>
                      {proj.technologies.slice(0, 3).map((tech, i) => <span key={i} style={{ fontSize: '8px', padding: '1px 5px', backgroundColor: hexToRgba(blockColors[idx % blockColors.length], 0.12), color: blockColors[idx % blockColors.length], borderRadius: '4px' }}>{tech}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience + Education two-col */}
      <div style={{ display: 'flex', padding: '18px 32px 24px', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          {experience.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '10px' }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '12px', borderLeft: `3px solid ${primaryColor}`, paddingLeft: '10px' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#1a1a1a' }}>{exp.position}</h3>
                  <p style={{ fontSize: '10px', color: primaryColor, fontWeight: '500' }}>{exp.company}</p>
                  <p style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                  {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', marginTop: '3px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ width: '38%', flexShrink: 0 }}>
          {education.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '10px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '600', color: '#1a1a1a' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '10px', color: primaryColor }}>{edu.institution}</p>
                  <p style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '8px' }}>Languages</h2>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '500', color: '#374151' }}>{lang.name}</span>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primaryColor, marginBottom: '8px' }}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '5px' }}>
                  <p style={{ fontSize: '10px', fontWeight: '600', color: '#1a1a1a' }}>{cert.name}</p>
                  <p style={{ fontSize: '9px', color: '#9ca3af' }}>{cert.issuer} · {cert.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
