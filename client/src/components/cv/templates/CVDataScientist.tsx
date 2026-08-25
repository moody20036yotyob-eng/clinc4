import type { CVData } from '@shared/types/cv';

export function CVDataScientist({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#0ea5e9';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  const LEVEL_DOTS: Record<string, number> = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: '"JetBrains Mono", "Courier New", monospace', background: '#fff' }}>
      {/* Header */}
      <div style={{ background: '#0c1821', padding: '24px 32px', borderBottom: `3px solid ${primary}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#f0f9ff', margin: '0 0 4px', letterSpacing: '-0.01em', fontFamily: 'Inter, sans-serif' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p style={{ fontSize: '11px', color: primary, fontWeight: '600', margin: 0, fontFamily: 'Inter, sans-serif' }}>{personalInfo.jobTitle}</p>
            )}
          </div>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover', border: `2px solid ${primary}` }} />
          )}
        </div>
      </div>

      {/* Contact bar with tech feel */}
      <div style={{ background: '#0f1923', padding: '8px 32px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        {personalInfo.email && <span style={{ fontSize: '9px', color: '#64748b', fontFamily: 'Inter, sans-serif' }}>{personalInfo.email}</span>}
        {personalInfo.phone && <span style={{ fontSize: '9px', color: '#64748b', fontFamily: 'Inter, sans-serif' }}>{personalInfo.phone}</span>}
        {personalInfo.location && <span style={{ fontSize: '9px', color: '#64748b', fontFamily: 'Inter, sans-serif' }}>{personalInfo.location}</span>}
        {personalInfo.github && <span style={{ fontSize: '9px', color: primary }}>{personalInfo.github}</span>}
        {personalInfo.linkedin && <span style={{ fontSize: '9px', color: primary }}>{personalInfo.linkedin}</span>}
        {personalInfo.website && <span style={{ fontSize: '9px', color: primary }}>{personalInfo.website}</span>}
      </div>

      <div style={{ display: 'flex', gap: '0' }}>
        {/* Left sidebar */}
        <div style={{ width: '38%', padding: '20px 18px', backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0' }}>
          {/* Skills with proficiency dots */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Skills & Tools</p>
              {skills.map((skill) => {
                const dots = LEVEL_DOTS[skill.level || 'intermediate'] || 2;
                return (
                  <div key={skill.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '9px', color: '#374151', fontFamily: 'Inter, sans-serif' }}>{skill.name}</span>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: i <= dots ? primary : '#d1d5db' }} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Languages</p>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '9px', color: '#374151', fontFamily: 'Inter, sans-serif' }}>{lang.name}</span>
                  <span style={{ fontSize: '8px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Certifications</p>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '8px', padding: '6px 8px', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px', fontFamily: 'Inter, sans-serif' }}>{cert.name}</p>
                  <p style={{ fontSize: '8px', color: '#6b7280', margin: 0, fontFamily: 'Inter, sans-serif' }}>{cert.issuer} · {cert.date}</p>
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <p style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Education</p>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <p style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 1px', fontFamily: 'Inter, sans-serif' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
                  <p style={{ fontSize: '9px', color: primary, margin: '0 0 1px', fontFamily: 'Inter, sans-serif' }}>{edu.institution}</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0, fontFamily: 'Inter, sans-serif' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right content */}
        <div style={{ flex: 1, padding: '20px 22px' }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '18px' }}>
              <p style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>About</p>
              <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', fontFamily: 'Inter, sans-serif' }}>{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <p style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>Experience</p>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px', paddingLeft: '10px', borderLeft: `2px solid ${primary}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', fontFamily: 'Inter, sans-serif' }}>{exp.position}</h3>
                    <span style={{ fontSize: '8px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px', fontFamily: 'Inter, sans-serif' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: primary, marginBottom: '3px', fontFamily: 'Inter, sans-serif' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '9px', color: '#4b5563', lineHeight: '1.55', fontFamily: 'Inter, sans-serif' }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <ul style={{ marginTop: '3px', paddingLeft: '12px' }}>
                      {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px', fontFamily: 'Inter, sans-serif' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Publications / Projects */}
          {projects.length > 0 && (
            <div>
              <p style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Projects & Publications</p>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '10px', padding: '8px 10px', backgroundColor: '#f8fafc', borderRadius: '4px', borderLeft: `2px solid ${primary}` }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 2px', fontFamily: 'Inter, sans-serif' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', lineHeight: '1.4', marginBottom: '3px', fontFamily: 'Inter, sans-serif' }}>{proj.description}</p>}
                  {proj.url && <p style={{ fontSize: '8px', color: primary, wordBreak: 'break-all', fontFamily: 'Inter, sans-serif' }}>{proj.url}</p>}
                  {(proj.technologies || []).length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '3px' }}>
                      {(proj.technologies || []).map((t, i) => <span key={i} style={{ fontSize: '7px', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '1px 5px', borderRadius: '3px', fontFamily: 'Inter, sans-serif' }}>{t}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
