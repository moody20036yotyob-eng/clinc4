import type { CVData } from '@shared/types/cv';

export function CVTwoTone({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  // Light version of primary color for background
  const lightBg = `${primary}14`;

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Top colored section */}
      <div style={{ backgroundColor: lightBg, padding: '32px 32px 0' }}>
        {/* Name and photo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#111827', margin: '0 0 4px', letterSpacing: '-0.02em' }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '13px', color: primary, fontWeight: '600', margin: '0 0 12px' }}>{personalInfo.jobTitle}</p>}
          </div>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: `4px solid #fff`, boxShadow: '0 2px 12px rgba(0,0,0,0.15)', flexShrink: 0 }} />
          )}
        </div>

        {/* Skills as white cards on colored bg */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '0' }}>
            <h2 style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: `${primary}`, margin: '0 0 10px' }}>Core Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0' }}>
              {skills.map((skill) => (
                <span key={skill.id} style={{ fontSize: '9px', backgroundColor: '#fff', color: '#374151', padding: '4px 10px', borderRadius: '20px', fontWeight: '600', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: `1px solid ${primary}20` }}>{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {/* Contact info bar at the fold */}
        <div style={{ marginTop: '20px', padding: '10px 0', display: 'flex', gap: '20px', flexWrap: 'wrap', borderTop: `2px solid ${primary}30` }}>
          {personalInfo.email && <span style={{ fontSize: '9px', color: '#374151' }}>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '9px', color: '#374151' }}>☎ {personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ fontSize: '9px', color: '#374151' }}>⌖ {personalInfo.location}</span>}
          {personalInfo.website && <span style={{ fontSize: '9px', color: primary }}>{personalInfo.website}</span>}
        </div>
      </div>

      {/* Bottom white section */}
      <div style={{ backgroundColor: '#fff', padding: '24px 32px 28px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px' }}>About</h2>
            <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Experience */}
          <div style={{ flex: 1 }}>
            {experience.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '5px', borderBottom: `2px solid ${primary}20` }}>Experience</h2>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: '14px' }}>
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

            {projects.length > 0 && (
              <div>
                <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '5px', borderBottom: `2px solid ${primary}20` }}>Projects</h2>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                    {proj.description && <p style={{ fontSize: '10px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Education + other */}
          <div style={{ flex: '0 0 155px' }}>
            {education.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '5px', borderBottom: `2px solid ${primary}20` }}>Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <p style={{ fontSize: '9px', color: primary, margin: '0 0 1px' }}>{edu.institution}</p>
                    <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0 }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}
            {languages.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '5px', borderBottom: `2px solid ${primary}20` }}>Languages</h2>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '10px', color: '#374151', fontWeight: '500' }}>{lang.name}</span>
                    <span style={{ fontSize: '8px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '5px', borderBottom: `2px solid ${primary}20` }}>Certifications</h2>
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
