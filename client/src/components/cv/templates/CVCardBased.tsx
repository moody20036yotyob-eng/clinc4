import type { CVData } from '@shared/types/cv';

export function CVCardBased({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
    border: '1px solid #f0f0f0',
    borderLeft: `4px solid ${primary}`,
    padding: '14px 16px',
    marginBottom: '10px',
  };

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#f7f8fa', padding: '28px 24px' }}>
      {/* Header card */}
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '24px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Photo" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `3px solid ${primary}` }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', margin: '0 0 2px', letterSpacing: '-0.01em' }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.jobTitle && <p style={{ fontSize: '12px', color: primary, fontWeight: '600', margin: '0 0 10px' }}>{personalInfo.jobTitle}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {personalInfo.email && <span style={{ fontSize: '9px', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '4px' }}>{personalInfo.email}</span>}
            {personalInfo.phone && <span style={{ fontSize: '9px', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '4px' }}>{personalInfo.phone}</span>}
            {personalInfo.location && <span style={{ fontSize: '9px', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '4px' }}>{personalInfo.location}</span>}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        {/* Left column */}
        <div style={{ flex: '0 0 42%' }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', marginBottom: '8px', paddingLeft: '4px' }}>About</h2>
              <div style={{ ...cardStyle, borderLeft: `4px solid ${primary}` }}>
                <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.65', margin: 0 }}>{personalInfo.summary}</p>
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', marginBottom: '8px', paddingLeft: '4px' }}>Skills</h2>
              <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.10)', padding: '14px 16px' }}>
                {Array.from(new Set(skills.map(s => s.category || 'General'))).map((cat) => (
                  <div key={cat} style={{ marginBottom: '10px' }}>
                    <p style={{ fontSize: '9px', color: primary, fontWeight: '700', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{cat}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {skills.filter(s => (s.category || 'General') === cat).map((skill) => (
                        <span key={skill.id} style={{ fontSize: '9px', backgroundColor: `${primary}12`, color: primary, padding: '2px 7px', borderRadius: '10px', fontWeight: '500' }}>{skill.name}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', marginBottom: '8px', paddingLeft: '4px' }}>Languages</h2>
              <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.10)', padding: '14px 16px' }}>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: '#374151', fontWeight: '500' }}>{lang.name}</span>
                    <span style={{ fontSize: '8px', color: '#9ca3af', backgroundColor: '#f3f4f6', padding: '1px 6px', borderRadius: '4px' }}>{lang.level.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', marginBottom: '8px', paddingLeft: '4px' }}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={cardStyle}>
                  <p style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{cert.name}</p>
                  <p style={{ fontSize: '9px', color: '#6b7280', margin: 0 }}>{cert.issuer} · {cert.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ flex: 1 }}>
          {experience.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', marginBottom: '8px', paddingLeft: '4px' }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={cardStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{exp.position}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: primary, marginBottom: '4px', fontWeight: '500' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.5' }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <ul style={{ marginTop: '4px', paddingLeft: '14px' }}>
                      {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', marginBottom: '8px', paddingLeft: '4px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={cardStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: primary, fontWeight: '500' }}>{edu.institution}</p>
                  {edu.gpa && <p style={{ fontSize: '9px', color: '#6b7280' }}>GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
