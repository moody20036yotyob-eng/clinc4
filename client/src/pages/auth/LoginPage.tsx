import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/Toast';
import type { AuthResponse } from '@shared/types/api';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthStore();
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.email) e.email = 'Email is required';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await api.post<AuthResponse>('/auth/login', form);
      setAuth(data.user, data.token);
      toast.success('Signed in successfully');
      navigate(from, { replace: true });
    } catch (err: any) {
      toast.error(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 mb-4">
            <LogIn className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-surface-900">{t('auth.login.title')}</h1>
          <p className="text-surface-500 mt-1 text-sm">{t('auth.login.subtitle')}</p>
        </div>

        <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label={t('auth.login.email')}
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
              placeholder="you@example.com"
            />
            <Input
              label={t('auth.login.password')}
              type={showPw ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
              placeholder="••••••••"
              rightIcon={
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-surface-400 hover:text-surface-600">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />
            <Button type="submit" className="w-full" isLoading={loading}>
              {t('auth.login.submit')}
            </Button>
          </form>

          <p className="text-center text-sm text-surface-500 mt-6">
            {t('auth.login.noAccount')}{' '}
            <Link to="/register" className="text-brand-600 font-medium hover:underline">
              {t('auth.login.register')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
