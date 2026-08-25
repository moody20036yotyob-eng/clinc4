import type { CVData } from '@shared/types/cv';

export function CVLegalPro({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const certifications = data.certifications || [];

  const ruleLine = { borderTop: '1px solid #111', margin: '12px 0' };

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Georgia, "Times New Roman", serif', background: '#fff', padding: '48px 48px 36px' }}>
      {/* Centered name */}
      <div style={{ textAlign: 'center', marginBottom: '4px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '0.05em', textDecoration: 'underline', display: 'inline-block', textUnderlineOffset: '4px', margin: 0, textTransform: 'uppercase' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
      </div>

      {personalInfo.jobTitle && (
        <p style={{ textAlign: 'center', fontSize: '11px', color: '#374151', fontStyle: 'italic', marginBottom: '8px' }}>{personalInfo.jobTitle}</p>
      )}

      {/* Centered contact */}
      <div style={{ textAlign: 'center', fontSize: '10px', color: '#374151', marginBottom: '4px' }}>
        {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(' · ')}
      </div>
      {(personalInfo.linkedin || personalInfo.website) && (
        <div style={{ textAlign: 'center', fontSize: '10px', color: '#374151', marginBottom: '12px' }}>
          {[personalInfo.linkedin, personalInfo.website].filter(Boolean).join(' · ')}
        </div>
      )}

      <div style={ruleLine} />
      <div style={{ borderTop: '3px solid #111', margin: '-13px 0 16px' }} />

      {personalInfo.summary && (
        <>
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#111', display: 'inline-block', margin: 0 }}>Professional Summary</h2>
          </div>
          <div style={ruleLine} />
          <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.7', marginBottom: '16px', textAlign: 'justify' }}>{personalInfo.summary}</p>
          <div style={ruleLine} />
        </>
      )}

      {certifications.length > 0 && (
        <>
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#111', display: 'inline-block', margin: 0 }}>Bar Admission & Certifications</h2>
          </div>
          <div style={ruleLine} />
          {certifications.map((cert) => (
            <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#111' }}>{cert.name}</span>
              <span style={{ fontSize: '10px', color: '#374151' }}>{cert.issuer} · {cert.date}</span>
            </div>
          ))}
          <div style={ruleLine} />
        </>
      )}

      {experience.length > 0 && (
        <>
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#111', display: 'inline-block', margin: 0 }}>Professional Experience</h2>
          </div>
          <div style={ruleLine} />
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111' }}>{exp.position}</h3>
                <span style={{ fontSize: '10px', color: '#374151', fontStyle: 'italic' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ fontSize: '11px', color: '#374151', fontStyle: 'italic', marginBottom: '3px' }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
              {exp.description && <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.6', textAlign: 'justify' }}>{exp.description}</p>}
              {(exp.achievements || []).length > 0 && (
                <ul style={{ marginTop: '4px', paddingLeft: '18px' }}>
                  {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '10px', color: '#374151', marginBottom: '2px' }}>{a}</li>)}
                </ul>
              )}
            </div>
          ))}
          <div style={ruleLine} />
        </>
      )}

      {education.length > 0 && (
        <>
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#111', display: 'inline-block', margin: 0 }}>Education</h2>
          </div>
          <div style={ruleLine} />
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                <span style={{ fontSize: '10px', color: '#374151', fontStyle: 'italic' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
              </div>
              <p style={{ fontSize: '11px', color: '#374151', fontStyle: 'italic' }}>{edu.institution}</p>
              {edu.gpa && <p style={{ fontSize: '10px', color: '#374151' }}>GPA: {edu.gpa}</p>}
            </div>
          ))}
          <div style={ruleLine} />
        </>
      )}

      {skills.length > 0 && (
        <>
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#111', display: 'inline-block', margin: 0 }}>Areas of Practice</h2>
          </div>
          <div style={ruleLine} />
          <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.8', textAlign: 'center' }}>
            {skills.map(s => s.name).join(' · ')}
          </p>
        </>
      )}
    </div>
  );
}
