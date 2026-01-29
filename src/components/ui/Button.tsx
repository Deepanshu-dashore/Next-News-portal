import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  onClick, 
  className,
  type = 'button' 
}: ButtonProps) {
  const baseStyles = 'inline-flex cursor-pointer items-center justify-center font-bold transition-all rounded-full uppercase tracking-wider';
  
  const variants = {
    primary: 'bg-(--accent-primary) text-white hover:bg-black shadow-md',
    secondary: 'border-2 border-(--text-primary) text-(--text-primary) hover:bg-(--text-primary) hover:text-white',
    ghost: 'hover:bg-gray-100 text-(--text-secondary)',
  };
  
  const sizes = {
    sm: 'h-9 px-6 text-[10px]',
    md: 'h-11 px-8 text-xs',
    lg: 'h-14 px-10 text-sm',
  };
  
  const classes = cn(baseStyles, variants[variant], sizes[size], className);
  
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
