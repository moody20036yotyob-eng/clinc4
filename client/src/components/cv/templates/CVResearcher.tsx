import type { CVData } from '@shared/types/cv';

export function CVResearcher({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1e40af';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff', padding: '36px 36px 28px' }}>
      {/* Header */}
      <div style={{ borderBottom: `3px solid ${primary}`, paddingBottom: '18px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#111827', margin: '0 0 4px', letterSpacing: '-0.01em', fontFamily: 'Georgia, serif' }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '12px', color: primary, fontWeight: '500', margin: '0 0 10px', fontStyle: 'italic' }}>{personalInfo.jobTitle}</p>}
          </div>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '64px', height: '64px', borderRadius: '4px', objectFit: 'cover', border: `2px solid ${primary}`, flexShrink: 0 }} />
          )}
        </div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {personalInfo.email && <span style={{ fontSize: '9px', color: '#6b7280' }}>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '9px', color: '#6b7280' }}>☎ {personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ fontSize: '9px', color: '#6b7280' }}>⌖ {personalInfo.location}</span>}
          {personalInfo.website && <span style={{ fontSize: '9px', color: primary }}>{personalInfo.website}</span>}
          {personalInfo.linkedin && <span style={{ fontSize: '9px', color: '#6b7280' }}>{personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Research interests from summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '8px' }}>Research Interests</h2>
          <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.75', margin: 0 }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '10px', borderBottom: `1px solid ${primary}30`, paddingBottom: '4px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: '0 0 2px', fontFamily: 'Georgia, serif' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                <p style={{ fontSize: '10px', color: primary, margin: '0 0 1px', fontStyle: 'italic' }}>{edu.institution}</p>
                {edu.gpa && <p style={{ fontSize: '9px', color: '#6b7280', margin: 0 }}>GPA: {edu.gpa}</p>}
              </div>
              <span style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '12px' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
            </div>
          ))}
        </div>
      )}

      {/* Publications/Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '10px', borderBottom: `1px solid ${primary}30`, paddingBottom: '4px' }}>Publications & Research</h2>
          {projects.map((proj, i) => (
            <div key={proj.id} style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
              <span style={{ fontSize: '9px', color: '#9ca3af', flexShrink: 0, paddingTop: '2px' }}>[{i + 1}]</span>
              <div>
                <p style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 2px', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>"{proj.name}"</p>
                {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
                {proj.url && <p style={{ fontSize: '8px', color: primary, margin: '2px 0 0' }}>{proj.url}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Awards/Grants */}
      {awards.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '10px', borderBottom: `1px solid ${primary}30`, paddingBottom: '4px' }}>Grants & Awards</h2>
          {awards.map((award) => (
            <div key={award.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
              <div>
                <p style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: 0 }}>{award.title}</p>
                <p style={{ fontSize: '9px', color: '#6b7280', margin: 0 }}>{award.issuer}</p>
              </div>
              <span style={{ fontSize: '9px', color: '#9ca3af' }}>{award.date}</span>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '10px', borderBottom: `1px solid ${primary}30`, paddingBottom: '4px' }}>Academic & Research Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0, fontFamily: 'Georgia, serif' }}>{exp.position}</h3>
                <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ fontSize: '10px', color: primary, margin: '2px 0 4px', fontStyle: 'italic' }}>{exp.company}</p>
              {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills and certifications */}
      <div style={{ display: 'flex', gap: '24px' }}>
        {skills.length > 0 && (
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '8px', borderBottom: `1px solid ${primary}30`, paddingBottom: '4px' }}>Technical Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {skills.map((skill) => (
                <span key={skill.id} style={{ fontSize: '8px', backgroundColor: `${primary}10`, color: primary, padding: '2px 8px', borderRadius: '3px', fontWeight: '600' }}>{skill.name}</span>
              ))}
            </div>
          </div>
        )}
        {languages.length > 0 && (
          <div style={{ flex: '0 0 130px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '8px', borderBottom: `1px solid ${primary}30`, paddingBottom: '4px' }}>Languages</h2>
            {languages.map((lang) => (
              <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '10px', color: '#374151' }}>{lang.name}</span>
                <span style={{ fontSize: '9px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        )}
        {certifications.length > 0 && (
          <div style={{ flex: '0 0 140px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: primary, marginBottom: '8px', borderBottom: `1px solid ${primary}30`, paddingBottom: '4px' }}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '5px' }}>
                <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: 0 }}>{cert.name}</p>
                <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0 }}>{cert.issuer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
