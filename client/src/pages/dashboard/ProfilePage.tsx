import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { User, Lock, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/Toast';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user, refreshUser } = useAuthStore();

  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '' });
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [pwErrors, setPwErrors] = useState<Record<string, string>>({});

  const profileMutation = useMutation({
    mutationFn: () => api.put('/auth/profile', { name: profile.name }),
    onSuccess: () => { refreshUser(); toast.success(t('profile.updated')); },
    onError: (err: any) => toast.error(err.message || t('common.error')),
  });

  const passwordMutation = useMutation({
    mutationFn: () => api.post('/auth/change-password', { currentPassword: passwords.current, newPassword: passwords.next }),
    onSuccess: () => { setPasswords({ current: '', next: '', confirm: '' }); toast.success(t('profile.passwordUpdated')); },
    onError: (err: any) => toast.error(err.message || t('common.error')),
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!passwords.current) errs.current = t('auth.required');
    if (passwords.next.length < 8) errs.next = t('auth.passwordMin');
    if (passwords.next !== passwords.confirm) errs.confirm = t('auth.passwordMismatch');
    setPwErrors(errs);
    if (!Object.keys(errs).length) passwordMutation.mutate();
  };

  return (
    <div className="section-padding">
      <div className="container-tight max-w-2xl">
        <h1 className="text-2xl font-bold text-surface-900 mb-8">{t('dashboard.profile')}</h1>

        {/* Profile info */}
        <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="h-5 w-5 text-surface-400" />
            <h2 className="text-lg font-semibold text-surface-900">{t('profile.personalInfo')}</h2>
          </div>
          <div className="space-y-4">
            <Input
              label={t('auth.name')}
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <Input
              label={t('auth.email')}
              value={profile.email}
              disabled
              hint={t('profile.emailCannotChange')}
            />
            <Button
              onClick={() => profileMutation.mutate()}
              isLoading={profileMutation.isPending}
              className="w-full sm:w-auto"
            >
              <Save className="h-4 w-4 me-2" /> {t('common.save')}
            </Button>
          </div>
        </div>

        {/* Change password */}
        <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-5 w-5 text-surface-400" />
            <h2 className="text-lg font-semibold text-surface-900">{t('profile.changePassword')}</h2>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              label={t('profile.currentPassword')}
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              error={pwErrors.current}
            />
            <Input
              label={t('profile.newPassword')}
              type="password"
              value={passwords.next}
              onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
              error={pwErrors.next}
            />
            <Input
              label={t('auth.confirmPassword')}
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              error={pwErrors.confirm}
            />
            <Button type="submit" isLoading={passwordMutation.isPending} className="w-full sm:w-auto">
              {t('profile.updatePassword')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
