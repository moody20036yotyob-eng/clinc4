import type { CVData } from '@shared/types/cv';

export function CVProductManager({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#6366f1';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  const productSkills = skills.filter(s => s.category === 'Product' || s.category === 'product');
  const techSkills = skills.filter(s => s.category === 'Technical' || s.category === 'technical' || s.category === 'Tech');
  const leadSkills = skills.filter(s => s.category === 'Leadership' || s.category === 'leadership');
  const otherSkills = skills.filter(s => !['Product', 'product', 'Technical', 'technical', 'Tech', 'Leadership', 'leadership'].includes(s.category || ''));

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: 'Inter, sans-serif', background: '#fff', display: 'flex' }}>
      {/* Left sidebar */}
      <div style={{ width: '36%', backgroundColor: '#0f0e17', color: '#fff', padding: '28px 20px', flexShrink: 0 }}>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Photo" style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover', marginBottom: '14px', border: `2px solid ${primary}` }} />
        )}
        <h1 style={{ fontSize: '17px', fontWeight: '800', color: '#fff', margin: '0 0 3px', lineHeight: '1.2' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p style={{ fontSize: '10px', color: primary, fontWeight: '600', margin: '0 0 18px', letterSpacing: '0.04em' }}>{personalInfo.jobTitle}</p>
        )}

        {/* Contact */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b', marginBottom: '8px' }}>Contact</p>
          {personalInfo.email && <p style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '4px', wordBreak: 'break-all' }}>{personalInfo.email}</p>}
          {personalInfo.phone && <p style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '4px' }}>{personalInfo.phone}</p>}
          {personalInfo.location && <p style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '4px' }}>{personalInfo.location}</p>}
          {personalInfo.linkedin && <p style={{ fontSize: '9px', color: primary, marginBottom: '4px', wordBreak: 'break-all' }}>{personalInfo.linkedin}</p>}
          {personalInfo.website && <p style={{ fontSize: '9px', color: primary, wordBreak: 'break-all' }}>{personalInfo.website}</p>}
        </div>

        {/* Skills grouped */}
        {(productSkills.length > 0 || otherSkills.length > 0) && (
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b', marginBottom: '8px' }}>Product</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {(productSkills.length > 0 ? productSkills : otherSkills.slice(0, 5)).map((skill) => (
                <span key={skill.id} style={{ fontSize: '8px', backgroundColor: `${primary}25`, color: primary, padding: '2px 6px', borderRadius: '4px' }}>{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {techSkills.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b', marginBottom: '8px' }}>Technical</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {techSkills.map((skill) => (
                <span key={skill.id} style={{ fontSize: '8px', backgroundColor: '#1e293b', color: '#94a3b8', padding: '2px 6px', borderRadius: '4px' }}>{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {leadSkills.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b', marginBottom: '8px' }}>Leadership</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {leadSkills.map((skill) => (
                <span key={skill.id} style={{ fontSize: '8px', backgroundColor: '#1e293b', color: '#94a3b8', padding: '2px 6px', borderRadius: '4px' }}>{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b', marginBottom: '8px' }}>Languages</p>
            {languages.map((lang) => (
              <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '9px', color: '#94a3b8' }}>{lang.name}</span>
                <span style={{ fontSize: '8px', color: '#64748b' }}>{lang.level.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <p style={{ fontSize: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b', marginBottom: '8px' }}>Certifications</p>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '6px' }}>
                <p style={{ fontSize: '9px', fontWeight: '600', color: '#cbd5e1' }}>{cert.name}</p>
                <p style={{ fontSize: '8px', color: '#64748b' }}>{cert.issuer} · {cert.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right content */}
      <div style={{ flex: 1, padding: '28px 24px' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '8px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Profile</h2>
            <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.7' }}>{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '12px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Experience & Impact</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{exp.position}</h3>
                    <p style={{ fontSize: '11px', color: primary, fontWeight: '500' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '8px' }}>
                    <span style={{ fontSize: '9px', color: '#9ca3af', backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                </div>
                {exp.description && <p style={{ fontSize: '10px', color: '#4b5563', marginTop: '4px', lineHeight: '1.55' }}>{exp.description}</p>}
                {(exp.achievements || []).length > 0 && (
                  <ul style={{ marginTop: '4px', paddingLeft: '14px' }}>
                    {(exp.achievements || []).map((a, i) => (
                      <li key={i} style={{ fontSize: '10px', color: '#374151', marginBottom: '3px', lineHeight: '1.5' }}>
                        <span style={{ fontWeight: '500' }}>{a}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em', color: primary, marginBottom: '12px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p style={{ fontSize: '11px', color: primary }}>{edu.institution}</p>
                </div>
                <p style={{ fontSize: '9px', color: '#6b7280', whiteSpace: 'nowrap', marginLeft: '8px' }}>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
