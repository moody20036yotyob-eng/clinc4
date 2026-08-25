import type { CVData } from '@shared/types/cv';

export function CVModernPhotoHeader({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  const sectionHeader = (icon: string, label: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', marginTop: '18px' }}>
      <span style={{ fontSize: '14px' }}>{icon}</span>
      <span style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: primary }}>{label}</span>
      <div style={{ flex: 1, height: '1px', backgroundColor: `${primary}30` }} />
    </div>
  );

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Full-width gradient header */}
      <div style={{ background: `linear-gradient(135deg, ${primary}18 0%, ${primary}08 100%)`, padding: '28px 32px', display: 'flex', alignItems: 'center', gap: '20px', borderBottom: `3px solid ${primary}20` }}>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Photo" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `3px solid ${primary}`, boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#111827', margin: '0 0 3px', letterSpacing: '-0.02em' }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.jobTitle && <p style={{ fontSize: '13px', color: primary, fontWeight: '600', margin: '0 0 12px' }}>{personalInfo.jobTitle}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {personalInfo.email && (
              <span style={{ fontSize: '9px', color: '#374151', backgroundColor: '#fff', padding: '3px 10px', borderRadius: '20px', border: `1px solid ${primary}40`, fontWeight: '500' }}>✉ {personalInfo.email}</span>
            )}
            {personalInfo.phone && (
              <span style={{ fontSize: '9px', color: '#374151', backgroundColor: '#fff', padding: '3px 10px', borderRadius: '20px', border: `1px solid ${primary}40`, fontWeight: '500' }}>☎ {personalInfo.phone}</span>
            )}
            {personalInfo.location && (
              <span style={{ fontSize: '9px', color: '#374151', backgroundColor: '#fff', padding: '3px 10px', borderRadius: '20px', border: `1px solid ${primary}40`, fontWeight: '500' }}>⌖ {personalInfo.location}</span>
            )}
            {personalInfo.website && (
              <span style={{ fontSize: '9px', color: '#374151', backgroundColor: '#fff', padding: '3px 10px', borderRadius: '20px', border: `1px solid ${primary}40`, fontWeight: '500' }}>⊕ {personalInfo.website}</span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '8px 32px 28px' }}>
        {personalInfo.summary && (
          <>
            {sectionHeader('◈', 'Profile')}
            <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
          </>
        )}

        {experience.length > 0 && (
          <>
            {sectionHeader('◉', 'Experience')}
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '2px 0 4px' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.6', margin: '0 0 4px' }}>{exp.description}</p>}
                {(exp.achievements || []).length > 0 && (
                  <ul style={{ margin: '4px 0 0', paddingLeft: '16px' }}>
                    {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px', lineHeight: '1.5' }}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            {sectionHeader('◎', 'Education')}
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '10px', color: primary, fontWeight: '500', margin: 0 }}>{edu.institution}</p>
                  {edu.gpa && <p style={{ fontSize: '9px', color: '#6b7280', margin: '2px 0 0' }}>GPA: {edu.gpa}</p>}
                </div>
                <span style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '12px' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
              </div>
            ))}
          </>
        )}

        <div style={{ display: 'flex', gap: '24px' }}>
          {skills.length > 0 && (
            <div style={{ flex: 1 }}>
              {sectionHeader('◆', 'Skills')}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {skills.map((skill) => (
                  <span key={skill.id} style={{ fontSize: '9px', backgroundColor: `${primary}12`, color: primary, padding: '3px 8px', borderRadius: '4px', fontWeight: '500' }}>{skill.name}</span>
                ))}
              </div>
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ flex: '0 0 140px' }}>
              {sectionHeader('◇', 'Languages')}
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '10px', color: '#374151', fontWeight: '500' }}>{lang.name}</span>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {certifications.length > 0 && (
          <>
            {sectionHeader('◐', 'Certifications')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ fontSize: '9px', backgroundColor: '#f9fafb', border: `1px solid ${primary}25`, borderRadius: '6px', padding: '5px 10px' }}>
                  <span style={{ fontWeight: '700', color: '#111827' }}>{cert.name}</span>
                  <span style={{ color: '#9ca3af' }}> · {cert.issuer}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {projects.length > 0 && (
          <>
            {sectionHeader('◑', 'Projects')}
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '8px' }}>
                <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                {proj.description && <p style={{ fontSize: '10px', color: '#4b5563', margin: 0, lineHeight: '1.5' }}>{proj.description}</p>}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
