import type { CVData } from '@shared/types/cv';

export function CVArabicModern({ data }: { data: CVData }) {
  const { personalInfo } = data;
  const primary = data.settings?.primaryColor || '#1a56db';
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const certifications = data.certifications || [];

  const displayName = personalInfo.fullNameAr || personalInfo.fullName || 'الاسم';
  const displayTitle = personalInfo.jobTitleAr || personalInfo.jobTitle || '';
  const displaySummary = personalInfo.summaryAr || personalInfo.summary || '';

  return (
    <div style={{ minHeight: '297mm', width: '210mm', fontFamily: '"Segoe UI", Tahoma, Arial, sans-serif', background: '#fff', direction: 'rtl' }}>
      {/* Header */}
      <div style={{ backgroundColor: primary, padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#fff', margin: '0 0 4px' }}>
            {displayName}
          </h1>
          {displayTitle && <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', margin: 0 }}>{displayTitle}</p>}
        </div>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Photo" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)', marginRight: '0', marginLeft: '0' }} />
        )}
      </div>

      {/* Contact bar */}
      <div style={{ backgroundColor: '#1e3a6e', padding: '8px 32px', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {personalInfo.email && <span style={{ fontSize: '10px', color: '#cbd5e1' }}>{personalInfo.email}</span>}
        {personalInfo.phone && <span style={{ fontSize: '10px', color: '#cbd5e1' }}>{personalInfo.phone}</span>}
        {(personalInfo.locationAr || personalInfo.location) && <span style={{ fontSize: '10px', color: '#cbd5e1' }}>{personalInfo.locationAr || personalInfo.location}</span>}
      </div>

      {/* Body: RTL sidebar on right = visual left */}
      <div style={{ display: 'flex', flexDirection: 'row-reverse', minHeight: 'calc(297mm - 100px)' }}>
        {/* Right sidebar (RTL = visual left) */}
        <div style={{ width: '35%', backgroundColor: '#f8fafc', borderLeft: '1px solid #e5e7eb', padding: '24px 20px' }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primary, marginBottom: '10px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>المهارات</h2>
              {skills.map((skill) => (
                <div key={skill.id} style={{ marginBottom: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ fontSize: '10px', color: '#374151' }}>{skill.nameAr || skill.name}</span>
                  </div>
                  <div style={{ height: '3px', backgroundColor: '#e5e7eb', borderRadius: '2px' }}>
                    <div style={{ height: '100%', backgroundColor: primary, borderRadius: '2px', width: skill.level === 'expert' ? '95%' : skill.level === 'advanced' ? '75%' : skill.level === 'intermediate' ? '50%' : '25%', marginRight: 'auto' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primary, marginBottom: '10px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>اللغات</h2>
              {languages.map((lang) => (
                <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '10px', color: '#374151', fontWeight: '500' }}>{lang.nameAr || lang.name}</span>
                  <span style={{ fontSize: '9px', color: '#9ca3af' }}>{lang.level.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primary, marginBottom: '10px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>الشهادات</h2>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ marginBottom: '8px' }}>
                  <p style={{ fontSize: '10px', fontWeight: '600', color: '#111827' }}>{cert.nameAr || cert.name}</p>
                  <p style={{ fontSize: '9px', color: '#6b7280' }}>{cert.issuerAr || cert.issuer} · {cert.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '24px 24px' }}>
          {displaySummary && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primary, marginBottom: '8px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>الملف الشخصي</h2>
              <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.7' }}>{displaySummary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primary, marginBottom: '12px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>الخبرة العملية</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{exp.positionAr || exp.position}</h3>
                      <p style={{ fontSize: '11px', color: primary, fontWeight: '500' }}>{exp.companyAr || exp.company}</p>
                    </div>
                    <p style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginRight: '8px' }}>{exp.startDate} – {exp.current ? 'الحاضر' : exp.endDate}</p>
                  </div>
                  {(exp.descriptionAr || exp.description) && <p style={{ fontSize: '10px', color: '#4b5563', marginTop: '4px', lineHeight: '1.6' }}>{exp.descriptionAr || exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: primary, marginBottom: '12px', borderBottom: `2px solid ${primary}`, paddingBottom: '4px' }}>التعليم</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '11px', fontWeight: '700', color: '#111827' }}>{edu.degreeAr || edu.degree}{(edu.fieldAr || edu.field) ? `، ${edu.fieldAr || edu.field}` : ''}</h3>
                    <p style={{ fontSize: '10px', color: primary }}>{edu.institutionAr || edu.institution}</p>
                  </div>
                  <p style={{ fontSize: '9px', color: '#9ca3af', whiteSpace: 'nowrap', marginRight: '8px' }}>{edu.startDate} – {edu.current ? 'الحاضر' : edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
