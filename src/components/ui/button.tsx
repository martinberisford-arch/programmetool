import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'secondary' | 'destructive';
};

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nhs-blue disabled:cursor-not-allowed disabled:opacity-50',
        {
          'bg-nhs-blue text-white hover:bg-blue-700': variant === 'default',
          'border border-slate-300 bg-white text-slate-900 hover:bg-slate-100': variant === 'outline',
          'bg-slate-100 text-slate-900 hover:bg-slate-200': variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-700': variant === 'destructive'
        },
        className
      )}
      {...props}
    />
  );
}
