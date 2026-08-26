import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Check, Tag, Loader2, ShieldCheck, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/Toast';
import type { PricingConfig } from '@shared/types/api';

type ProductType = 'CV' | 'PORTFOLIO' | 'BUNDLE';

const PRODUCT_FEATURES: Record<ProductType, string[]> = {
  CV: ['80+ professional CV templates', 'Unlimited edits', 'PDF download', '1 year hosting'],
  PORTFOLIO: ['40+ portfolio templates', 'Custom subdomain', '1 year hosting', 'SEO optimized'],
  BUNDLE: ['Everything in CV + Portfolio', 'CV → Portfolio import', 'Priority support', 'Best value'],
};

interface OrderResponse {
  id: string;
  orderNumber: string;
  amount: number;
  currency: string;
  status: string;
}

interface PaymentInitResponse {
  redirectUrl?: string;
  clientSecret?: string;
  provider: string;
  transactionId: string;
}

export default function CheckoutPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const productType = (searchParams.get('product') || 'CV').toUpperCase() as ProductType;
  const redirectAfter = searchParams.get('redirect') || '/dashboard/cvs';

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const { data: pricing } = useQuery({
    queryKey: ['pricing'],
    queryFn: () => api.get<PricingConfig>('/settings/pricing'),
  });

  const basePrice = pricing
    ? productType === 'CV' ? pricing.cvPrice
      : productType === 'PORTFOLIO' ? pricing.portfolioPrice
      : pricing.bundlePrice
    : null;

  const finalPrice = discountedPrice ?? basePrice;

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const res = await api.post<{ valid: boolean; discountedAmount: number; message?: string }>(
        '/orders/validate-coupon',
        { code: couponCode.toUpperCase(), productType }
      );
      if (res.valid) {
        setAppliedCoupon(couponCode.toUpperCase());
        setDiscountedPrice(res.discountedAmount);
        toast.success(t('checkout.couponApplied'));
      } else {
        toast.error(res.message || t('checkout.invalidCoupon'));
      }
    } catch (err: any) {
      toast.error(err.message || t('checkout.invalidCoupon'));
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon('');
    setCouponCode('');
    setDiscountedPrice(null);
  };

  const orderMutation = useMutation({
    mutationFn: async () => {
      const order = await api.post<OrderResponse>('/orders', {
        productType,
        couponCode: appliedCoupon || undefined,
      });

      const callbackUrl = `${window.location.origin}/checkout/callback?orderId=${order.id}&redirect=${encodeURIComponent(redirectAfter)}`;
      const payment = await api.post<PaymentInitResponse>('/payments/initiate', {
        orderId: order.id,
        callbackUrl,
      });

      if (payment.redirectUrl) {
        window.location.href = payment.redirectUrl;
      } else {
        navigate(`/checkout/callback?orderId=${order.id}&redirect=${encodeURIComponent(redirectAfter)}`);
      }
    },
    onError: (err: any) => {
      toast.error(err.message || t('common.error'));
    },
  });

  const PRODUCT_LABEL: Record<ProductType, string> = {
    CV: t('pricing.cv.name'),
    PORTFOLIO: t('pricing.portfolio.name'),
    BUNDLE: t('pricing.bundle.name'),
  };

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order summary */}
        <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-8">
          <h2 className="text-lg font-bold text-surface-900 mb-6">{t('checkout.orderSummary')}</h2>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-surface-900">{PRODUCT_LABEL[productType]}</span>
              <span className="font-bold text-surface-900">{basePrice ?? '—'} {t('pricing.sar')}</span>
            </div>
            <ul className="space-y-2">
              {PRODUCT_FEATURES[productType].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-surface-600">
                  <Check className="h-4 w-4 text-success-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Coupon */}
          <div className="border-t border-surface-100 pt-5 mb-6">
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-success-50 border border-success-200 rounded-lg px-4 py-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-success-600" />
                  <span className="text-sm font-medium text-success-700">{appliedCoupon}</span>
                </div>
                <button onClick={removeCoupon} className="text-xs text-surface-400 hover:text-surface-600">
                  {t('checkout.removeCoupon')}
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder={t('checkout.couponPlaceholder')}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
                  className="flex-1"
                />
                <Button variant="outline" size="sm" onClick={applyCoupon} disabled={!couponCode || couponLoading}>
                  {couponLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('checkout.applyCoupon')}
                </Button>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="border-t border-surface-200 pt-5">
            {appliedCoupon && basePrice !== null && finalPrice !== null && (
              <div className="flex justify-between text-sm text-surface-500 mb-2">
                <span>{t('checkout.discount')}</span>
                <span className="text-success-600">-{(basePrice - finalPrice).toFixed(0)} {t('pricing.sar')}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="font-bold text-surface-900">{t('checkout.total')}</span>
              <span className="text-2xl font-bold text-brand-600">{finalPrice ?? '—'} {t('pricing.sar')}</span>
            </div>
          </div>
        </div>

        {/* Payment section */}
        <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-8 flex flex-col">
          <h2 className="text-lg font-bold text-surface-900 mb-2">{t('checkout.paymentTitle')}</h2>
          <p className="text-sm text-surface-500 mb-8">{t('checkout.paymentSubtitle')}</p>

          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-surface-50 rounded-xl border border-surface-200">
                <CreditCard className="h-5 w-5 text-surface-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-surface-800">{t('checkout.securePay')}</p>
                  <p className="text-xs text-surface-400">{t('checkout.securePayDesc')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-surface-50 rounded-xl border border-surface-200">
                <ShieldCheck className="h-5 w-5 text-success-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-surface-800">{t('checkout.refundTitle')}</p>
                  <p className="text-xs text-surface-400">
                    {t('checkout.refundDesc')}{' '}
                    <Link to="/refund" className="text-brand-600 hover:underline">{t('checkout.refundPolicy')}</Link>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Button
                className="w-full"
                size="lg"
                onClick={() => orderMutation.mutate()}
                disabled={orderMutation.isPending || finalPrice === null}
              >
                {orderMutation.isPending ? (
                  <><Loader2 className="h-5 w-5 animate-spin me-2" />{t('checkout.processing')}</>
                ) : (
                  <>{t('checkout.payNow')} · {finalPrice} {t('pricing.sar')}</>
                )}
              </Button>
              <p className="text-xs text-center text-surface-400 mt-3">
                {t('checkout.termsNote')}{' '}
                <Link to="/terms" className="hover:underline">{t('checkout.terms')}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
