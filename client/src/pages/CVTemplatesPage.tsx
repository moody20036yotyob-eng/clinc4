import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Sparkles, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { WhatsAppModal } from '@/components/ui/WhatsAppModal';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/Toast';
import type { CVTemplateInfo } from '@shared/types/api';

const CATEGORIES = ['all', 'professional', 'creative', 'tech', 'executive', 'minimal', 'modern', 'academic', 'arabic'];

function TemplateCard({ template, onSelect }: { template: CVTemplateInfo; onSelect: () => void }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <div className="group rounded-2xl border border-surface-200 bg-white overflow-hidden hover:border-brand-300 hover:shadow-card transition-all duration-200">
      <div className="aspect-[3/4] bg-gradient-to-br from-surface-50 to-surface-100 relative overflow-hidden">
        {template.previewImage ? (
          <img src={template.previewImage} alt={template.name} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FileText className="h-16 w-16 text-surface-300" />
          </div>
        )}
        {template.isPremium && (
          <div className="absolute top-3 start-3">
            <Badge variant="brand">
              <Sparkles className="h-3 w-3 me-1" />
              {t('templates.premium')}
            </Badge>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button onClick={onSelect} size="sm" className="shadow-elevated">
            {t('templates.useTemplate')}
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-surface-900 text-sm">{isRtl && template.nameAr ? template.nameAr : template.name}</h3>
        {template.category && (
          <span className="text-xs text-surface-400 capitalize">{template.category}</span>
        )}
      </div>
    </div>
  );
}

export default function CVTemplatesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showCustomModal, setShowCustomModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['cv-templates', category, search],
    queryFn: () =>
      api.get<{ templates: CVTemplateInfo[]; total: number }>(
        `/templates/cv?category=${category === 'all' ? '' : category}&search=${search}&limit=60`
      ),
  });

  const handleUseTemplate = async (template: CVTemplateInfo) => {
    if (!isAuthenticated) {
      navigate('/register');
      return;
    }
    try {
      const cv = await api.post<{ id: string }>('/cv', { templateSlug: template.slug, title: template.name });
      navigate(`/editor/cv/${cv.id}`);
    } catch (err: any) {
      if (err.code === 'PAYMENT_REQUIRED') {
        navigate(`/checkout?product=CV&redirect=/cv-templates`);
        return;
      }
      toast.error(err.message || t('common.error'));
    }
  };

  return (
    <div className="section-padding">
      <div className="container-tight">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="brand" className="mb-4">{t('templates.cv.badge')}</Badge>
          <h1 className="text-4xl font-bold text-surface-900 mb-3">{t('templates.cv.title')}</h1>
          <p className="text-surface-500 max-w-xl mx-auto">{t('templates.cv.subtitle')}</p>
        </div>

        {/* Search + Custom CTA */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder={t('templates.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4 text-surface-400" />}
            />
          </div>
          <Button variant="outline" onClick={() => setShowCustomModal(true)} className="shrink-0">
            <Sparkles className="h-4 w-4 me-2" />
            {t('templates.customOrder')}
          </Button>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? 'bg-brand-600 text-white'
                  : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
              }`}
            >
              {t(`templates.categories.${cat}`, cat)}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <Skeleton className="aspect-[3/4] w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {data?.templates?.map((tpl) => (
                <TemplateCard key={tpl.id} template={tpl} onSelect={() => handleUseTemplate(tpl)} />
              ))}
            </div>
            {(!data?.templates?.length) && (
              <div className="text-center py-20 text-surface-400">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p>{t('templates.noResults')}</p>
              </div>
            )}
          </>
        )}
      </div>

      <WhatsAppModal open={showCustomModal} onClose={() => setShowCustomModal(false)} type="customCV" />
    </div>
  );
}
