import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { FileText, LayoutTemplate, ShoppingBag, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';

function StatCard({ icon: Icon, label, value, href, color }: {
  icon: React.ElementType; label: string; value: number; href: string; color: string;
}) {
  return (
    <Link to={href} className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card hover:shadow-elevated transition-shadow group">
      <div className={`h-12 w-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="text-3xl font-bold text-surface-900 mb-1">{value}</div>
      <div className="text-sm text-surface-500 flex items-center gap-1 group-hover:text-brand-600 transition-colors">
        {label}
        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const { data: cvs, isLoading: cvsLoading } = useQuery({
    queryKey: ['my-cvs'],
    queryFn: () => api.get<{ cvs: any[]; total: number }>('/cv'),
  });

  const { data: portfolios, isLoading: portfoliosLoading } = useQuery({
    queryKey: ['my-portfolios'],
    queryFn: () => api.get<{ portfolios: any[]; total: number }>('/portfolio'),
  });

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['my-orders'],
    queryFn: () => api.get<{ orders: any[]; total: number }>('/orders'),
  });

  const isLoading = cvsLoading || portfoliosLoading || ordersLoading;

  return (
    <div className="section-padding">
      <div className="container-tight">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-surface-900">
            {t('dashboard.welcome', { name: user?.name?.split(' ')[0] })}
          </h1>
          <p className="text-surface-500 text-sm mt-1">{t('dashboard.subtitle')}</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[0, 1, 2].map((i) => <Skeleton key={i} className="h-36 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <StatCard icon={FileText} label={t('dashboard.myCVs')} value={cvs?.total ?? 0} href="/dashboard/cvs" color="bg-brand-600" />
            <StatCard icon={LayoutTemplate} label={t('dashboard.myPortfolios')} value={portfolios?.total ?? 0} href="/dashboard/portfolios" color="bg-accent-600" />
            <StatCard icon={ShoppingBag} label={t('dashboard.myOrders')} value={orders?.total ?? 0} href="/dashboard/orders" color="bg-success-600" />
          </div>
        )}

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-dashed border-surface-300 p-6 flex flex-col items-center justify-center gap-3 hover:border-brand-400 hover:bg-brand-50 transition-colors group cursor-pointer">
            <Link to="/cv-templates" className="flex flex-col items-center gap-3 w-full text-center">
              <div className="h-12 w-12 rounded-xl bg-brand-100 group-hover:bg-brand-200 flex items-center justify-center transition-colors">
                <Plus className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <div className="font-semibold text-surface-900 text-sm">{t('dashboard.createCV')}</div>
                <div className="text-xs text-surface-400">{t('dashboard.createCVHint')}</div>
              </div>
            </Link>
          </div>
          <div className="rounded-2xl border border-dashed border-surface-300 p-6 flex flex-col items-center justify-center gap-3 hover:border-accent-400 hover:bg-accent-50 transition-colors group cursor-pointer">
            <Link to="/portfolio-templates" className="flex flex-col items-center gap-3 w-full text-center">
              <div className="h-12 w-12 rounded-xl bg-accent-100 group-hover:bg-accent-200 flex items-center justify-center transition-colors">
                <Plus className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <div className="font-semibold text-surface-900 text-sm">{t('dashboard.createPortfolio')}</div>
                <div className="text-xs text-surface-400">{t('dashboard.createPortfolioHint')}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
