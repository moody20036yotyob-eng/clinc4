import type { CVData } from '@shared/types/cv';

export function CVCreativeAgencyStyle({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const projects = data.projects || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Dark header band */}
      <div style={{ backgroundColor: '#1a1a2e', padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${primary}`, marginBottom: '8px' }} />
          )}
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '12px', color: primary, fontWeight: '600', margin: 0, letterSpacing: '0.04em' }}>{personalInfo.jobTitle}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          {personalInfo.email && <p style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '3px' }}>{personalInfo.email}</p>}
          {personalInfo.phone && <p style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '3px' }}>{personalInfo.phone}</p>}
          {personalInfo.location && <p style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '3px' }}>{personalInfo.location}</p>}
          {personalInfo.website && <p style={{ fontSize: '9px', color: primary, marginBottom: '3px' }}>{personalInfo.website}</p>}
          {personalInfo.linkedin && <p style={{ fontSize: '9px', color: primary }}>{personalInfo.linkedin}</p>}
        </div>
      </div>

      {/* Summary strip */}
      {personalInfo.summary && (
        <div style={{ backgroundColor: '#f8fafc', padding: '14px 32px', borderBottom: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.6', margin: 0, fontStyle: 'italic' }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Two-column body */}
      <div style={{ display: 'flex', gap: '0' }}>
        {/* Main content */}
        <div style={{ flex: 1, padding: '24px 32px' }}>
          {/* Projects as cards */}
          {projects.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#64748b', marginBottom: '12px', paddingBottom: '6px', borderBottom: '2px solid #1a1a2e' }}>Featured Work</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {projects.slice(0, 4).map((proj) => (
                  <div key={proj.id} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px', borderTop: `3px solid ${primary}` }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>{proj.name}</h3>
                    {proj.description && <p style={{ fontSize: '9px', color: '#64748b', lineHeight: '1.5' }}>{proj.description}</p>}
                    {(proj.technologies || []).length > 0 && (
                      <div style={{ marginTop: '6px', display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                        {(proj.technologies || []).slice(0, 3).map((t, i) => (
                          <span key={i} style={{ fontSize: '8px', backgroundColor: `${primary}15`, color: primary, padding: '1px 5px', borderRadius: '3px' }}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience cards */}
          {experience.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#64748b', marginBottom: '12px', paddingBottom: '6px', borderBottom: '2px solid #1a1a2e' }}>Experience</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px', borderLeft: `3px solid ${primary}` }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#1e293b', marginBottom: '2px' }}>{exp.position}</h3>
                    <p style={{ fontSize: '10px', color: primary, marginBottom: '2px' }}>{exp.company}</p>
                    <p style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '4px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                    {exp.description && <p style={{ fontSize: '9px', color: '#475569', lineHeight: '1.4' }}>{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ width: '160px', flexShrink: 0, backgroundColor: '#f8fafc', borderLeft: '1px solid #e2e8f0', padding: '24px 16px' }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#64748b', marginBottom: '10px' }}>Skills</h2>
              {skills.map((skill) => (
                <div key={skill.id} style={{ fontSize: '9px', color: '#334155', marginBottom: '4px', padding: '3px 0', borderBottom: '1px solid #e2e8f0' }}>{skill.name}</div>
              ))}
            </div>
          )}
          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#64748b', marginBottom: '10px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: '#1e293b' }}>{edu.degree}</p>
                  {edu.field && <p style={{ fontSize: '8px', color: '#64748b' }}>{edu.field}</p>}
                  <p style={{ fontSize: '8px', color: primary }}>{edu.institution}</p>
                  <p style={{ fontSize: '8px', color: '#94a3b8' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
