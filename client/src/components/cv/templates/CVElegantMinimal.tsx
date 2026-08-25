import type { CVData } from '@shared/types/cv';

export function CVElegantMinimal({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', background: '#fff', padding: '56px 56px 48px' }}>
      {/* Ultra-minimal header */}
      <div style={{ marginBottom: '4px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '300', color: '#111827', margin: '0', letterSpacing: '-0.01em', lineHeight: '1.1' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
      </div>
      {personalInfo.jobTitle && (
        <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '400', margin: '6px 0 0', letterSpacing: '0.02em' }}>{personalInfo.jobTitle}</p>
      )}

      {/* Single thin line */}
      <div style={{ borderTop: '1px solid #e5e7eb', margin: '24px 0' }} />

      {/* Minimal contact line */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '36px', flexWrap: 'wrap' }}>
        {personalInfo.email && <span style={{ fontSize: '9px', color: '#9ca3af', letterSpacing: '0.04em' }}>{personalInfo.email}</span>}
        {personalInfo.phone && <span style={{ fontSize: '9px', color: '#9ca3af', letterSpacing: '0.04em' }}>{personalInfo.phone}</span>}
        {personalInfo.location && <span style={{ fontSize: '9px', color: '#9ca3af', letterSpacing: '0.04em' }}>{personalInfo.location}</span>}
        {personalInfo.website && <span style={{ fontSize: '9px', color: '#9ca3af', letterSpacing: '0.04em' }}>{personalInfo.website}</span>}
        {personalInfo.linkedin && <span style={{ fontSize: '9px', color: '#9ca3af', letterSpacing: '0.04em' }}>{personalInfo.linkedin}</span>}
        {personalInfo.github && <span style={{ fontSize: '9px', color: '#9ca3af', letterSpacing: '0.04em' }}>{personalInfo.github}</span>}
      </div>

      {personalInfo.summary && (
        <div style={{ marginBottom: '36px' }}>
          <p style={{ fontSize: '8px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#d1d5db', marginBottom: '12px' }}>About</p>
          <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.85', fontWeight: '300', maxWidth: '90%' }}>{personalInfo.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div style={{ marginBottom: '36px' }}>
          <p style={{ fontSize: '8px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#d1d5db', marginBottom: '16px' }}>Experience</p>
          {experience.map((exp, idx) => (
            <div key={exp.id} style={{ marginBottom: idx < experience.length - 1 ? '22px' : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: '500', color: '#111827' }}>{exp.position}</h3>
                <span style={{ fontSize: '9px', color: '#d1d5db', fontWeight: '300' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '300', marginBottom: '5px' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
              {exp.description && <p style={{ fontSize: '10px', color: '#6b7280', lineHeight: '1.7', fontWeight: '300' }}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div style={{ marginBottom: '36px' }}>
          <p style={{ fontSize: '8px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#d1d5db', marginBottom: '16px' }}>Education</p>
          {education.map((edu, idx) => (
            <div key={edu.id} style={{ marginBottom: idx < education.length - 1 ? '14px' : 0, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <h3 style={{ fontSize: '11px', fontWeight: '500', color: '#111827' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                <p style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '300' }}>{edu.institution}</p>
              </div>
              <span style={{ fontSize: '9px', color: '#d1d5db', fontWeight: '300', whiteSpace: 'nowrap', marginLeft: '16px' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
            </div>
          ))}
        </div>
      )}

      {(skills.length > 0 || languages.length > 0 || certifications.length > 0) && (
        <div>
          <p style={{ fontSize: '8px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#d1d5db', marginBottom: '14px' }}>More</p>
          <div style={{ display: 'flex', gap: '36px' }}>
            {skills.length > 0 && (
              <div>
                <p style={{ fontSize: '8px', color: '#d1d5db', marginBottom: '8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Skills</p>
                <p style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '300', lineHeight: '1.8' }}>
                  {skills.map(s => s.name).join(', ')}
                </p>
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <p style={{ fontSize: '8px', color: '#d1d5db', marginBottom: '8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Languages</p>
                {languages.map((lang) => (
                  <p key={lang.id} style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '300', marginBottom: '3px' }}>{lang.name} <span style={{ color: '#d1d5db' }}>({lang.level.replace(/_/g, ' ')})</span></p>
                ))}
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <p style={{ fontSize: '8px', color: '#d1d5db', marginBottom: '8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Certifications</p>
                {certifications.map((cert) => (
                  <p key={cert.id} style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '300', marginBottom: '3px' }}>{cert.name}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
