import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';

type State = 'polling' | 'success' | 'failed';

export default function PaymentCallbackPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const redirectAfter = searchParams.get('redirect') || '/dashboard/cvs';

  const [state, setState] = useState<State>('polling');
  const attempts = useRef(0);
  const maxAttempts = 12; // 12 × 5s = 60s max

  useEffect(() => {
    if (!orderId) {
      setState('failed');
      return;
    }

    let cancelled = false;

    async function poll() {
      try {
        const res = await api.get<{ status: string; paymentStatus: string }>(`/payments/status/${orderId}`);
        if (cancelled) return;

        if (res.paymentStatus === 'PAID') {
          setState('success');
          setTimeout(() => navigate(redirectAfter), 2000);
          return;
        }

        if (res.status === 'FAILED' || res.paymentStatus === 'FAILED') {
          setState('failed');
          return;
        }

        attempts.current += 1;
        if (attempts.current >= maxAttempts) {
          setState('failed');
          return;
        }

        setTimeout(poll, 5000);
      } catch {
        if (!cancelled) setState('failed');
      }
    }

    poll();
    return () => { cancelled = true; };
  }, [orderId, redirectAfter, navigate]);

  if (state === 'polling') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-surface-50">
        <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-10 flex flex-col items-center gap-5 max-w-sm w-full text-center">
          <div className="h-16 w-16 rounded-full bg-brand-50 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-surface-900 mb-2">{t('checkout.verifying')}</h1>
            <p className="text-sm text-surface-500">{t('checkout.verifyingDesc')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-surface-50">
        <div className="bg-white rounded-2xl border border-success-200 shadow-card p-10 flex flex-col items-center gap-5 max-w-sm w-full text-center">
          <div className="h-16 w-16 rounded-full bg-success-50 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-success-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-surface-900 mb-2">{t('checkout.success')}</h1>
            <p className="text-sm text-surface-500">{t('checkout.successDesc')}</p>
          </div>
          <Button onClick={() => navigate(redirectAfter)} className="w-full">
            {t('checkout.continue')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-surface-50">
      <div className="bg-white rounded-2xl border border-error-200 shadow-card p-10 flex flex-col items-center gap-5 max-w-sm w-full text-center">
        <div className="h-16 w-16 rounded-full bg-error-50 flex items-center justify-center">
          <XCircle className="h-8 w-8 text-error-500" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-surface-900 mb-2">{t('checkout.failed')}</h1>
          <p className="text-sm text-surface-500">{t('checkout.failedDesc')}</p>
        </div>
        <div className="flex gap-3 w-full">
          <Button variant="outline" onClick={() => navigate(-1)} className="flex-1">
            {t('common.back')}
          </Button>
          <Button onClick={() => navigate('/pricing')} className="flex-1">
            {t('checkout.tryAgain')}
          </Button>
        </div>
      </div>
    </div>
  );
}
