import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LayoutTemplate, Plus, Edit, Trash2, Globe, EyeOff, ExternalLink, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/Toast';
function timeAgo(date: string) {
  const ms = Date.now() - new Date(date).getTime();
  const d = Math.floor(ms / 86400000);
  if (d > 0) return `${d}d ago`;
  const h = Math.floor(ms / 3600000);
  if (h > 0) return `${h}h ago`;
  return 'just now';
}

interface HostingSubscription {
  status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED';
  expiryDate: string;
  renewalPrice: number;
}

interface Portfolio {
  id: string;
  title: string;
  slug: string;
  templateSlug: string;
  updatedAt: string;
  isPublished: boolean;
  hostingSubscription: HostingSubscription | null;
}

function PortfolioCard({ portfolio, onDelete, onTogglePublish }: {
  portfolio: Portfolio;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, isPublished: boolean) => void;
}) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card hover:shadow-elevated transition-shadow">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-accent-50 flex items-center justify-center shrink-0">
          <LayoutTemplate className="h-6 w-6 text-accent-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-surface-900 truncate">{portfolio.title}</h3>
          <p className="text-xs text-surface-400 mt-0.5">
            {t('dashboard.updated')} {timeAgo(portfolio.updatedAt)}
          </p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge variant={portfolio.isPublished ? 'success' : 'surface'}>
              {portfolio.isPublished ? t('dashboard.published') : t('dashboard.draft')}
            </Badge>
            {portfolio.hostingSubscription && (
              <Badge variant={portfolio.hostingSubscription.status === 'ACTIVE' ? 'brand' : 'error'}>
                {portfolio.hostingSubscription.status === 'ACTIVE'
                  ? `Hosting · expires ${new Date(portfolio.hostingSubscription.expiryDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
                  : 'Hosting Expired'
                }
              </Badge>
            )}
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
            <div className="absolute end-0 top-full mt-1 w-48 rounded-xl bg-white border border-surface-200 shadow-elevated p-1 z-10">
              <Link
                to={`/editor/portfolio/${portfolio.id}`}
                className="flex items-center gap-2 px-3 py-2 text-sm text-surface-700 hover:bg-surface-100 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                <Edit className="h-4 w-4" /> {t('common.edit')}
              </Link>
              {portfolio.isPublished && (
                <a
                  href={`/p/${portfolio.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-surface-700 hover:bg-surface-100 rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  <ExternalLink className="h-4 w-4" /> {t('dashboard.viewLive')}
                </a>
              )}
              <button
                onClick={() => { onTogglePublish(portfolio.id, portfolio.isPublished); setMenuOpen(false); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-surface-700 hover:bg-surface-100 rounded-lg"
              >
                {portfolio.isPublished ? <EyeOff className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                {portfolio.isPublished ? t('dashboard.unpublish') : t('dashboard.publish')}
              </button>
              <div className="h-px bg-surface-100 my-1" />
              <button
                onClick={() => { onDelete(portfolio.id); setMenuOpen(false); }}
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
          <Link to={`/editor/portfolio/${portfolio.id}`}>
            <Edit className="h-3.5 w-3.5 me-1.5" /> {t('common.edit')}
          </Link>
        </Button>
        {portfolio.isPublished && (
          <Button asChild variant="outline">
            <a href={`/p/${portfolio.slug}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

export default function MyPortfoliosPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['my-portfolios'],
    queryFn: () => api.get<{ portfolios: Portfolio[]; total: number }>('/portfolio'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/portfolio/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-portfolios'] });
      toast.success(t('dashboard.portfolioDeleted'));
    },
    onError: () => toast.error(t('common.error')),
  });

  const publishMutation = useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      api.post(`/portfolio/${id}/${isPublished ? 'unpublish' : 'publish'}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-portfolios'] });
      toast.success(t('dashboard.portfolioUpdated'));
    },
    onError: (err: any) => toast.error(err.message || t('common.error')),
  });

  return (
    <div className="section-padding">
      <div className="container-tight">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-surface-900">{t('dashboard.myPortfolios')}</h1>
            <p className="text-surface-500 text-sm mt-1">{t('dashboard.myPortfoliosSubtitle')}</p>
          </div>
          <Button asChild>
            <Link to="/portfolio-templates">
              <Plus className="h-4 w-4 me-1.5" /> {t('dashboard.newPortfolio')}
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-44 rounded-2xl" />)}
          </div>
        ) : data?.portfolios?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.portfolios.map((p) => (
              <PortfolioCard
                key={p.id}
                portfolio={p}
                onDelete={(id) => deleteMutation.mutate(id)}
                onTogglePublish={(id, isPublished) => publishMutation.mutate({ id, isPublished })}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <LayoutTemplate className="h-12 w-12 mx-auto mb-4 text-surface-300" />
            <h3 className="font-semibold text-surface-900 mb-2">{t('dashboard.noPortfolios')}</h3>
            <p className="text-surface-400 text-sm mb-6">{t('dashboard.noPortfoliosHint')}</p>
            <Button asChild>
              <Link to="/portfolio-templates">{t('dashboard.browsePortfolioTemplates')}</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
