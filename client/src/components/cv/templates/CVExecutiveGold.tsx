import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVExecutiveGold({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primaryColor = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  // Gold accent color
  const goldColor = '#c9a227';

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: '"Georgia", "Times New Roman", serif', backgroundColor: '#fff' }}>
      {/* Deep header */}
      <div style={{ backgroundColor: '#1c2532', padding: '32px 40px 28px', position: 'relative' }}>
        {/* Gold accent line top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: goldColor }} />

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '400', color: '#fff', letterSpacing: '0.05em', lineHeight: '1.1', marginBottom: '6px' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p style={{ fontSize: '13px', color: goldColor, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '400' }}>
                {personalInfo.jobTitle}
              </p>
            )}
          </div>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${goldColor}` }} />
          )}
        </div>

        {/* Contact row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '16px' }}>
          {personalInfo.email && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.05em' }}>{personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)' }}>{personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)' }}>{personalInfo.location}</span>}
          {personalInfo.website && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)' }}>{personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.linkedin && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)' }}>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
        </div>
      </div>

      {/* Gold rule separator */}
      <div style={{ height: '2px', backgroundColor: goldColor }} />

      {/* Body */}
      <div style={{ padding: '28px 40px' }}>
        {/* Summary */}
        {personalInfo.summary && (
          <div style={{ marginBottom: '22px' }}>
            <p style={{ fontSize: '11px', color: '#444', lineHeight: '1.75', letterSpacing: '0.02em', fontStyle: 'italic', borderLeft: `3px solid ${goldColor}`, paddingLeft: '14px' }}>
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#1c2532' }}>Professional Experience</h2>
              <div style={{ flex: 1, height: '1px', backgroundColor: goldColor }} />
            </div>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#1c2532' }}>{exp.position}</h3>
                  <span style={{ fontSize: '10px', color: '#888', fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: '12px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: '11px', color: goldColor, fontWeight: '600', marginBottom: '6px' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                {exp.description && <p style={{ fontSize: '10px', color: '#555', lineHeight: '1.65', letterSpacing: '0.01em' }}>{exp.description}</p>}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul style={{ marginTop: '5px', paddingLeft: '16px' }}>
                    {exp.achievements.map((a, i) => <li key={i} style={{ fontSize: '10px', color: '#555', marginBottom: '2px', lineHeight: '1.5' }}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#1c2532' }}>Education</h2>
              <div style={{ flex: 1, height: '1px', backgroundColor: goldColor }} />
            </div>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#1c2532' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '11px', color: goldColor }}>{edu.institution}</p>
                  {edu.gpa && <p style={{ fontSize: '10px', color: '#888' }}>GPA: {edu.gpa}</p>}
                </div>
                <span style={{ fontSize: '10px', color: '#888', fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: '12px' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
              </div>
            ))}
          </div>
        )}

        {/* Skills + Languages row */}
        <div style={{ display: 'flex', gap: '32px', marginBottom: '22px' }}>
          {skills.length > 0 && (
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#1c2532' }}>Expertise</h2>
                <div style={{ flex: 1, height: '1px', backgroundColor: goldColor }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ fontSize: '10px', padding: '3px 10px', border: `1px solid ${goldColor}`, color: '#1c2532', letterSpacing: '0.03em' }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ width: '35%', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#1c2532' }}>Languages</h2>
              </div>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '10px', color: '#333' }}>{lang.name}</span>
                  <span style={{ fontSize: '10px', color: '#888', fontStyle: 'italic' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#1c2532' }}>Certifications</h2>
              <div style={{ flex: 1, height: '1px', backgroundColor: goldColor }} />
            </div>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#1c2532' }}>{cert.name}</span>
                  <span style={{ fontSize: '10px', color: '#888', fontStyle: 'italic', marginLeft: '6px' }}>· {cert.issuer}</span>
                </div>
                <span style={{ fontSize: '10px', color: '#888', whiteSpace: 'nowrap', marginLeft: '12px' }}>{cert.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer gold bar */}
      <div style={{ height: '3px', backgroundColor: goldColor, marginTop: 'auto' }} />
    </div>
  );
}
