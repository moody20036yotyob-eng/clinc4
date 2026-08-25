import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVAcademicClean({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primaryColor = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Georgia, "Times New Roman", serif', backgroundColor: '#fff', padding: '30mm 25mm', color: '#1a1a1a' }}>
      {/* Centered name header */}
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '0.02em', color: '#1a1a1a', marginBottom: '4px' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p style={{ fontSize: '13px', color: '#555', fontStyle: 'italic', marginBottom: '8px' }}>{personalInfo.jobTitle}</p>
        )}
        {/* Contact inline */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', fontSize: '10px', color: '#555' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
          {personalInfo.website && <span>| {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
        </div>
      </div>

      {/* Thin rule below name */}
      <div style={{ borderBottom: '1px solid #1a1a1a', marginBottom: '20px' }} />

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: '18px' }}>
          <p style={{ fontSize: '11px', color: '#333', lineHeight: '1.7', textAlign: 'justify' }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Education first for academic style */}
      {education.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '10px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#1a1a1a', marginBottom: '1px' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                <p style={{ fontSize: '11px', color: primaryColor, fontStyle: 'italic' }}>{edu.institution}</p>
                {edu.gpa && <p style={{ fontSize: '10px', color: '#555' }}>GPA: {edu.gpa}</p>}
                {edu.description && <p style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>{edu.description}</p>}
              </div>
              <p style={{ fontSize: '10px', color: '#555', whiteSpace: 'nowrap', marginLeft: '12px', fontStyle: 'italic' }}>
                {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '10px' }}>Academic & Professional Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#1a1a1a' }}>{exp.position}</h3>
                  <p style={{ fontSize: '11px', color: primaryColor, fontStyle: 'italic' }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                </div>
                <p style={{ fontSize: '10px', color: '#555', whiteSpace: 'nowrap', marginLeft: '12px', fontStyle: 'italic' }}>
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </p>
              </div>
              {exp.description && <p style={{ fontSize: '10px', color: '#333', marginTop: '4px', lineHeight: '1.6' }}>{exp.description}</p>}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul style={{ marginTop: '4px', paddingLeft: '16px', fontSize: '10px', color: '#333' }}>
                  {exp.achievements.map((a, i) => <li key={i} style={{ marginBottom: '2px' }}>{a}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Publications/Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '10px' }}>Research & Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '10px' }}>
              <p style={{ fontSize: '11px', color: '#1a1a1a' }}>
                <strong>{proj.name}</strong>
                {proj.startDate && <span style={{ fontSize: '10px', color: '#555', fontStyle: 'italic' }}> ({proj.startDate}{proj.endDate ? ` – ${proj.endDate}` : ''})</span>}
              </p>
              {proj.description && <p style={{ fontSize: '10px', color: '#333', lineHeight: '1.6', marginTop: '2px', textAlign: 'justify' }}>{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {awards.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '10px' }}>Awards & Honors</h2>
          {awards.map((award) => (
            <div key={award.id} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#1a1a1a' }}>{award.title}</span>
                <span style={{ fontSize: '10px', color: '#555', fontStyle: 'italic' }}>, {award.issuer}</span>
              </div>
              <span style={{ fontSize: '10px', color: '#555', fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: '12px' }}>{award.date}</span>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '10px' }}>Skills & Competencies</h2>
          <p style={{ fontSize: '11px', color: '#333', lineHeight: '1.6' }}>
            {skills.map((s) => s.name).join(' · ')}
          </p>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '10px' }}>Languages</h2>
          <p style={{ fontSize: '11px', color: '#333' }}>
            {languages.map((l) => `${l.name} (${l.level.replace(/_/g, ' ')})`).join(' · ')}
          </p>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div>
          <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#1a1a1a', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '10px' }}>Certifications</h2>
          {certifications.map((cert) => (
            <p key={cert.id} style={{ fontSize: '11px', color: '#333', marginBottom: '4px' }}>
              <strong>{cert.name}</strong> — {cert.issuer}, {cert.date}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
