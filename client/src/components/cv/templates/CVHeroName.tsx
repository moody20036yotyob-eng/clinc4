import type { CVData } from '@shared/types/cv';

export function CVHeroName({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Hero header with dot texture */}
      <div style={{
        padding: '48px 36px 36px',
        background: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
        backgroundSize: '18px 18px',
        backgroundColor: '#fafafa',
        position: 'relative',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <h1 style={{ fontSize: '52px', fontWeight: '800', color: '#111827', lineHeight: '1', margin: '0 0 8px', letterSpacing: '-0.03em' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p style={{ fontSize: '16px', color: primary, fontWeight: '700', margin: '0 0 20px', letterSpacing: '0.02em' }}>{personalInfo.jobTitle}</p>
        )}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {personalInfo.email && <span style={{ fontSize: '10px', color: '#6b7280', backgroundColor: '#fff', padding: '3px 10px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>{personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '10px', color: '#6b7280', backgroundColor: '#fff', padding: '3px 10px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>{personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ fontSize: '10px', color: '#6b7280', backgroundColor: '#fff', padding: '3px 10px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>{personalInfo.location}</span>}
          {personalInfo.website && <span style={{ fontSize: '10px', color: primary, backgroundColor: '#fff', padding: '3px 10px', borderRadius: '4px', border: `1px solid ${primary}40` }}>{personalInfo.website}</span>}
          {personalInfo.linkedin && <span style={{ fontSize: '10px', color: primary, backgroundColor: '#fff', padding: '3px 10px', borderRadius: '4px', border: `1px solid ${primary}40` }}>{personalInfo.linkedin}</span>}
        </div>
      </div>

      <div style={{ padding: '32px 36px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontSize: '12px', color: '#374151', lineHeight: '1.8', maxWidth: '90%' }}>{personalInfo.summary}</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '32px' }}>
          {/* Left: Experience + Education */}
          <div style={{ flex: '0 0 60%' }}>
            {experience.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', marginBottom: '16px' }}>Experience</h2>
                {experience.map((exp, idx) => (
                  <div key={exp.id} style={{ marginBottom: '18px', position: 'relative', paddingLeft: '20px' }}>
                    <div style={{ position: 'absolute', left: 0, top: '4px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: idx === 0 ? primary : '#d1d5db', flexShrink: 0 }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{exp.position}</h3>
                      <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p style={{ fontSize: '11px', color: primary, fontWeight: '500', marginBottom: '3px' }}>{exp.company}</p>
                    {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.5' }}>{exp.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {education.length > 0 && (
              <div>
                <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', marginBottom: '16px' }}>Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: '4px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d1d5db' }} />
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <p style={{ fontSize: '10px', color: primary }}>{edu.institution}</p>
                    <p style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Skills + Languages */}
          <div style={{ flex: 1 }}>
            {skills.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', marginBottom: '12px' }}>Skills</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {skills.map((skill) => (
                    <span key={skill.id} style={{ fontSize: '10px', color: '#374151', border: `1px solid ${primary}40`, padding: '3px 8px', borderRadius: '4px', backgroundColor: `${primary}08` }}>{skill.name}</span>
                  ))}
                </div>
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', marginBottom: '12px' }}>Languages</h2>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '10px', color: '#374151', fontWeight: '500' }}>{lang.name}</span>
                    <span style={{ fontSize: '9px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
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
