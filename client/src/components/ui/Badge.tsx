import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full text-xs font-medium px-2.5 py-0.5 border',
  {
    variants: {
      variant: {
        brand: 'bg-brand-50 text-brand-700 border-brand-100',
        success: 'bg-success-50 text-success-700 border-success-100',
        accent: 'bg-accent-50 text-accent-700 border-accent-100',
        surface: 'bg-surface-100 text-surface-600 border-surface-200',
        error: 'bg-error-50 text-error-700 border-error-100',
        dark: 'bg-surface-900 text-white border-transparent',
        white: 'bg-white text-surface-700 border-surface-200 shadow-subtle',
      },
    },
    defaultVariants: { variant: 'surface' },
  },
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
