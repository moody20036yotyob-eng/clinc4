import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { generateWhatsAppUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PublicConfig {
  whatsappNumber: string;
  companyEmail: string;
  portfolioBaseUrl: string;
}

function useWhatsAppNumber() {
  const { data } = useQuery({
    queryKey: ['public-config'],
    queryFn: () => api.get<PublicConfig>('/settings/public'),
    staleTime: 5 * 60 * 1000,
  });
  return data?.whatsappNumber || '966500000000';
}

interface WhatsAppButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'green' | 'outline' | 'ghost';
  label?: string;
  fullWidth?: boolean;
}

function WhatsAppButton({ className, size = 'md', variant = 'green', label, fullWidth }: WhatsAppButtonProps) {
  const { t } = useTranslation();
  const phone = useWhatsAppNumber();

  const handleClick = () => {
    window.open(generateWhatsAppUrl(phone), '_blank', 'noopener,noreferrer');
  };

  const sizeMap = { sm: 'sm', md: 'md', lg: 'lg' } as const;

  return (
    <Button
      onClick={handleClick}
      size={sizeMap[size]}
      className={cn(
        variant === 'green' && 'bg-[#25D366] hover:bg-[#22c25d] text-white shadow-md hover:shadow-lg',
        variant === 'outline' && 'border-2 border-[#25D366] text-[#25D366] hover:bg-[#f0fdf4]',
        variant === 'ghost' && 'text-[#25D366] hover:bg-[#f0fdf4]',
        fullWidth && 'w-full',
        className,
      )}
      leftIcon={<MessageCircle className="h-5 w-5" />}
    >
      {label || t('whatsapp.button')}
    </Button>
  );
}

export { WhatsAppButton, useWhatsAppNumber };
