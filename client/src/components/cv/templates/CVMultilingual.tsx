import type { CVData } from '@shared/types/cv';

export function CVMultilingual({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#0891b2';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  const levelToPercent: Record<string, number> = {
    native: 100,
    fluent: 90,
    advanced: 75,
    upper_intermediate: 65,
    intermediate: 50,
    elementary: 30,
    beginner: 20,
  };

  const langFlags: Record<string, string> = {
    english: '🇬🇧', arabic: '🇸🇦', french: '🇫🇷', german: '🇩🇪', spanish: '🇪🇸',
    italian: '🇮🇹', portuguese: '🇵🇹', chinese: '🇨🇳', japanese: '🇯🇵', korean: '🇰🇷',
    russian: '🇷🇺', dutch: '🇳🇱', turkish: '🇹🇷', hindi: '🇮🇳', swedish: '🇸🇪',
  };

  const getFlag = (name: string) => langFlags[name.toLowerCase()] || '🌐';

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Header */}
      <div style={{ backgroundColor: primary, padding: '24px 26px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.9)', flexShrink: 0 }} />
          )}
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#fff', margin: '0 0 3px', letterSpacing: '-0.02em' }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', fontWeight: '500', margin: '0 0 10px' }}>{personalInfo.jobTitle}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {personalInfo.email && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>⌖ {personalInfo.location}</span>}
              {personalInfo.website && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>⊕ {personalInfo.website}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* LANGUAGES — visually dominant section */}
      {languages.length > 0 && (
        <div style={{ padding: '16px 26px', backgroundColor: '#f0f9ff', borderBottom: `2px solid ${primary}20` }}>
          <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px' }}>Languages</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {languages.map(lang => {
              const pct = levelToPercent[lang.level.toLowerCase().replace(/ /g, '_')] || 50;
              return (
                <div key={lang.id} style={{ flex: '1 1 160px', padding: '10px 12px', backgroundColor: '#fff', border: `1px solid ${primary}30`, borderRadius: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '18px', lineHeight: '1' }}>{getFlag(lang.name)}</span>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: '#111827' }}>{lang.name}</div>
                      <div style={{ fontSize: '8px', color: '#6b7280' }}>{lang.level.replace(/_/g, ' ')}</div>
                    </div>
                  </div>
                  <div style={{ height: '4px', backgroundColor: '#e0f2fe', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, backgroundColor: primary, borderRadius: '2px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Body */}
      <div style={{ padding: '16px 26px 24px', display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '2px 0 4px' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '9.5px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: '16px' }}>
                      {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Projects</h2>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ flex: '0 0 140px' }}>
          {education.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '9.5px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '9px', color: primary, fontWeight: '500', margin: '0 0 1px' }}>{edu.institution}</p>
                  <span style={{ fontSize: '8.5px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                </div>
              ))}
            </div>
          )}
          {skills.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {skills.map(skill => (
                  <span key={skill.id} style={{ fontSize: '8px', backgroundColor: `${primary}12`, color: primary, padding: '2px 6px', borderRadius: '3px', fontWeight: '600' }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}
          {certifications.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Certifications</h2>
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: '5px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                  <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}
          {awards.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Awards</h2>
              {awards.map(award => (
                <div key={award.id} style={{ marginBottom: '5px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{award.title}</p>
                  <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{award.issuer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
