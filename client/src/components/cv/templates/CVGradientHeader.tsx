import type { CVData } from '@shared/types/cv';

export function CVGradientHeader({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  // Darker shade: simple darkening by using rgba trick
  const darker = primary + 'dd';

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Full-width gradient header */}
      <div style={{ background: `linear-gradient(120deg, ${primary} 0%, ${darker} 100%)`, padding: '30px 32px 26px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circle */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '40%', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative', zIndex: 1 }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '4px solid rgba(255,255,255,0.9)', flexShrink: 0, boxShadow: '0 4px 16px rgba(0,0,0,0.25)' }} />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#fff', margin: '0 0 4px', letterSpacing: '-0.02em', textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', fontWeight: '500', margin: '0 0 14px', letterSpacing: '0.02em' }}>{personalInfo.jobTitle}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {personalInfo.email && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>⌖ {personalInfo.location}</span>}
              {personalInfo.website && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>⊕ {personalInfo.website}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '24px 32px 28px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '20px', padding: '14px 16px', backgroundColor: '#f9fafb', borderRadius: '8px', borderLeft: `4px solid ${primary}` }}>
            <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Left: experience + education */}
          <div style={{ flex: 1 }}>
            {experience.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '5px', borderBottom: `2px solid ${primary}` }}>Experience</h2>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                      <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '2px 0 4px' }}>{exp.company}</p>
                    {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
                    {(exp.achievements || []).length > 0 && (
                      <ul style={{ margin: '4px 0 0', paddingLeft: '16px' }}>
                        {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {education.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '5px', borderBottom: `2px solid ${primary}` }}>Education</h2>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                      <span style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                    </div>
                    <p style={{ fontSize: '10px', color: primary, fontWeight: '500', margin: '2px 0 0' }}>{edu.institution}</p>
                    {edu.gpa && <p style={{ fontSize: '9px', color: '#6b7280', margin: '2px 0 0' }}>GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '5px', borderBottom: `2px solid ${primary}` }}>Projects</h2>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                    {proj.description && <p style={{ fontSize: '10px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div style={{ flex: '0 0 150px' }}>
            {skills.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Skills</h2>
                {Array.from(new Set(skills.map(s => s.category || 'General'))).map(cat => (
                  <div key={cat} style={{ marginBottom: '8px' }}>
                    <p style={{ fontSize: '8px', color: '#9ca3af', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px' }}>{cat}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                      {skills.filter(s => (s.category || 'General') === cat).map(skill => (
                        <span key={skill.id} style={{ fontSize: '8px', backgroundColor: `${primary}12`, color: primary, padding: '2px 6px', borderRadius: '3px', fontWeight: '600' }}>{skill.name}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {languages.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Languages</h2>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '10px', color: '#374151', fontWeight: '500' }}>{lang.name}</span>
                    <span style={{ fontSize: '8px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            )}
            {certifications.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Certifications</h2>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ marginBottom: '6px' }}>
                    <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                    <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{cert.issuer}</p>
                  </div>
                ))}
              </div>
            )}
            {awards.length > 0 && (
              <div>
                <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}` }}>Awards</h2>
                {awards.map((award) => (
                  <div key={award.id} style={{ marginBottom: '6px' }}>
                    <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{award.title}</p>
                    <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{award.issuer}</p>
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
