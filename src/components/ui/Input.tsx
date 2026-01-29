import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full h-12 px-4 rounded-lg border border-[#E5E7EB] bg-white',
        'text-[#111827] placeholder:text-[#6B7280]',
        'focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent',
        'transition-all',
        className
      )}
      {...props}
    />
  );
}
