import { ChangeEvent, useState, useRef, useEffect } from 'react';
import cn from '@/tools/cn';
import { ChevronDown } from 'lucide-react';

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
};

export const Select = ({ value, onChange, options, className }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(option => option.value === value) || options[0];

  return (
    <div ref={selectRef} className={cn('relative', className)}>
      <div
        className={cn(
          'w-full px-4 py-2 border-2 border-gray-300 rounded-md',
          'flex items-center justify-between cursor-pointer',
          'hover:border-gray-400 focus:border-secondary',
          'transition-colors duration-200'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-900">{selectedOption?.label}</span>
        <ChevronDown 
          className={cn(
            'w-5 h-5 text-gray-500 transition-transform duration-200',
            isOpen && 'transform rotate-180'
          )} 
        />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                'px-4 py-2 cursor-pointer hover:bg-gray-100',
                'transition-colors duration-200',
                value === option.value && 'bg-gray-100'
              )}
              onClick={() => {
                onChange({ target: { value: option.value } } as ChangeEvent<HTMLSelectElement>);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 