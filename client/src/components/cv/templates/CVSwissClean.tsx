import type { CVData } from '@shared/types/cv';

export function CVSwissClean({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#e30613';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', background: '#fff', padding: '40px 40px' }}>
      {/* Grid header */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0', marginBottom: '36px', alignItems: 'end' }}>
        <div>
          <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '8px' }}>Curriculum Vitae</p>
          <div style={{ width: '32px', height: '3px', backgroundColor: primary }} />
        </div>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '400', color: '#111', margin: 0, letterSpacing: '-0.01em' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.jobTitle && (
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0', fontWeight: '400' }}>{personalInfo.jobTitle}</p>
          )}
        </div>
      </div>

      {/* Contact row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0', marginBottom: '40px' }}>
        <div style={{ paddingTop: '2px' }}>
          <span style={{ fontSize: '9px', color: primary, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '700' }}>01</span>
          <span style={{ fontSize: '9px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.15em', marginLeft: '8px' }}>Contact</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
          {personalInfo.email && <span style={{ fontSize: '10px', color: '#374151' }}>{personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '10px', color: '#374151' }}>{personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ fontSize: '10px', color: '#374151' }}>{personalInfo.location}</span>}
          {personalInfo.website && <span style={{ fontSize: '10px', color: '#374151' }}>{personalInfo.website}</span>}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e5e7eb', marginBottom: '32px' }} />

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0', marginBottom: '32px' }}>
          <div>
            <span style={{ fontSize: '9px', color: primary, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '700' }}>02</span>
            <span style={{ fontSize: '9px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.15em', marginLeft: '8px' }}>Profile</span>
          </div>
          <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.75', margin: 0 }}>{personalInfo.summary}</p>
        </div>
      )}

      <div style={{ borderTop: '1px solid #e5e7eb', marginBottom: '32px' }} />

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '9px', color: primary, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '700' }}>03</span>
              <span style={{ fontSize: '9px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.15em', marginLeft: '8px' }}>Experience</span>
            </div>
          </div>
          {experience.map((exp) => (
            <div key={exp.id} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0', marginBottom: '18px' }}>
              <div>
                <p style={{ fontSize: '10px', color: '#6b7280', lineHeight: '1.4' }}>{exp.startDate}</p>
                <p style={{ fontSize: '10px', color: '#6b7280' }}>{exp.current ? 'Present' : exp.endDate}</p>
              </div>
              <div>
                <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111', marginBottom: '2px' }}>{exp.position}</h3>
                <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>{exp.company}</p>
                {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.6' }}>{exp.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ borderTop: '1px solid #e5e7eb', marginBottom: '32px' }} />

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '9px', color: primary, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '700' }}>04</span>
              <span style={{ fontSize: '9px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.15em', marginLeft: '8px' }}>Education</span>
            </div>
          </div>
          {education.map((edu) => (
            <div key={edu.id} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0', marginBottom: '14px' }}>
              <p style={{ fontSize: '10px', color: '#6b7280' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
              <div>
                <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111', marginBottom: '2px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                <p style={{ fontSize: '11px', color: '#6b7280' }}>{edu.institution}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills & Languages */}
      {(skills.length > 0 || languages.length > 0) && (
        <>
          <div style={{ borderTop: '1px solid #e5e7eb', marginBottom: '32px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0' }}>
            <div>
              <span style={{ fontSize: '9px', color: primary, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '700' }}>05</span>
              <span style={{ fontSize: '9px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.15em', marginLeft: '8px' }}>Skills</span>
            </div>
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ fontSize: '10px', color: '#374151', border: '1px solid #d1d5db', padding: '2px 8px', borderRadius: '2px' }}>{skill.name}</span>
                ))}
              </div>
              {languages.length > 0 && (
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  {languages.map((lang) => (
                    <span key={lang.id} style={{ fontSize: '10px', color: '#374151' }}>{lang.name} <span style={{ color: '#9ca3af' }}>({lang.level.replace(/_/g, ' ')})</span></span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
