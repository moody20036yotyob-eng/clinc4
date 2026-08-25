import { create } from 'zustand';
import { CVData, DEFAULT_CV_DATA } from '@ecotrove/shared';
import { api } from '@/lib/api';
import { debounce } from '@/lib/utils';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface CVStore {
  cvId: string | null;
  templateId: string | null;
  templateSlug: string | null;
  data: CVData;
  saveStatus: SaveStatus;
  lastSaved: Date | null;

  setCVId: (id: string) => void;
  setTemplate: (id: string, slug: string) => void;
  setData: (data: CVData) => void;
  setCVData: (data: CVData, id: string, templateSlug: string) => void;
  updatePersonalInfo: (info: Partial<CVData['personalInfo']>) => void;
  updateSection: (sectionId: string, patch: Partial<CVData['sections'][number]>) => void;
  updateSettings: (settings: Partial<CVData['settings']>) => void;
  save: (id?: string) => Promise<void>;
  debouncedSave: () => void;
  reset: () => void;
}

let saveFn: (() => void) | null = null;

export const useCVStore = create<CVStore>((set, get) => {
  const save = async (overrideId?: string) => {
    const { cvId, data } = get();
    const id = overrideId || cvId;
    if (!id) return;
    set({ saveStatus: 'saving' });
    try {
      await api.put(`/cv/${id}`, { data });
      set({ saveStatus: 'saved', lastSaved: new Date() });
      setTimeout(() => set({ saveStatus: 'idle' }), 2000);
    } catch {
      set({ saveStatus: 'error' });
    }
  };

  saveFn = debounce(save as (...args: unknown[]) => unknown, 1500) as () => void;

  return {
    cvId: null,
    templateId: null,
    templateSlug: null,
    data: DEFAULT_CV_DATA,
    saveStatus: 'idle',
    lastSaved: null,

    setCVId: (id) => set({ cvId: id }),
    setTemplate: (id, slug) => set({ templateId: id, templateSlug: slug }),
    setData: (data) => { set({ data }); saveFn?.(); },

    setCVData: (data, id, templateSlug) => set({ data, cvId: id, templateSlug }),

    updatePersonalInfo: (info) => {
      set((state) => ({
        data: { ...state.data, personalInfo: { ...state.data.personalInfo, ...info } },
      }));
      saveFn?.();
    },

    updateSection: (sectionId, patch) => {
      set((state) => ({
        data: {
          ...state.data,
          sections: state.data.sections.map((s) =>
            s.id === sectionId ? { ...s, ...patch } : s
          ),
        },
      }));
      saveFn?.();
    },

    updateSettings: (settings) => {
      set((state) => ({
        data: { ...state.data, settings: { ...state.data.settings, ...settings } },
      }));
      saveFn?.();
    },

    save,
    debouncedSave: () => saveFn?.(),
    reset: () => set({ cvId: null, templateId: null, templateSlug: null, data: DEFAULT_CV_DATA, saveStatus: 'idle', lastSaved: null }),
  };
});
