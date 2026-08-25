import type { CVData } from '@shared/types/cv';

export function CVBusinessAnalyst({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#0369a1';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  // Split skills into technical and business categories
  const techKeywords = ['excel', 'sql', 'tableau', 'python', 'r ', 'power bi', 'data', 'database', 'analytics', 'modeling', 'sap', 'jira', 'confluence'];
  const techSkills = skills.filter(s => techKeywords.some(k => s.name.toLowerCase().includes(k)) || (s.category || '').toLowerCase().includes('tech'));
  const bizSkills = skills.filter(s => !techSkills.includes(s));

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff', display: 'flex' }}>
      {/* Left column */}
      <div style={{ width: '170px', backgroundColor: '#f0f9ff', borderRight: `2px solid ${primary}20`, padding: '28px 16px', flexShrink: 0 }}>
        {/* Photo and name */}
        {personalInfo.photo && (
          <div style={{ marginBottom: '14px' }}>
            <img src={personalInfo.photo} alt="Photo" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${primary}`, display: 'block', margin: '0 auto' }} />
          </div>
        )}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '13px', fontWeight: '800', color: '#111827', margin: '0 0 4px' }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.jobTitle && <p style={{ fontSize: '9px', color: primary, fontWeight: '600', margin: 0 }}>{personalInfo.jobTitle}</p>}
        </div>

        {/* Contact */}
        <div style={{ marginBottom: '18px', borderTop: `2px solid ${primary}30`, paddingTop: '14px' }}>
          <h2 style={{ fontSize: '8px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', marginBottom: '8px' }}>Contact</h2>
          {personalInfo.email && <p style={{ fontSize: '8px', color: '#374151', margin: '0 0 5px', lineHeight: '1.4', wordBreak: 'break-all' }}>✉ {personalInfo.email}</p>}
          {personalInfo.phone && <p style={{ fontSize: '8px', color: '#374151', margin: '0 0 5px' }}>☎ {personalInfo.phone}</p>}
          {personalInfo.location && <p style={{ fontSize: '8px', color: '#374151', margin: '0 0 5px' }}>⌖ {personalInfo.location}</p>}
          {personalInfo.linkedin && <p style={{ fontSize: '8px', color: primary, margin: 0, wordBreak: 'break-all' }}>{personalInfo.linkedin}</p>}
        </div>

        {/* Technical Skills */}
        {(techSkills.length > 0 || skills.length > 0) && (
          <div style={{ marginBottom: '18px', borderTop: `2px solid ${primary}30`, paddingTop: '14px' }}>
            <h2 style={{ fontSize: '8px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', color: primary, marginBottom: '8px' }}>Technical</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
              {(techSkills.length > 0 ? techSkills : skills.slice(0, 8)).map((skill) => (
                <span key={skill.id} style={{ fontSize: '7px', backgroundColor: `${primary}15`, color: primary, padding: '2px 6px', borderRadius: '3px', fontWeight: '700' }}>{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {/* Business Skills */}
        {bizSkills.length > 0 && (
          <div style={{ marginBottom: '18px', borderTop: `2px solid ${primary}30`, paddingTop: '14px' }}>
            <h2 style={{ fontSize: '8px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#6b7280', marginBottom: '8px' }}>Business</h2>
            {bizSkills.map((skill) => (
              <p key={skill.id} style={{ fontSize: '8px', color: '#374151', margin: '0 0 4px' }}>· {skill.name}</p>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div style={{ marginBottom: '18px', borderTop: `2px solid ${primary}30`, paddingTop: '14px' }}>
            <h2 style={{ fontSize: '8px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', marginBottom: '8px' }}>Languages</h2>
            {languages.map((lang) => (
              <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '9px', color: '#374151', fontWeight: '600' }}>{lang.name}</span>
                <span style={{ fontSize: '8px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div style={{ borderTop: `2px solid ${primary}30`, paddingTop: '14px' }}>
            <h2 style={{ fontSize: '8px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', marginBottom: '8px' }}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '7px', padding: '5px 7px', backgroundColor: '#fff', borderRadius: '4px', border: `1px solid ${primary}25` }}>
                <p style={{ fontSize: '8px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                <p style={{ fontSize: '7px', color: '#9ca3af', margin: 0 }}>{cert.issuer}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: main content */}
      <div style={{ flex: 1, padding: '28px 22px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Professional Summary</h2>
            <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Professional Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '2px 0 4px' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                {exp.description && <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
                {(exp.achievements || []).length > 0 && (
                  <ul style={{ margin: '6px 0 0', paddingLeft: '16px' }}>
                    {(exp.achievements || []).map((a, i) => (
                      <li key={i} style={{ fontSize: '9px', color: '#374151', marginBottom: '3px', lineHeight: '1.5' }}>{a}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                </div>
                <p style={{ fontSize: '10px', color: primary, margin: '2px 0 0' }}>{edu.institution}</p>
                {edu.gpa && <p style={{ fontSize: '9px', color: '#6b7280', margin: '2px 0 0' }}>GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Key Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '8px' }}>
                <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                {proj.description && <p style={{ fontSize: '10px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
