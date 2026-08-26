import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FileText, Plus, Edit, Trash2, Download, Copy, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/Toast';

async function downloadCVPdf(cvId: string, title: string) {
  const token = localStorage.getItem('ecotrove_token') || '';
  const res = await fetch(`/api/cv/${cvId}/pdf`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('PDF generation failed');
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/[^a-z0-9]/gi, '_')}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
function timeAgo(date: string) {
  const ms = Date.now() - new Date(date).getTime();
  const d = Math.floor(ms / 86400000);
  if (d > 0) return `${d}d ago`;
  const h = Math.floor(ms / 3600000);
  if (h > 0) return `${h}h ago`;
  return 'just now';
}

interface CV {
  id: string;
  title: string;
  templateSlug: string;
  updatedAt: string;
  isPublic: boolean;
}

function CVCard({ cv, onDelete, onDuplicate }: { cv: CV; onDelete: (id: string) => void; onDuplicate: (id: string) => void }) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card hover:shadow-elevated transition-shadow">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
          <FileText className="h-6 w-6 text-brand-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-surface-900 truncate">{cv.title}</h3>
          <p className="text-xs text-surface-400 mt-0.5">
            {t('dashboard.updated')} {timeAgo(cv.updatedAt)}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="surface">{cv.templateSlug}</Badge>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          {menuOpen && (
            <div className="absolute end-0 top-full mt-1 w-44 rounded-xl bg-white border border-surface-200 shadow-elevated p-1 z-10">
              <Link
                to={`/editor/cv/${cv.id}`}
                className="flex items-center gap-2 px-3 py-2 text-sm text-surface-700 hover:bg-surface-100 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                <Edit className="h-4 w-4" /> {t('common.edit')}
              </Link>
              <button
                onClick={() => { onDuplicate(cv.id); setMenuOpen(false); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-surface-700 hover:bg-surface-100 rounded-lg"
              >
                <Copy className="h-4 w-4" /> {t('common.duplicate')}
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  downloadCVPdf(cv.id, cv.title).catch(() => toast.error('PDF download failed'));
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-surface-700 hover:bg-surface-100 rounded-lg"
              >
                <Download className="h-4 w-4" /> {t('common.download')}
              </button>
              <div className="h-px bg-surface-100 my-1" />
              <button
                onClick={() => { onDelete(cv.id); setMenuOpen(false); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-error-600 hover:bg-error-50 rounded-lg"
              >
                <Trash2 className="h-4 w-4" /> {t('common.delete')}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-surface-100 flex gap-2">
        <Button asChild className="flex-1">
          <Link to={`/editor/cv/${cv.id}`}>
            <Edit className="h-3.5 w-3.5 me-1.5" /> {t('common.edit')}
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function MyCVsPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['my-cvs'],
    queryFn: () => api.get<{ cvs: CV[]; total: number }>('/cv'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/cv/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-cvs'] });
      toast.success(t('dashboard.cvDeleted'));
    },
    onError: () => toast.error(t('common.error')),
  });

  const duplicateMutation = useMutation({
    mutationFn: (id: string) => api.post(`/cv/${id}/duplicate`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-cvs'] });
      toast.success(t('dashboard.cvDuplicated'));
    },
    onError: () => toast.error(t('common.error')),
  });

  return (
    <div className="section-padding">
      <div className="container-tight">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-surface-900">{t('dashboard.myCVs')}</h1>
            <p className="text-surface-500 text-sm mt-1">{t('dashboard.myCVsSubtitle')}</p>
          </div>
          <Button asChild>
            <Link to="/cv-templates">
              <Plus className="h-4 w-4 me-1.5" /> {t('dashboard.newCV')}
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-44 rounded-2xl" />)}
          </div>
        ) : data?.cvs?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.cvs.map((cv) => (
              <CVCard
                key={cv.id}
                cv={cv}
                onDelete={(id) => deleteMutation.mutate(id)}
                onDuplicate={(id) => duplicateMutation.mutate(id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FileText className="h-12 w-12 mx-auto mb-4 text-surface-300" />
            <h3 className="font-semibold text-surface-900 mb-2">{t('dashboard.noCVs')}</h3>
            <p className="text-surface-400 text-sm mb-6">{t('dashboard.noCVsHint')}</p>
            <Button asChild>
              <Link to="/cv-templates">{t('dashboard.browseCVTemplates')}</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
