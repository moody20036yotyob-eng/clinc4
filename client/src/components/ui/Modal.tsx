import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  hideClose?: boolean;
}

function Modal({ open, onClose, title, description, children, size = 'md', hideClose }: ModalProps) {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-screen-xl',
  };

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-surface-950/40 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className={cn(
                  'fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%]',
                  'bg-white rounded-2xl shadow-modal overflow-hidden',
                  sizeClasses[size],
                  'mx-4',
                )}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {(title || !hideClose) && (
                  <div className="flex items-start justify-between p-6 pb-0">
                    <div>
                      {title && (
                        <Dialog.Title className="text-xl font-semibold text-surface-900">
                          {title}
                        </Dialog.Title>
                      )}
                      {description && (
                        <Dialog.Description className="text-sm text-surface-500 mt-1">
                          {description}
                        </Dialog.Description>
                      )}
                    </div>
                    {!hideClose && (
                      <Dialog.Close asChild>
                        <button
                          className="ms-4 rounded-lg p-1.5 text-surface-400 hover:text-surface-700 hover:bg-surface-100 transition-colors"
                          onClick={onClose}
                          aria-label="Close"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </Dialog.Close>
                    )}
                  </div>
                )}
                <div className="p-6">{children}</div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export { Modal };
