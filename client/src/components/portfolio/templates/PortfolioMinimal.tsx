import type { PortfolioData, PortfolioProject, PortfolioSkill } from '@shared/types/portfolio';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink } from 'lucide-react';

interface Props { data: PortfolioData }

export function PortfolioMinimal({ data }: Props) {
  const { personal: personalInfo, projects, skills, settings } = data;
  const primary = settings?.primaryColor || '#2563eb';

  return (
    <div className="font-sans text-surface-900 min-h-screen" style={{ fontFamily: settings?.fontFamily || 'Plus Jakarta Sans' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-surface-100">
        <span className="font-bold text-lg" style={{ color: primary }}>
          {personalInfo.name || 'Portfolio'}
        </span>
        <div className="flex items-center gap-6 text-sm text-surface-600">
          {['About', 'Projects', 'Skills', 'Contact'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-surface-900 transition-colors">{l}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section id="about" className="px-8 py-20 max-w-4xl mx-auto text-center">
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Avatar" className="h-24 w-24 rounded-full object-cover mx-auto mb-6 border-4" style={{ borderColor: primary + '33' }} />
        )}
        <h1 className="text-5xl font-bold mb-3">{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.title && (
          <p className="text-xl font-medium mb-4" style={{ color: primary }}>{personalInfo.title}</p>
        )}
        {personalInfo.bio && (
          <p className="text-surface-500 leading-relaxed max-w-2xl mx-auto mb-8">{personalInfo.bio}</p>
        )}
        <div className="flex flex-wrap justify-center gap-4">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-sm text-surface-600 hover:text-surface-900 transition-colors">
              <Mail className="h-4 w-4" /> {personalInfo.email}
            </a>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-2 text-sm text-surface-500">
              <MapPin className="h-4 w-4" /> {personalInfo.location}
            </span>
          )}
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-surface-600 hover:text-surface-900 transition-colors">
              <Github className="h-4 w-4" /> GitHub
            </a>
          )}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-surface-600 hover:text-surface-900 transition-colors">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          )}
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section id="projects" className="px-8 py-16 bg-surface-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-white rounded-2xl border border-surface-200 overflow-hidden hover:shadow-card transition-shadow">
                  {proj.thumbnail && (
                    <img src={proj.thumbnail} alt={proj.title} className="w-full h-44 object-cover" />
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-surface-900 mb-1">{proj.title}</h3>
                    <p className="text-surface-500 text-sm mb-3">{proj.description}</p>
                    {proj.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {proj.technologies.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-surface-100 text-surface-600">{tag}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-3">
                      {proj.url && (
                        <a href={proj.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium" style={{ color: primary }}>
                          <ExternalLink className="h-3.5 w-3.5" /> Live
                        </a>
                      )}
                      {proj.github && (
                        <a href={proj.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-surface-600 hover:text-surface-900">
                          <Github className="h-3.5 w-3.5" /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section id="skills" className="px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Skills</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill) => (
                <span key={skill.id} className="px-4 py-2 rounded-xl border border-surface-200 text-sm font-medium text-surface-700 hover:border-surface-400 transition-colors">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="px-8 py-16 bg-surface-900 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Get In Touch</h2>
        <p className="text-surface-400 mb-6">
          {personalInfo.email ? `Reach me at ${personalInfo.email}` : "Let's work together"}
        </p>
        {personalInfo.email && (
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: primary }}
          >
            <Mail className="h-4 w-4" /> Contact Me
          </a>
        )}
      </section>
    </div>
  );
}
