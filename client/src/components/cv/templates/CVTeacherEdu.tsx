import type { CVData } from '@shared/types/cv';

export function CVTeacherEdu({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#7c3aed';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  const pastelBg = `${primary}18`;

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Warm header */}
      <div style={{ backgroundColor: pastelBg, padding: '28px 32px', borderBottom: `3px solid ${primary}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${primary}`, flexShrink: 0 }} />
          )}
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1e1b4b', margin: '0 0 4px' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '13px', color: primary, fontWeight: '600', margin: '0 0 10px' }}>{personalInfo.jobTitle}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {personalInfo.email && <span style={{ fontSize: '10px', color: '#4b5563' }}>{personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: '10px', color: '#4b5563' }}>{personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: '10px', color: '#4b5563' }}>{personalInfo.location}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 32px' }}>
        {/* Education first and prominent */}
        {education.length > 0 && (
          <div style={{ marginBottom: '22px', backgroundColor: pastelBg, borderRadius: '10px', padding: '16px 20px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '14px' }}>Academic Background</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#1e1b4b' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '11px', color: primary, fontWeight: '500' }}>{edu.institution}</p>
                  {edu.gpa && <p style={{ fontSize: '10px', color: '#6b7280' }}>GPA: {edu.gpa}</p>}
                </div>
                <p style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {/* Teaching philosophy / summary */}
        {personalInfo.summary && (
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px' }}>Teaching Philosophy</h2>
            <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.75', fontStyle: 'italic', borderLeft: `3px solid ${primary}`, paddingLeft: '12px' }}>{personalInfo.summary}</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Left: Experience */}
          <div style={{ flex: '0 0 55%' }}>
            {experience.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '12px' }}>Teaching Experience</h2>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: '14px', borderBottom: `1px dashed ${primary}40`, paddingBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#1e1b4b' }}>{exp.position}</h3>
                      <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p style={{ fontSize: '11px', color: primary, fontWeight: '500', marginBottom: '3px' }}>{exp.company}</p>
                    {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.55' }}>{exp.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Skills + Languages + Certs */}
          <div style={{ flex: 1 }}>
            {skills.length > 0 && (
              <div style={{ marginBottom: '18px' }}>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px' }}>Subjects & Skills</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {skills.map((skill) => (
                    <span key={skill.id} style={{ fontSize: '9px', backgroundColor: pastelBg, color: primary, border: `1px solid ${primary}40`, padding: '3px 8px', borderRadius: '12px', fontWeight: '500' }}>{skill.name}</span>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div style={{ marginBottom: '18px' }}>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px' }}>Certifications</h2>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ marginBottom: '6px' }}>
                    <p style={{ fontSize: '10px', fontWeight: '600', color: '#1e1b4b' }}>{cert.name}</p>
                    <p style={{ fontSize: '9px', color: '#6b7280' }}>{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px' }}>Languages</h2>
                {languages.map((lang) => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10px', color: '#374151' }}>{lang.name}</span>
                    <span style={{ fontSize: '9px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
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
