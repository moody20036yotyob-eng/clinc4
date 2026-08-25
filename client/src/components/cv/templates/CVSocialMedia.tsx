import type { CVData } from '@shared/types/cv';

export function CVSocialMedia({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#e11d48';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  const skillBlocks = [
    { label: 'Content', color: '#f97316' },
    { label: 'Analytics', color: '#8b5cf6' },
    { label: 'Strategy', color: '#06b6d4' },
    { label: 'Design', color: '#10b981' },
  ];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Vibrant header */}
      <div style={{ background: `linear-gradient(135deg, ${primary} 0%, #f97316 100%)`, padding: '28px 28px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          {personalInfo.photo ? (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '76px', height: '76px', borderRadius: '50%', objectFit: 'cover', border: '4px solid rgba(255,255,255,0.9)', flexShrink: 0, boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }} />
          ) : (
            <div style={{ width: '76px', height: '76px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '28px' }}>👤</span>
            </div>
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#fff', margin: '0 0 3px', letterSpacing: '-0.02em' }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', fontWeight: '600', margin: '0 0 10px' }}>{personalInfo.jobTitle}</p>}
            {/* Social links prominently */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {personalInfo.website && (
                <span style={{ fontSize: '8px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', padding: '3px 10px', borderRadius: '20px', fontWeight: '600' }}>🔗 {personalInfo.website}</span>
              )}
              {personalInfo.linkedin && (
                <span style={{ fontSize: '8px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', padding: '3px 10px', borderRadius: '20px', fontWeight: '600' }}>in {personalInfo.linkedin}</span>
              )}
              {personalInfo.email && (
                <span style={{ fontSize: '8px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', padding: '3px 10px', borderRadius: '20px', fontWeight: '600' }}>✉ {personalInfo.email}</span>
              )}
              {personalInfo.phone && (
                <span style={{ fontSize: '8px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', padding: '3px 10px', borderRadius: '20px', fontWeight: '600' }}>☎ {personalInfo.phone}</span>
              )}
              {personalInfo.location && (
                <span style={{ fontSize: '8px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', padding: '3px 10px', borderRadius: '20px', fontWeight: '600' }}>⌖ {personalInfo.location}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Skill visual blocks */}
      {skills.length > 0 && (
        <div style={{ padding: '14px 28px', display: 'flex', gap: '8px', flexWrap: 'wrap', backgroundColor: '#fafafa', borderBottom: '1px solid #f3f4f6' }}>
          {skills.map((skill, i) => {
            const block = skillBlocks[i % skillBlocks.length];
            return (
              <span key={skill.id} style={{ fontSize: '8px', backgroundColor: `${block.color}18`, color: block.color, padding: '4px 10px', borderRadius: '4px', fontWeight: '700', border: `1px solid ${block.color}30` }}>
                {skill.name}
              </span>
            );
          })}
        </div>
      )}

      {/* Body */}
      <div style={{ padding: '20px 28px 24px', display: 'flex', gap: '20px' }}>
        {/* Left: experience and projects */}
        <div style={{ flex: 1 }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px' }}>About</h2>
              <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px' }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px', borderLeft: `3px solid ${primary}`, paddingLeft: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '800', color: '#111827', margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: primary, fontWeight: '700', margin: '2px 0 4px' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: '14px' }}>
                      {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects with engagement metrics style */}
          {projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px' }}>Portfolio / Campaigns</h2>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '10px', padding: '10px 12px', backgroundColor: '#fafafa', borderRadius: '8px', border: `1px solid ${primary}20` }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '800', color: '#111827', margin: '0 0 3px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', margin: 0, lineHeight: '1.5' }}>{proj.description}</p>}
                  {proj.url && <p style={{ fontSize: '8px', color: primary, margin: '4px 0 0' }}>{proj.url}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ flex: '0 0 140px' }}>
          {education.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '8px', padding: '6px 8px', backgroundColor: '#fafafa', borderRadius: '6px' }}>
                  <h3 style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '8px', color: primary, margin: '0 0 1px', fontWeight: '600' }}>{edu.institution}</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0 }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px' }}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '6px', padding: '5px 8px', backgroundColor: `${primary}08`, borderRadius: '4px', border: `1px solid ${primary}20` }}>
                  <p style={{ fontSize: '8px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                  <p style={{ fontSize: '7px', color: '#9ca3af', margin: 0 }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px' }}>Languages</h2>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '9px', color: '#374151', fontWeight: '600' }}>{lang.name}</span>
                  <span style={{ fontSize: '8px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
