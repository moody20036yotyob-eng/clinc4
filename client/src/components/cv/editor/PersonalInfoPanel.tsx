import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/Input';
import { useCVStore } from '@/store/cvStore';

export function PersonalInfoPanel() {
  const { t } = useTranslation();
  const { data, updatePersonalInfo } = useCVStore();
  const info = data?.personalInfo;

  if (!info) return null;

  const field = (key: keyof typeof info, label: string, type = 'text', placeholder = '') => (
    <Input
      label={label}
      type={type}
      value={(info[key] as string) || ''}
      onChange={(e) => updatePersonalInfo({ [key]: e.target.value })}
      placeholder={placeholder}
    />
  );

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-surface-900 text-sm mb-4">{t('cvEditor.sections.personal')}</h3>
      {field('fullName', t('cvEditor.fields.fullName'), 'text', t('cvEditor.placeholders.fullName'))}
      {field('jobTitle', t('cvEditor.fields.jobTitle'), 'text', t('cvEditor.placeholders.jobTitle'))}
      {field('email', t('cvEditor.fields.email'), 'email', 'email@example.com')}
      {field('phone', t('cvEditor.fields.phone'), 'tel', '+966 5x xxx xxxx')}
      {field('location', t('cvEditor.fields.location'), 'text', t('cvEditor.placeholders.location'))}
      {field('website', t('cvEditor.fields.website'), 'url', 'https://yoursite.com')}
      {field('linkedin', t('cvEditor.fields.linkedin'), 'url', 'https://linkedin.com/in/...')}
      {field('github', t('cvEditor.fields.github'), 'url', 'https://github.com/...')}
      <div className="space-y-1">
        <label className="label">{t('cvEditor.fields.photo')}</label>
        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-surface-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 transition-colors"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => updatePersonalInfo({ photo: ev.target?.result as string });
            reader.readAsDataURL(file);
          }}
        />
        {info.photo && (
          <img src={info.photo} alt="Photo" className="h-16 w-16 rounded-full object-cover mt-2 border-2 border-surface-200" />
        )}
      </div>
    </div>
  );
}
