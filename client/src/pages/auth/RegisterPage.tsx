import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/Toast';
import type { AuthResponse } from '@shared/types/api';

export default function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await api.post<AuthResponse>('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      setAuth(data.user, data.token);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 mb-4">
            <UserPlus className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-surface-900">{t('auth.register.title')}</h1>
          <p className="text-surface-500 mt-1 text-sm">{t('auth.register.subtitle')}</p>
        </div>

        <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label={t('auth.register.name')}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={errors.name}
              placeholder="Your full name"
            />
            <Input
              label={t('auth.register.email')}
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
              placeholder="you@example.com"
            />
            <Input
              label={t('auth.register.password')}
              type={showPw ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
              placeholder="••••••••"
              hint="At least 8 characters"
              rightIcon={
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-surface-400 hover:text-surface-600">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />
            <Input
              label="Confirm Password"
              type={showPw ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
              placeholder="••••••••"
            />
            <Button type="submit" className="w-full" isLoading={loading}>
              {t('auth.register.submit')}
            </Button>
          </form>

          <p className="text-center text-sm text-surface-500 mt-6">
            {t('auth.register.hasAccount')}{' '}
            <Link to="/login" className="text-brand-600 font-medium hover:underline">
              {t('auth.register.login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
