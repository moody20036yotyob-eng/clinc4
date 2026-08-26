import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

// ─── Users Page ───────────────────────────────────────────────────────────────

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  isActive: boolean;
}

interface AdminUsersResponse {
  items: AdminUser[];
  total: number;
  page: number;
  totalPages: number;
}

function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-users', page, search],
    queryFn: () =>
      api.get<AdminUsersResponse>(`/admin/users?page=${page}&limit=20${search ? `&search=${encodeURIComponent(search)}` : ''}`),
  });

  const toggleRole = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) =>
      api.put(`/admin/users/${id}`, { role: role === 'ADMIN' ? 'USER' : 'ADMIN' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const deactivate = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      api.put(`/admin/users/${id}`, { isActive: !isActive }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-surface-900 mb-6">Users</h1>

      {/* Search */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="input flex-1 max-w-xs"
        />
        <button onClick={handleSearch} className="btn btn-primary px-4">
          Search
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-14 rounded-xl" />)}
        </div>
      ) : isError ? (
        <div className="text-error-600 py-8 text-center">Failed to load users.</div>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-surface-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 border-b border-surface-200">
                  <th className="px-4 py-3 text-left font-medium text-surface-600">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-surface-600">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-surface-600">Role</th>
                  <th className="px-4 py-3 text-left font-medium text-surface-600">Joined</th>
                  <th className="px-4 py-3 text-right font-medium text-surface-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {data?.items?.map((user) => (
                  <tr key={user.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-surface-900">{user.name || '—'}</td>
                    <td className="px-4 py-3 text-surface-600">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        'inline-block px-2 py-0.5 rounded-full text-xs font-medium',
                        user.role === 'ADMIN' ? 'bg-brand-100 text-brand-700' : 'bg-surface-100 text-surface-600'
                      )}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-surface-500 text-xs">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleRole.mutate({ id: user.id, role: user.role })}
                          disabled={toggleRole.isPending}
                          className="text-xs px-2.5 py-1 rounded-lg border border-surface-200 hover:border-brand-400 hover:text-brand-600 transition-colors"
                        >
                          {user.role === 'ADMIN' ? 'Make User' : 'Make Admin'}
                        </button>
                        <button
                          onClick={() => deactivate.mutate({ id: user.id, isActive: user.isActive })}
                          disabled={deactivate.isPending}
                          className={cn(
                            'text-xs px-2.5 py-1 rounded-lg border transition-colors',
                            user.isActive
                              ? 'border-error-200 text-error-600 hover:bg-error-50'
                              : 'border-success-200 text-success-600 hover:bg-success-50'
                          )}
                        >
                          {user.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!data?.items?.length && (
              <div className="py-12 text-center text-surface-400">No users found.</div>
            )}
          </div>

          {/* Pagination */}
          {(data?.totalPages ?? 1) > 1 && (
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-surface-500">
                Page {data?.page} of {data?.totalPages} — {data?.total} total
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-3 py-1.5 rounded-lg border border-surface-200 hover:bg-surface-50 disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= (data?.totalPages ?? 1)}
                  className="px-3 py-1.5 rounded-lg border border-surface-200 hover:bg-surface-50 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Templates Page ───────────────────────────────────────────────────────────

interface AdminTemplate {
  id: string;
  name: string;
  category: string;
  useCount: number;
  isFeatured: boolean;
  isActive: boolean;
  previewImage?: string;
}

function AdminTemplatesPage() {
  const [tab, setTab] = useState<'cv' | 'portfolio'>('cv');
  const [page, setPage] = useState(1);
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-templates', tab, page],
    queryFn: () =>
      api.get<AdminTemplate[]>(`/admin/templates/${tab}?page=${page}&limit=20`),
  });

  const toggleFeatured = useMutation({
    mutationFn: ({ id, isFeatured }: { id: string; isFeatured: boolean }) =>
      api.put(`/admin/templates/${tab}/${id}`, { isFeatured: !isFeatured }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-templates'] }),
  });

  const toggleActive = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      api.put(`/admin/templates/${tab}/${id}`, { isActive: !isActive }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-templates'] }),
  });

  const handleTabChange = (t: 'cv' | 'portfolio') => {
    setTab(t);
    setPage(1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-surface-900 mb-6">Templates</h1>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-surface-100 rounded-xl p-1 w-fit">
        {(['cv', 'portfolio'] as const).map((t) => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            className={cn(
              'px-5 py-2 rounded-lg text-sm font-medium transition-colors',
              tab === t ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-500 hover:text-surface-700'
            )}
          >
            {t === 'cv' ? 'CV Templates' : 'Portfolio Templates'}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-14 rounded-xl" />)}
        </div>
      ) : isError ? (
        <div className="text-error-600 py-8 text-center">Failed to load templates.</div>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-surface-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 border-b border-surface-200">
                  <th className="px-4 py-3 text-left font-medium text-surface-600">Preview</th>
                  <th className="px-4 py-3 text-left font-medium text-surface-600">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-surface-600">Category</th>
                  <th className="px-4 py-3 text-center font-medium text-surface-600">Uses</th>
                  <th className="px-4 py-3 text-center font-medium text-surface-600">Featured</th>
                  <th className="px-4 py-3 text-center font-medium text-surface-600">Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {data?.map((tpl) => (
                  <tr key={tpl.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-4 py-3">
                      {tpl.previewImage ? (
                        <img src={tpl.previewImage} alt={tpl.name} className="h-10 w-16 object-cover rounded-lg border border-surface-200" />
                      ) : (
                        <div className="h-10 w-16 rounded-lg bg-surface-100 flex items-center justify-center text-surface-400 text-xs">
                          No img
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-surface-900">{tpl.name}</td>
                    <td className="px-4 py-3 text-surface-500">{tpl.category || '—'}</td>
                    <td className="px-4 py-3 text-center text-surface-700">{tpl.useCount ?? 0}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleFeatured.mutate({ id: tpl.id, isFeatured: tpl.isFeatured })}
                        disabled={toggleFeatured.isPending}
                        className={cn(
                          'inline-block w-10 h-5 rounded-full transition-colors relative',
                          tpl.isFeatured ? 'bg-brand-500' : 'bg-surface-200'
                        )}
                      >
                        <span className={cn(
                          'absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
                          tpl.isFeatured && 'translate-x-5'
                        )} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleActive.mutate({ id: tpl.id, isActive: tpl.isActive })}
                        disabled={toggleActive.isPending}
                        className={cn(
                          'inline-block w-10 h-5 rounded-full transition-colors relative',
                          tpl.isActive ? 'bg-success-500' : 'bg-surface-200'
                        )}
                      >
                        <span className={cn(
                          'absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
                          tpl.isActive && 'translate-x-5'
                        )} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!data?.length && (
              <div className="py-12 text-center text-surface-400">No templates found.</div>
            )}
          </div>

        </>
      )}
    </div>
  );
}

// ─── Orders Page ──────────────────────────────────────────────────────────────

interface AdminOrder {
  id: string;
  user: { email: string };
  productType: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface AdminOrdersResponse {
  items: AdminOrder[];
  total: number;
  page: number;
  totalPages: number;
}

const ORDER_STATUSES = ['ALL', 'PENDING', 'PAID', 'FAILED', 'REFUNDED'] as const;

function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>('ALL');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-orders', page, status],
    queryFn: () =>
      api.get<AdminOrdersResponse>(
        `/admin/orders?page=${page}${status !== 'ALL' ? `&status=${status}` : ''}`
      ),
  });

  const handleStatusChange = (s: string) => {
    setStatus(s);
    setPage(1);
  };

  const statusColors: Record<string, string> = {
    PAID: 'bg-success-100 text-success-700',
    PENDING: 'bg-warning-100 text-warning-700',
    FAILED: 'bg-error-100 text-error-700',
    REFUNDED: 'bg-surface-100 text-surface-600',
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-surface-900 mb-6">Orders</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {ORDER_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => handleStatusChange(s)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium border transition-colors',
              status === s
                ? 'bg-brand-600 text-white border-brand-600'
                : 'border-surface-200 text-surface-600 hover:border-brand-300'
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-14 rounded-xl" />)}
        </div>
      ) : isError ? (
        <div className="text-error-600 py-8 text-center">Failed to load orders.</div>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-surface-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 border-b border-surface-200">
                  <th className="px-4 py-3 text-left font-medium text-surface-600">Order ID</th>
                  <th className="px-4 py-3 text-left font-medium text-surface-600">User Email</th>
                  <th className="px-4 py-3 text-left font-medium text-surface-600">Product</th>
                  <th className="px-4 py-3 text-right font-medium text-surface-600">Amount (SAR)</th>
                  <th className="px-4 py-3 text-center font-medium text-surface-600">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-surface-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {data?.items?.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-surface-500">
                      #{order.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-4 py-3 text-surface-700">{order.user?.email}</td>
                    <td className="px-4 py-3 text-surface-600">{order.productType}</td>
                    <td className="px-4 py-3 text-right font-medium text-surface-900">
                      {(order.amount ?? 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={cn(
                        'inline-block px-2.5 py-0.5 rounded-full text-xs font-medium',
                        statusColors[order.status] ?? 'bg-surface-100 text-surface-600'
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-surface-500 text-xs">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!data?.items?.length && (
              <div className="py-12 text-center text-surface-400">No orders found.</div>
            )}
          </div>

          {/* Pagination */}
          {(data?.totalPages ?? 1) > 1 && (
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-surface-500">
                Page {data?.page} of {data?.totalPages} — {data?.total} total
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-3 py-1.5 rounded-lg border border-surface-200 hover:bg-surface-50 disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= (data?.totalPages ?? 1)}
                  className="px-3 py-1.5 rounded-lg border border-surface-200 hover:bg-surface-50 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Coupons Page ─────────────────────────────────────────────────────────────

interface AdminCoupon {
  id: string;
  code: string;
  type: 'PERCENTAGE' | 'FIXED';
  value: number;
  maxUses: number | null;
  usedCount: number;
  isActive: boolean;
}

interface CreateCouponForm {
  code: string;
  type: 'PERCENTAGE' | 'FIXED';
  value: number;
  maxUses: number;
}

function AdminCouponsPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState<CreateCouponForm>({
    code: '',
    type: 'PERCENTAGE',
    value: 10,
    maxUses: 100,
  });
  const [formError, setFormError] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-coupons'],
    queryFn: () => api.get<AdminCoupon[]>('/admin/coupons'),
  });

  const createCoupon = useMutation({
    mutationFn: (payload: CreateCouponForm) => api.post('/admin/coupons', payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-coupons'] });
      setForm({ code: '', type: 'PERCENTAGE', value: 10, maxUses: 100 });
      setFormError('');
    },
    onError: (err: any) => {
      setFormError(err?.message || 'Failed to create coupon.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim()) return setFormError('Code is required.');
    if (form.value <= 0) return setFormError('Value must be positive.');
    if (form.type === 'PERCENTAGE' && form.value > 100) return setFormError('Percentage must be 1–100.');
    if (form.maxUses < 1) return setFormError('Max uses must be at least 1.');
    setFormError('');
    createCoupon.mutate(form);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-surface-900 mb-6">Coupons</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Coupons list */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-14 rounded-xl" />)}
            </div>
          ) : isError ? (
            <div className="text-error-600 py-8 text-center">Failed to load coupons.</div>
          ) : (
            <div className="bg-white rounded-2xl border border-surface-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-50 border-b border-surface-200">
                    <th className="px-4 py-3 text-left font-medium text-surface-600">Code</th>
                    <th className="px-4 py-3 text-center font-medium text-surface-600">Discount</th>
                    <th className="px-4 py-3 text-center font-medium text-surface-600">Uses / Max</th>
                    <th className="px-4 py-3 text-center font-medium text-surface-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {data?.map((coupon) => (
                    <tr key={coupon.id} className="hover:bg-surface-50 transition-colors">
                      <td className="px-4 py-3 font-mono font-semibold text-surface-900 tracking-wider">
                        {coupon.code}
                      </td>
                      <td className="px-4 py-3 text-center text-surface-700 font-medium">
                        {coupon.type === 'PERCENTAGE' ? `${coupon.value}%` : `${coupon.value} SAR`}
                      </td>
                      <td className="px-4 py-3 text-center text-surface-600">
                        {coupon.usedCount ?? 0} / {coupon.maxUses ?? '∞'}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={cn(
                          'inline-block px-2.5 py-0.5 rounded-full text-xs font-medium',
                          coupon.isActive ? 'bg-success-100 text-success-700' : 'bg-surface-100 text-surface-500'
                        )}>
                          {coupon.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!data?.length && (
                <div className="py-12 text-center text-surface-400">No coupons yet.</div>
              )}
            </div>
          )}
        </div>

        {/* Create coupon form */}
        <div>
          <div className="bg-white rounded-2xl border border-surface-200 p-6">
            <h2 className="font-semibold text-surface-900 mb-4">Create Coupon</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Code</label>
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
                  placeholder="e.g. SAVE20"
                  className="input w-full font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as 'PERCENTAGE' | 'FIXED' }))}
                  className="input w-full"
                >
                  <option value="PERCENTAGE">Percentage (%)</option>
                  <option value="FIXED">Fixed (SAR)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">
                  {form.type === 'PERCENTAGE' ? 'Discount %' : 'Discount Amount (SAR)'}
                </label>
                <input
                  type="number"
                  min={1}
                  max={form.type === 'PERCENTAGE' ? 100 : undefined}
                  value={form.value}
                  onChange={(e) => setForm((f) => ({ ...f, value: Number(e.target.value) }))}
                  className="input w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Max Uses</label>
                <input
                  type="number"
                  min={1}
                  value={form.maxUses}
                  onChange={(e) => setForm((f) => ({ ...f, maxUses: Number(e.target.value) }))}
                  className="input w-full"
                  required
                />
              </div>

              {formError && (
                <p className="text-xs text-error-600">{formError}</p>
              )}

              <button
                type="submit"
                disabled={createCoupon.isPending}
                className="btn btn-primary w-full"
              >
                {createCoupon.isPending ? 'Creating...' : 'Create Coupon'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Nav & Shell ──────────────────────────────────────────────────────────────

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
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="templates" element={<AdminTemplatesPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="coupons" element={<AdminCouponsPage />} />
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
    queryFn: () => api.get<Array<{ key: string; value: string; label?: string }>>('/admin/settings'),
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
          {data?.map((setting) => (
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
