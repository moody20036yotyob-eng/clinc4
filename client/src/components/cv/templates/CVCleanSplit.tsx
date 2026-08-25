import type { CVData } from '@shared/types/cv';

export function CVCleanSplit({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1e40af';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  const leftBg = '#1e293b';
  const leftText = '#f1f5f9';
  const leftMuted = '#94a3b8';

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Full-width top header */}
      <div style={{ backgroundColor: leftBg, padding: '24px 0', display: 'flex' }}>
        <div style={{ width: '63mm', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: `1px solid rgba(255,255,255,0.1)` }}>
          {personalInfo.photo ? (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '68px', height: '68px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${primary}` }} />
          ) : (
            <div style={{ width: '68px', height: '68px', borderRadius: '50%', backgroundColor: primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '24px', color: '#fff', fontWeight: '900' }}>{(personalInfo.fullName || 'Y')[0]}</span>
            </div>
          )}
        </div>
        <div style={{ flex: 1, padding: '0 24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#fff', margin: '0 0 3px', letterSpacing: '-0.02em' }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.jobTitle && <p style={{ fontSize: '11px', color: primary, fontWeight: '600', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{personalInfo.jobTitle}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {personalInfo.email && <span style={{ fontSize: '8.5px', color: leftMuted }}>✉ {personalInfo.email}</span>}
            {personalInfo.phone && <span style={{ fontSize: '8.5px', color: leftMuted }}>☎ {personalInfo.phone}</span>}
            {personalInfo.location && <span style={{ fontSize: '8.5px', color: leftMuted }}>⌖ {personalInfo.location}</span>}
            {personalInfo.website && <span style={{ fontSize: '8.5px', color: leftMuted }}>⊕ {personalInfo.website}</span>}
          </div>
        </div>
      </div>

      {/* Two column body */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Left column — 30% */}
        <div style={{ width: '63mm', backgroundColor: leftBg, padding: '20px 18px 24px', flexShrink: 0 }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '8px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid rgba(255,255,255,0.1)` }}>Profile</h2>
              <p style={{ fontSize: '9px', color: leftMuted, lineHeight: '1.65', margin: 0 }}>{personalInfo.summary}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '8px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid rgba(255,255,255,0.1)` }}>Competencies</h2>
              {Array.from(new Set(skills.map(s => s.category || 'General'))).map(cat => (
                <div key={cat} style={{ marginBottom: '8px' }}>
                  {cat !== 'General' && <p style={{ fontSize: '7px', color: leftMuted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>{cat}</p>}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {skills.filter(s => (s.category || 'General') === cat).map(skill => (
                      <span key={skill.id} style={{ fontSize: '7.5px', backgroundColor: `${primary}30`, color: leftText, padding: '2px 6px', borderRadius: '3px', fontWeight: '500' }}>{skill.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '8px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid rgba(255,255,255,0.1)` }}>Languages</h2>
              {languages.map(lang => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '9px', color: leftText, fontWeight: '600' }}>{lang.name}</span>
                  <span style={{ fontSize: '7.5px', color: leftMuted }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '8px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid rgba(255,255,255,0.1)` }}>Certifications</h2>
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: '6px' }}>
                  <p style={{ fontSize: '8.5px', fontWeight: '700', color: leftText, margin: '0 0 1px' }}>{cert.name}</p>
                  <p style={{ fontSize: '7.5px', color: leftMuted, margin: 0 }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '8px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid rgba(255,255,255,0.1)` }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '9px' }}>
                  <h3 style={{ fontSize: '9px', fontWeight: '700', color: leftText, margin: '0 0 1px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '8.5px', color: primary, fontWeight: '500', margin: '0 0 1px' }}>{edu.institution}</p>
                  <span style={{ fontSize: '7.5px', color: leftMuted }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column — 70% */}
        <div style={{ flex: 1, padding: '20px 22px 24px' }}>
          {experience.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '12px', paddingBottom: '5px', borderBottom: `2px solid ${primary}` }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af', flexShrink: 0, marginLeft: '8px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
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
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '12px', paddingBottom: '5px', borderBottom: `2px solid ${primary}` }}>Projects</h2>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '9px' }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}

          {awards.length > 0 && (
            <div>
              <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '12px', paddingBottom: '5px', borderBottom: `2px solid ${primary}` }}>Awards</h2>
              {awards.map(award => (
                <div key={award.id} style={{ marginBottom: '7px' }}>
                  <p style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{award.title}</p>
                  <p style={{ fontSize: '9px', color: '#6b7280', margin: 0 }}>{award.issuer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
