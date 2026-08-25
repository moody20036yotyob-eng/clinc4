import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, FileText, LayoutTemplate, ShoppingBag, Settings, BarChart3, Tag } from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';

interface AdminOverview {
  totalUsers: number;
  totalCVs: number;
  totalPortfolios: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: any[];
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number | string; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-6">
      <div className={`h-10 w-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="text-2xl font-bold text-surface-900">{value?.toLocaleString?.() ?? value}</div>
      <div className="text-sm text-surface-500 mt-0.5">{label}</div>
    </div>
  );
}

function AdminOverviewPage() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-overview'],
    queryFn: () => api.get<AdminOverview>('/admin/overview'),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-surface-900 mb-8">{t('admin.overview')}</h1>
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-36 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard icon={Users} label={t('admin.totalUsers')} value={data?.totalUsers ?? 0} color="bg-brand-600" />
          <StatCard icon={FileText} label={t('admin.totalCVs')} value={data?.totalCVs ?? 0} color="bg-accent-600" />
          <StatCard icon={LayoutTemplate} label={t('admin.totalPortfolios')} value={data?.totalPortfolios ?? 0} color="bg-success-600" />
          <StatCard icon={ShoppingBag} label={`${t('admin.totalRevenue')} (SAR)`} value={data?.totalRevenue?.toFixed(0) ?? 0} color="bg-error-600" />
        </div>
      )}
    </div>
  );
}

const NAV_ITEMS = [
  { to: '/admin', label: 'Overview', icon: BarChart3, exact: true },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/templates', label: 'Templates', icon: LayoutTemplate },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/coupons', label: 'Coupons', icon: Tag },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminDashboardPage() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Admin sidebar */}
      <aside className="w-56 bg-surface-900 text-white shrink-0 p-4">
        <div className="mb-6 px-2">
          <p className="text-xs font-bold uppercase tracking-widest text-surface-500 mb-1">Admin</p>
          <p className="text-sm font-semibold text-white">EcoTrove Panel</p>
        </div>
        <nav className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to) && item.to !== '/admin';
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors',
                  isActive ? 'bg-white/10 text-white font-medium' : 'text-surface-400 hover:bg-white/5 hover:text-white'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-auto">
        <Routes>
          <Route index element={<AdminOverviewPage />} />
          <Route path="users" element={<div className="text-surface-500">Users management coming soon</div>} />
          <Route path="templates" element={<div className="text-surface-500">Template management coming soon</div>} />
          <Route path="orders" element={<div className="text-surface-500">Orders management coming soon</div>} />
          <Route path="coupons" element={<div className="text-surface-500">Coupons management coming soon</div>} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Routes>
      </main>
    </div>
  );
}

function AdminSettingsPage() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => api.get<{ settings: Array<{ key: string; value: string; label: string }> }>('/admin/settings'),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-surface-900 mb-8">Settings</h1>
      {isLoading ? (
        <div className="space-y-3">
          {[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
        </div>
      ) : (
        <div className="space-y-4 max-w-2xl">
          {data?.settings?.map((setting) => (
            <div key={setting.key} className="bg-white rounded-xl border border-surface-200 p-4 flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-surface-900">{setting.label || setting.key}</label>
                <p className="text-xs text-surface-400">{setting.key}</p>
              </div>
              <input
                defaultValue={setting.value}
                className="input w-32 text-right"
                onBlur={async (e) => {
                  try {
                    await api.put('/admin/settings', { key: setting.key, value: e.target.value });
                  } catch {
                    e.target.value = setting.value;
                  }
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
