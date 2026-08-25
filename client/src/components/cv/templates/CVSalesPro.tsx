import type { CVData } from '@shared/types/cv';

export function CVSalesPro({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#dc2626';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const awards = data.awards || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Bold header */}
      <div style={{ backgroundColor: primary, padding: '24px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#fff', margin: '0 0 3px', letterSpacing: '-0.02em' }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', fontWeight: '600', margin: '0 0 10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{personalInfo.jobTitle}</p>}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              {personalInfo.email && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.8)' }}>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.8)' }}>☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.8)' }}>⌖ {personalInfo.location}</span>}
              {personalInfo.linkedin && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.8)' }}>{personalInfo.linkedin}</span>}
            </div>
          </div>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.8)', flexShrink: 0 }} />
          )}
        </div>
      </div>

      {/* Achievement callouts from awards */}
      {awards.length > 0 && (
        <div style={{ backgroundColor: '#fff5f5', padding: '12px 28px', borderBottom: `2px solid ${primary}20`, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {awards.map((award) => (
            <div key={award.id} style={{ backgroundColor: '#fff', border: `2px solid ${primary}`, borderRadius: '6px', padding: '6px 12px', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', fontWeight: '900', color: primary, margin: 0 }}>{award.title}</p>
              <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{award.issuer}</p>
            </div>
          ))}
        </div>
      )}

      {/* Body */}
      <div style={{ padding: '20px 28px 24px', display: 'flex', gap: '20px' }}>
        {/* Left: main content */}
        <div style={{ flex: 1 }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', borderBottom: `3px solid ${primary}`, paddingBottom: '4px' }}>Results Summary</h2>
              <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0, fontWeight: '500' }}>{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', borderBottom: `3px solid ${primary}`, paddingBottom: '4px' }}>Sales Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px', borderLeft: `3px solid ${primary}`, paddingLeft: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#111827', margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: primary, fontWeight: '700', margin: '2px 0 4px' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                  {exp.description && <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.6', margin: '0 0 4px' }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <div style={{ marginTop: '6px' }}>
                      {(exp.achievements || []).map((a, i) => (
                        <div key={i} style={{ display: 'flex', gap: '6px', marginBottom: '4px', alignItems: 'flex-start' }}>
                          <span style={{ color: primary, fontWeight: '900', fontSize: '10px', flexShrink: 0 }}>▶</span>
                          <span style={{ fontSize: '9px', color: '#4b5563', lineHeight: '1.5' }}>{a}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', borderBottom: `3px solid ${primary}`, paddingBottom: '4px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <p style={{ fontSize: '10px', color: primary, margin: '2px 0 0' }}>{edu.institution}</p>
                  </div>
                  <span style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '10px' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ flex: '0 0 150px' }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', borderBottom: `2px solid ${primary}`, paddingBottom: '3px' }}>Tools & Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ fontSize: '8px', backgroundColor: `${primary}10`, color: primary, padding: '3px 8px', borderRadius: '3px', fontWeight: '700', border: `1px solid ${primary}25` }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', borderBottom: `2px solid ${primary}`, paddingBottom: '3px' }}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '6px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0 }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', borderBottom: `2px solid ${primary}`, paddingBottom: '3px' }}>Languages</h2>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '10px', color: '#374151', fontWeight: '500' }}>{lang.name}</span>
                  <span style={{ fontSize: '8px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
