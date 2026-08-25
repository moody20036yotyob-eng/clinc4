import type { CVData } from '@shared/types/cv';

export function CVGeometric({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const certifications = data.certifications || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff', overflow: 'hidden' }}>
      {/* Header with geometric shape */}
      <div style={{ position: 'relative', height: '160px', background: '#f8fafc', overflow: 'hidden', marginBottom: '32px' }}>
        {/* Large circle */}
        <div style={{
          position: 'absolute',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          backgroundColor: primary,
          top: '-80px',
          right: '-60px',
          opacity: 0.9,
        }} />
        {/* Small accent circle */}
        <div style={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: primary,
          opacity: 0.3,
          top: '10px',
          right: '180px',
        }} />
        {/* Name overlay */}
        <div style={{ position: 'absolute', top: '30px', left: '32px', zIndex: 2 }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff', marginBottom: '8px' }} />
          )}
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#111827', letterSpacing: '-0.02em', margin: 0 }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '12px', color: primary, fontWeight: '600', marginTop: '4px' }}>{personalInfo.jobTitle}</p>
        </div>
        {/* Contact on right */}
        <div style={{ position: 'absolute', bottom: '16px', right: '32px', textAlign: 'right', zIndex: 2 }}>
          {personalInfo.email && <p style={{ fontSize: '9px', color: '#fff', marginBottom: '2px' }}>{personalInfo.email}</p>}
          {personalInfo.phone && <p style={{ fontSize: '9px', color: '#fff', marginBottom: '2px' }}>{personalInfo.phone}</p>}
          {personalInfo.location && <p style={{ fontSize: '9px', color: '#fff' }}>{personalInfo.location}</p>}
        </div>
      </div>

      <div style={{ padding: '0 32px 32px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '11px', color: '#4b5563', lineHeight: '1.7', borderLeft: `4px solid ${primary}`, paddingLeft: '12px' }}>{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: primary, transform: 'rotate(45deg)', flexShrink: 0 }} />
              <h2 style={{ fontSize: '13px', fontWeight: '800', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Experience</h2>
            </div>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px', paddingLeft: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{exp.position}</h3>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: '11px', color: primary, fontWeight: '500', marginBottom: '3px' }}>{exp.company}</p>
                {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.5' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '24px' }}>
          {education.length > 0 && (
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: primary, transform: 'rotate(45deg)', flexShrink: 0 }} />
                <h2 style={{ fontSize: '13px', fontWeight: '800', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Education</h2>
              </div>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '12px', paddingLeft: '30px' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '10px', color: primary }}>{edu.institution}</p>
                  <p style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: primary, transform: 'rotate(45deg)', flexShrink: 0 }} />
                <h2 style={{ fontSize: '13px', fontWeight: '800', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Skills</h2>
              </div>
              <div style={{ paddingLeft: '30px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ fontSize: '10px', backgroundColor: `${primary}15`, color: primary, padding: '3px 8px', borderRadius: '4px', fontWeight: '500' }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {certifications.length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: primary, transform: 'rotate(45deg)', flexShrink: 0 }} />
              <h2 style={{ fontSize: '13px', fontWeight: '800', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Certifications</h2>
            </div>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ paddingLeft: '30px', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: '#111827', fontWeight: '600' }}>{cert.name} <span style={{ color: '#6b7280', fontWeight: '400' }}>· {cert.issuer}</span></span>
                <span style={{ fontSize: '9px', color: '#9ca3af' }}>{cert.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
