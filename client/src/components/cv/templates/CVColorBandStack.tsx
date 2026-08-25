import type { CVData } from '@shared/types/cv';

export function CVColorBandStack({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#0f766e';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  // Generate lighter shades by appending opacity hex codes
  const bands = [
    { bg: primary, color: '#fff', text: personalInfo.fullName || 'Your Name', size: '26px', weight: '900', padding: '10px 24px' },
    { bg: `${primary}cc`, color: '#fff', text: personalInfo.jobTitle || '', size: '11px', weight: '600', padding: '6px 24px' },
    { bg: `${primary}88`, color: '#fff', text: [personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join('   ·   '), size: '9px', weight: '400', padding: '5px 24px' },
    { bg: `${primary}44`, color: '#374151', text: personalInfo.website || '', size: '8.5px', weight: '400', padding: '4px 24px' },
  ];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Stacked color bands */}
      <div>
        {bands.map((band, i) => band.text && (
          <div key={i} style={{ backgroundColor: band.bg, padding: band.padding }}>
            <span style={{ fontSize: band.size, fontWeight: band.weight as React.CSSProperties['fontWeight'], color: band.color, display: 'block', letterSpacing: i === 0 ? '-0.02em' : i === 1 ? '0.04em' : '0.01em' }}>{band.text}</span>
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={{ padding: '22px 28px 28px', display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '18px' }}>
              <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0, paddingLeft: '12px', borderLeft: `3px solid ${primary}` }}>{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '13px' }}>
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

          {education.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '9px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: 0 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                  <p style={{ fontSize: '9.5px', color: primary, fontWeight: '500', margin: '1px 0 0' }}>{edu.institution}</p>
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Projects</h2>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ flex: '0 0 140px' }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Skills</h2>
              {skills.map(skill => (
                <div key={skill.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <div style={{ width: '5px', height: '5px', backgroundColor: primary, flexShrink: 0 }} />
                  <span style={{ fontSize: '9px', color: '#374151' }}>{skill.name}</span>
                </div>
              ))}
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Languages</h2>
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
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Certifications</h2>
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
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Awards</h2>
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
  );
}
