import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, CertificationItem, ProjectItem } from '@shared/types/cv';

export function CVCreativeLines({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primaryColor = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', backgroundColor: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Diagonal color stripe top-left */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        left: '-30px',
        width: '200px',
        height: '200px',
        backgroundColor: primaryColor,
        transform: 'rotate(45deg)',
        transformOrigin: 'top left',
        zIndex: 0,
        opacity: 0.9,
      }} />
      {/* Second smaller stripe */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '120px',
        height: '8px',
        backgroundColor: primaryColor,
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '8px',
        height: '120px',
        backgroundColor: primaryColor,
        zIndex: 1,
      }} />

      {/* Header: offset to right of stripe */}
      <div style={{ padding: '28px 32px 24px 60px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#111827', lineHeight: '1.1', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p style={{ fontSize: '13px', color: primaryColor, fontWeight: '500', marginBottom: '12px' }}>{personalInfo.jobTitle}</p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {personalInfo.email && <span style={{ fontSize: '10px', color: '#6b7280' }}>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: '10px', color: '#6b7280' }}>✆ {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: '10px', color: '#6b7280' }}>⌖ {personalInfo.location}</span>}
              {personalInfo.website && <span style={{ fontSize: '10px', color: '#6b7280' }}>⊕ {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
              {personalInfo.linkedin && <span style={{ fontSize: '10px', color: '#6b7280' }}>in {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
            </div>
          </div>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '80px', height: '80px', borderRadius: '4px', objectFit: 'cover', border: `2px solid ${primaryColor}`, flexShrink: 0 }} />
          )}
        </div>
        {personalInfo.summary && (
          <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.6', marginTop: '12px', borderLeft: `3px solid ${primaryColor}`, paddingLeft: '10px' }}>{personalInfo.summary}</p>
        )}
      </div>

      {/* Body: single column with left accent lines */}
      <div style={{ padding: '0 32px 32px', position: 'relative', zIndex: 2 }}>
        {/* Section component inline */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '4px', height: '20px', backgroundColor: primaryColor, borderRadius: '2px', flexShrink: 0 }} />
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#111827' }}>Experience</h2>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
            </div>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px', paddingLeft: '16px', borderLeft: `1px dashed ${primaryColor}30` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#1a1a1a' }}>{exp.position}</h3>
                    <p style={{ fontSize: '11px', color: primaryColor, fontWeight: '500' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                  </div>
                  <p style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                </div>
                {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', marginTop: '4px', lineHeight: '1.55' }}>{exp.description}</p>}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul style={{ marginTop: '4px', paddingLeft: '14px' }}>
                    {exp.achievements.map((a, i) => <li key={i} style={{ fontSize: '10px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '4px', height: '20px', backgroundColor: primaryColor, borderRadius: '2px', flexShrink: 0 }} />
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#111827' }}>Education</h2>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
            </div>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px', paddingLeft: '16px', display: 'flex', justifyContent: 'space-between' }}>
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

        {/* Skills + Languages row */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
          {skills.length > 0 && (
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <div style={{ width: '4px', height: '20px', backgroundColor: primaryColor, borderRadius: '2px', flexShrink: 0 }} />
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#111827' }}>Skills</h2>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingLeft: '16px' }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ fontSize: '10px', padding: '3px 10px', backgroundColor: '#f3f4f6', borderRadius: '12px', color: '#374151', fontWeight: '500' }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ width: '35%', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <div style={{ width: '4px', height: '20px', backgroundColor: primaryColor, borderRadius: '2px', flexShrink: 0 }} />
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#111827' }}>Languages</h2>
              </div>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', paddingLeft: '16px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '500', color: '#374151' }}>{lang.name}</span>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {projects.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '4px', height: '20px', backgroundColor: primaryColor, borderRadius: '2px', flexShrink: 0 }} />
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#111827' }}>Projects</h2>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
            </div>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '8px', paddingLeft: '16px' }}>
                <h3 style={{ fontSize: '11px', fontWeight: '600', color: '#1a1a1a' }}>{proj.name}</h3>
                {proj.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.5' }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '4px', height: '20px', backgroundColor: primaryColor, borderRadius: '2px', flexShrink: 0 }} />
              <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#111827' }}>Certifications</h2>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
            </div>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '5px', paddingLeft: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#1a1a1a' }}>{cert.name}</span>
                  <span style={{ fontSize: '10px', color: '#6b7280' }}> · {cert.issuer}</span>
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
