import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVStartupModern({ data }: { data: CVData }) {
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
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', backgroundColor: '#f9fafb' }}>
      {/* Large colored header band */}
      <div style={{ backgroundColor: primaryColor, padding: '32px 32px 60px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', right: '-30px', top: '-30px', width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'absolute', right: '80px', bottom: '-60px', width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative', zIndex: 1 }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '85px', height: '85px', borderRadius: '16px', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)', flexShrink: 0 }} />
          )}
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#fff', lineHeight: '1.1', marginBottom: '4px', letterSpacing: '-0.02em' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontWeight: '500' }}>{personalInfo.jobTitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Cards overlapping header */}
      <div style={{ margin: '-28px 24px 0', position: 'relative', zIndex: 2, display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {personalInfo.email && (
          <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '10px 14px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', flex: 1 }}>
            <p style={{ fontSize: '8px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Email</p>
            <p style={{ fontSize: '10px', color: '#374151', fontWeight: '500' }}>{personalInfo.email}</p>
          </div>
        )}
        {personalInfo.phone && (
          <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '10px 14px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', flex: 1 }}>
            <p style={{ fontSize: '8px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Phone</p>
            <p style={{ fontSize: '10px', color: '#374151', fontWeight: '500' }}>{personalInfo.phone}</p>
          </div>
        )}
        {personalInfo.location && (
          <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '10px 14px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', flex: 1 }}>
            <p style={{ fontSize: '8px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Location</p>
            <p style={{ fontSize: '10px', color: '#374151', fontWeight: '500' }}>{personalInfo.location}</p>
          </div>
        )}
      </div>

      {/* Main body with two columns */}
      <div style={{ padding: '0 24px 24px', display: 'flex', gap: '16px' }}>
        {/* Left */}
        <div style={{ width: '38%', flexShrink: 0 }}>
          {personalInfo.summary && (
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '16px', marginBottom: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '8px' }}>About</h2>
              <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.6' }}>{personalInfo.summary}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '16px', marginBottom: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '10px' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ fontSize: '10px', padding: '4px 12px', backgroundColor: hexToRgba(primaryColor, 0.1), color: primaryColor, borderRadius: '20px', fontWeight: '600' }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '16px', marginBottom: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '10px' }}>Languages</h2>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '500', color: '#374151' }}>{lang.name}</span>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '10px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
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
            <div style={{ marginBottom: '14px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '10px' }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '14px', marginBottom: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', borderLeft: `3px solid ${primaryColor}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <div>
                      <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#1a1a1a' }}>{exp.position}</h3>
                      <p style={{ fontSize: '10px', color: primaryColor, fontWeight: '500' }}>{exp.company}</p>
                    </div>
                    <span style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '10px' }}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '10px' }}>Projects</h2>
              {projects.map((proj) => (
                <div key={proj.id} style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '14px', marginBottom: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#1a1a1a', marginBottom: '4px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.5', marginBottom: '6px' }}>{proj.description}</p>}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {proj.technologies.map((tech, i) => <span key={i} style={{ fontSize: '9px', padding: '2px 8px', backgroundColor: '#f3f4f6', borderRadius: '10px', color: '#6b7280', fontWeight: '500' }}>{tech}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '10px' }}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '10px 14px', marginBottom: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: '600', color: '#1a1a1a' }}>{cert.name}</p>
                    <p style={{ fontSize: '10px', color: '#6b7280' }}>{cert.issuer}</p>
                  </div>
                  <span style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px', alignSelf: 'center' }}>{cert.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
