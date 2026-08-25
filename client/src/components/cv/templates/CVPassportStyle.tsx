import type { CVData } from '@shared/types/cv';

export function CVPassportStyle({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  const Field = ({ label, value }: { label: string; value?: string }) => value ? (
    <div style={{ marginBottom: '10px' }}>
      <p style={{ fontSize: '7px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', margin: '0 0 2px', fontFamily: 'Inter, sans-serif' }}>{label}</p>
      <p style={{ fontSize: '11px', color: '#111827', margin: 0, fontFamily: 'Inter, sans-serif', fontWeight: '500', borderBottom: '1px solid #e5e7eb', paddingBottom: '6px' }}>{value}</p>
    </div>
  ) : null;

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Georgia, serif', background: '#fff', border: '2px solid #d1d5db', margin: '0' }}>
      {/* Passport header strip */}
      <div style={{ backgroundColor: primary, padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Professional Curriculum Vitae</span>
        <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif' }}>● ● ●</span>
      </div>

      {/* Main identity section */}
      <div style={{ padding: '20px 24px 16px', borderBottom: `3px solid ${primary}`, display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#111827', margin: '0 0 4px', letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>{personalInfo.fullName || 'YOUR NAME'}</h1>
          <div style={{ height: '3px', backgroundColor: primary, width: '100%', marginBottom: '14px' }} />
          {personalInfo.jobTitle && (
            <div style={{ marginBottom: '14px' }}>
              <p style={{ fontSize: '7px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', margin: '0 0 2px', fontFamily: 'Inter, sans-serif' }}>Profession</p>
              <p style={{ fontSize: '13px', color: primary, margin: 0, fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>{personalInfo.jobTitle}</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ flex: 1 }}>
              <Field label="Email" value={personalInfo.email} />
              <Field label="Phone" value={personalInfo.phone} />
            </div>
            <div style={{ flex: 1 }}>
              <Field label="Location" value={personalInfo.location} />
              <Field label="Website" value={personalInfo.website} />
            </div>
          </div>
        </div>
        {/* Photo in rectangular box */}
        <div style={{ flexShrink: 0, width: '90px' }}>
          {personalInfo.photo ? (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '90px', height: '110px', objectFit: 'cover', border: `2px solid ${primary}`, display: 'block' }} />
          ) : (
            <div style={{ width: '90px', height: '110px', border: `2px dashed ${primary}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '8px', color: '#9ca3af', fontFamily: 'Inter, sans-serif', textAlign: 'center' }}>PHOTO</span>
            </div>
          )}
          <div style={{ backgroundColor: `${primary}15`, padding: '4px', marginTop: '4px', textAlign: 'center' }}>
            <p style={{ fontSize: '7px', color: primary, margin: 0, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em', fontWeight: '700' }}>ID</p>
          </div>
        </div>
      </div>

      {/* MRZ-style decorative strip */}
      <div style={{ backgroundColor: '#f9fafb', padding: '5px 24px', borderBottom: '1px solid #e5e7eb', fontFamily: 'Courier New, monospace', fontSize: '8px', color: '#9ca3af', letterSpacing: '0.05em', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        {`CV<<${(personalInfo.fullName || 'SURNAME<<GIVEN').toUpperCase().replace(' ', '<<').replace(/ /g, '<')}<<<<<<<<<<<<<<<<<<<<<<<<<<<<`}
      </div>

      {/* Body content */}
      <div style={{ padding: '16px 24px 20px', display: 'flex', gap: '20px' }}>
        {/* Left */}
        <div style={{ flex: 1 }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: primary, marginBottom: '8px', fontFamily: 'Inter, sans-serif', borderBottom: `1px solid ${primary}`, paddingBottom: '3px' }}>Profile</h2>
              <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0, fontFamily: 'Inter, sans-serif' }}>{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: primary, marginBottom: '10px', fontFamily: 'Inter, sans-serif', borderBottom: `1px solid ${primary}`, paddingBottom: '3px' }}>Work History</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0, fontFamily: 'Inter, sans-serif' }}>{exp.position}</h3>
                    <span style={{ fontSize: '8px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '2px 0 4px', fontFamily: 'Inter, sans-serif' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '9px', color: '#4b5563', lineHeight: '1.55', margin: 0, fontFamily: 'Inter, sans-serif' }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: '14px', fontFamily: 'Inter, sans-serif' }}>
                      {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '8px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: primary, marginBottom: '10px', fontFamily: 'Inter, sans-serif', borderBottom: `1px solid ${primary}`, paddingBottom: '3px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: 0 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <span style={{ fontSize: '8px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                  <p style={{ fontSize: '9px', color: primary, margin: '2px 0 0' }}>{edu.institution}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ flex: '0 0 140px' }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: primary, marginBottom: '8px', fontFamily: 'Inter, sans-serif', borderBottom: `1px solid ${primary}`, paddingBottom: '3px' }}>Skills</h2>
              {skills.map((skill) => (
                <p key={skill.id} style={{ fontSize: '9px', color: '#374151', margin: '3px 0', fontFamily: 'Inter, sans-serif' }}>▸ {skill.name}</p>
              ))}
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: primary, marginBottom: '8px', fontFamily: 'Inter, sans-serif', borderBottom: `1px solid ${primary}`, paddingBottom: '3px' }}>Languages</h2>
              {languages.map((lang) => (
                <div key={lang.id} style={{ marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                  <p style={{ fontSize: '10px', fontWeight: '600', color: '#111827', margin: 0 }}>{lang.name}</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0 }}>{lang.level.replace(/_/g, ' ')}</p>
                </div>
              ))}
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.18em', color: primary, marginBottom: '8px', fontFamily: 'Inter, sans-serif', borderBottom: `1px solid ${primary}`, paddingBottom: '3px' }}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '7px', fontFamily: 'Inter, sans-serif' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                  <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0 }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom border strip */}
      <div style={{ backgroundColor: primary, height: '5px' }} />
    </div>
  );
}
