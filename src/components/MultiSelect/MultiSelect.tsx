import { useState, useRef, useEffect } from 'react';
import cn from '@/tools/cn';

type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  value: Option[];
  onChange: (selected: Option[]) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
};

export const MultiSelect = ({ value, onChange, options, placeholder, className }: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleOption = (option: Option) => {
    const isSelected = value.some(item => item.value === option.value);
    if (isSelected) {
      onChange(value.filter(item => item.value !== option.value));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div ref={wrapperRef} className={cn('relative', className)}>
      <div
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-secondary cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.length === 0 ? (
          <span className="text-gray-500">{placeholder || 'Виберіть опції'}</span>
        ) : (
          <div className="flex flex-wrap gap-1">
            {value.map(option => (
              <span
                key={option.value}
                className="bg-gray-100 px-2 py-1 rounded text-sm"
              >
                {option.label}
              </span>
            ))}
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map(option => (
            <div
              key={option.value}
              className={cn(
                'px-4 py-2 cursor-pointer hover:bg-gray-100',
                value.some(item => item.value === option.value) && 'bg-gray-100'
              )}
              onClick={() => toggleOption(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 