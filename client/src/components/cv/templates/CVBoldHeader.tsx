import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

function darkenColor(hex: string): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (n >> 16) - 40);
  const g = Math.max(0, ((n >> 8) & 0xff) - 40);
  const b = Math.max(0, (n & 0xff) - 40);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function CVBoldHeader({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primaryColor = data.settings?.primaryColor || '#1a56db';
  const darkColor = darkenColor(primaryColor);
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  const LEVEL_WIDTH: Record<string, string> = {
    beginner: '20%', intermediate: '50%', advanced: '75%', expert: '95%',
  };

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', backgroundColor: '#fff' }}>
      {/* Bold header banner */}
      <div style={{ backgroundColor: darkColor, padding: '28px 32px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative shape */}
        <div style={{ position: 'absolute', right: '140px', top: '-20px', width: '180px', height: '180px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', right: '80px', bottom: '-40px', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.04)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', position: 'relative', zIndex: 1 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', lineHeight: '1.1', marginBottom: '4px', letterSpacing: '-0.02em' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', fontWeight: '400' }}>{personalInfo.jobTitle}</p>
            )}
          </div>
          {personalInfo.photo && (
            <div style={{ flexShrink: 0 }}>
              <img src={personalInfo.photo} alt="Photo" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '4px solid rgba(255,255,255,0.3)' }} />
            </div>
          )}
        </div>

        {/* Contact row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px', position: 'relative', zIndex: 1 }}>
          {personalInfo.email && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)' }}>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)' }}>✆ {personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)' }}>⌖ {personalInfo.location}</span>}
          {personalInfo.website && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)' }}>⊕ {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.linkedin && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)' }}>in {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
          {personalInfo.github && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)' }}>gh: {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>}
        </div>
      </div>

      {/* Two column body */}
      <div style={{ display: 'flex', gap: '0' }}>
        {/* Left: Skills + Contact details */}
        <div style={{ width: '36%', padding: '24px 20px', borderRight: '1px solid #f0f0f0', flexShrink: 0 }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '8px' }}>About</h2>
              <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.6' }}>{personalInfo.summary}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '10px' }}>Skills</h2>
              {skills.map((skill) => (
                <div key={skill.id} style={{ marginBottom: '7px' }}>
                  <p style={{ fontSize: '10px', color: '#374151', marginBottom: '3px', fontWeight: '500' }}>{skill.name}</p>
                  <div style={{ height: '3px', backgroundColor: '#e5e7eb', borderRadius: '2px' }}>
                    <div style={{ height: '100%', backgroundColor: primaryColor, width: LEVEL_WIDTH[skill.level || 'intermediate'] || '50%', borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '10px' }}>Languages</h2>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '500', color: '#374151' }}>{lang.name}</span>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '10px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '600', color: '#1a1a1a' }}>{edu.degree}</h3>
                  {edu.field && <p style={{ fontSize: '10px', color: '#6b7280' }}>{edu.field}</p>}
                  <p style={{ fontSize: '10px', color: primaryColor }}>{edu.institution}</p>
                  <p style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Experience */}
        <div style={{ flex: 1, padding: '24px 24px' }}>
          {experience.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '12px' }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a1a' }}>{exp.position}</h3>
                      <p style={{ fontSize: '11px', color: primaryColor, fontWeight: '600' }}>{exp.company}</p>
                      {exp.location && <p style={{ fontSize: '10px', color: '#9ca3af' }}>{exp.location}</p>}
                    </div>
                    <p style={{ fontSize: '10px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px', fontWeight: '600' }}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                  {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', marginTop: '6px', lineHeight: '1.55' }}>{exp.description}</p>}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul style={{ marginTop: '6px', paddingLeft: '14px' }}>
                      {exp.achievements.map((a, i) => <li key={i} style={{ fontSize: '10px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '10px' }}>Projects</h2>
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
        </div>
      </div>
    </div>
  );
}
