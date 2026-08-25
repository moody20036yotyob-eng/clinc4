import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCVStore } from '@/store/cvStore';
import type { CVSection, EducationItem } from '@shared/types/cv';

export function EducationPanel({ section }: { section?: CVSection }) {
  const { t } = useTranslation();
  const { updateSection } = useCVStore();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const items: EducationItem[] = (section?.items as EducationItem[]) || [];

  const update = (newItems: EducationItem[]) => {
    if (section) updateSection(section.id, { items: newItems });
  };

  const addItem = () => {
    const item: EducationItem = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: '',
    };
    update([...items, item]);
    setOpenIdx(items.length);
  };

  const removeItem = (idx: number) => { update(items.filter((_, i) => i !== idx)); setOpenIdx(null); };
  const updateItem = (idx: number, patch: Partial<EducationItem>) =>
    update(items.map((it, i) => i === idx ? { ...it, ...patch } : it));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-surface-900 text-sm">{t('cvEditor.sections.education')}</h3>
        <Button size="xs" variant="outline" onClick={addItem}><Plus className="h-3.5 w-3.5 me-1" /> {t('common.add')}</Button>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={item.id} className="rounded-xl border border-surface-200 overflow-hidden">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-surface-700 hover:bg-surface-50"
            >
              <span className="truncate">{item.institution || item.degree || t('cvEditor.newEducation')}</span>
              {openIdx === idx ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
            </button>
            {openIdx === idx && (
              <div className="px-4 pb-4 space-y-3 border-t border-surface-100">
                <Input label={t('cvEditor.fields.institution')} value={item.institution} onChange={(e) => updateItem(idx, { institution: e.target.value })} />
                <Input label={t('cvEditor.fields.degree')} value={item.degree} onChange={(e) => updateItem(idx, { degree: e.target.value })} />
                <Input label={t('cvEditor.fields.field')} value={item.field || ''} onChange={(e) => updateItem(idx, { field: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <Input label={t('cvEditor.fields.startDate')} type="month" value={item.startDate} onChange={(e) => updateItem(idx, { startDate: e.target.value })} />
                  <Input label={t('cvEditor.fields.endDate')} type="month" value={item.endDate || ''} onChange={(e) => updateItem(idx, { endDate: e.target.value })} disabled={item.current} />
                </div>
                <label className="flex items-center gap-2 text-sm text-surface-600 cursor-pointer">
                  <input type="checkbox" checked={item.current} onChange={(e) => updateItem(idx, { current: e.target.checked })} className="rounded border-surface-300" />
                  {t('cvEditor.fields.current')}
                </label>
                <Input label={t('cvEditor.fields.gpa')} value={item.gpa || ''} onChange={(e) => updateItem(idx, { gpa: e.target.value })} placeholder="3.8/4.0" />
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
