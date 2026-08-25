import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { ShoppingBag, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { api } from '@/lib/api';
function fmtDate(d: string) { return new Date(d).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }); }

interface Order {
  id: string;
  orderNumber: string;
  productType: string;
  status: string;
  totalAmount: number;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { variant: 'success' | 'surface' | 'error'; icon: React.ElementType }> = {
  COMPLETED: { variant: 'success', icon: CheckCircle },
  PENDING: { variant: 'surface', icon: Clock },
  FAILED: { variant: 'error', icon: XCircle },
  CANCELLED: { variant: 'error', icon: XCircle },
};

export default function OrdersPage() {
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ['my-orders'],
    queryFn: () => api.get<{ orders: Order[]; total: number }>('/orders'),
  });

  return (
    <div className="section-padding">
      <div className="container-tight">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-surface-900">{t('dashboard.myOrders')}</h1>
          <p className="text-surface-500 text-sm mt-1">{t('dashboard.myOrdersSubtitle')}</p>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
          </div>
        ) : data?.orders?.length ? (
          <div className="space-y-3">
            {data.orders.map((order) => {
              const config = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.PENDING;
              const Icon = config.icon;
              return (
                <div key={order.id} className="rounded-2xl border border-surface-200 bg-white p-5 shadow-card flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-surface-100 flex items-center justify-center shrink-0">
                    <ShoppingBag className="h-5 w-5 text-surface-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-surface-900 text-sm">{order.orderNumber}</span>
                      <Badge variant={config.variant}>
                        <Icon className="h-3 w-3 me-1" />
                        {t(`orders.status.${order.status.toLowerCase()}`, order.status)}
                      </Badge>
                    </div>
                    <p className="text-xs text-surface-400 mt-0.5">
                      {order.productType} · {fmtDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-surface-900">{order.totalAmount} {t('pricing.sar')}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-surface-300" />
            <h3 className="font-semibold text-surface-900 mb-2">{t('dashboard.noOrders')}</h3>
            <p className="text-surface-400 text-sm">{t('dashboard.noOrdersHint')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
