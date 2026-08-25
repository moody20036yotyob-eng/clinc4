import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVLuxuryDark({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primaryColor = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  // Luxury gold accent
  const goldColor = '#d4af37';

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: '"Georgia", serif', backgroundColor: '#1a1a20', color: '#e8e0d0' }}>
      {/* Top accent */}
      <div style={{ height: '2px', background: `linear-gradient(to right, transparent, ${goldColor}, transparent)` }} />

      {/* Header */}
      <div style={{ padding: '40px 44px 32px', textAlign: 'center', borderBottom: `1px solid rgba(212,175,55,0.2)` }}>
        {personalInfo.photo && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <img src={personalInfo.photo} alt="Photo" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: `1px solid ${goldColor}`, boxShadow: `0 0 20px rgba(212,175,55,0.2)` }} />
          </div>
        )}
        <h1 style={{ fontSize: '30px', fontWeight: '400', color: '#f5f0e8', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p style={{ fontSize: '11px', color: goldColor, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: '400', marginBottom: '20px' }}>
            {personalInfo.jobTitle}
          </p>
        )}
        {/* Gold rule */}
        <div style={{ width: '60px', height: '1px', backgroundColor: goldColor, margin: '0 auto 20px' }} />
        {/* Contact */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', fontSize: '10px', color: '#8a8070' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ padding: '28px 60px', textAlign: 'center', borderBottom: `1px solid rgba(212,175,55,0.1)` }}>
          <p style={{ fontSize: '11px', color: '#a89878', lineHeight: '1.9', fontStyle: 'italic', letterSpacing: '0.03em' }}>
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Body */}
      <div style={{ padding: '28px 44px' }}>
        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
              <div style={{ flex: 1, height: '0.5px', backgroundColor: 'rgba(212,175,55,0.3)' }} />
              <h2 style={{ fontSize: '9px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.3em', color: goldColor }}>Experience</h2>
              <div style={{ flex: 1, height: '0.5px', backgroundColor: 'rgba(212,175,55,0.3)' }} />
            </div>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '20px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '13px', fontWeight: '400', color: '#f5f0e8', letterSpacing: '0.05em', marginBottom: '3px' }}>{exp.position}</h3>
                <p style={{ fontSize: '10px', color: goldColor, letterSpacing: '0.1em', marginBottom: '4px' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                <p style={{ fontSize: '9px', color: '#6b6050', letterSpacing: '0.1em', marginBottom: '8px' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</p>
                {exp.description && <p style={{ fontSize: '10px', color: '#8a8070', lineHeight: '1.75', maxWidth: '400px', margin: '0 auto' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
              <div style={{ flex: 1, height: '0.5px', backgroundColor: 'rgba(212,175,55,0.3)' }} />
              <h2 style={{ fontSize: '9px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.3em', color: goldColor }}>Education</h2>
              <div style={{ flex: 1, height: '0.5px', backgroundColor: 'rgba(212,175,55,0.3)' }} />
            </div>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '14px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '12px', fontWeight: '400', color: '#f5f0e8', letterSpacing: '0.05em' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                <p style={{ fontSize: '10px', color: goldColor, letterSpacing: '0.1em' }}>{edu.institution}</p>
                <p style={{ fontSize: '9px', color: '#6b6050', letterSpacing: '0.1em' }}>{edu.startDate} — {edu.current ? 'Present' : edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills + Languages */}
        {(skills.length > 0 || languages.length > 0) && (
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
              <div style={{ flex: 1, height: '0.5px', backgroundColor: 'rgba(212,175,55,0.3)' }} />
              <h2 style={{ fontSize: '9px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.3em', color: goldColor }}>Expertise</h2>
              <div style={{ flex: 1, height: '0.5px', backgroundColor: 'rgba(212,175,55,0.3)' }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              {skills.length > 0 && (
                <p style={{ fontSize: '10px', color: '#8a8070', lineHeight: '2', letterSpacing: '0.08em' }}>
                  {skills.map((s) => s.name).join('   ·   ')}
                </p>
              )}
              {languages.length > 0 && (
                <p style={{ fontSize: '10px', color: '#6b6050', lineHeight: '2', letterSpacing: '0.08em', marginTop: '8px' }}>
                  {languages.map((l) => `${l.name} (${l.level.replace(/_/g, ' ')})`).join('   ·   ')}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
              <div style={{ flex: 1, height: '0.5px', backgroundColor: 'rgba(212,175,55,0.3)' }} />
              <h2 style={{ fontSize: '9px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.3em', color: goldColor }}>Certifications</h2>
              <div style={{ flex: 1, height: '0.5px', backgroundColor: 'rgba(212,175,55,0.3)' }} />
            </div>
            {certifications.map((cert) => (
              <p key={cert.id} style={{ fontSize: '10px', color: '#8a8070', textAlign: 'center', marginBottom: '5px' }}>
                {cert.name} <span style={{ color: '#6b6050' }}>· {cert.issuer} · {cert.date}</span>
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Bottom accent */}
      <div style={{ height: '2px', background: `linear-gradient(to right, transparent, ${goldColor}, transparent)` }} />
    </div>
  );
}
