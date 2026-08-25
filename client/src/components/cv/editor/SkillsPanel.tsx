import { useTranslation } from 'react-i18next';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCVStore } from '@/store/cvStore';
import type { CVSection, SkillItem } from '@shared/types/cv';

export function SkillsPanel({ section }: { section?: CVSection }) {
  const { t } = useTranslation();
  const { updateSection } = useCVStore();
  const [newSkill, setNewSkill] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const items: SkillItem[] = (section?.items as SkillItem[]) || [];

  const update = (newItems: SkillItem[]) => {
    if (section) updateSection(section.id, { items: newItems });
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    const item: SkillItem = {
      id: crypto.randomUUID(),
      name: newSkill.trim(),
      level: 'intermediate',
      category: newCategory.trim() || undefined,
    };
    update([...items, item]);
    setNewSkill('');
  };

  const removeSkill = (id: string) => update(items.filter((s) => s.id !== id));
  const updateLevel = (id: string, level: SkillItem['level']) =>
    update(items.map((s) => s.id === id ? { ...s, level } : s));

  const categories = [...new Set(items.map((s) => s.category || 'General'))];

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-surface-900 text-sm">{t('cvEditor.sections.skills')}</h3>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder={t('cvEditor.placeholders.skillName')}
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
          />
        </div>
        <Button size="sm" variant="outline" onClick={addSkill}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Input
        placeholder={t('cvEditor.placeholders.skillCategory')}
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        hint={t('cvEditor.skillCategoryHint')}
      />

      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat}>
            <p className="text-xs font-medium text-surface-400 uppercase tracking-wide mb-2">{cat}</p>
            <div className="flex flex-wrap gap-2">
              {items.filter((s) => (s.category || 'General') === cat).map((skill) => (
                <div key={skill.id} className="flex items-center gap-1.5 bg-surface-100 rounded-lg px-2.5 py-1.5 group">
                  <span className="text-sm text-surface-700">{skill.name}</span>
                  <select
                    value={skill.level || 'intermediate'}
                    onChange={(e) => updateLevel(skill.id, e.target.value as SkillItem['level'])}
                    className="text-xs text-surface-400 bg-transparent border-none outline-none cursor-pointer"
                  >
                    {['beginner', 'intermediate', 'advanced', 'expert'].map((l) => (
                      <option key={l} value={l}>{t(`cvEditor.levels.${l}`, l)}</option>
                    ))}
                  </select>
                  <button onClick={() => removeSkill(skill.id)} className="text-surface-400 hover:text-error-500 transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-6 text-surface-400 text-sm border border-dashed border-surface-200 rounded-xl">
            {t('cvEditor.noSkills')}
          </div>
        )}
      </div>
    </div>
  );
}
