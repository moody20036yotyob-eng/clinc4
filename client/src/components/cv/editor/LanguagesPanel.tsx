import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCVStore } from '@/store/cvStore';
import type { CVSection, LanguageItem } from '@shared/types/cv';

const LEVELS = ['native', 'fluent', 'advanced', 'intermediate', 'basic'];

export function LanguagesPanel({ section }: { section?: CVSection }) {
  const { t } = useTranslation();
  const { updateSection } = useCVStore();

  const items: LanguageItem[] = (section?.items as LanguageItem[]) || [];

  const update = (newItems: LanguageItem[]) => {
    if (section) updateSection(section.id, { items: newItems });
  };

  const addItem = () => update([...items, { id: crypto.randomUUID(), name: '', level: 'intermediate' }]);
  const removeItem = (id: string) => update(items.filter((l) => l.id !== id));
  const updateItem = (id: string, patch: Partial<LanguageItem>) =>
    update(items.map((l) => l.id === id ? { ...l, ...patch } : l));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-surface-900 text-sm">{t('cvEditor.sections.languages')}</h3>
        <Button size="xs" variant="outline" onClick={addItem}><Plus className="h-3.5 w-3.5 me-1" /> {t('common.add')}</Button>
      </div>
      <div className="space-y-2">
        {items.map((lang) => (
          <div key={lang.id} className="flex items-end gap-2">
            <div className="flex-1">
              <Input
                placeholder={t('cvEditor.placeholders.language')}
                value={lang.name}
                onChange={(e) => updateItem(lang.id, { name: e.target.value })}
              />
            </div>
            <select
              value={lang.level}
              onChange={(e) => updateItem(lang.id, { level: e.target.value as LanguageItem['level'] })}
              className="input w-32"
            >
              {LEVELS.map((l) => (
                <option key={l} value={l}>{t(`cvEditor.levels.${l}`, l)}</option>
              ))}
            </select>
            <button onClick={() => removeItem(lang.id)} className="p-2 text-surface-400 hover:text-error-500 transition-colors mb-0.5">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-6 text-surface-400 text-sm border border-dashed border-surface-200 rounded-xl">
            {t('cvEditor.noItems')}
          </div>
        )}
      </div>
    </div>
  );
}
