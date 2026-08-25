import { useTranslation } from 'react-i18next';
import { useCVStore } from '@/store/cvStore';
import type { CVSection } from '@shared/types/cv';

export function SummaryPanel({ section }: { section?: CVSection }) {
  const { t } = useTranslation();
  const { updateSection } = useCVStore();

  const value = (section?.content as string | undefined) || '';

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-surface-900 text-sm">{t('cvEditor.sections.summary')}</h3>
      <div>
        <label className="label">{t('cvEditor.fields.summary')}</label>
        <textarea
          className="input min-h-[160px] resize-y"
          value={value}
          onChange={(e) => section && updateSection(section.id, { content: e.target.value })}
          placeholder={t('cvEditor.placeholders.summary')}
        />
        <p className="text-xs text-surface-400 mt-1">{t('cvEditor.summaryHint')}</p>
      </div>
    </div>
  );
}
