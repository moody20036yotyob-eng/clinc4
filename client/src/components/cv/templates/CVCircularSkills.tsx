import type { CVData } from '@shared/types/cv';

export function CVCircularSkills({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  const levelToPercent: Record<string, number> = {
    native: 100, fluent: 90, advanced: 80, professional: 75,
    intermediate: 60, elementary: 40, beginner: 25, conversational: 65,
  };

  const CircleRing = ({ percent, size = 44 }: { percent: number; size?: number }) => {
    const r = (size - 6) / 2;
    const circ = 2 * Math.PI * r;
    const dash = (percent / 100) * circ;
    return (
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={primary} strokeWidth="4"
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" />
      </svg>
    );
  };

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff' }}>
      {/* Header */}
      <div style={{ backgroundColor: primary, padding: '24px 28px', display: 'flex', alignItems: 'center', gap: '18px' }}>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Photo" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.8)', flexShrink: 0 }} />
        )}
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', margin: '0 0 4px', letterSpacing: '-0.02em' }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.jobTitle && <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', margin: '0 0 8px' }}>{personalInfo.jobTitle}</p>}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {personalInfo.email && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>✉ {personalInfo.email}</span>}
            {personalInfo.phone && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>☎ {personalInfo.phone}</span>}
            {personalInfo.location && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>⌖ {personalInfo.location}</span>}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(297mm - 120px)' }}>
        {/* Left sidebar */}
        <div style={{ width: '175px', backgroundColor: '#f9fafb', padding: '20px 16px', borderRight: '1px solid #e5e7eb', flexShrink: 0 }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#6b7280', marginBottom: '12px' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}>
                {skills.map((skill, i) => {
                  const lvl = skill.level || 3;
                  const pct = typeof lvl === 'number' ? (lvl / 5) * 100 : 70;
                  return (
                    <div key={skill.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60px', marginBottom: '8px' }}>
                      <div style={{ position: 'relative', width: '44px', height: '44px' }}>
                        <CircleRing percent={pct} size={44} />
                        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '8px', fontWeight: '700', color: primary }}>{Math.round(pct)}%</span>
                      </div>
                      <span style={{ fontSize: '8px', color: '#374151', textAlign: 'center', marginTop: '3px', lineHeight: '1.2' }}>{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#6b7280', marginBottom: '12px' }}>Languages</h2>
              {languages.map((lang) => {
                const pct = levelToPercent[lang.level?.toLowerCase() || ''] || 60;
                return (
                  <div key={lang.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ position: 'relative', width: '36px', height: '36px', flexShrink: 0 }}>
                      <CircleRing percent={pct} size={36} />
                    </div>
                    <div>
                      <p style={{ fontSize: '9px', fontWeight: '700', color: '#111827', margin: 0 }}>{lang.name}</p>
                      <p style={{ fontSize: '8px', color: '#9ca3af', margin: 0 }}>{lang.level.replace(/_/g, ' ')}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#6b7280', marginBottom: '10px' }}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '8px', padding: '6px 8px', backgroundColor: '#fff', borderRadius: '6px', border: `1px solid ${primary}20` }}>
                  <p style={{ fontSize: '8px', fontWeight: '700', color: '#111827', margin: '0 0 1px' }}>{cert.name}</p>
                  <p style={{ fontSize: '7px', color: '#9ca3af', margin: 0 }}>{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right content */}
        <div style={{ flex: 1, padding: '20px 24px' }}>
          {personalInfo.summary && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px' }}>Profile</h2>
              <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${primary}30` }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px', paddingLeft: '10px', borderLeft: `2px solid ${primary}30` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827', margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: '9px', color: '#9ca3af' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '2px 0 4px' }}>{exp.company}</p>
                  {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>}
                  {(exp.achievements || []).length > 0 && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: '14px' }}>
                      {(exp.achievements || []).map((a, i) => <li key={i} style={{ fontSize: '9px', color: '#4b5563', marginBottom: '2px' }}>{a}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '10px', paddingBottom: '4px', borderBottom: `2px solid ${primary}30` }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px', paddingLeft: '10px', borderLeft: `2px solid ${primary}30` }}>
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
        </div>
      </div>
    </div>
  );
}
