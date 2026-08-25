import * as ToastPrimitive from '@radix-ui/react-toast';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { create } from 'zustand';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  add: (toast: Omit<Toast, 'id'>) => void;
  remove: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  add: (toast) => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, toast.duration || 4000);
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export const toast = {
  success: (title: string, description?: string) =>
    useToastStore.getState().add({ type: 'success', title, description }),
  error: (title: string, description?: string) =>
    useToastStore.getState().add({ type: 'error', title, description }),
  warning: (title: string, description?: string) =>
    useToastStore.getState().add({ type: 'warning', title, description }),
  info: (title: string, description?: string) =>
    useToastStore.getState().add({ type: 'info', title, description }),
};

const icons = {
  success: <CheckCircle2 className="h-5 w-5 text-success-600" />,
  error: <XCircle className="h-5 w-5 text-error-600" />,
  warning: <AlertCircle className="h-5 w-5 text-accent-600" />,
  info: <Info className="h-5 w-5 text-brand-600" />,
};

const styles = {
  success: 'border-success-200 bg-success-50',
  error: 'border-error-200 bg-error-50',
  warning: 'border-accent-200 bg-accent-50',
  info: 'border-brand-200 bg-brand-50',
};

function ToastProvider() {
  const { toasts, remove } = useToastStore();

  return (
    <ToastPrimitive.Provider>
      {toasts.map((t) => (
        <ToastPrimitive.Root
          key={t.id}
          open
          onOpenChange={(open) => !open && remove(t.id)}
          className={cn(
            'fixed bottom-4 end-4 z-[100] flex items-start gap-3 rounded-xl border p-4 shadow-elevated max-w-sm w-full',
            'data-[state=open]:animate-fade-up data-[state=closed]:animate-fade-in',
            styles[t.type],
          )}
        >
          {icons[t.type]}
          <div className="flex-1 min-w-0">
            <ToastPrimitive.Title className="text-sm font-semibold text-surface-900">
              {t.title}
            </ToastPrimitive.Title>
            {t.description && (
              <ToastPrimitive.Description className="text-xs text-surface-600 mt-0.5">
                {t.description}
              </ToastPrimitive.Description>
            )}
          </div>
          <ToastPrimitive.Close asChild>
            <button className="shrink-0 text-surface-400 hover:text-surface-700 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
      ))}
      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
}

export { ToastProvider };
