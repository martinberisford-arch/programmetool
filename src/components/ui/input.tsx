import * as React from 'react';
import { cn } from '@/lib/utils';

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-nhs-blue focus:outline-none focus:ring-2 focus:ring-nhs-blue/20',
        className
      )}
      {...props}
    />
  );
}
