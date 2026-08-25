import type { CVData } from '@shared/types/cv';

export function CVTriangleCorner({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#7c3aed';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff', position: 'relative' }}>
      {/* Large CSS triangle in top-right corner using border trick */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '0 90mm 90mm 0',
        borderColor: `transparent ${primary} transparent transparent`,
        zIndex: 0,
      }} />
      {/* Second, smaller triangle for layering effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '0 65mm 65mm 0',
        borderColor: `transparent ${primary}80 transparent transparent`,
        zIndex: 0,
      }} />

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 1, padding: '32px 36px 24px' }}>
        <div style={{ maxWidth: '120mm' }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${primary}`, marginBottom: '12px', display: 'block' }} />
          )}
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#111827', margin: '0 0 4px', letterSpacing: '-0.03em', lineHeight: '1.1' }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.jobTitle && <p style={{ fontSize: '12px', color: primary, fontWeight: '600', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{personalInfo.jobTitle}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            {personalInfo.email && <span style={{ fontSize: '9px', color: '#4b5563' }}>✉ {personalInfo.email}</span>}
            {personalInfo.phone && <span style={{ fontSize: '9px', color: '#4b5563' }}>☎ {personalInfo.phone}</span>}
            {personalInfo.location && <span style={{ fontSize: '9px', color: '#4b5563' }}>⌖ {personalInfo.location}</span>}
            {personalInfo.website && <span style={{ fontSize: '9px', color: '#4b5563' }}>⊕ {personalInfo.website}</span>}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '2px', backgroundColor: primary, margin: '0 36px', position: 'relative', zIndex: 1 }} />

      {/* Body */}
      <div style={{ position: 'relative', zIndex: 1, padding: '22px 36px 28px', display: 'flex', gap: '26px' }}>
        <div style={{ flex: 1 }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px' }}>Profile</h2>
              <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '5px', borderBottom: `2px solid ${primary}` }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px' }}>
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

          {projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '5px', borderBottom: `2px solid ${primary}` }}>Projects</h2>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ flex: '0 0 145px' }}>
          {education.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '9px', color: primary, fontWeight: '500', margin: '0 0 1px' }}>{edu.institution}</p>
                  <span style={{ fontSize: '8.5px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                </div>
              ))}
            </div>
          )}
          {skills.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {skills.map(skill => (
                  <span key={skill.id} style={{ fontSize: '8px', backgroundColor: `${primary}12`, color: primary, padding: '2px 6px', borderRadius: '10px', fontWeight: '600' }}>{skill.name}</span>
                ))}
              </div>
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
