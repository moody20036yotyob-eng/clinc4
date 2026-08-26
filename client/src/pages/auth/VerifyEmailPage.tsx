import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

type State = 'loading' | 'success' | 'error';

export default function VerifyEmailPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    if (!token) { setState('error'); return; }
    api.post('/auth/verify-email', { token })
      .then(() => setState('success'))
      .catch(() => setState('error'));
  }, [token]);

  if (state === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-brand-500" />
          <p className="text-surface-500 text-sm">{t('auth.verifyingEmail')}</p>
        </div>
      </div>
    );
  }

  if (state === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 p-4">
        <div className="bg-white rounded-2xl border border-success-200 shadow-card p-10 w-full max-w-sm text-center">
          <div className="h-16 w-16 rounded-full bg-success-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="h-8 w-8 text-success-500" />
          </div>
          <h1 className="text-xl font-bold text-surface-900 mb-2">{t('auth.emailVerified')}</h1>
          <p className="text-sm text-surface-500 mb-6">{t('auth.emailVerifiedDesc')}</p>
          <Link to="/dashboard" className="btn-primary inline-block px-6 py-2 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700">
            {t('auth.goToDashboard')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 p-4">
      <div className="bg-white rounded-2xl border border-error-200 shadow-card p-10 w-full max-w-sm text-center">
        <div className="h-16 w-16 rounded-full bg-error-50 flex items-center justify-center mx-auto mb-5">
          <XCircle className="h-8 w-8 text-error-500" />
        </div>
        <h1 className="text-xl font-bold text-surface-900 mb-2">{t('auth.verificationFailed')}</h1>
        <p className="text-sm text-surface-500 mb-6">{t('auth.verificationFailedDesc')}</p>
        <Link to="/login" className="text-brand-600 hover:underline text-sm">{t('auth.backToLogin')}</Link>
      </div>
    </div>
  );
}
