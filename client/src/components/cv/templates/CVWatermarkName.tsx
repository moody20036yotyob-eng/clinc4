import type { CVData } from '@shared/types/cv';

export function CVWatermarkName({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1e40af';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Watermark name */}
      <div style={{ position: 'absolute', top: '20px', left: '-10px', right: '-10px', fontSize: '88px', fontWeight: '900', color: primary, opacity: 0.06, whiteSpace: 'nowrap', overflow: 'hidden', letterSpacing: '-0.04em', lineHeight: '1', pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}>
        {personalInfo.fullName || 'Your Name'}
      </div>

      {/* Header content on top of watermark */}
      <div style={{ position: 'relative', zIndex: 1, padding: '32px 36px 24px', borderBottom: `3px solid ${primary}` }}>
        <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#111827', margin: '0 0 4px', letterSpacing: '-0.03em' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p style={{ fontSize: '13px', color: primary, fontWeight: '600', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{personalInfo.jobTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
          {personalInfo.email && <span style={{ fontSize: '9.5px', color: '#4b5563' }}>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '9.5px', color: '#4b5563' }}>☎ {personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ fontSize: '9.5px', color: '#4b5563' }}>⌖ {personalInfo.location}</span>}
          {personalInfo.website && <span style={{ fontSize: '9.5px', color: '#4b5563' }}>⊕ {personalInfo.website}</span>}
        </div>
      </div>

      {/* Body */}
      <div style={{ position: 'relative', zIndex: 1, padding: '24px 36px 32px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '22px' }}>
            <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.75', margin: 0, fontStyle: 'italic' }}>{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '12px', paddingBottom: '5px', borderBottom: `2px solid ${primary}` }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px', paddingLeft: '14px', borderLeft: `2px solid ${primary}20` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '2px 0 4px' }}>{exp.company}</p>
                {exp.description && <p style={{ fontSize: '9.5px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
                {(exp.achievements || []).length > 0 && (
                  <ul style={{ margin: '4px 0 0', paddingLeft: '16px' }}>
                    {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '28px' }}>
          <div style={{ flex: 1 }}>
            {education.length > 0 && (
              <div style={{ marginBottom: '18px' }}>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '10px', paddingBottom: '5px', borderBottom: `2px solid ${primary}` }}>Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <p style={{ fontSize: '9.5px', color: primary, fontWeight: '500', margin: '0 0 1px' }}>{edu.institution}</p>
                    <span style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                ))}
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '10px', paddingBottom: '5px', borderBottom: `2px solid ${primary}` }}>Projects</h2>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                    {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ flex: '0 0 150px' }}>
            {skills.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Skills</h2>
                {skills.map(skill => (
                  <div key={skill.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', gap: '6px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: primary, flexShrink: 0 }} />
                    <span style={{ fontSize: '9px', color: '#374151' }}>{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
            {languages.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Languages</h2>
                {languages.map(lang => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '9.5px', color: '#374151', fontWeight: '600' }}>{lang.name}</span>
                    <span style={{ fontSize: '8px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            )}
            {certifications.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Certifications</h2>
                {certifications.map(cert => (
                  <div key={cert.id} style={{ marginBottom: '6px' }}>
                    <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                    <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{cert.issuer}</p>
                  </div>
                ))}
              </div>
            )}
            {awards.length > 0 && (
              <div>
                <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Awards</h2>
                {awards.map(award => (
                  <div key={award.id} style={{ marginBottom: '6px' }}>
                    <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{award.title}</p>
                    <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{award.issuer}</p>
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
