import type { CVData } from '@shared/types/cv';

export function CVHospitality({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#0f4c5c';
  const gold = '#c9a84c';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Georgia, serif', background: '#fffef9' }}>
      {/* Elegant header like hotel letterhead */}
      <div style={{ backgroundColor: primary, padding: '0' }}>
        {/* Gold accent top strip */}
        <div style={{ height: '4px', backgroundColor: gold }} />
        <div style={{ padding: '24px 32px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {personalInfo.photo && (
              <img src={personalInfo.photo} alt="Photo" style={{ width: '80px', height: '80px', borderRadius: '4px', objectFit: 'cover', border: `2px solid ${gold}`, flexShrink: 0 }} />
            )}
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#fff', margin: '0 0 4px', letterSpacing: '0.04em' }}>{personalInfo.fullName || 'Your Name'}</h1>
              {personalInfo.jobTitle && <p style={{ fontSize: '11px', color: gold, margin: '0 0 12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>{personalInfo.jobTitle}</p>}
              <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
                {personalInfo.email && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter, sans-serif' }}>✉ {personalInfo.email}</span>}
                {personalInfo.phone && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter, sans-serif' }}>☎ {personalInfo.phone}</span>}
                {personalInfo.location && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter, sans-serif' }}>⌖ {personalInfo.location}</span>}
              </div>
            </div>
          </div>
        </div>
        {/* Gold accent bottom strip */}
        <div style={{ height: '2px', backgroundColor: gold }} />
      </div>

      {/* Languages prominently displayed */}
      {languages.length > 0 && (
        <div style={{ backgroundColor: `${primary}08`, padding: '12px 32px', borderBottom: `1px solid ${gold}40`, display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: gold, fontFamily: 'Inter, sans-serif', marginRight: '4px' }}>Languages:</span>
          {languages.map((lang, i) => (
            <span key={lang.id} style={{ fontSize: '9px', color: primary, fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
              {lang.name} <span style={{ color: '#9ca3af', fontWeight: '400' }}>({lang.level.replace(/_/g, ' ')})</span>
              {i < languages.length - 1 && <span style={{ color: gold, marginLeft: '4px' }}>·</span>}
            </span>
          ))}
        </div>
      )}

      {/* Body */}
      <div style={{ padding: '20px 32px 28px', display: 'flex', gap: '22px' }}>
        {/* Left */}
        <div style={{ flex: 1 }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ height: '1px', width: '20px', backgroundColor: gold }} />
                <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: primary, margin: 0, fontFamily: 'Inter, sans-serif' }}>Professional Profile</h2>
                <div style={{ flex: 1, height: '1px', backgroundColor: gold }} />
              </div>
              <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.75', margin: 0, fontStyle: 'italic' }}>{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ height: '1px', width: '20px', backgroundColor: gold }} />
                <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: primary, margin: 0, fontFamily: 'Inter, sans-serif' }}>Experience</h2>
                <div style={{ flex: 1, height: '1px', backgroundColor: gold }} />
              </div>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: '8px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: gold, fontWeight: '600', margin: '2px 0 4px', fontFamily: 'Inter, sans-serif' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                  {exp.description && <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.65', margin: 0, fontFamily: 'Inter, sans-serif' }}>{exp.description}</p>}
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
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ height: '1px', width: '20px', backgroundColor: gold }} />
                <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: primary, margin: 0, fontFamily: 'Inter, sans-serif' }}>Education</h2>
                <div style={{ flex: 1, height: '1px', backgroundColor: gold }} />
              </div>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <span style={{ fontSize: '8px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: primary, margin: '2px 0 0', fontFamily: 'Inter, sans-serif' }}>{edu.institution}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <div style={{ flex: '0 0 150px' }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <div style={{ height: '1px', width: '12px', backgroundColor: gold }} />
                <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, margin: 0, fontFamily: 'Inter, sans-serif' }}>Skills</h2>
              </div>
              {Array.from(new Set(skills.map(s => s.category || 'Hospitality'))).map(cat => (
                <div key={cat} style={{ marginBottom: '8px' }}>
                  <p style={{ fontSize: '8px', color: gold, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px', fontFamily: 'Inter, sans-serif' }}>{cat}</p>
                  {skills.filter(s => (s.category || 'Hospitality') === cat).map(skill => (
                    <p key={skill.id} style={{ fontSize: '9px', color: '#374151', margin: '2px 0', fontFamily: 'Inter, sans-serif' }}>· {skill.name}</p>
                  ))}
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <div style={{ height: '1px', width: '12px', backgroundColor: gold }} />
                <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, margin: 0, fontFamily: 'Inter, sans-serif' }}>Certifications</h2>
              </div>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '8px', padding: '6px 8px', backgroundColor: `${primary}08`, borderLeft: `2px solid ${gold}` }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px', fontFamily: 'Inter, sans-serif' }}>{cert.name}</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0, fontFamily: 'Inter, sans-serif' }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
