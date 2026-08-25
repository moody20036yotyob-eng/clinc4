import type { CVData } from '@shared/types/cv';

export function CVIconRich({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#0369a1';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  const SectionTitle = ({ icon, title }: { icon: string; title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', paddingBottom: '5px', borderBottom: `2px solid ${primary}` }}>
      <span style={{ fontSize: '14px', color: primary }}>{icon}</span>
      <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, margin: 0 }}>{title}</h2>
    </div>
  );

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Header */}
      <div style={{ padding: '28px 28px 20px', backgroundColor: '#f0f9ff', borderBottom: `3px solid ${primary}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px' }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${primary}`, flexShrink: 0 }} />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#111827', margin: '0 0 3px', letterSpacing: '-0.02em' }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.jobTitle && <p style={{ fontSize: '12px', color: primary, fontWeight: '600', margin: '0 0 12px' }}>{personalInfo.jobTitle}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {personalInfo.email && <span style={{ fontSize: '9.5px', color: '#374151', display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ color: primary }}>✉</span> {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: '9.5px', color: '#374151', display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ color: primary }}>☎</span> {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: '9.5px', color: '#374151', display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ color: primary }}>📍</span> {personalInfo.location}</span>}
              {personalInfo.website && <span style={{ fontSize: '9.5px', color: '#374151', display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ color: primary }}>⊕</span> {personalInfo.website}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 28px 28px', display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '18px' }}>
              <SectionTitle icon="★" title="Profile" />
              <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <SectionTitle icon="◆" title="Experience" />
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '2px 0 4px' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '9.5px', color: '#4b5563', lineHeight: '1.6', margin: '0 0 4px' }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <div>
                      {(exp.achievements || []).map((a, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '2px' }}>
                          <span style={{ fontSize: '9px', color: primary, flexShrink: 0, marginTop: '1px' }}>→</span>
                          <span style={{ fontSize: '9px', color: '#4b5563' }}>{a}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <SectionTitle icon="●" title="Education" />
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '9px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: 0 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                  <p style={{ fontSize: '9.5px', color: primary, fontWeight: '500', margin: '1px 0 0' }}>{edu.institution}</p>
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <SectionTitle icon="▶" title="Projects" />
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                  {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ flex: '0 0 145px' }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <SectionTitle icon="✓" title="Skills" />
              {skills.map(skill => (
                <div key={skill.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '10px', color: primary }}>✓</span>
                  <span style={{ fontSize: '9px', color: '#374151' }}>{skill.name}</span>
                </div>
              ))}
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <SectionTitle icon="◆" title="Languages" />
              {languages.map(lang => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '9.5px', color: '#374151', fontWeight: '600' }}>{lang.name}</span>
                  <span style={{ fontSize: '8px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}
          {certifications.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <SectionTitle icon="★" title="Certifications" />
              {certifications.map(cert => (
                <div key={cert.id} style={{ marginBottom: '6px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                  <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}
          {awards.length > 0 && (
            <div>
              <SectionTitle icon="▶" title="Awards" />
              {awards.map(award => (
                <div key={award.id} style={{ marginBottom: '6px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{award.title}</p>
                  <p style={{ fontSize: '8px', color: '#6b7280', margin: 0 }}>{award.issuer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
