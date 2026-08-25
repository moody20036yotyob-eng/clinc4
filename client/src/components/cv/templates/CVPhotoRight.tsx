import type { CVData } from '@shared/types/cv';

export function CVPhotoRight({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff', padding: '36px 36px' }}>
      {/* Header: name left, photo right */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#111827', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.jobTitle && (
            <p style={{ fontSize: '14px', color: primary, fontWeight: '600', margin: '0 0 14px' }}>{personalInfo.jobTitle}</p>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            {personalInfo.email && <span style={{ fontSize: '10px', color: '#6b7280' }}>{personalInfo.email}</span>}
            {personalInfo.phone && <span style={{ fontSize: '10px', color: '#6b7280' }}>{personalInfo.phone}</span>}
            {personalInfo.location && <span style={{ fontSize: '10px', color: '#6b7280' }}>{personalInfo.location}</span>}
            {personalInfo.linkedin && <span style={{ fontSize: '10px', color: '#6b7280' }}>{personalInfo.linkedin}</span>}
          </div>
        </div>
        {personalInfo.photo && (
          <div style={{ marginLeft: '24px', flexShrink: 0 }}>
            <img src={personalInfo.photo} alt="Photo" style={{ width: '90px', height: '90px', borderRadius: '8px', objectFit: 'cover', border: `3px solid ${primary}` }} />
          </div>
        )}
      </div>

      <div style={{ height: '2px', backgroundColor: primary, marginBottom: '24px' }} />

      {personalInfo.summary && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px' }}>About</h2>
          <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.7' }}>{personalInfo.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '12px' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px', display: 'flex', gap: '12px' }}>
              <div style={{ width: '90px', flexShrink: 0, textAlign: 'right' }}>
                <p style={{ fontSize: '9px', color: '#9ca3af', lineHeight: '1.4' }}>{exp.startDate}</p>
                <p style={{ fontSize: '9px', color: '#9ca3af' }}>–</p>
                <p style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.current ? 'Present' : exp.endDate}</p>
              </div>
              <div style={{ width: '1px', backgroundColor: `${primary}40`, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827', marginBottom: '1px' }}>{exp.position}</h3>
                <p style={{ fontSize: '11px', color: primary, marginBottom: '3px' }}>{exp.company}</p>
                {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.5' }}>{exp.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '24px' }}>
        {education.length > 0 && (
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '12px' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                <p style={{ fontSize: '10px', color: primary }}>{edu.institution}</p>
                <p style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ flex: 1 }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ fontSize: '10px', backgroundColor: `${primary}12`, color: primary, padding: '3px 8px', borderRadius: '12px', fontWeight: '500' }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px' }}>Languages</h2>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '10px', color: '#374151' }}>{lang.name}</span>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px' }}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '6px' }}>
                  <p style={{ fontSize: '10px', fontWeight: '600', color: '#111827' }}>{cert.name}</p>
                  <p style={{ fontSize: '9px', color: '#6b7280' }}>{cert.issuer} · {cert.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
