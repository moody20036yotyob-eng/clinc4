import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVCreativeSplash({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primaryColor = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  // Convert hex to rgba with opacity
  const hexToRgba = (hex: string, opacity: number) => {
    const n = parseInt(hex.replace('#', ''), 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return `rgba(${r},${g},${b},${opacity})`;
  };

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', backgroundColor: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: '-40px', right: '-40px',
        width: '220px', height: '220px', borderRadius: '50%',
        backgroundColor: hexToRgba(primaryColor, 0.15),
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', top: '30px', right: '30px',
        width: '140px', height: '140px', borderRadius: '50%',
        backgroundColor: hexToRgba(primaryColor, 0.10),
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '60px', left: '-30px',
        width: '100px', height: '100px', borderRadius: '50%',
        backgroundColor: hexToRgba(primaryColor, 0.08),
        zIndex: 0,
      }} />

      {/* Header */}
      <div style={{ padding: '40px 32px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${primaryColor}`, flexShrink: 0 }} />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#111827', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p style={{ fontSize: '15px', color: primaryColor, fontWeight: '500', marginTop: '4px' }}>{personalInfo.jobTitle}</p>
            )}
          </div>
        </div>

        {/* Contact */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '16px' }}>
          {personalInfo.email && <span style={{ fontSize: '10px', color: '#6b7280' }}>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '10px', color: '#6b7280' }}>✆ {personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ fontSize: '10px', color: '#6b7280' }}>⌖ {personalInfo.location}</span>}
          {personalInfo.website && <span style={{ fontSize: '10px', color: '#6b7280' }}>⊕ {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.linkedin && <span style={{ fontSize: '10px', color: '#6b7280' }}>in {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
          {personalInfo.github && <span style={{ fontSize: '10px', color: '#6b7280' }}>gh {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>}
        </div>

        {personalInfo.summary && (
          <p style={{ fontSize: '11px', color: '#4b5563', lineHeight: '1.6', marginTop: '12px', maxWidth: '480px' }}>{personalInfo.summary}</p>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: '2px', margin: '0 32px', background: `linear-gradient(to right, ${primaryColor}, transparent)`, position: 'relative', zIndex: 1 }} />

      {/* Two column body */}
      <div style={{ display: 'flex', padding: '24px 32px', gap: '24px', position: 'relative', zIndex: 1 }}>
        {/* Left */}
        <div style={{ width: '38%', flexShrink: 0 }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111827', marginBottom: '10px' }}>
                <span style={{ borderLeft: `3px solid ${primaryColor}`, paddingLeft: '8px' }}>Skills</span>
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ fontSize: '10px', padding: '4px 10px', backgroundColor: hexToRgba(primaryColor, 0.1), color: primaryColor, borderRadius: '12px', fontWeight: '500' }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111827', marginBottom: '10px' }}>
                <span style={{ borderLeft: `3px solid ${primaryColor}`, paddingLeft: '8px' }}>Languages</span>
              </h2>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '500', color: '#374151' }}>{lang.name}</span>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111827', marginBottom: '10px' }}>
                <span style={{ borderLeft: `3px solid ${primaryColor}`, paddingLeft: '8px' }}>Education</span>
              </h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '600', color: '#1a1a1a' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '10px', color: primaryColor }}>{edu.institution}</p>
                  <p style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <div style={{ flex: 1 }}>
          {experience.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111827', marginBottom: '12px' }}>
                <span style={{ borderLeft: `3px solid ${primaryColor}`, paddingLeft: '8px' }}>Experience</span>
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{exp.position}</h3>
                      <p style={{ fontSize: '11px', color: primaryColor, fontWeight: '500' }}>{exp.company}</p>
                    </div>
                    <p style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', marginTop: '4px', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111827', marginBottom: '10px' }}>
                <span style={{ borderLeft: `3px solid ${primaryColor}`, paddingLeft: '8px' }}>Projects</span>
              </h2>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '600', color: '#1a1a1a' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '10px', color: '#4b5563', marginTop: '2px', lineHeight: '1.5' }}>{proj.description}</p>}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                      {proj.technologies.map((tech, i) => <span key={i} style={{ fontSize: '9px', padding: '1px 7px', backgroundColor: '#f3f4f6', borderRadius: '8px', color: '#6b7280' }}>{tech}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111827', marginBottom: '10px' }}>
                <span style={{ borderLeft: `3px solid ${primaryColor}`, paddingLeft: '8px' }}>Certifications</span>
              </h2>
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
