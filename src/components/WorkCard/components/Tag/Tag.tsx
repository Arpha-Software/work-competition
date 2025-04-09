import cn from '@/tools/cn';

type TProps = {
  label: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'hidden' | 'visible' | 'non-public' | 'secondary';
  className?: string;
}

export const Tag = ({
  label,
  variant = 'primary',
}: TProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-100 text-blue-800';
      case 'secondary':
        return 'bg-blue-50 text-blue-600';
      case 'hidden':
        return 'bg-yellow-100 text-yellow-800';
      case 'visible':
        return 'bg-green-100 text-green-800';
      case 'non-public':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-primary text-white';
    }
  };

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ", getVariantClasses())}>
      {label}
    </span>
  );
};
