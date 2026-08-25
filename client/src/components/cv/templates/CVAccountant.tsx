import type { CVData } from '@shared/types/cv';

export function CVAccountant({ data }: { data: CVData }) {
  const { personalInfo } = data;
  // Accountant: conservative, black on white
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Georgia, "Times New Roman", serif', background: '#fff', color: '#111' }}>
      {/* Header — centered, conservative */}
      <div style={{ textAlign: 'center', padding: '28px 32px 16px', borderBottom: '2px solid #111' }}>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Photo" style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #111', display: 'block', margin: '0 auto 10px' }} />
        )}
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#000', margin: '0 0 3px', letterSpacing: '0.04em' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p style={{ fontSize: '11px', color: '#333', margin: '0 0 10px', fontStyle: 'italic', letterSpacing: '0.04em' }}>{personalInfo.jobTitle}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {personalInfo.email && <span style={{ fontSize: '9px', color: '#333' }}>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '9px', color: '#333' }}>☎ {personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ fontSize: '9px', color: '#333' }}>⌖ {personalInfo.location}</span>}
          {personalInfo.website && <span style={{ fontSize: '9px', color: '#333' }}>⊕ {personalInfo.website}</span>}
        </div>
      </div>

      {/* Certifications — prominent bar */}
      {certifications.length > 0 && (
        <div style={{ padding: '8px 32px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '8px', fontWeight: '700', color: '#333', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '4px' }}>Credentials:</span>
          {certifications.map(cert => (
            <span key={cert.id} style={{ fontSize: '8.5px', color: '#000', fontWeight: '700', padding: '2px 8px', border: '1px solid #333' }}>{cert.name}</span>
          ))}
        </div>
      )}

      <div style={{ padding: '16px 32px 28px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #ddd' }}>
            <p style={{ fontSize: '10px', color: '#222', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#000', marginBottom: '10px', paddingBottom: '4px', borderBottom: '1px solid #555' }}>Professional Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#000', margin: 0 }}>{exp.position}</h3>
                  <span style={{ fontSize: '9px', color: '#555', flexShrink: 0, marginLeft: '10px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: '10px', color: '#333', fontWeight: '600', margin: '1px 0 4px', fontStyle: 'italic' }}>{exp.company}</p>
                {exp.description && <p style={{ fontSize: '9.5px', color: '#333', lineHeight: '1.65', margin: 0 }}>{exp.description}</p>}
                {(exp.achievements || []).length > 0 && (
                  <ul style={{ margin: '4px 0 0', paddingLeft: '18px' }}>
                    {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#333', marginBottom: '2px' }}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education as a clean table */}
        {education.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#000', marginBottom: '10px', paddingBottom: '4px', borderBottom: '1px solid #555' }}>Education</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9.5px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ textAlign: 'left', padding: '5px 8px', fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', border: '1px solid #ddd' }}>Year</th>
                  <th style={{ textAlign: 'left', padding: '5px 8px', fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', border: '1px solid #ddd' }}>Institution</th>
                  <th style={{ textAlign: 'left', padding: '5px 8px', fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', border: '1px solid #ddd' }}>Degree / Field</th>
                </tr>
              </thead>
              <tbody>
                {education.map((edu) => (
                  <tr key={edu.id}>
                    <td style={{ padding: '5px 8px', border: '1px solid #ddd', color: '#555', whiteSpace: 'nowrap' }}>{edu.current ? 'Present' : edu.endDate}</td>
                    <td style={{ padding: '5px 8px', border: '1px solid #ddd', fontWeight: '600', color: '#000' }}>{edu.institution}</td>
                    <td style={{ padding: '5px 8px', border: '1px solid #ddd', color: '#333' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ flex: 1 }}>
            {skills.length > 0 && (
              <div style={{ marginBottom: '14px' }}>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#000', marginBottom: '8px', paddingBottom: '4px', borderBottom: '1px solid #555' }}>Software & Tools</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {skills.map(skill => (
                    <span key={skill.id} style={{ fontSize: '8.5px', color: '#333', padding: '2px 8px', border: '1px solid #999', fontFamily: 'Inter, sans-serif' }}>{skill.name}</span>
                  ))}
                </div>
              </div>
            )}
            {projects.length > 0 && (
              <div>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#000', marginBottom: '8px', paddingBottom: '4px', borderBottom: '1px solid #555' }}>Projects</h2>
                {projects.map(proj => (
                  <div key={proj.id} style={{ marginBottom: '7px' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#000', margin: '0 0 2px' }}>{proj.name}</h3>
                    {proj.description && <p style={{ fontSize: '9px', color: '#333', margin: 0 }}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ flex: '0 0 130px' }}>
            {languages.length > 0 && (
              <div style={{ marginBottom: '14px' }}>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#000', marginBottom: '8px', paddingBottom: '4px', borderBottom: '1px solid #555' }}>Languages</h2>
                {languages.map(lang => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '9.5px', color: '#222', fontWeight: '600' }}>{lang.name}</span>
                    <span style={{ fontSize: '8.5px', color: '#555' }}>{lang.level.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            )}
            {awards.length > 0 && (
              <div>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#000', marginBottom: '8px', paddingBottom: '4px', borderBottom: '1px solid #555' }}>Awards</h2>
                {awards.map(award => (
                  <div key={award.id} style={{ marginBottom: '6px' }}>
                    <p style={{ fontSize: '9.5px', fontWeight: '700', color: '#000', margin: '0 0 1px' }}>{award.title}</p>
                    <p style={{ fontSize: '8.5px', color: '#555', margin: 0 }}>{award.issuer}</p>
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
