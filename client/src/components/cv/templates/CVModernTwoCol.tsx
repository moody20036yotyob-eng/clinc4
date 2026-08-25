import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVModernTwoCol({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primaryColor = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', display: 'flex', backgroundColor: '#fff' }}>
      {/* Colored left sidebar */}
      <div style={{ width: '30%', backgroundColor: primaryColor, color: '#fff', padding: '28px 16px', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Photo */}
        {personalInfo.photo && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <img src={personalInfo.photo} alt="Photo" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)' }} />
          </div>
        )}

        <h1 style={{ fontSize: '16px', fontWeight: '700', color: '#fff', lineHeight: '1.2', marginBottom: '2px', textAlign: 'center' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: '20px', fontWeight: '400' }}>
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contact */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Contact</p>
          {personalInfo.email && <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)', marginBottom: '5px', wordBreak: 'break-all' }}>✉ {personalInfo.email}</p>}
          {personalInfo.phone && <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)', marginBottom: '5px' }}>✆ {personalInfo.phone}</p>}
          {personalInfo.location && <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)', marginBottom: '5px' }}>⌖ {personalInfo.location}</p>}
          {personalInfo.website && <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)', marginBottom: '5px', wordBreak: 'break-all' }}>⊕ {personalInfo.website.replace(/^https?:\/\//, '')}</p>}
          {personalInfo.linkedin && <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)', marginBottom: '5px', wordBreak: 'break-all' }}>in {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</p>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Skills</p>
            {skills.map((skill) => (
              <div key={skill.id} style={{ marginBottom: '6px' }}>
                <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.9)', marginBottom: '2px' }}>{skill.name}</p>
                <div style={{ height: '2px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '1px' }}>
                  <div style={{ height: '100%', backgroundColor: 'rgba(255,255,255,0.8)', width: skill.level === 'expert' ? '95%' : skill.level === 'advanced' ? '75%' : skill.level === 'intermediate' ? '50%' : '25%', borderRadius: '1px' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <p style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Languages</p>
            {languages.map((lang) => (
              <div key={lang.id} style={{ marginBottom: '4px' }}>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>{lang.name}</span>
                <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.6)', marginLeft: '5px' }}>{lang.level.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right content area */}
      <div style={{ flex: 1, padding: '28px 24px', backgroundColor: '#fff' }}>
        {/* Summary */}
        {personalInfo.summary && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '6px' }}>Profile</h2>
            <div style={{ width: '40px', height: '2px', backgroundColor: primaryColor, marginBottom: '8px' }} />
            <p style={{ fontSize: '11px', color: '#4b5563', lineHeight: '1.6' }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '6px' }}>Experience</h2>
            <div style={{ width: '40px', height: '2px', backgroundColor: primaryColor, marginBottom: '10px' }} />
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#1a1a1a' }}>{exp.position}</h3>
                    <p style={{ fontSize: '11px', color: primaryColor, fontWeight: '500' }}>{exp.company}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '8px' }}>
                    <p style={{ fontSize: '9px', color: '#9ca3af', fontWeight: '600' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                    {exp.location && <p style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.location}</p>}
                  </div>
                </div>
                {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', marginTop: '4px', lineHeight: '1.5' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '6px' }}>Education</h2>
            <div style={{ width: '40px', height: '2px', backgroundColor: primaryColor, marginBottom: '10px' }} />
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '11px', fontWeight: '600', color: '#1a1a1a' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '10px', color: primaryColor }}>{edu.institution}</p>
                  {edu.gpa && <p style={{ fontSize: '9px', color: '#9ca3af' }}>GPA: {edu.gpa}</p>}
                </div>
                <p style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primaryColor, marginBottom: '6px' }}>Certifications</h2>
            <div style={{ width: '40px', height: '2px', backgroundColor: primaryColor, marginBottom: '10px' }} />
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#1a1a1a' }}>{cert.name}</span>
                  <span style={{ fontSize: '10px', color: '#6b7280', marginLeft: '6px' }}>· {cert.issuer}</span>
                </div>
                <span style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>{cert.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
