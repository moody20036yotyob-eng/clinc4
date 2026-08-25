import type { CVData } from '@shared/types/cv';

export function CVIconSidebar({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];

  const ProgressBar = ({ level }: { level: number | string }) => {
    const pct = typeof level === 'number' ? (level / 5) * 100 : 70;
    return (
      <div style={{ height: '4px', backgroundColor: '#e5e7eb', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, backgroundColor: primary, borderRadius: '2px' }} />
      </div>
    );
  };

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff', display: 'flex' }}>
      {/* Narrow icon sidebar */}
      <div style={{ width: '160px', backgroundColor: '#1f2937', padding: '24px 14px', flexShrink: 0 }}>
        {/* Photo */}
        {personalInfo.photo && (
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <img src={personalInfo.photo} alt="Photo" style={{ width: '68px', height: '68px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${primary}` }} />
          </div>
        )}

        {/* Name (short) */}
        <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: `1px solid rgba(255,255,255,0.15)`, paddingBottom: '14px' }}>
          <h1 style={{ fontSize: '13px', fontWeight: '800', color: '#fff', margin: '0 0 3px' }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.jobTitle && <p style={{ fontSize: '8px', color: primary, fontWeight: '600', margin: 0 }}>{personalInfo.jobTitle}</p>}
        </div>

        {/* Contact with icons */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '7px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', marginBottom: '10px' }}>Contact</h2>
          {personalInfo.email && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '11px', color: primary, flexShrink: 0 }}>✉</span>
              <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.4', wordBreak: 'break-all' }}>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: primary, flexShrink: 0 }}>☎</span>
              <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.8)' }}>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: primary, flexShrink: 0 }}>📍</span>
              <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.8)' }}>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '4px', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: primary, flexShrink: 0 }}>🔗</span>
              <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.8)', wordBreak: 'break-all' }}>{personalInfo.website}</span>
            </div>
          )}
        </div>

        {/* Skills as progress bars */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '7px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', marginBottom: '10px' }}>Skills</h2>
            {skills.slice(0, 10).map((skill) => (
              <div key={skill.id} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.85)', fontWeight: '500' }}>{skill.name}</span>
                </div>
                <ProgressBar level={skill.level || 3} />
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '7px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', marginBottom: '10px' }}>Languages</h2>
            {languages.map((lang) => (
              <div key={lang.id} style={{ marginBottom: '7px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.85)', fontWeight: '500' }}>{lang.name}</span>
                  <span style={{ fontSize: '7px', color: primary }}>{lang.level.replace(/_/g, ' ').slice(0, 6)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 style={{ fontSize: '7px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', marginBottom: '10px' }}>Certs</h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '7px' }}>
                <p style={{ fontSize: '8px', fontWeight: '700', color: 'rgba(255,255,255,0.9)', margin: '0 0 1px' }}>{cert.name}</p>
                <p style={{ fontSize: '7px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>{cert.issuer}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Wide right content */}
      <div style={{ flex: 1, padding: '28px 24px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${primary}25` }}>Profile</h2>
            <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${primary}25` }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '2px 0 4px' }}>{exp.company}</p>
                {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
                {(exp.achievements || []).length > 0 && (
                  <ul style={{ margin: '4px 0 0', paddingLeft: '16px' }}>
                    {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${primary}25` }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</span>
                </div>
                <p style={{ fontSize: '10px', color: primary, fontWeight: '500', margin: '2px 0 0' }}>{edu.institution}</p>
                {edu.gpa && <p style={{ fontSize: '9px', color: '#6b7280', margin: '2px 0 0' }}>GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${primary}25` }}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '8px' }}>
                <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: '0 0 2px' }}>{proj.name}</h3>
                {proj.description && <p style={{ fontSize: '10px', color: '#4b5563', margin: 0, lineHeight: '1.5' }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
