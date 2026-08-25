import type { CVData } from '@shared/types/cv';

export function CVEditorial({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Georgia, "Times New Roman", serif', background: '#fff', padding: '40px 36px' }}>
      {/* Masthead */}
      <div style={{ borderBottom: '1px solid #000', paddingBottom: '16px', marginBottom: '8px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '300', letterSpacing: '-0.02em', lineHeight: '1', color: '#111', margin: 0 }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', paddingBottom: '8px', borderBottom: '1px solid #e5e7eb' }}>
        <p style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic' }}>{personalInfo.jobTitle}</p>
        <div style={{ display: 'flex', gap: '16px', fontSize: '9px', color: '#9ca3af' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: '28px' }}>
          <p style={{ fontSize: '12px', color: '#374151', lineHeight: '1.8', fontStyle: 'italic' }}>{personalInfo.summary}</p>
        </div>
      )}

      <div style={{ borderTop: '1px solid #000', marginBottom: '24px' }} />

      {/* Three columns */}
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Skills column */}
        <div style={{ width: '30%', flexShrink: 0 }}>
          <p style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: primary, marginBottom: '12px' }}>Skills</p>
          {skills.map((skill) => (
            <div key={skill.id} style={{ marginBottom: '6px', borderBottom: '1px solid #f3f4f6', paddingBottom: '5px' }}>
              <span style={{ fontSize: '10px', color: '#374151' }}>{skill.name}</span>
              {skill.category && <span style={{ fontSize: '9px', color: '#9ca3af', display: 'block' }}>{skill.category}</span>}
            </div>
          ))}
        </div>

        {/* Thin rule */}
        <div style={{ width: '1px', backgroundColor: '#e5e7eb', flexShrink: 0 }} />

        {/* Experience column */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: primary, marginBottom: '12px' }}>Experience</p>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111' }}>{exp.position}</h3>
                <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ fontSize: '10px', color: '#6b7280', fontStyle: 'italic', marginBottom: '4px' }}>{exp.company}</p>
              {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.5' }}>{exp.description}</p>}
            </div>
          ))}
        </div>

        <div style={{ width: '1px', backgroundColor: '#e5e7eb', flexShrink: 0 }} />

        {/* Education column */}
        <div style={{ width: '28%', flexShrink: 0 }}>
          <p style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: primary, marginBottom: '12px' }}>Education</p>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid #f3f4f6' }}>
              <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111' }}>{edu.degree}</h3>
              {edu.field && <p style={{ fontSize: '10px', color: '#6b7280', fontStyle: 'italic' }}>{edu.field}</p>}
              <p style={{ fontSize: '10px', color: '#374151' }}>{edu.institution}</p>
              <p style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
