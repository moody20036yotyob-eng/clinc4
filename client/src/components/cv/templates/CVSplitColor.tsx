import type { CVData } from '@shared/types/cv';

export function CVSplitColor({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', display: 'flex', background: '#fff' }}>
      {/* Left half — colored */}
      <div style={{ width: '50%', backgroundColor: primary, color: '#fff', padding: '40px 28px', display: 'flex', flexDirection: 'column', minHeight: '297mm' }}>
        {personalInfo.photo && (
          <div style={{ marginBottom: '20px' }}>
            <img src={personalInfo.photo} alt="Photo" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)' }} />
          </div>
        )}
        <h1 style={{ fontSize: '22px', fontWeight: '800', lineHeight: '1.2', marginBottom: '4px', color: '#fff' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', fontWeight: '500', marginBottom: '28px', letterSpacing: '0.04em' }}>
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contact */}
        <div style={{ marginBottom: '28px' }}>
          <p style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>Contact</p>
          {personalInfo.email && <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)', marginBottom: '5px', wordBreak: 'break-all' }}>{personalInfo.email}</p>}
          {personalInfo.phone && <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)', marginBottom: '5px' }}>{personalInfo.phone}</p>}
          {personalInfo.location && <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)', marginBottom: '5px' }}>{personalInfo.location}</p>}
          {personalInfo.website && <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)', marginBottom: '5px', wordBreak: 'break-all' }}>{personalInfo.website}</p>}
          {personalInfo.linkedin && <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)', marginBottom: '5px', wordBreak: 'break-all' }}>{personalInfo.linkedin}</p>}
          {personalInfo.github && <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)', marginBottom: '5px', wordBreak: 'break-all' }}>{personalInfo.github}</p>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>Skills</p>
            {skills.map((skill) => (
              <div key={skill.id} style={{ marginBottom: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontSize: '10px', color: '#fff' }}>{skill.name}</span>
                </div>
                <div style={{ height: '3px', backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: '2px' }}>
                  <div style={{ height: '100%', backgroundColor: '#fff', borderRadius: '2px', width: skill.level === 'expert' ? '95%' : skill.level === 'advanced' ? '75%' : skill.level === 'intermediate' ? '50%' : '25%' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <p style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>Languages</p>
            {languages.map((lang) => (
              <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '10px', color: '#fff' }}>{lang.name}</span>
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)' }}>{lang.level.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right half — white */}
      <div style={{ width: '50%', background: '#fff', padding: '40px 28px', minHeight: '297mm' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', marginBottom: '8px' }}>Profile</p>
            <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.7' }}>{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', marginBottom: '12px' }}>Experience</p>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '16px', paddingLeft: '12px', borderLeft: `3px solid ${primary}` }}>
                <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827', marginBottom: '1px' }}>{exp.position}</h3>
                <p style={{ fontSize: '11px', color: primary, marginBottom: '2px' }}>{exp.company}</p>
                <p style={{ fontSize: '9px', color: '#9ca3af', marginBottom: '4px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.5' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div>
            <p style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', marginBottom: '12px' }}>Education</p>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px', paddingLeft: '12px', borderLeft: `3px solid ${primary}` }}>
                <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                <p style={{ fontSize: '11px', color: primary }}>{edu.institution}</p>
                <p style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
