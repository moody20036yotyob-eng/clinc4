import { create } from 'zustand';
import { PortfolioData, DEFAULT_PORTFOLIO_DATA } from '@shared/types/portfolio';
import { api } from '@/lib/api';
import { debounce } from '@/lib/utils';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface PortfolioStore {
  portfolioId: string | null;
  templateId: string | null;
  templateSlug: string | null;
  data: PortfolioData;
  saveStatus: SaveStatus;
  isPublished: boolean;
  slug: string | null;

  setPortfolioId: (id: string) => void;
  setTemplate: (id: string, slug: string) => void;
  setData: (data: PortfolioData) => void;
  setPortfolioData: (data: PortfolioData, id: string, templateSlug: string) => void;
  updatePersonal: (personal: Partial<PortfolioData['personal']>) => void;
  updatePersonalInfo: (personal: Partial<PortfolioData['personal']>) => void;
  updateSection: (sectionId: string, patch: Partial<PortfolioData['sections'][number]>) => void;
  updateSettings: (settings: Partial<PortfolioData['settings']>) => void;
  setPublished: (published: boolean, slug?: string) => void;
  save: (id?: string) => Promise<void>;
  debouncedSave: () => void;
  reset: () => void;
}

let saveFn: (() => void) | null = null;

export const usePortfolioStore = create<PortfolioStore>((set, get) => {
  const save = async (overrideId?: string) => {
    const { portfolioId, data } = get();
    const id = overrideId || portfolioId;
    if (!id) return;
    set({ saveStatus: 'saving' });
    try {
      await api.put(`/portfolio/${id}`, { data });
      set({ saveStatus: 'saved' });
      setTimeout(() => set({ saveStatus: 'idle' }), 2000);
    } catch {
      set({ saveStatus: 'error' });
    }
  };

  saveFn = debounce(save as (...args: unknown[]) => unknown, 1500) as () => void;

  return {
    portfolioId: null,
    templateId: null,
    templateSlug: null,
    data: DEFAULT_PORTFOLIO_DATA,
    saveStatus: 'idle',
    isPublished: false,
    slug: null,

    setPortfolioId: (id) => set({ portfolioId: id }),
    setTemplate: (id, slug) => set({ templateId: id, templateSlug: slug }),
    setData: (data) => { set({ data }); saveFn?.(); },

    setPortfolioData: (data, id, templateSlug) => set({ data, portfolioId: id, templateSlug }),

    updatePersonal: (personal) => {
      set((state) => ({ data: { ...state.data, personal: { ...state.data.personal, ...personal } } }));
      saveFn?.();
    },
    updatePersonalInfo: (personal) => {
      set((state) => ({ data: { ...state.data, personal: { ...state.data.personal, ...personal } } }));
      saveFn?.();
    },
    updateSection: (sectionId, patch) => {
      set((state) => ({
        data: {
          ...state.data,
          sections: state.data.sections.map((s: any) =>
            s.id === sectionId ? { ...s, ...patch } : s
          ),
        },
      }));
      saveFn?.();
    },
    updateSettings: (settings) => {
      set((state) => ({ data: { ...state.data, settings: { ...state.data.settings, ...settings } } }));
      saveFn?.();
    },
    setPublished: (published, slug) => set({ isPublished: published, ...(slug ? { slug } : {}) }),
    save,
    debouncedSave: () => saveFn?.(),
    reset: () => set({
      portfolioId: null, templateId: null, templateSlug: null,
      data: DEFAULT_PORTFOLIO_DATA, saveStatus: 'idle', isPublished: false, slug: null,
    }),
  };
});
