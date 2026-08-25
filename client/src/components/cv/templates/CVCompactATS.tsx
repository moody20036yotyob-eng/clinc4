import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVCompactATS({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: '"Arial", "Helvetica Neue", sans-serif', backgroundColor: '#fff', color: '#000', padding: '15mm 18mm' }}>
      {/* Name */}
      <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#000', marginBottom: '2px', letterSpacing: '0.01em' }}>
        {personalInfo.fullName || 'Your Name'}
      </h1>

      {/* Contact single line - ATS parseable */}
      <p style={{ fontSize: '10px', color: '#000', marginBottom: '10px', lineHeight: '1.4' }}>
        {[
          personalInfo.email,
          personalInfo.phone,
          personalInfo.location,
          personalInfo.linkedin ? personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'linkedin.com/in/') : null,
          personalInfo.github ? personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, 'github.com/') : null,
          personalInfo.website ? personalInfo.website.replace(/^https?:\/\//, '') : null,
        ].filter(Boolean).join(' | ')}
      </p>

      {personalInfo.jobTitle && (
        <p style={{ fontSize: '11px', color: '#000', marginBottom: '10px', fontWeight: '600' }}>{personalInfo.jobTitle}</p>
      )}

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#000', marginBottom: '4px', borderBottom: '1px solid #000', paddingBottom: '2px' }}>Summary</h2>
          <p style={{ fontSize: '10px', color: '#000', lineHeight: '1.55' }}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#000', marginBottom: '6px', borderBottom: '1px solid #000', paddingBottom: '2px' }}>Work Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '10px' }}>
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#000', margin: 0 }}>{exp.position}</p>
              <p style={{ fontSize: '10px', color: '#000', margin: '1px 0' }}>
                {exp.company}{exp.location ? `, ${exp.location}` : ''} | {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </p>
              {exp.description && <p style={{ fontSize: '10px', color: '#000', marginTop: '3px', lineHeight: '1.5' }}>{exp.description}</p>}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul style={{ marginTop: '3px', paddingLeft: '16px', margin: '3px 0 0 0' }}>
                  {exp.achievements.map((a, i) => (
                    <li key={i} style={{ fontSize: '10px', color: '#000', marginBottom: '1px' }}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#000', marginBottom: '6px', borderBottom: '1px solid #000', paddingBottom: '2px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#000', margin: 0 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
              <p style={{ fontSize: '10px', color: '#000', margin: '1px 0' }}>
                {edu.institution}{edu.location ? `, ${edu.location}` : ''} | {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#000', marginBottom: '4px', borderBottom: '1px solid #000', paddingBottom: '2px' }}>Skills</h2>
          <p style={{ fontSize: '10px', color: '#000', lineHeight: '1.55' }}>
            {skills.map((s) => s.name).join(', ')}
          </p>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#000', marginBottom: '6px', borderBottom: '1px solid #000', paddingBottom: '2px' }}>Certifications</h2>
          {certifications.map((cert) => (
            <p key={cert.id} style={{ fontSize: '10px', color: '#000', marginBottom: '3px' }}>
              {cert.name} | {cert.issuer} | {cert.date}
            </p>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#000', marginBottom: '6px', borderBottom: '1px solid #000', paddingBottom: '2px' }}>Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '8px' }}>
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#000', margin: 0 }}>
                {proj.name}
                {proj.url && <span style={{ fontWeight: '400', fontSize: '10px' }}> | {proj.url.replace(/^https?:\/\//, '')}</span>}
              </p>
              {proj.description && <p style={{ fontSize: '10px', color: '#000', margin: '2px 0', lineHeight: '1.5' }}>{proj.description}</p>}
              {proj.technologies && proj.technologies.length > 0 && (
                <p style={{ fontSize: '10px', color: '#000', margin: '1px 0' }}>Technologies: {proj.technologies.join(', ')}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {awards.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#000', marginBottom: '6px', borderBottom: '1px solid #000', paddingBottom: '2px' }}>Awards & Recognition</h2>
          {awards.map((award) => (
            <p key={award.id} style={{ fontSize: '10px', color: '#000', marginBottom: '3px' }}>
              <strong>{award.title}</strong> | {award.issuer} | {award.date}
              {award.description && ` — ${award.description}`}
            </p>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#000', marginBottom: '4px', borderBottom: '1px solid #000', paddingBottom: '2px' }}>Languages</h2>
          <p style={{ fontSize: '10px', color: '#000' }}>
            {languages.map((l) => `${l.name} (${l.level.replace(/_/g, ' ')})`).join(' | ')}
          </p>
        </div>
      )}
    </div>
  );
}
