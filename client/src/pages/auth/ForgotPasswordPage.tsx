import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { api } from '@/lib/api';

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
    } catch (err: any) {
      setError(err.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 p-4">
        <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-10 w-full max-w-sm text-center">
          <div className="h-16 w-16 rounded-full bg-success-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="h-8 w-8 text-success-500" />
          </div>
          <h1 className="text-xl font-bold text-surface-900 mb-2">{t('auth.resetEmailSent')}</h1>
          <p className="text-sm text-surface-500 mb-6">{t('auth.resetEmailSentDesc', { email })}</p>
          <Link to="/login" className="text-sm text-brand-600 hover:underline flex items-center justify-center gap-1">
            <ArrowLeft className="h-4 w-4" /> {t('auth.backToLogin')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 p-4">
      <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-10 w-full max-w-sm">
        <div className="h-12 w-12 rounded-xl bg-brand-50 flex items-center justify-center mb-6">
          <Mail className="h-6 w-6 text-brand-600" />
        </div>
        <h1 className="text-2xl font-bold text-surface-900 mb-2">{t('auth.forgotPassword')}</h1>
        <p className="text-sm text-surface-500 mb-8">{t('auth.forgotPasswordDesc')}</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="email"
            label={t('auth.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          {error && <p className="text-sm text-error-600">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading || !email}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin me-2" /> : null}
            {t('auth.sendResetLink')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-brand-600 hover:underline flex items-center justify-center gap-1">
            <ArrowLeft className="h-4 w-4" /> {t('auth.backToLogin')}
          </Link>
        </div>
      </div>
    </div>
  );
}
