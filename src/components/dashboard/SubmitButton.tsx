import { Icon } from '@iconify/react';
import React from 'react';

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  label?: string;
  loadingLabel?: string;
  icon?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading = false,
  label = 'Save Changes',
  loadingLabel = 'Saving...',
  icon = 'heroicons:check-20-solid',
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className={`
        flex-1 md:flex-none h-14 text-[14px] cursor-pointer px-10 py-3 bg-gray-900 text-white font-bold rounded-xl 
        hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 
        disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <Icon icon="line-md:loading-twotone-loop" className="w-5 h-5" />
      ) : (
        <Icon icon={icon} className="w-5 h-5" />
      )}
      {isLoading ? loadingLabel : label}
    </button>
  );
};

export default SubmitButton;
