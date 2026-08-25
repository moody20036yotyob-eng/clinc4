import type { CVData } from '@shared/types/cv';

export function CVDiagonalSplit({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff', overflow: 'hidden' }}>
      {/* Diagonal split header */}
      <div style={{ position: 'relative', height: '140px', marginBottom: '0' }}>
        {/* Colored left */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: primary, clipPath: 'polygon(0 0, 55% 0, 42% 100%, 0 100%)' }} />
        {/* White right – no clip needed */}
        {/* Name on colored side */}
        <div style={{ position: 'absolute', top: '28px', left: '28px', zIndex: 2 }}>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#fff', margin: '0 0 4px', letterSpacing: '-0.02em', textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.jobTitle && <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', fontWeight: '500', margin: 0 }}>{personalInfo.jobTitle}</p>}
        </div>
        {/* Contact on white side */}
        <div style={{ position: 'absolute', top: '20px', right: '24px', textAlign: 'right', zIndex: 2 }}>
          {personalInfo.email && <p style={{ fontSize: '9px', color: '#374151', margin: '0 0 4px' }}>✉ {personalInfo.email}</p>}
          {personalInfo.phone && <p style={{ fontSize: '9px', color: '#374151', margin: '0 0 4px' }}>☎ {personalInfo.phone}</p>}
          {personalInfo.location && <p style={{ fontSize: '9px', color: '#374151', margin: '0 0 4px' }}>⌖ {personalInfo.location}</p>}
          {personalInfo.website && <p style={{ fontSize: '9px', color: primary, margin: 0 }}>{personalInfo.website}</p>}
        </div>
        {/* Photo if available */}
        {personalInfo.photo && (
          <div style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}>
            <img src={personalInfo.photo} alt="Photo" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: `3px solid #fff`, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }} />
          </div>
        )}
        {/* Diagonal accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderBottom: `2px solid ${primary}20`, zIndex: 1 }} />
      </div>

      {/* Body */}
      <div style={{ padding: personalInfo.photo ? '40px 32px 28px' : '20px 32px 28px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '18px', padding: '12px 16px', backgroundColor: '#f9fafb', borderLeft: `3px solid ${primary}`, borderRadius: '0 6px 6px 0' }}>
            <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '2px 0 4px' }}>{exp.company}</p>
                {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
                {(exp.achievements || []).length > 0 && (
                  <ul style={{ margin: '4px 0 0', paddingLeft: '16px' }}>
                    {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ flex: 1 }}>
            {education.length > 0 && (
              <div style={{ marginBottom: '18px' }}>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <p style={{ fontSize: '10px', color: primary, margin: 0 }}>{edu.institution}</p>
                    <p style={{ fontSize: '9px', color: '#9ca3af', margin: '2px 0 0' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Projects</h2>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                    {proj.description && <p style={{ fontSize: '10px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ flex: '0 0 150px' }}>
            {skills.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Skills</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {skills.map((skill) => (
                    <span key={skill.id} style={{ fontSize: '8px', backgroundColor: `${primary}12`, color: primary, padding: '2px 7px', borderRadius: '10px', fontWeight: '600' }}>{skill.name}</span>
                  ))}
                </div>
              </div>
            )}
            {languages.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Languages</h2>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ marginBottom: '5px' }}>
                    <span style={{ fontSize: '10px', color: '#374151', fontWeight: '600' }}>{lang.name}</span>
                    <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0 }}>{lang.level.replace(/_/g, ' ')}</p>
                  </div>
                ))}
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Certifications</h2>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ marginBottom: '6px' }}>
                    <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                    <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{cert.issuer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
