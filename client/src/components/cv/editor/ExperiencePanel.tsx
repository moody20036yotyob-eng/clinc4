import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCVStore } from '@/store/cvStore';
import type { CVSection, ExperienceItem } from '@shared/types/cv';
import { cn } from '@/lib/utils';

export function ExperiencePanel({ section }: { section?: CVSection }) {
  const { t } = useTranslation();
  const { updateSection } = useCVStore();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const items: ExperienceItem[] = (section?.items as ExperienceItem[]) || [];

  const update = (newItems: ExperienceItem[]) => {
    if (section) updateSection(section.id, { items: newItems });
  };

  const addItem = () => {
    const newItem: ExperienceItem = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      bullets: [],
    };
    update([...items, newItem]);
    setOpenIdx(items.length);
  };

  const removeItem = (idx: number) => {
    update(items.filter((_, i) => i !== idx));
    setOpenIdx(null);
  };

  const updateItem = (idx: number, patch: Partial<ExperienceItem>) => {
    update(items.map((item, i) => i === idx ? { ...item, ...patch } : item));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-surface-900 text-sm">{t('cvEditor.sections.experience')}</h3>
        <Button size="xs" variant="outline" onClick={addItem}>
          <Plus className="h-3.5 w-3.5 me-1" /> {t('common.add')}
        </Button>
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={item.id} className="rounded-xl border border-surface-200 overflow-hidden">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-surface-700 hover:bg-surface-50"
            >
              <span className="truncate">{item.company || item.position || t('cvEditor.newExperience')}</span>
              {openIdx === idx ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
            </button>
            {openIdx === idx && (
              <div className="px-4 pb-4 space-y-3 border-t border-surface-100">
                <Input label={t('cvEditor.fields.company')} value={item.company} onChange={(e) => updateItem(idx, { company: e.target.value })} />
                <Input label={t('cvEditor.fields.position')} value={item.position} onChange={(e) => updateItem(idx, { position: e.target.value })} />
                <Input label={t('cvEditor.fields.location')} value={item.location || ''} onChange={(e) => updateItem(idx, { location: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <Input label={t('cvEditor.fields.startDate')} type="month" value={item.startDate} onChange={(e) => updateItem(idx, { startDate: e.target.value })} />
                  <Input
                    label={t('cvEditor.fields.endDate')}
                    type="month"
                    value={item.endDate || ''}
                    onChange={(e) => updateItem(idx, { endDate: e.target.value })}
                    disabled={item.current}
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-surface-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.current}
                    onChange={(e) => updateItem(idx, { current: e.target.checked, endDate: e.target.checked ? undefined : item.endDate })}
                    className="rounded border-surface-300"
                  />
                  {t('cvEditor.fields.current')}
                </label>
                <div>
                  <label className="label">{t('cvEditor.fields.description')}</label>
                  <textarea
                    className="input min-h-[100px] resize-y"
                    value={item.description || ''}
                    onChange={(e) => updateItem(idx, { description: e.target.value })}
                    placeholder={t('cvEditor.placeholders.experienceDesc')}
                  />
                </div>
                <Button variant="outline" size="xs" onClick={() => removeItem(idx)} className="text-error-600 border-error-200 hover:bg-error-50">
                  <Trash2 className="h-3.5 w-3.5 me-1" /> {t('common.remove')}
                </Button>
              </div>
            )}
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
