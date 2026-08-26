import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { KeyRound, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/Toast';

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 p-4">
        <div className="text-center">
          <p className="text-surface-500 mb-4">{t('auth.invalidResetToken')}</p>
          <Link to="/forgot-password" className="text-brand-600 hover:underline text-sm">
            {t('auth.requestNewLink')}
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError(t('auth.passwordMismatch'));
      return;
    }
    if (password.length < 8) {
      setError(t('auth.passwordTooShort'));
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { token, password });
      setDone(true);
      toast.success(t('auth.passwordResetSuccess'));
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 p-4">
        <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-10 w-full max-w-sm text-center">
          <div className="h-16 w-16 rounded-full bg-success-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="h-8 w-8 text-success-500" />
          </div>
          <h1 className="text-xl font-bold text-surface-900 mb-2">{t('auth.passwordResetSuccess')}</h1>
          <p className="text-sm text-surface-500">{t('auth.redirectingToLogin')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 p-4">
      <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-10 w-full max-w-sm">
        <div className="h-12 w-12 rounded-xl bg-brand-50 flex items-center justify-center mb-6">
          <KeyRound className="h-6 w-6 text-brand-600" />
        </div>
        <h1 className="text-2xl font-bold text-surface-900 mb-2">{t('auth.resetPassword')}</h1>
        <p className="text-sm text-surface-500 mb-8">{t('auth.resetPasswordDesc')}</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="password"
            label={t('auth.newPassword')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            minLength={8}
          />
          <Input
            type="password"
            label={t('auth.confirmPassword')}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          {error && <p className="text-sm text-error-600">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading || !password || !confirm}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin me-2" /> : null}
            {t('auth.setNewPassword')}
          </Button>
        </form>
      </div>
    </div>
  );
}
