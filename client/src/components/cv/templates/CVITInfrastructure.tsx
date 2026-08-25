import type { CVData } from '@shared/types/cv';

export function CVITInfrastructure({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#0f172a';
  const accent = '#22d3ee';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  // Group skills by category
  const skillGroups = Array.from(new Set(skills.map(s => s.category || 'General')));
  const defaultGroups = ['Cloud', 'Networking', 'Security', 'Databases'];
  const displayGroups = skillGroups.length > 0 ? skillGroups : defaultGroups;

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: '"Courier New", Courier, monospace', background: '#0f172a', color: '#e2e8f0' }}>
      {/* Terminal-style header */}
      <div style={{ backgroundColor: '#1e293b', padding: '24px 28px', borderBottom: `2px solid ${accent}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '70px', height: '70px', borderRadius: '4px', objectFit: 'cover', border: `2px solid ${accent}`, flexShrink: 0 }} />
          )}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', color: accent }}>$</span>
              <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#f1f5f9', margin: 0, letterSpacing: '0.02em' }}>{personalInfo.fullName || 'Your Name'}</h1>
            </div>
            {personalInfo.jobTitle && (
              <p style={{ fontSize: '10px', color: accent, margin: '0 0 8px' }}>// {personalInfo.jobTitle}</p>
            )}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {personalInfo.email && <span style={{ fontSize: '8px', color: '#94a3b8' }}>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: '8px', color: '#94a3b8' }}>☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: '8px', color: '#94a3b8' }}>⌖ {personalInfo.location}</span>}
              {personalInfo.website && <span style={{ fontSize: '8px', color: accent }}>{personalInfo.website}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Certifications front and center */}
      {certifications.length > 0 && (
        <div style={{ backgroundColor: '#1e293b', padding: '12px 28px', borderBottom: `1px solid #334155`, display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '8px', color: accent, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: '4px' }}>Certifications:</span>
          {certifications.map((cert) => (
            <span key={cert.id} style={{ fontSize: '8px', backgroundColor: `${accent}20`, color: accent, padding: '3px 10px', borderRadius: '3px', border: `1px solid ${accent}40`, fontWeight: '600' }}>{cert.name}</span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0' }}>
        {/* Left: skills grouped */}
        <div style={{ width: '185px', backgroundColor: '#1e293b', padding: '20px 16px', borderRight: `1px solid #334155`, flexShrink: 0 }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '18px' }}>
              <p style={{ fontSize: '8px', color: accent, margin: '0 0 6px', fontWeight: '700' }}>/* PROFILE */</p>
              <p style={{ fontSize: '9px', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{personalInfo.summary}</p>
            </div>
          )}

          {/* Skill groups */}
          {displayGroups.map((group) => {
            const groupSkills = skills.filter(s => (s.category || 'General') === group);
            if (groupSkills.length === 0 && skills.length > 0) return null;
            return (
              <div key={group} style={{ marginBottom: '14px' }}>
                <p style={{ fontSize: '8px', color: accent, margin: '0 0 6px', fontWeight: '700' }}>[{group.toUpperCase()}]</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                  {groupSkills.map((skill) => (
                    <span key={skill.id} style={{ fontSize: '7px', backgroundColor: '#0f172a', color: '#94a3b8', padding: '2px 6px', borderRadius: '2px', border: '1px solid #334155' }}>{skill.name}</span>
                  ))}
                  {groupSkills.length === 0 && (
                    <span style={{ fontSize: '7px', color: '#475569', fontStyle: 'italic' }}>—</span>
                  )}
                </div>
              </div>
            );
          })}

          {/* All skills if no categories */}
          {skillGroups.length === 0 && skills.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <p style={{ fontSize: '8px', color: accent, margin: '0 0 6px', fontWeight: '700' }}>[SKILLS]</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ fontSize: '7px', backgroundColor: '#0f172a', color: '#94a3b8', padding: '2px 6px', borderRadius: '2px', border: '1px solid #334155' }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ marginTop: '16px', borderTop: '1px solid #334155', paddingTop: '14px' }}>
              <p style={{ fontSize: '8px', color: accent, margin: '0 0 8px', fontWeight: '700' }}>[LANGUAGES]</p>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '8px', color: '#94a3b8' }}>{lang.name}</span>
                  <span style={{ fontSize: '7px', color: '#475569' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: experience and education */}
        <div style={{ flex: 1, padding: '20px 22px' }}>
          {experience.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '8px', color: accent, margin: '0 0 10px', fontWeight: '700' }}>/* EXPERIENCE */</p>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px', borderLeft: `2px solid ${accent}40`, paddingLeft: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#f1f5f9', margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: '8px', color: '#475569' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '9px', color: accent, margin: '2px 0 4px' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '9px', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: '14px' }}>
                      {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '8px', color: '#94a3b8', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '8px', color: accent, margin: '0 0 10px', fontWeight: '700' }}>/* INFRASTRUCTURE PROJECTS */</p>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '10px', borderLeft: `2px solid ${accent}40`, paddingLeft: '10px' }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#f1f5f9', margin: '0 0 2px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '9px', color: '#94a3b8', margin: 0 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <p style={{ fontSize: '8px', color: accent, margin: '0 0 10px', fontWeight: '700' }}>/* EDUCATION */</p>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#f1f5f9', margin: 0 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <span style={{ fontSize: '8px', color: '#475569' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                  <p style={{ fontSize: '9px', color: accent, margin: '2px 0 0' }}>{edu.institution}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
