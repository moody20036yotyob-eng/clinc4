import type { CVData } from '@shared/types/cv';

export function CVHealthcare({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#0d9488';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const certifications = data.certifications || [];
  const languages = data.languages || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Clean medical header */}
      <div style={{ backgroundColor: primary, padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Plus symbol accent */}
          <div style={{ fontSize: '28px', color: 'rgba(255,255,255,0.5)', fontWeight: '300', lineHeight: 1, flexShrink: 0 }}>+</div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', margin: '0 0 2px' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', margin: 0 }}>{personalInfo.jobTitle}</p>}
          </div>
        </div>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Photo" style={{ width: '72px', height: '72px', borderRadius: '8px', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.3)' }} />
        )}
      </div>

      {/* Contact bar */}
      <div style={{ backgroundColor: '#f0fdfa', borderBottom: `2px solid ${primary}`, padding: '8px 32px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {personalInfo.email && <span style={{ fontSize: '10px', color: '#134e4a' }}>{personalInfo.email}</span>}
        {personalInfo.phone && <span style={{ fontSize: '10px', color: '#134e4a' }}>{personalInfo.phone}</span>}
        {personalInfo.location && <span style={{ fontSize: '10px', color: '#134e4a' }}>{personalInfo.location}</span>}
        {personalInfo.website && <span style={{ fontSize: '10px', color: primary }}>{personalInfo.website}</span>}
        {personalInfo.linkedin && <span style={{ fontSize: '10px', color: primary }}>{personalInfo.linkedin}</span>}
      </div>

      <div style={{ padding: '24px 32px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '22px', padding: '14px 16px', backgroundColor: '#f0fdfa', borderRadius: '8px', borderLeft: `4px solid ${primary}` }}>
            <p style={{ fontSize: '11px', color: '#134e4a', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Certifications — prominent for healthcare */}
        {certifications.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '16px', color: primary, fontWeight: '700', lineHeight: 1 }}>+</span>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#134e4a', margin: 0 }}>Licenses & Certifications</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ padding: '10px 12px', backgroundColor: '#f0fdfa', borderRadius: '6px', border: `1px solid ${primary}30` }}>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{cert.name}</p>
                  <p style={{ fontSize: '9px', color: '#6b7280', margin: 0 }}>{cert.issuer} · {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '16px', color: primary, fontWeight: '700', lineHeight: 1 }}>+</span>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#134e4a', margin: 0 }}>Clinical Experience</h2>
            </div>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{exp.position}</h3>
                  <span style={{ fontSize: '9px', color: '#6b7280' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: '11px', color: primary, fontWeight: '600', marginBottom: '3px' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.55' }}>{exp.description}</p>}
                {(exp.achievements || []).length > 0 && (
                  <ul style={{ marginTop: '4px', paddingLeft: '14px' }}>
                    {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '10px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '24px' }}>
          {education.length > 0 && (
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '16px', color: primary, fontWeight: '700', lineHeight: 1 }}>+</span>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#134e4a', margin: 0 }}>Education</h2>
              </div>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '10px', color: primary }}>{edu.institution}</p>
                  <p style={{ fontSize: '9px', color: '#6b7280' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {(skills.length > 0 || languages.length > 0) && (
            <div style={{ flex: 1 }}>
              {skills.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '16px', color: primary, fontWeight: '700', lineHeight: 1 }}>+</span>
                    <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#134e4a', margin: 0 }}>Skills</h2>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {skills.map((skill) => (
                      <span key={skill.id} style={{ fontSize: '9px', backgroundColor: '#f0fdfa', color: '#134e4a', border: `1px solid ${primary}40`, padding: '3px 8px', borderRadius: '4px' }}>{skill.name}</span>
                    ))}
                  </div>
                </div>
              )}
              {languages.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '16px', color: primary, fontWeight: '700', lineHeight: 1 }}>+</span>
                    <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#134e4a', margin: 0 }}>Languages</h2>
                  </div>
                  {languages.map((lang) => (
                    <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '10px', color: '#374151' }}>{lang.name}</span>
                      <span style={{ fontSize: '9px', color: '#6b7280' }}>{lang.level.replace(/_/g, ' ')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
