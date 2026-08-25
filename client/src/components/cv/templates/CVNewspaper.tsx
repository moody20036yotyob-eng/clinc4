import type { CVData } from '@shared/types/cv';

export function CVNewspaper({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Georgia, serif', background: '#fff', padding: '0' }}>
      {/* Masthead */}
      <div style={{ borderTop: '6px solid #111', borderBottom: '3px solid #111', padding: '12px 24px', textAlign: 'center', marginBottom: '0' }}>
        <p style={{ fontSize: '8px', color: '#6b7280', margin: '0 0 4px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          {personalInfo.location || 'Professional'} · {personalInfo.email || ''} · {personalInfo.phone || ''}
        </p>
        <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#111', margin: '4px 0 2px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p style={{ fontSize: '12px', color: '#374151', margin: '4px 0 0', fontStyle: 'italic', letterSpacing: '0.04em' }}>{personalInfo.jobTitle}</p>
        )}
      </div>
      <div style={{ borderTop: '1px solid #111', marginTop: '4px', borderBottom: '1px solid #111', padding: '3px 24px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {personalInfo.website && <span style={{ fontSize: '8px', color: primary, fontFamily: 'Inter, sans-serif' }}>{personalInfo.website}</span>}
        {personalInfo.linkedin && <span style={{ fontSize: '8px', color: '#374151', fontFamily: 'Inter, sans-serif' }}>{personalInfo.linkedin}</span>}
      </div>

      {/* Summary full-width */}
      {personalInfo.summary && (
        <div style={{ padding: '10px 24px', borderBottom: '1px solid #d1d5db' }}>
          <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0, textAlign: 'justify', columnCount: 2, columnGap: '24px' }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Three columns */}
      <div style={{ display: 'flex', gap: '0', padding: '0 24px' }}>
        {/* Column 1 */}
        <div style={{ flex: 1, borderRight: '1px solid #d1d5db', paddingRight: '16px', paddingTop: '12px' }}>
          {experience.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111', borderBottom: '2px solid #111', paddingBottom: '3px', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111', margin: '0 0 1px', lineHeight: '1.3' }}>{exp.position}</h3>
                  <p style={{ fontSize: '9px', color: primary, margin: '0 0 1px', fontStyle: 'italic', fontFamily: 'Inter, sans-serif' }}>{exp.company}</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', margin: '0 0 4px', fontFamily: 'Inter, sans-serif' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                  {exp.description && <p style={{ fontSize: '9px', color: '#374151', lineHeight: '1.55', margin: 0, textAlign: 'justify' }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: '12px' }}>
                      {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '8px', color: '#374151', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Column 2 */}
        <div style={{ flex: 1, borderRight: '1px solid #d1d5db', padding: '12px 16px 0' }}>
          {education.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111', borderBottom: '2px solid #111', paddingBottom: '3px', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111', margin: '0 0 1px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '9px', color: primary, margin: '0 0 1px', fontStyle: 'italic', fontFamily: 'Inter, sans-serif' }}>{edu.institution}</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0, fontFamily: 'Inter, sans-serif' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111', borderBottom: '2px solid #111', paddingBottom: '3px', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Projects</h2>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111', margin: '0 0 2px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '9px', color: '#374151', margin: 0, lineHeight: '1.5', textAlign: 'justify' }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Column 3 */}
        <div style={{ flex: '0 0 130px', paddingLeft: '16px', paddingTop: '12px' }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111', borderBottom: '2px solid #111', paddingBottom: '3px', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Skills</h2>
              {Array.from(new Set(skills.map(s => s.category || 'General'))).map(cat => (
                <div key={cat} style={{ marginBottom: '8px' }}>
                  <p style={{ fontSize: '8px', color: '#9ca3af', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 3px', fontFamily: 'Inter, sans-serif' }}>{cat}</p>
                  {skills.filter(s => (s.category || 'General') === cat).map(skill => (
                    <p key={skill.id} style={{ fontSize: '9px', color: '#374151', margin: '1px 0' }}>— {skill.name}</p>
                  ))}
                </div>
              ))}
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111', borderBottom: '2px solid #111', paddingBottom: '3px', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Languages</h2>
              {languages.map(lang => (
                <div key={lang.id} style={{ marginBottom: '5px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: '#111', margin: '0 0 1px' }}>{lang.name}</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0, fontFamily: 'Inter, sans-serif' }}>{lang.level.replace(/_/g, ' ')}</p>
                </div>
              ))}
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111', borderBottom: '2px solid #111', paddingBottom: '3px', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Credentials</h2>
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: '7px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: '#111', margin: '0 0 1px' }}>{cert.name}</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0, fontFamily: 'Inter, sans-serif' }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
