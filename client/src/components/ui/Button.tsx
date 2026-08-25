import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none whitespace-nowrap',
  {
    variants: {
      variant: {
        primary: 'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-brand-sm hover:shadow-brand',
        secondary: 'bg-surface-100 text-surface-900 hover:bg-surface-200 border border-surface-200',
        outline: 'border-2 border-brand-600 text-brand-600 hover:bg-brand-50 active:bg-brand-100',
        ghost: 'text-surface-600 hover:bg-surface-100 hover:text-surface-900',
        danger: 'bg-error-600 text-white hover:bg-error-700',
        'outline-danger': 'border-2 border-error-500 text-error-600 hover:bg-error-50',
        link: 'text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline p-0 h-auto',
        white: 'bg-white text-surface-900 hover:bg-surface-50 shadow-subtle border border-surface-200',
        'brand-outline': 'border border-brand-200 text-brand-700 bg-brand-50 hover:bg-brand-100',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs',
        sm: 'h-9 px-3.5 text-sm',
        md: 'h-10 px-5 text-sm',
        lg: 'h-12 px-7 text-base',
        xl: 'h-14 px-9 text-lg',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        {children}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
