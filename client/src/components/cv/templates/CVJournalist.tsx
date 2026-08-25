import type { CVData } from '@shared/types/cv';

export function CVJournalist({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a1a1a';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Georgia, serif', background: '#fff' }}>
      {/* Editorial masthead */}
      <div style={{ borderTop: '8px solid #111', padding: '20px 32px 0' }}>
        {/* Byline header */}
        <div style={{ borderBottom: '3px double #111', paddingBottom: '16px', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '38px', fontWeight: '900', color: '#111', margin: '0 0 6px', letterSpacing: '-0.03em', lineHeight: 1 }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.jobTitle && (
            <p style={{ fontSize: '13px', color: primary === '#1a1a1a' ? '#374151' : primary, fontStyle: 'italic', margin: '0 0 10px', fontFamily: 'Georgia, serif' }}>
              {personalInfo.jobTitle}
            </p>
          )}
          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', alignItems: 'center' }}>
            {personalInfo.email && <span style={{ fontSize: '9px', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>{personalInfo.email}</span>}
            {personalInfo.phone && <span style={{ fontSize: '9px', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>{personalInfo.phone}</span>}
            {personalInfo.location && <span style={{ fontSize: '9px', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>{personalInfo.location}</span>}
            {personalInfo.website && (
              <span style={{ fontSize: '9px', fontWeight: '700', color: primary, fontFamily: 'Inter, sans-serif', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '3px' }}>
                Portfolio: {personalInfo.website}
              </span>
            )}
            {personalInfo.linkedin && <span style={{ fontSize: '9px', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>{personalInfo.linkedin}</span>}
          </div>
        </div>

        {/* Summary as lead paragraph */}
        {personalInfo.summary && (
          <div style={{ marginBottom: '18px' }}>
            <p style={{ fontSize: '11px', color: '#1f2937', lineHeight: '1.75', margin: 0, fontStyle: 'italic', borderLeft: '3px solid #111', paddingLeft: '12px' }}>
              {personalInfo.summary}
            </p>
          </div>
        )}
      </div>

      {/* Body in editorial layout */}
      <div style={{ padding: '0 32px 28px', display: 'flex', gap: '20px' }}>
        {/* Main column */}
        <div style={{ flex: 1 }}>
          {experience.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#111', marginBottom: '10px', borderBottom: '2px solid #111', paddingBottom: '4px', fontFamily: 'Inter, sans-serif' }}>Editorial Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111', margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: '#374151', fontWeight: '400', margin: '2px 0 4px', fontStyle: 'italic' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0, fontFamily: 'Inter, sans-serif' }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: '16px', fontFamily: 'Inter, sans-serif' }}>
                      {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Publications / projects as "Published In" */}
          {projects.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#111', marginBottom: '10px', borderBottom: '2px solid #111', paddingBottom: '4px', fontFamily: 'Inter, sans-serif' }}>Published Work</h2>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '8px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', flexShrink: 0 }}>▸</span>
                    <div>
                      <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111', margin: '0 0 2px' }}>"{proj.name}"</h3>
                      {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', margin: 0, fontFamily: 'Inter, sans-serif' }}>{proj.description}</p>}
                      {proj.url && <p style={{ fontSize: '8px', color: primary, margin: '2px 0 0', fontFamily: 'Inter, sans-serif' }}>{proj.url}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#111', marginBottom: '10px', borderBottom: '2px solid #111', paddingBottom: '4px', fontFamily: 'Inter, sans-serif' }}>Awards & Recognition</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '10px', color: '#f59e0b' }}>★</span>
                  <div>
                    <p style={{ fontSize: '10px', fontWeight: '700', color: '#111', margin: 0 }}>{cert.name}</p>
                    <p style={{ fontSize: '9px', color: '#6b7280', margin: 0, fontFamily: 'Inter, sans-serif' }}>{cert.issuer} · {cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Side column */}
        <div style={{ flex: '0 0 140px' }}>
          {education.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#111', marginBottom: '10px', borderBottom: '2px solid #111', paddingBottom: '4px', fontFamily: 'Inter, sans-serif' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111', margin: '0 0 2px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '9px', color: '#374151', margin: '0 0 1px', fontStyle: 'italic' }}>{edu.institution}</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0, fontFamily: 'Inter, sans-serif' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#111', marginBottom: '10px', borderBottom: '2px solid #111', paddingBottom: '4px', fontFamily: 'Inter, sans-serif' }}>Beats & Skills</h2>
              {skills.map((skill) => (
                <p key={skill.id} style={{ fontSize: '9px', color: '#374151', margin: '3px 0', fontFamily: 'Inter, sans-serif' }}>· {skill.name}</p>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#111', marginBottom: '10px', borderBottom: '2px solid #111', paddingBottom: '4px', fontFamily: 'Inter, sans-serif' }}>Languages</h2>
              {languages.map((lang) => (
                <div key={lang.id} style={{ marginBottom: '5px' }}>
                  <p style={{ fontSize: '10px', fontWeight: '700', color: '#111', margin: 0 }}>{lang.name}</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0, fontFamily: 'Inter, sans-serif' }}>{lang.level.replace(/_/g, ' ')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
