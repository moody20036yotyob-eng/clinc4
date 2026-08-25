import { useTranslation } from 'react-i18next';
import { useCVStore } from '@/store/cvStore';

export function SummaryPanel() {
  const { t } = useTranslation();
  const { data, updatePersonalInfo } = useCVStore();
  const value = data?.personalInfo?.summary || '';

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-surface-900 text-sm">{t('cvEditor.sections.summary')}</h3>
      <div>
        <label className="label">{t('cvEditor.fields.summary')}</label>
        <textarea
          className="input min-h-[160px] resize-y"
          value={value}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          placeholder={t('cvEditor.placeholders.summary')}
        />
        <p className="text-xs text-surface-400 mt-1">{t('cvEditor.summaryHint')}</p>
      </div>
    </div>
  );
}
