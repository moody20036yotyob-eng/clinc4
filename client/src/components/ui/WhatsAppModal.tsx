import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { Modal } from './Modal';
import { WhatsAppButton } from './WhatsAppButton';

interface WhatsAppModalProps {
  open: boolean;
  onClose: () => void;
  type: 'customCV' | 'customPortfolio' | 'general';
}

function WhatsAppModal({ open, onClose, type }: WhatsAppModalProps) {
  const { t } = useTranslation();
  const key = type === 'general' ? 'customCV' : type;

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="text-center space-y-5">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 mx-auto">
          <Sparkles className="h-7 w-7" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-surface-900">{t(`whatsapp.${key}.title`)}</h2>
          <p className="text-surface-500 mt-2 text-sm leading-relaxed">
            {t(`whatsapp.${key}.description`)}
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 bg-accent-50 text-accent-700 text-sm font-medium px-3 py-1.5 rounded-full border border-accent-100">
            <Sparkles className="h-3.5 w-3.5" />
            {t(`whatsapp.${key}.priceRange`)}
          </div>
        </div>

        <div className="space-y-3">
          <WhatsAppButton fullWidth size="lg" />
          <p className="text-xs text-surface-400">{t('whatsapp.note')}</p>
        </div>
      </div>
    </Modal>
  );
}

export { WhatsAppModal };
