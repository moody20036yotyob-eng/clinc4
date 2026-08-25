import type { CVData } from '@shared/types/cv';

export function CVCivilEngineer({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1e3a5f';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Header */}
      <div style={{ backgroundColor: primary, padding: '22px 28px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '68px', height: '68px', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.7)', flexShrink: 0 }} />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', margin: '0 0 3px', letterSpacing: '-0.01em' }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', fontWeight: '500', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{personalInfo.jobTitle}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              {personalInfo.email && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>⌖ {personalInfo.location}</span>}
              {personalInfo.website && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>⊕ {personalInfo.website}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Certifications bar — featured prominently */}
      {certifications.length > 0 && (
        <div style={{ backgroundColor: '#f1f5f9', borderBottom: `2px solid ${primary}20`, padding: '8px 28px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '8px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: '4px' }}>Licensed:</span>
            {certifications.map(cert => (
              <span key={cert.id} style={{ fontSize: '8.5px', backgroundColor: primary, color: '#fff', padding: '3px 10px', borderRadius: '2px', fontWeight: '600' }}>{cert.name}</span>
            ))}
          </div>
        </div>
      )}

      {/* Body */}
      <div style={{ padding: '18px 28px 28px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Professional Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                  <span style={{ fontSize: '9px', color: '#9ca3af', flexShrink: 0, marginLeft: '10px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '2px 0 4px' }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
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
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Key Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '9px', display: 'flex', gap: '10px' }}>
                <div style={{ flex: '0 0 6px', height: '6px', width: '6px', backgroundColor: primary, marginTop: '5px', flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ flex: 1 }}>
            {education.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '9px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: 0 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                      <span style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                    </div>
                    <p style={{ fontSize: '9.5px', color: primary, fontWeight: '500', margin: '1px 0 0' }}>{edu.institution}</p>
                    {edu.gpa && <p style={{ fontSize: '8.5px', color: '#6b7280', margin: '1px 0 0' }}>GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            )}
            {awards.length > 0 && (
              <div>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Awards</h2>
                {awards.map(award => (
                  <div key={award.id} style={{ marginBottom: '6px' }}>
                    <p style={{ fontSize: '9.5px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{award.title}</p>
                    <p style={{ fontSize: '8.5px', color: '#6b7280', margin: 0 }}>{award.issuer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ flex: '0 0 140px' }}>
            {skills.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Technical Skills</h2>
                {skills.map(skill => (
                  <div key={skill.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <div style={{ width: '4px', height: '4px', backgroundColor: primary, flexShrink: 0 }} />
                    <span style={{ fontSize: '9px', color: '#374151' }}>{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Languages</h2>
                {languages.map(lang => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '9.5px', color: '#374151', fontWeight: '600' }}>{lang.name}</span>
                    <span style={{ fontSize: '8.5px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
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
