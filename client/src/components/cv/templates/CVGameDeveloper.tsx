import type { CVData } from '@shared/types/cv';

export function CVGameDeveloper({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#7c3aed';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  const levelMap: Record<string, number> = { beginner: 2, intermediate: 3, advanced: 4, expert: 5 };
  const getLvl = (skill: { level?: string }) => Math.min(5, Math.max(1, levelMap[skill?.level?.toLowerCase() || ''] || 3));

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#0f0f1a', color: '#e2e8f0' }}>
      {/* Header */}
      <div style={{ padding: '24px 24px 18px', borderBottom: `2px solid ${primary}`, background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1040 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '72px', height: '72px', borderRadius: '4px', objectFit: 'cover', border: `2px solid ${primary}`, boxShadow: `0 0 16px ${primary}60`, flexShrink: 0 }} />
          )}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '8px', color: primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '3px' }}>◆ PLAYER PROFILE</div>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#fff', margin: '0 0 2px', letterSpacing: '-0.01em' }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '11px', color: primary, fontWeight: '600', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{personalInfo.jobTitle}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {personalInfo.email && <span style={{ fontSize: '8.5px', color: '#94a3b8' }}>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: '8.5px', color: '#94a3b8' }}>☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: '8.5px', color: '#94a3b8' }}>⌖ {personalInfo.location}</span>}
              {personalInfo.website && <span style={{ fontSize: '8.5px', color: '#94a3b8' }}>⊕ {personalInfo.website}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 24px 24px', display: 'flex', gap: '20px' }}>
        {/* Main column */}
        <div style={{ flex: 1 }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '16px', padding: '10px 12px', border: `1px solid ${primary}40`, borderRadius: '4px', background: `${primary}10` }}>
              <p style={{ fontSize: '9.5px', color: '#cbd5e1', lineHeight: '1.65', margin: 0 }}>{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `1px solid ${primary}` }}>◆ QUEST LOG — EXPERIENCE</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '12px', paddingLeft: '10px', borderLeft: `2px solid ${primary}60` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '10.5px', fontWeight: '700', color: '#f1f5f9', margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: '8.5px', color: '#64748b' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '9.5px', color: primary, fontWeight: '600', margin: '2px 0 4px' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '9px', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <div style={{ marginTop: '4px' }}>
                      {(exp.achievements || []).map((a, i) => (
                        <div key={i} style={{ display: 'flex', gap: '5px', marginBottom: '2px' }}>
                          <span style={{ color: primary, fontSize: '9px', flexShrink: 0 }}>▶</span>
                          <span style={{ fontSize: '9px', color: '#94a3b8' }}>{a}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `1px solid ${primary}` }}>◆ RELEASED TITLES</h2>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '8px', padding: '8px 10px', border: `1px solid ${primary}30`, borderRadius: '3px' }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#f1f5f9', margin: '0 0 2px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '9px', color: '#94a3b8', margin: 0 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `1px solid ${primary}` }}>◆ TRAINING / EDUCATION</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#f1f5f9', margin: 0 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <span style={{ fontSize: '8.5px', color: '#64748b' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                  <p style={{ fontSize: '9.5px', color: primary, fontWeight: '500', margin: '1px 0 0' }}>{edu.institution}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ flex: '0 0 140px' }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid ${primary}` }}>◆ SKILL TREE</h2>
              {skills.map(skill => {
                const lvl = getLvl(skill);
                return (
                  <div key={skill.id} style={{ marginBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ fontSize: '8.5px', color: '#cbd5e1' }}>{skill.name}</span>
                      <span style={{ fontSize: '7.5px', color: primary, fontWeight: '700' }}>LVL {lvl}</span>
                    </div>
                    <div style={{ height: '4px', backgroundColor: '#1e293b', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${lvl * 20}%`, backgroundColor: primary, borderRadius: '2px' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid ${primary}` }}>◆ LANGUAGES</h2>
              {languages.map(lang => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '9px', color: '#cbd5e1', fontWeight: '600' }}>{lang.name}</span>
                  <span style={{ fontSize: '7.5px', color: '#64748b' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}
          {certifications.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid ${primary}` }}>◆ ACHIEVEMENTS</h2>
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: '5px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: '#f1f5f9', margin: '0 0 1px' }}>{cert.name}</p>
                  <p style={{ fontSize: '8px', color: '#64748b', margin: 0 }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}
          {awards.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid ${primary}` }}>◆ AWARDS</h2>
              {awards.map(award => (
                <div key={award.id} style={{ marginBottom: '5px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: '#f1f5f9', margin: '0 0 1px' }}>{award.title}</p>
                  <p style={{ fontSize: '8px', color: '#64748b', margin: 0 }}>{award.issuer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
