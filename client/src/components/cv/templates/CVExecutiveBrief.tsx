import type { CVData } from '@shared/types/cv';

export function CVExecutiveBrief({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1e3a5f';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const awards = data.awards || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Georgia, "Times New Roman", serif', background: '#fff' }}>
      {/* Executive header */}
      <div style={{ padding: '28px 32px 20px', borderBottom: `2px solid ${primary}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '76px', height: '76px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${primary}`, flexShrink: 0 }} />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: primary, margin: '0 0 3px', letterSpacing: '0.01em' }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '12px', color: '#374151', margin: '0 0 12px', fontStyle: 'italic', letterSpacing: '0.04em' }}>{personalInfo.jobTitle}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {personalInfo.email && <span style={{ fontSize: '9px', color: '#4b5563' }}>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: '9px', color: '#4b5563' }}>☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: '9px', color: '#4b5563' }}>⌖ {personalInfo.location}</span>}
              {personalInfo.website && <span style={{ fontSize: '9px', color: '#4b5563' }}>⊕ {personalInfo.website}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 32px 28px' }}>
        {/* Executive Summary — KEY section */}
        {personalInfo.summary && (
          <div style={{ marginBottom: '20px', padding: '14px 18px', backgroundColor: `${primary}08`, border: `1px solid ${primary}30`, borderLeft: `4px solid ${primary}` }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>Executive Summary</h2>
            <p style={{ fontSize: '10.5px', color: '#1f2937', lineHeight: '1.75', margin: 0 }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Career Highlights */}
        {awards.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `1px solid ${primary}`, fontFamily: 'Inter, sans-serif' }}>Recognitions & Awards</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {awards.map(award => (
                <div key={award.id} style={{ flex: '1 1 200px', padding: '8px 12px', backgroundColor: `${primary}06`, border: `1px solid ${primary}20`, borderRadius: '2px' }}>
                  <p style={{ fontSize: '10px', fontWeight: '700', color: primary, margin: '0 0 2px', fontFamily: 'Inter, sans-serif' }}>{award.title}</p>
                  <p style={{ fontSize: '8.5px', color: '#6b7280', margin: 0, fontFamily: 'Inter, sans-serif' }}>{award.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Board / Advisory — from experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `1px solid ${primary}`, fontFamily: 'Inter, sans-serif' }}>Career Highlights</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '13px', paddingLeft: '14px', borderLeft: `2px solid ${primary}30` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0, fontFamily: 'Inter, sans-serif' }}>{exp.position}</h3>
                  <span style={{ fontSize: '9px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '2px 0 4px', fontFamily: 'Inter, sans-serif' }}>{exp.company}</p>
                {exp.description && <p style={{ fontSize: '9.5px', color: '#4b5563', lineHeight: '1.65', margin: 0, fontFamily: 'Inter, sans-serif' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Bottom row — Education, Skills, Certifications */}
        <div style={{ display: 'flex', gap: '20px' }}>
          {education.length > 0 && (
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid ${primary}`, fontFamily: 'Inter, sans-serif' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 1px', fontFamily: 'Inter, sans-serif' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '9px', color: primary, fontWeight: '500', margin: '0 0 1px', fontFamily: 'Inter, sans-serif' }}>{edu.institution}</p>
                  <span style={{ fontSize: '8.5px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                </div>
              ))}
            </div>
          )}
          {skills.length > 0 && (
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid ${primary}`, fontFamily: 'Inter, sans-serif' }}>Core Competencies</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {skills.map(skill => (
                  <span key={skill.id} style={{ fontSize: '8.5px', color: primary, padding: '2px 8px', border: `1px solid ${primary}40`, fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}
          {(certifications.length > 0 || languages.length > 0) && (
            <div style={{ flex: 1 }}>
              {certifications.length > 0 && (
                <>
                  <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid ${primary}`, fontFamily: 'Inter, sans-serif' }}>Certifications</h2>
                  {certifications.map(cert => (
                    <div key={cert.id} style={{ marginBottom: '6px' }}>
                      <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px', fontFamily: 'Inter, sans-serif' }}>{cert.name}</p>
                      <p style={{ fontSize: '8px', color: '#6b7280', margin: 0, fontFamily: 'Inter, sans-serif' }}>{cert.issuer}</p>
                    </div>
                  ))}
                </>
              )}
              {languages.length > 0 && (
                <>
                  <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, margin: '12px 0 8px', paddingBottom: '4px', borderBottom: `1px solid ${primary}`, fontFamily: 'Inter, sans-serif' }}>Languages</h2>
                  {languages.map(lang => (
                    <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '9.5px', color: '#374151', fontWeight: '600', fontFamily: 'Inter, sans-serif' }}>{lang.name}</span>
                      <span style={{ fontSize: '8.5px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>{lang.level.replace(/_/g, ' ')}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
