import type { CVData } from '@shared/types/cv';

export function CVNightMode({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#6366f1';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  const bg = '#111827';
  const surface = '#1f2937';
  const border = '#374151';
  const textPrimary = '#f9fafb';
  const textSecondary = '#9ca3af';

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: bg, color: textPrimary }}>
      {/* Header */}
      <div style={{ padding: '28px 26px 20px', borderBottom: `2px solid ${primary}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '76px', height: '76px', borderRadius: '50%', objectFit: 'cover', boxShadow: `0 0 0 3px ${primary}, 0 0 20px ${primary}40`, flexShrink: 0 }} />
          )}
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: textPrimary, margin: '0 0 3px', letterSpacing: '-0.02em' }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '12px', color: primary, fontWeight: '600', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{personalInfo.jobTitle}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              {personalInfo.email && <span style={{ fontSize: '9px', color: textSecondary }}>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: '9px', color: textSecondary }}>☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: '9px', color: textSecondary }}>⌖ {personalInfo.location}</span>}
              {personalInfo.website && <span style={{ fontSize: '9px', color: primary }}>⊕ {personalInfo.website}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '18px 26px 26px', display: 'flex', gap: '20px' }}>
        {/* Main */}
        <div style={{ flex: 1 }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '18px', padding: '12px 14px', backgroundColor: surface, borderRadius: '6px', borderLeft: `3px solid ${primary}` }}>
              <p style={{ fontSize: '10px', color: '#d1d5db', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `1px solid ${border}` }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '13px', padding: '10px 12px', backgroundColor: surface, borderRadius: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '10.5px', fontWeight: '700', color: textPrimary, margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: '8.5px', color: textSecondary }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '9.5px', color: primary, fontWeight: '600', margin: '2px 0 4px' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '9px', color: '#9ca3af', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <ul style={{ margin: '5px 0 0', paddingLeft: '14px' }}>
                      {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#9ca3af', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `1px solid ${border}` }}>Projects</h2>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '8px', padding: '8px 10px', backgroundColor: surface, borderRadius: '4px' }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: textPrimary, margin: '0 0 2px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '9px', color: '#9ca3af', margin: 0 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `1px solid ${border}` }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: textPrimary, margin: 0 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <span style={{ fontSize: '8.5px', color: textSecondary }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                  <p style={{ fontSize: '9.5px', color: primary, fontWeight: '500', margin: '1px 0 0' }}>{edu.institution}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ flex: '0 0 138px' }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid ${border}` }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {skills.map(skill => (
                  <span key={skill.id} style={{ fontSize: '8px', backgroundColor: `${primary}20`, color: primary, padding: '3px 7px', borderRadius: '4px', fontWeight: '600', border: `1px solid ${primary}30` }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid ${border}` }}>Languages</h2>
              {languages.map(lang => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '9.5px', color: textPrimary, fontWeight: '600' }}>{lang.name}</span>
                  <span style={{ fontSize: '8px', color: textSecondary }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}
          {certifications.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid ${border}` }}>Certifications</h2>
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: '6px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: textPrimary, margin: '0 0 1px' }}>{cert.name}</p>
                  <p style={{ fontSize: '8px', color: textSecondary, margin: 0 }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}
          {awards.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid ${border}` }}>Awards</h2>
              {awards.map(award => (
                <div key={award.id} style={{ marginBottom: '6px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: textPrimary, margin: '0 0 1px' }}>{award.title}</p>
                  <p style={{ fontSize: '8px', color: textSecondary, margin: 0 }}>{award.issuer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
