import { ChangeEvent } from 'react';
import cn from '@/tools/cn';

type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
};

export const Checkbox = ({ checked, onChange, label, className }: CheckboxProps) => {
  return (
    <label className={cn('flex items-center gap-2 cursor-pointer', className)}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={cn(
          "w-6 h-6 rounded border-2 transition-all duration-200",
          checked 
            ? "border-secondary bg-secondary" 
            : "border-gray-300 hover:border-secondary"
        )}>
          {checked && (
            <svg 
              className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          )}
        </div>
      </div>
      {label && <span>{label}</span>}
    </label>
  );
}; 