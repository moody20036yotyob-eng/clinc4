import type { CVData } from '@shared/types/cv';

export function CVFreelancer({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#f59e0b';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const projects = data.projects || [];
  const languages = data.languages || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Hero — centered photo at top */}
      <div style={{ textAlign: 'center', padding: '36px 32px 24px', background: `linear-gradient(180deg, ${primary}15 0%, #fff 100%)`, borderBottom: '1px solid #e5e7eb' }}>
        {personalInfo.photo ? (
          <img src={personalInfo.photo} alt="Photo" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: `4px solid ${primary}`, marginBottom: '14px', display: 'inline-block' }} />
        ) : (
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: primary, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <span style={{ fontSize: '36px', color: '#fff', fontWeight: '800' }}>{(personalInfo.fullName || 'U')[0]}</span>
          </div>
        )}
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#111827', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p style={{ fontSize: '13px', color: primary, fontWeight: '700', margin: '0 0 14px' }}>{personalInfo.jobTitle}</p>
        )}
        {/* Social links prominent */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
          {personalInfo.email && <span style={{ fontSize: '10px', color: '#374151', backgroundColor: '#f3f4f6', padding: '4px 10px', borderRadius: '20px' }}>{personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '10px', color: '#374151', backgroundColor: '#f3f4f6', padding: '4px 10px', borderRadius: '20px' }}>{personalInfo.phone}</span>}
          {personalInfo.website && <span style={{ fontSize: '10px', color: primary, backgroundColor: `${primary}20`, border: `1px solid ${primary}50`, padding: '4px 10px', borderRadius: '20px', fontWeight: '600' }}>{personalInfo.website}</span>}
          {personalInfo.linkedin && <span style={{ fontSize: '10px', color: '#0e76a8', backgroundColor: '#e8f4fb', padding: '4px 10px', borderRadius: '20px' }}>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span style={{ fontSize: '10px', color: '#111827', backgroundColor: '#f0f0f0', padding: '4px 10px', borderRadius: '20px' }}>{personalInfo.github}</span>}
        </div>
        {personalInfo.location && <p style={{ fontSize: '10px', color: '#6b7280', margin: 0 }}>{personalInfo.location}</p>}
      </div>

      <div style={{ padding: '24px 32px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '22px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#374151', lineHeight: '1.75', maxWidth: '80%', margin: '0 auto' }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Services from skills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '22px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '12px' }}>Services</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
              {skills.map((skill) => (
                <span key={skill.id} style={{ fontSize: '10px', backgroundColor: `${primary}18`, color: primary === '#f59e0b' ? '#92400e' : primary, border: `1px solid ${primary}40`, padding: '5px 12px', borderRadius: '20px', fontWeight: '600' }}>{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {/* Portfolio / Projects */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '14px', textAlign: 'center' }}>Portfolio</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ border: `1px solid ${primary}40`, borderRadius: '8px', padding: '12px', borderTop: `3px solid ${primary}` }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', marginBottom: '3px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '9px', color: '#6b7280', lineHeight: '1.5', marginBottom: '4px' }}>{proj.description}</p>}
                  {proj.url && <p style={{ fontSize: '8px', color: primary, wordBreak: 'break-all' }}>{proj.url}</p>}
                  {(proj.technologies || []).length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '4px' }}>
                      {(proj.technologies || []).map((t, i) => <span key={i} style={{ fontSize: '8px', backgroundColor: '#f3f4f6', color: '#374151', padding: '1px 5px', borderRadius: '3px' }}>{t}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '24px' }}>
          {experience.length > 0 && (
            <div style={{ flex: '0 0 55%' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '12px' }}>Work History</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827' }}>{exp.position}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: primary, fontWeight: '600' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.5' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          <div style={{ flex: 1 }}>
            {education.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '10px' }}>Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <p style={{ fontSize: '9px', color: primary }}>{edu.institution}</p>
                    <p style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '10px' }}>Languages</h2>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10px', color: '#374151' }}>{lang.name}</span>
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
