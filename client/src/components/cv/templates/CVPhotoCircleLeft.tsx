import type { CVData } from '@shared/types/cv';

export function CVPhotoCircleLeft({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Header with large photo */}
      <div style={{ position: 'relative', padding: '28px 32px 28px 36px', background: '#f8fafc', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '24px', overflow: 'hidden' }}>
        {/* Arc behind photo */}
        <div style={{ position: 'absolute', left: '-20px', top: '-20px', width: '180px', height: '180px', borderRadius: '50%', backgroundColor: `${primary}20`, flexShrink: 0 }} />
        <div style={{ position: 'absolute', left: '-5px', top: '-5px', width: '150px', height: '150px', borderRadius: '50%', backgroundColor: `${primary}30`, flexShrink: 0 }} />

        {/* Photo */}
        <div style={{ position: 'relative', flexShrink: 0, zIndex: 1 }}>
          {personalInfo.photo ? (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: `4px solid ${primary}`, display: 'block' }} />
          ) : (
            <div style={{ width: '110px', height: '110px', borderRadius: '50%', backgroundColor: primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '36px', color: '#fff', fontWeight: '800' }}>{(personalInfo.fullName || 'U')[0]}</span>
            </div>
          )}
        </div>

        {/* Name and contact */}
        <div style={{ zIndex: 1, flex: 1 }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#111827', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.jobTitle && <p style={{ fontSize: '13px', color: primary, fontWeight: '600', margin: '0 0 12px' }}>{personalInfo.jobTitle}</p>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {personalInfo.email && <span style={{ fontSize: '10px', color: '#6b7280' }}>{personalInfo.email}</span>}
            {personalInfo.phone && <span style={{ fontSize: '10px', color: '#6b7280' }}>{personalInfo.phone}</span>}
            {personalInfo.location && <span style={{ fontSize: '10px', color: '#6b7280' }}>{personalInfo.location}</span>}
          </div>
        </div>

        {/* Social links far right */}
        <div style={{ zIndex: 1, flexShrink: 0, textAlign: 'right' }}>
          {personalInfo.website && <p style={{ fontSize: '9px', color: primary, marginBottom: '3px' }}>{personalInfo.website}</p>}
          {personalInfo.linkedin && <p style={{ fontSize: '9px', color: primary, marginBottom: '3px' }}>{personalInfo.linkedin}</p>}
          {personalInfo.github && <p style={{ fontSize: '9px', color: primary }}>{personalInfo.github}</p>}
        </div>
      </div>

      {/* Two-column content */}
      <div style={{ display: 'flex', gap: '0' }}>
        {/* Left sidebar */}
        <div style={{ width: '38%', padding: '24px 20px', borderRight: '1px solid #e5e7eb' }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'inline-block', width: '16px', height: '2px', backgroundColor: primary }} />
                Profile
              </h2>
              <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.65' }}>{personalInfo.summary}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'inline-block', width: '16px', height: '2px', backgroundColor: primary }} />
                Skills
              </h2>
              {skills.map((skill) => (
                <div key={skill.id} style={{ marginBottom: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ fontSize: '10px', color: '#374151' }}>{skill.name}</span>
                  </div>
                  <div style={{ height: '3px', backgroundColor: '#e5e7eb', borderRadius: '2px' }}>
                    <div style={{ height: '100%', backgroundColor: primary, borderRadius: '2px', width: skill.level === 'expert' ? '95%' : skill.level === 'advanced' ? '75%' : skill.level === 'intermediate' ? '50%' : '25%' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'inline-block', width: '16px', height: '2px', backgroundColor: primary }} />
                Languages
              </h2>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '10px', color: '#374151', fontWeight: '500' }}>{lang.name}</span>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'inline-block', width: '16px', height: '2px', backgroundColor: primary }} />
                Certifications
              </h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '8px' }}>
                  <p style={{ fontSize: '10px', fontWeight: '600', color: '#111827' }}>{cert.name}</p>
                  <p style={{ fontSize: '9px', color: '#6b7280' }}>{cert.issuer} · {cert.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right content */}
        <div style={{ flex: 1, padding: '24px 24px' }}>
          {experience.length > 0 && (
            <div style={{ marginBottom: '22px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'inline-block', width: '16px', height: '2px', backgroundColor: primary }} />
                Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{exp.position}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: primary, fontWeight: '500', marginBottom: '3px' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.5' }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <ul style={{ marginTop: '4px', paddingLeft: '14px' }}>
                      {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: primary, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'inline-block', width: '16px', height: '2px', backgroundColor: primary }} />
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: primary }}>{edu.institution}</p>
                  {edu.gpa && <p style={{ fontSize: '9px', color: '#6b7280' }}>GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
