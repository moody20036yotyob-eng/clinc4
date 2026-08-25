import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Save, Eye, Globe, EyeOff, Loader2, ChevronLeft, Monitor, Tablet, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { usePortfolioStore } from '@/store/portfolioStore';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';
import type { PortfolioData } from '@shared/types/portfolio';
import { PortfolioEditorSidebar } from '@/components/portfolio/editor/PortfolioEditorSidebar';
import { PortfolioTemplateRenderer } from '@/components/portfolio/templates/PortfolioTemplateRenderer';

type DeviceView = 'desktop' | 'tablet' | 'mobile';

const DEVICE_WIDTHS: Record<DeviceView, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

export default function PortfolioEditorPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const [showPreview, setShowPreview] = useState(true);

  const { data: portfolioData, setPortfolioData, saveStatus, save } = usePortfolioStore();

  const { data: portfolioInfo, isLoading } = useQuery({
    queryKey: ['portfolio', id],
    queryFn: () => api.get<{ id: string; title: string; slug: string; data: PortfolioData; templateSlug: string; isPublished: boolean }>(`/portfolio/${id}`),
    enabled: !!id,
  });

  useEffect(() => {
    if (portfolioInfo?.data) {
      setPortfolioData(portfolioInfo.data, portfolioInfo.id, portfolioInfo.templateSlug);
    }
  }, [portfolioInfo]);

  const handlePublish = async () => {
    try {
      await api.post(`/portfolio/${id}/publish`, {});
      toast.success(t('portfolioEditor.published'));
    } catch (err: any) {
      toast.error(err.message || t('common.error'));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-surface-500">{t('editor.notFound')}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-surface-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-e border-surface-200 flex flex-col shrink-0">
        <div className="h-14 flex items-center gap-2 px-3 border-b border-surface-200">
          <button onClick={() => navigate('/dashboard/portfolios')} className="flex items-center gap-1.5 text-sm text-surface-600 hover:text-surface-900">
            <ChevronLeft className="h-4 w-4" /> {t('editor.back')}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <PortfolioEditorSidebar />
        </div>
        {saveStatus && (
          <div className="px-4 py-2 border-t border-surface-200">
            <span className="text-xs text-surface-400">
              {saveStatus === 'saving' ? t('editor.saving') : saveStatus === 'saved' ? t('editor.saved') : t('editor.unsaved')}
            </span>
          </div>
        )}
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Toolbar */}
        <div className="h-14 flex items-center justify-between px-4 bg-white border-b border-surface-200 shrink-0 gap-3">
          <div className="flex items-center gap-1 bg-surface-100 rounded-lg p-1">
            {(['desktop', 'tablet', 'mobile'] as DeviceView[]).map((device) => {
              const Icon = device === 'desktop' ? Monitor : device === 'tablet' ? Tablet : Smartphone;
              return (
                <button
                  key={device}
                  onClick={() => setDeviceView(device)}
                  className={cn(
                    'p-1.5 rounded-md transition-colors',
                    deviceView === device ? 'bg-white shadow-sm text-surface-900' : 'text-surface-400 hover:text-surface-600'
                  )}
                >
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
          </div>
          <h1 className="font-semibold text-surface-900 text-sm truncate flex-1 text-center">{portfolioInfo?.title}</h1>
          <div className="flex items-center gap-2 shrink-0">
            {portfolioInfo?.isPublished && (
              <a
                href={`/p/${portfolioInfo.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-success-600 hover:text-success-700 font-medium"
              >
                <Globe className="h-4 w-4" /> {t('portfolioEditor.viewLive')}
              </a>
            )}
            <Button variant="outline" size="sm" onClick={() => save(id!)}>
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline ms-1.5">{t('editor.save')}</span>
            </Button>
            <Button size="sm" onClick={handlePublish}>
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline ms-1.5">
                {portfolioInfo?.isPublished ? t('portfolioEditor.update') : t('portfolioEditor.publish')}
              </span>
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-auto bg-surface-200 p-4 flex justify-center items-start">
          <div
            className="bg-white shadow-elevated rounded-lg overflow-hidden transition-all duration-300"
            style={{ width: DEVICE_WIDTHS[deviceView], maxWidth: '100%', minHeight: '600px' }}
          >
            <PortfolioTemplateRenderer
              data={portfolioData}
              templateSlug={portfolioInfo?.templateSlug || 'portfolio-minimal'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
