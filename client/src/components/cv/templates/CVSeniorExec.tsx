import type { CVData } from '@shared/types/cv';

export function CVSeniorExec({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const certifications = data.certifications || [];
  const awards = data.awards || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: '"Palatino Linotype", Palatino, Georgia, serif', background: '#fff', padding: '44px 44px 36px' }}>
      {/* Deep navy header strip */}
      <div style={{ backgroundColor: '#0f172a', margin: '-44px -44px 32px', padding: '36px 44px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#f1f5f9', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.12em', fontVariant: 'small-caps' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 14px', letterSpacing: '0.06em' }}>{personalInfo.jobTitle}</p>
        )}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {personalInfo.email && <span style={{ fontSize: '10px', color: '#64748b' }}>{personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '10px', color: '#64748b' }}>{personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ fontSize: '10px', color: '#64748b' }}>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span style={{ fontSize: '10px', color: '#64748b' }}>{personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Career highlights */}
      {personalInfo.summary && (
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#0f172a', marginBottom: '10px', borderBottom: '2px solid #0f172a', paddingBottom: '6px' }}>Executive Profile</h2>
          <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.8', textAlign: 'justify' }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Awards / Achievements prominent */}
      {awards.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#0f172a', marginBottom: '12px', borderBottom: '2px solid #0f172a', paddingBottom: '6px' }}>Career Highlights</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {awards.map((award) => (
              <div key={award.id} style={{ padding: '10px 12px', backgroundColor: '#f8fafc', borderLeft: '3px solid #0f172a' }}>
                <p style={{ fontSize: '11px', fontWeight: '700', color: '#0f172a', margin: '0 0 2px' }}>{award.title}</p>
                <p style={{ fontSize: '9px', color: '#6b7280', margin: 0 }}>{award.issuer} · {award.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {experience.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#0f172a', marginBottom: '14px', borderBottom: '2px solid #0f172a', paddingBottom: '6px' }}>Leadership Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{exp.position}</h3>
                <span style={{ fontSize: '10px', color: '#64748b', fontStyle: 'italic' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ fontSize: '12px', color: '#475569', fontStyle: 'italic', marginBottom: '4px' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
              {exp.description && <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.65', textAlign: 'justify' }}>{exp.description}</p>}
              {(exp.achievements || []).length > 0 && (
                <ul style={{ marginTop: '6px', paddingLeft: '18px' }}>
                  {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '10px', color: '#374151', marginBottom: '3px', lineHeight: '1.5' }}>{a}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '28px' }}>
        {education.length > 0 && (
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#0f172a', marginBottom: '12px', borderBottom: '2px solid #0f172a', paddingBottom: '6px' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#0f172a' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <span style={{ fontSize: '9px', color: '#64748b', fontStyle: 'italic' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                </div>
                <p style={{ fontSize: '10px', color: '#475569', fontStyle: 'italic' }}>{edu.institution}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ flex: 1 }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#0f172a', marginBottom: '10px', borderBottom: '2px solid #0f172a', paddingBottom: '6px' }}>Core Competencies</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ fontSize: '9px', color: '#0f172a', border: '1px solid #94a3b8', padding: '3px 8px', borderRadius: '2px', letterSpacing: '0.04em' }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#0f172a', marginBottom: '10px', borderBottom: '2px solid #0f172a', paddingBottom: '6px' }}>Board & Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '6px' }}>
                  <p style={{ fontSize: '10px', fontWeight: '700', color: '#0f172a' }}>{cert.name}</p>
                  <p style={{ fontSize: '9px', color: '#475569', fontStyle: 'italic' }}>{cert.issuer} · {cert.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
