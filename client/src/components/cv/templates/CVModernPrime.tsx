import type { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem } from '@shared/types/cv';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface Props { data: CVData }

function getSection(data: CVData, type: string) {
  return data.sections?.find((s) => s.type === type);
}

const LEVEL_WIDTH: Record<string, string> = {
  beginner: '20%', basic: '25%', intermediate: '50%', advanced: '75%', expert: '90%', fluent: '85%', native: '100%',
};

export function CVModernPrime({ data }: Props) {
  const { personalInfo } = data;
  const experience = data.experience as ExperienceItem[];
  const education = data.education as EducationItem[];
  const skills = data.skills as SkillItem[];
  const languages = data.languages as LanguageItem[];
  const summary = personalInfo.summary;

  return (
    <div className="bg-white font-sans flex" style={{ minHeight: '297mm' }}>
      {/* Sidebar */}
      <div className="w-64 bg-surface-900 text-white p-8 flex-shrink-0">
        {personalInfo.photo && (
          <div className="flex justify-center mb-6">
            <img src={personalInfo.photo} alt="Photo" className="h-24 w-24 rounded-full object-cover border-4 border-white/20" />
          </div>
        )}
        <h1 className="text-xl font-bold leading-tight mb-1">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.jobTitle && <p className="text-brand-300 text-sm font-medium mb-6">{personalInfo.jobTitle}</p>}

        {/* Contact */}
        <div className="space-y-2 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-surface-400 mb-3">Contact</p>
          {personalInfo.email && (
            <div className="flex items-center gap-2 text-xs text-surface-300">
              <Mail className="h-3.5 w-3.5 text-brand-400 shrink-0" />
              <span className="break-all">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2 text-xs text-surface-300">
              <Phone className="h-3.5 w-3.5 text-brand-400 shrink-0" /> {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2 text-xs text-surface-300">
              <MapPin className="h-3.5 w-3.5 text-brand-400 shrink-0" /> {personalInfo.location}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2 text-xs text-surface-300">
              <Globe className="h-3.5 w-3.5 text-brand-400 shrink-0" />
              <span className="break-all">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-surface-400 mb-3">Skills</p>
            <div className="space-y-2.5">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-xs text-surface-300 mb-1">
                    <span>{skill.name}</span>
                  </div>
                  <div className="h-1 bg-surface-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-400 rounded-full"
                      style={{ width: LEVEL_WIDTH[skill.level || 'intermediate'] || '50%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-surface-400 mb-3">Languages</p>
            <div className="space-y-1.5">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between text-xs">
                  <span className="text-surface-200">{lang.name}</span>
                  <span className="text-surface-400 capitalize">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main */}
      <div className="flex-1 p-8">
        {summary && (
          <div className="mb-7">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-600 border-b-2 border-brand-600 pb-1 mb-3">Profile</h2>
            <p className="text-sm text-surface-600 leading-relaxed">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-7">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-600 border-b-2 border-brand-600 pb-1 mb-4">Experience</h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id} className="relative ps-4 border-s-2 border-surface-200">
                  <div className="absolute -start-1.5 top-1 h-2.5 w-2.5 rounded-full bg-brand-600 border-2 border-white" />
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="font-bold text-surface-900 text-sm">{exp.position}</h3>
                      <p className="text-brand-600 text-xs font-semibold">{exp.company} {exp.location && `· ${exp.location}`}</p>
                    </div>
                    <span className="text-xs text-surface-400 shrink-0 mt-0.5">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-xs text-surface-600 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-600 border-b-2 border-brand-600 pb-1 mb-4">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-surface-900 text-sm">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</h3>
                    <p className="text-brand-600 text-xs">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-surface-400 shrink-0">
                    {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
