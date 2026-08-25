import type { CVData } from '@shared/types/cv';

export function CVNonprofit({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#2d6a4f';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fffdf7' }}>
      {/* Warm header */}
      <div style={{ backgroundColor: primary, padding: '28px 32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.06)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.8)', flexShrink: 0 }} />
          )}
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', margin: '0 0 3px' }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', fontWeight: '500', margin: '0 0 10px' }}>{personalInfo.jobTitle}</p>}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              {personalInfo.email && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.8)' }}>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.8)' }}>☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.8)' }}>⌖ {personalInfo.location}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Mission statement / summary prominently */}
      {personalInfo.summary && (
        <div style={{ backgroundColor: '#f0fdf4', padding: '18px 32px', borderBottom: '2px dashed #bbf7d0' }}>
          <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, margin: '0 0 6px' }}>Mission & Vision</h2>
          <p style={{ fontSize: '11px', color: '#1f2937', lineHeight: '1.75', margin: 0, fontStyle: 'italic' }}>"{personalInfo.summary}"</p>
        </div>
      )}

      {/* Body */}
      <div style={{ padding: '20px 32px 28px', display: 'flex', gap: '22px' }}>
        {/* Left */}
        <div style={{ flex: 1 }}>
          {experience.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'inline-block', width: '18px', height: '2px', backgroundColor: primary }} />
                Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px', paddingLeft: '10px', borderLeft: `2px solid #86efac` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '2px 0 4px' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.65', margin: 0 }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: '14px' }}>
                      {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'inline-block', width: '18px', height: '2px', backgroundColor: primary }} />
                Community Involvement
              </h2>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '10px', paddingLeft: '10px', borderLeft: `2px solid #86efac` }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '10px', color: '#374151', margin: 0 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}

          {awards.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'inline-block', width: '18px', height: '2px', backgroundColor: primary }} />
                Recognition
              </h2>
              {awards.map((award) => (
                <div key={award.id} style={{ marginBottom: '8px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#fbbf24', fontSize: '12px', flexShrink: 0 }}>★</span>
                  <div>
                    <p style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: 0 }}>{award.title}</p>
                    <p style={{ fontSize: '9px', color: '#6b7280', margin: 0 }}>{award.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <div style={{ flex: '0 0 150px' }}>
          {education.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px', padding: '8px', backgroundColor: '#f0fdf4', borderRadius: '6px' }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '9px', color: primary, margin: '0 0 1px' }}>{edu.institution}</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0 }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ fontSize: '8px', backgroundColor: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '10px', fontWeight: '600' }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px' }}>Languages</h2>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '10px', color: '#374151', fontWeight: '500' }}>{lang.name}</span>
                  <span style={{ fontSize: '8px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px' }}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '6px', padding: '6px 8px', backgroundColor: '#f0fdf4', borderRadius: '6px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0 }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
