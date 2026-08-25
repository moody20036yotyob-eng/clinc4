import type { CVData } from '@shared/types/cv';

export function CVMonogramInitials({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  const nameParts = (personalInfo.fullName || 'YN').trim().split(/\s+/);
  const initials = nameParts.length >= 2
    ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
    : nameParts[0]?.slice(0, 2) || 'YN';

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Georgia, serif', background: '#fff' }}>
      {/* Header with monogram watermark */}
      <div style={{ position: 'relative', borderBottom: `3px double ${primary}`, padding: '36px 36px 28px', overflow: 'hidden', background: '#fff' }}>
        {/* Monogram watermark */}
        <div style={{
          position: 'absolute', top: '-10px', right: '20px', fontSize: '140px', fontWeight: '900', color: primary,
          opacity: 0.08, fontFamily: 'Georgia, serif', letterSpacing: '-0.04em', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', zIndex: 0
        }}>
          {initials.toUpperCase()}
        </div>
        {/* Content over watermark */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {personalInfo.photo && (
              <img src={personalInfo.photo} alt="Photo" style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${primary}`, flexShrink: 0 }} />
            )}
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0 0 4px', letterSpacing: '0.04em', fontFamily: 'Georgia, serif' }}>{personalInfo.fullName || 'Your Name'}</h1>
              {personalInfo.jobTitle && <p style={{ fontSize: '12px', color: primary, fontWeight: '400', margin: '0 0 12px', fontStyle: 'italic', letterSpacing: '0.05em' }}>{personalInfo.jobTitle}</p>}
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {personalInfo.email && <span style={{ fontSize: '9px', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>{personalInfo.email}</span>}
                {personalInfo.phone && <span style={{ fontSize: '9px', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>{personalInfo.phone}</span>}
                {personalInfo.location && <span style={{ fontSize: '9px', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>{personalInfo.location}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '24px 36px 28px', display: 'flex', gap: '28px' }}>
        {/* Left */}
        <div style={{ flex: '0 0 185px' }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>Profile</h2>
              <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.75', margin: 0, fontStyle: 'italic' }}>{personalInfo.summary}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>Expertise</h2>
              {Array.from(new Set(skills.map(s => s.category || 'Core'))).map(cat => (
                <div key={cat} style={{ marginBottom: '10px' }}>
                  <p style={{ fontSize: '9px', color: primary, fontWeight: '700', margin: '0 0 4px', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{cat}</p>
                  {skills.filter(s => (s.category || 'Core') === cat).map(skill => (
                    <p key={skill.id} style={{ fontSize: '10px', color: '#374151', margin: '2px 0', fontFamily: 'Inter, sans-serif' }}>· {skill.name}</p>
                  ))}
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>Languages</h2>
              {languages.map(lang => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                  <span style={{ fontSize: '10px', color: '#374151' }}>{lang.name}</span>
                  <span style={{ fontSize: '9px', color: '#9ca3af', fontStyle: 'italic' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>Credentials</h2>
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: '7px', fontFamily: 'Inter, sans-serif' }}>
                  <p style={{ fontSize: '10px', fontWeight: '600', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                  <p style={{ fontSize: '9px', color: '#6b7280', margin: 0 }}>{cert.issuer} · {cert.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ width: '1px', backgroundColor: `${primary}25`, flexShrink: 0 }} />

        {/* Right */}
        <div style={{ flex: 1 }}>
          {experience.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>Career History</h2>
              {experience.map(exp => (
                <div key={exp.id} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827', margin: 0, fontFamily: 'Georgia, serif' }}>{exp.position}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: primary, margin: '2px 0 6px', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.65', margin: '0 0 4px', fontFamily: 'Inter, sans-serif' }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: '16px', fontFamily: 'Inter, sans-serif' }}>
                      {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>Education</h2>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0, fontFamily: 'Georgia, serif' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: primary, margin: '2px 0 0', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>{edu.institution}</p>
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Notable Projects</h2>
              {projects.map(proj => (
                <div key={proj.id} style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: '0 0 2px', fontFamily: 'Georgia, serif' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '10px', color: '#4b5563', margin: 0, fontFamily: 'Inter, sans-serif' }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
