import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

type GradientButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
};

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-br from-[#003ec7] to-primary-container text-white shadow-lg shadow-primary-container/25 hover:shadow-primary-container/40 hover:brightness-110',
  secondary:
    'bg-surface-container-high text-on-surface border border-outline-variant/50 hover:border-primary/40 hover:bg-surface-container-highest',
  ghost: 'text-primary hover:bg-primary-container/10',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function GradientButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  type = 'button',
  ...props
}: GradientButtonProps) {
  return (
    <button
      type={type}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-semibold
        transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}
      `}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
}
