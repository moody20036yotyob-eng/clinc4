import type { CVData } from '@shared/types/cv';

export function CVDotAccents({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#0d9488';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const awards = data.awards || [];

  // Generate dot pattern as inline SVG data URI
  const dotGrid = (color: string, opacity: number) => {
    const dots = [];
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 6; c++) {
        dots.push(`<circle cx="${c * 10 + 5}" cy="${r * 10 + 5}" r="1.5" fill="${color}" opacity="${opacity}"/>`);
      }
    }
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60">${dots.join('')}</svg>`;
  };

  const sectionNumbers = ['①', '②', '③', '④', '⑤', '⑥', '⑦'];
  let sectionIndex = 0;

  const SectionTitle = ({ title }: { title: string }) => {
    const num = sectionNumbers[sectionIndex++] || '◆';
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <span style={{ fontSize: '18px', color: primary, fontWeight: '300', lineHeight: '1', flexShrink: 0 }}>{num}</span>
        <h2 style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#111827', margin: 0 }}>{title}</h2>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
      </div>
    );
  };

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff', position: 'relative' }}>
      {/* Dot cluster top-left */}
      <div style={{ position: 'absolute', top: '10px', right: '10px', width: '60px', height: '60px', backgroundImage: `url("${dotGrid(primary, 0.35)}")`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
      {/* Dot cluster bottom-right */}
      <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '60px', height: '60px', backgroundImage: `url("${dotGrid(primary, 0.2)}")`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ padding: '36px 36px 24px', position: 'relative' }}>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Photo" style={{ width: '70px', height: '70px', borderRadius: '4px', objectFit: 'cover', marginBottom: '14px', display: 'block', boxShadow: `0 0 0 3px ${primary}30` }} />
        )}
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#111827', margin: '0 0 4px', letterSpacing: '-0.03em' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p style={{ fontSize: '12px', color: primary, fontWeight: '600', margin: '0 0 16px', letterSpacing: '0.04em' }}>{personalInfo.jobTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {personalInfo.email && <span style={{ fontSize: '9.5px', color: '#4b5563' }}>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '9.5px', color: '#4b5563' }}>☎ {personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ fontSize: '9.5px', color: '#4b5563' }}>⌖ {personalInfo.location}</span>}
          {personalInfo.website && <span style={{ fontSize: '9.5px', color: '#4b5563' }}>⊕ {personalInfo.website}</span>}
        </div>
      </div>

      {/* Body — single column, spacious */}
      <div style={{ padding: '4px 36px 36px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '22px' }}>
            <SectionTitle title="Profile" />
            <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.8', margin: 0 }}>{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <SectionTitle title="Experience" />
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px', paddingLeft: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '2px 0 4px' }}>{exp.company}</p>
                {exp.description && <p style={{ fontSize: '9.5px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
                {(exp.achievements || []).length > 0 && (
                  <ul style={{ margin: '4px 0 0', paddingLeft: '14px' }}>
                    {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '28px' }}>
          <div style={{ flex: 1 }}>
            {education.length > 0 && (
              <div style={{ marginBottom: '22px' }}>
                <SectionTitle title="Education" />
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '10px', paddingLeft: '16px' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <p style={{ fontSize: '9.5px', color: primary, fontWeight: '500', margin: '0 0 1px' }}>{edu.institution}</p>
                    <span style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                ))}
              </div>
            )}

            {projects.length > 0 && (
              <div style={{ marginBottom: '22px' }}>
                <SectionTitle title="Projects" />
                {projects.map((proj) => (
                  <div key={proj.id} style={{ marginBottom: '8px', paddingLeft: '16px' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                    {proj.description && <p style={{ fontSize: '9px', color: '#4b5563', margin: 0 }}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ flex: '0 0 130px' }}>
            {skills.length > 0 && (
              <div style={{ marginBottom: '18px' }}>
                <SectionTitle title="Skills" />
                {skills.map(skill => (
                  <div key={skill.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: primary, flexShrink: 0 }} />
                    <span style={{ fontSize: '9px', color: '#374151' }}>{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
            {languages.length > 0 && (
              <div style={{ marginBottom: '18px' }}>
                <SectionTitle title="Languages" />
                {languages.map(lang => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '9.5px', color: '#374151', fontWeight: '600' }}>{lang.name}</span>
                    <span style={{ fontSize: '8px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            )}
            {certifications.length > 0 && (
              <div style={{ marginBottom: '18px' }}>
                <SectionTitle title="Certifications" />
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
                <SectionTitle title="Awards" />
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
    </div>
  );
}
