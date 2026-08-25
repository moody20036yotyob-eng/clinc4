import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem } from '@shared/types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface Props { data: CVData }

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-surface-500">{title}</h2>
        <div className="flex-1 h-px bg-surface-200" />
      </div>
      {children}
    </div>
  );
}

function getSection(data: CVData, type: string) {
  return data.sections?.find((s) => s.type === type);
}

export function CVMinimalClean({ data }: Props) {
  const { personalInfo } = data;
  const experience = data.experience as ExperienceItem[];
  const education = data.education as EducationItem[];
  const skills = data.skills as SkillItem[];
  const languages = data.languages as LanguageItem[];
  const summary = personalInfo.summary;

  return (
    <div className="bg-white font-sans text-surface-900" style={{ minHeight: '297mm', padding: '16mm 18mm' }}>
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-surface-900 leading-tight">{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.jobTitle && (
              <p className="text-brand-600 font-medium mt-1">{personalInfo.jobTitle}</p>
            )}
          </div>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Photo" className="h-20 w-20 rounded-full object-cover border-2 border-surface-200 shrink-0" />
          )}
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-sm text-surface-500">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" /> {personalInfo.website.replace(/^https?:\/\//, '')}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin className="h-3.5 w-3.5" /> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <Section title="Summary">
          <p className="text-sm text-surface-600 leading-relaxed">{summary}</p>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Experience">
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-surface-900 text-sm">{exp.position}</h3>
                    <p className="text-brand-600 text-sm font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-surface-400">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </p>
                    {exp.location && <p className="text-xs text-surface-400">{exp.location}</p>}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-sm text-surface-600 mt-1.5 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education">
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-surface-900 text-sm">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                  <p className="text-brand-600 text-sm">{edu.institution}</p>
                  {edu.gpa && <p className="text-xs text-surface-400">GPA: {edu.gpa}</p>}
                </div>
                <p className="text-xs text-surface-400 shrink-0">
                  {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="px-2.5 py-1 bg-surface-100 rounded-lg text-xs font-medium text-surface-700">
                {skill.name}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <Section title="Languages">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {languages.map((lang) => (
              <div key={lang.id} className="flex items-center gap-2 text-sm">
                <span className="font-medium text-surface-800">{lang.name}</span>
                <span className="text-surface-400 capitalize">· {lang.level}</span>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
