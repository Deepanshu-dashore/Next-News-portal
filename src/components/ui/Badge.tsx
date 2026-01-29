import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-[#F3F4F6] text-[#6B7280]',
    accent: 'bg-[#111827] text-white',
  };
  
  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wider',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
