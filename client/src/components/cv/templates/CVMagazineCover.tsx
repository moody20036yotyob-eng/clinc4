import type { CVData } from '@shared/types/cv';

export function CVMagazineCover({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#dc2626';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Magazine cover top section — 38% of page height */}
      <div style={{ height: '112mm', position: 'relative', overflow: 'hidden', backgroundColor: '#1a1a2e' }}>
        {personalInfo.photo ? (
          <img src={personalInfo.photo} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: `linear-gradient(145deg, #1a1a2e 0%, ${primary} 100%)` }} />
        )}
        {/* Semi-transparent overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
        {/* Top bar like magazine logo */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '10mm', backgroundColor: primary, display: 'flex', alignItems: 'center', paddingLeft: '16px' }}>
          <span style={{ fontSize: '8px', fontWeight: '900', color: '#fff', letterSpacing: '0.3em', textTransform: 'uppercase' }}>CV Professional</span>
        </div>
        {/* Name and title overlay */}
        <div style={{ position: 'absolute', bottom: '14px', left: '18px', right: '18px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#fff', margin: '0 0 4px', letterSpacing: '-0.02em', lineHeight: '1.1', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.jobTitle && (
            <div style={{ display: 'inline-block', backgroundColor: primary, padding: '3px 10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{personalInfo.jobTitle}</span>
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {personalInfo.email && <span style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.85)' }}>✉ {personalInfo.email}</span>}
            {personalInfo.phone && <span style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.85)' }}>☎ {personalInfo.phone}</span>}
            {personalInfo.location && <span style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.85)' }}>⌖ {personalInfo.location}</span>}
          </div>
        </div>
      </div>

      {/* Magazine content area — tight 2-column layout */}
      <div style={{ padding: '16px 18px 20px', display: 'flex', gap: '16px' }}>
        {/* Left column */}
        <div style={{ flex: 1 }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '14px', paddingBottom: '12px', borderBottom: `1px solid #e5e7eb` }}>
              <p style={{ fontSize: '9.5px', color: '#374151', lineHeight: '1.65', margin: 0 }}>{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <div style={{ width: '14px', height: '2px', backgroundColor: primary }} />
                <h2 style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#111827', margin: 0 }}>Experience</h2>
              </div>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: '8px', color: '#9ca3af', flexShrink: 0, marginLeft: '6px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '9px', color: primary, fontWeight: '600', margin: '1px 0 3px' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '9px', color: '#4b5563', lineHeight: '1.55', margin: 0 }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <div style={{ width: '14px', height: '2px', backgroundColor: primary }} />
                <h2 style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#111827', margin: 0 }}>Projects</h2>
              </div>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '7px' }}>
                  <h3 style={{ fontSize: '9.5px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '8.5px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ flex: '0 0 130px', borderLeft: `2px solid ${primary}`, paddingLeft: '14px' }}>
          {education.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <h2 style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, margin: '0 0 8px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{edu.degree}</h3>
                  {edu.field && <p style={{ fontSize: '8px', color: '#374151', margin: '0 0 1px' }}>{edu.field}</p>}
                  <p style={{ fontSize: '8.5px', color: primary, fontWeight: '600', margin: '0 0 1px' }}>{edu.institution}</p>
                  <span style={{ fontSize: '8px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Now' : edu.endDate}</span>
                </div>
              ))}
            </div>
          )}
          {skills.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <h2 style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, margin: '0 0 8px' }}>Skills</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {skills.map(skill => (
                  <span key={skill.id} style={{ fontSize: '8.5px', color: '#374151', borderLeft: `2px solid ${primary}40`, paddingLeft: '5px' }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <h2 style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, margin: '0 0 8px' }}>Languages</h2>
              {languages.map(lang => (
                <div key={lang.id} style={{ marginBottom: '4px' }}>
                  <span style={{ fontSize: '9px', color: '#111827', fontWeight: '600' }}>{lang.name}</span>
                  <p style={{ fontSize: '7.5px', color: '#6b7280', margin: 0 }}>{lang.level.replace(/_/g, ' ')}</p>
                </div>
              ))}
            </div>
          )}
          {certifications.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <h2 style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, margin: '0 0 8px' }}>Certifications</h2>
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: '5px' }}>
                  <p style={{ fontSize: '8.5px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                  <p style={{ fontSize: '7.5px', color: '#6b7280', margin: 0 }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}
          {awards.length > 0 && (
            <div>
              <h2 style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary, margin: '0 0 8px' }}>Awards</h2>
              {awards.map(award => (
                <div key={award.id} style={{ marginBottom: '5px' }}>
                  <p style={{ fontSize: '8.5px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{award.title}</p>
                  <p style={{ fontSize: '7.5px', color: '#6b7280', margin: 0 }}>{award.issuer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
