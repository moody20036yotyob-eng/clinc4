import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import {
  Save, Download, Eye, EyeOff, ChevronLeft, ChevronRight, Loader2,
  User, Briefcase, GraduationCap, Star, Globe, Award, FolderOpen, Users, Wrench
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCVStore } from '@/store/cvStore';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';
import type { CVData, CVSection } from '@shared/types/cv';
import { PersonalInfoPanel } from '@/components/cv/editor/PersonalInfoPanel';
import { ExperiencePanel } from '@/components/cv/editor/ExperiencePanel';
import { EducationPanel } from '@/components/cv/editor/EducationPanel';
import { SkillsPanel } from '@/components/cv/editor/SkillsPanel';
import { LanguagesPanel } from '@/components/cv/editor/LanguagesPanel';
import { SummaryPanel } from '@/components/cv/editor/SummaryPanel';
import { CVTemplateRenderer } from '@/components/cv/templates/CVTemplateRenderer';

const SECTION_ICONS: Record<string, React.ElementType> = {
  personal: User,
  summary: Wrench,
  experience: Briefcase,
  education: GraduationCap,
  skills: Star,
  languages: Globe,
  certifications: Award,
  projects: FolderOpen,
  awards: Award,
  references: Users,
};

const PANEL_MAP: Record<string, React.ComponentType<{ section?: CVSection }>> = {
  personal: PersonalInfoPanel,
  summary: SummaryPanel,
  experience: ExperiencePanel,
  education: EducationPanel,
  skills: SkillsPanel,
  languages: LanguagesPanel,
};

export default function CVEditorPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('personal');

  const { data: cvData, setCVData, saveStatus, save, debouncedSave } = useCVStore();

  const { data: cvInfo, isLoading } = useQuery({
    queryKey: ['cv', id],
    queryFn: () => api.get<{ id: string; title: string; data: CVData; templateSlug: string }>(`/cv/${id}`),
    enabled: !!id,
  });

  useEffect(() => {
    if (cvInfo?.data) {
      setCVData(cvInfo.data, cvInfo.id, cvInfo.templateSlug);
    }
  }, [cvInfo]);

  const handleDownloadPDF = async () => {
    try {
      const res = await fetch(`/api/cv/${id}/pdf`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
      });
      if (!res.ok) throw new Error('Failed to generate PDF');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cvInfo?.title || 'cv'}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error(t('editor.pdfError'));
    }
  };

  const ActivePanel = PANEL_MAP[activeSection];
  const activeSecData = cvData?.sections?.find((s) => s.type === activeSection);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (!cvData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-surface-500">{t('editor.notFound')}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-surface-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        'flex flex-col bg-white border-e border-surface-200 transition-all duration-300 shrink-0',
        sidebarOpen ? 'w-64' : 'w-14'
      )}>
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-3 border-b border-surface-200">
          {sidebarOpen && (
            <button onClick={() => navigate('/dashboard/cvs')} className="flex items-center gap-1.5 text-sm text-surface-600 hover:text-surface-900">
              <ChevronLeft className="h-4 w-4" /> {t('editor.back')}
            </button>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 ms-auto"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>

        {/* Section nav */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {/* Personal always first */}
          {[
            { key: 'personal', label: t('cvEditor.sections.personal') },
            ...(cvData.sections || []).map((s) => ({
              key: s.type,
              label: t(`cvEditor.sections.${s.type}`, s.type),
            })),
          ].map(({ key, label }) => {
            const Icon = SECTION_ICONS[key] || Wrench;
            return (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={cn(
                  'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-colors',
                  activeSection === key
                    ? 'bg-brand-50 text-brand-700 font-medium'
                    : 'text-surface-600 hover:bg-surface-100'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {sidebarOpen && <span className="truncate">{label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Save status */}
        {sidebarOpen && (
          <div className="p-3 border-t border-surface-200">
            <span className={cn(
              'text-xs',
              saveStatus === 'saved' ? 'text-success-600' : saveStatus === 'saving' ? 'text-surface-400' : 'text-surface-400'
            )}>
              {saveStatus === 'saving' ? t('editor.saving') : saveStatus === 'saved' ? t('editor.saved') : t('editor.unsaved')}
            </span>
          </div>
        )}
      </aside>

      {/* Editor panel */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Toolbar */}
        <div className="h-14 flex items-center justify-between px-4 bg-white border-b border-surface-200 shrink-0">
          <h1 className="font-semibold text-surface-900 text-sm truncate">{cvInfo?.title}</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="hidden sm:inline ms-1.5">{showPreview ? t('editor.hidePreview') : t('editor.showPreview')}</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline ms-1.5">{t('editor.download')}</span>
            </Button>
            <Button size="sm" onClick={() => save(id!)} disabled={saveStatus === 'saved'}>
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline ms-1.5">{t('editor.save')}</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Edit panels */}
          <div className="w-80 shrink-0 overflow-y-auto bg-white border-e border-surface-100 p-4">
            {ActivePanel ? (
              <ActivePanel section={activeSecData} />
            ) : (
              <div className="text-center py-10 text-surface-400 text-sm">
                {t('editor.selectSection')}
              </div>
            )}
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="flex-1 overflow-auto p-6 bg-surface-100 flex justify-center">
              <div className="w-full max-w-[210mm] shadow-elevated rounded-lg overflow-hidden">
                <CVTemplateRenderer
                  data={cvData}
                  templateSlug={cvInfo?.templateSlug || 'minimal-clean'}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
