import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePortfolioStore } from '@/store/portfolioStore';
import { Input } from '@/components/ui/Input';
import { User, Briefcase, GraduationCap, Star, MessageSquare, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const SECTIONS = [
  { key: 'personal', icon: User },
  { key: 'skills', icon: Star },
  { key: 'experience', icon: Briefcase },
  { key: 'education', icon: GraduationCap },
  { key: 'testimonials', icon: MessageSquare },
  { key: 'settings', icon: Settings },
];

export function PortfolioEditorSidebar() {
  const { t } = useTranslation();
  const { data: portfolioData, updatePersonalInfo, updateSettings } = usePortfolioStore();
  const [activeSection, setActiveSection] = useState('personal');

  if (!portfolioData) return null;

  const { personal: personalInfo, settings } = portfolioData;

  return (
    <div className="flex h-full">
      {/* Mini nav */}
      <div className="w-12 border-e border-surface-100 flex flex-col items-center py-3 gap-1">
        {SECTIONS.map(({ key, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={cn(
              'p-2.5 rounded-lg transition-colors',
              activeSection === key ? 'bg-brand-100 text-brand-700' : 'text-surface-400 hover:bg-surface-100 hover:text-surface-600'
            )}
            title={t(`portfolioEditor.sections.${key}`, key)}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeSection === 'personal' && (
          <>
            <h3 className="font-semibold text-surface-900 text-sm">{t('portfolioEditor.sections.personal')}</h3>
            <Input label={t('cvEditor.fields.fullName')} value={personalInfo.name || ''} onChange={(e) => updatePersonalInfo({ name: e.target.value })} />
            <Input label={t('cvEditor.fields.jobTitle')} value={personalInfo.title || ''} onChange={(e) => updatePersonalInfo({ title: e.target.value })} />
            <div>
              <label className="label">{t('cvEditor.fields.summary')}</label>
              <textarea
                className="input min-h-[100px] resize-y"
                value={personalInfo.bio || ''}
                onChange={(e) => updatePersonalInfo({ bio: e.target.value })}
                placeholder={t('cvEditor.placeholders.summary')}
              />
            </div>
            <Input label={t('cvEditor.fields.email')} type="email" value={personalInfo.email || ''} onChange={(e) => updatePersonalInfo({ email: e.target.value })} />
            <Input label={t('cvEditor.fields.phone')} type="tel" value={personalInfo.phone || ''} onChange={(e) => updatePersonalInfo({ phone: e.target.value })} />
            <Input label={t('cvEditor.fields.location')} value={personalInfo.location || ''} onChange={(e) => updatePersonalInfo({ location: e.target.value })} />
            <Input label={t('cvEditor.fields.website')} type="url" value={personalInfo.website || ''} onChange={(e) => updatePersonalInfo({ website: e.target.value })} />
            <Input label="LinkedIn" type="url" value={personalInfo.linkedin || ''} onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })} />
            <Input label="GitHub" type="url" value={personalInfo.github || ''} onChange={(e) => updatePersonalInfo({ github: e.target.value })} />
          </>
        )}

        {activeSection === 'settings' && (
          <>
            <h3 className="font-semibold text-surface-900 text-sm">{t('portfolioEditor.sections.settings')}</h3>
            <Input
              label={t('portfolioEditor.primaryColor')}
              type="color"
              value={settings?.primaryColor || '#2563eb'}
              onChange={(e) => updateSettings({ primaryColor: e.target.value })}
            />
            <Input
              label={t('portfolioEditor.accentColor')}
              type="color"
              value={settings?.accentColor || '#f59e0b'}
              onChange={(e) => updateSettings({ accentColor: e.target.value })}
            />
            <div>
              <label className="label">{t('portfolioEditor.font')}</label>
              <select
                className="input"
                value={settings?.fontFamily || 'Plus Jakarta Sans'}
                onChange={(e) => updateSettings({ fontFamily: e.target.value })}
              >
                <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                <option value="Cairo">Cairo (Arabic)</option>
                <option value="Inter">Inter</option>
                <option value="Merriweather">Merriweather</option>
              </select>
            </div>
          </>
        )}

        {(activeSection === 'skills' || activeSection === 'experience' || activeSection === 'education' || activeSection === 'testimonials') && (
          <div className="text-center py-10 text-surface-400 text-sm">
            <p>{t('portfolioEditor.sectionComingSoon')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
