import { ChangeEvent } from 'react';
import { Select } from '../Select/Select';
import { SortOrder } from '@/utils/enums';

interface FiltersProps {
  selectedRegion: string;
  selectedCategory: string;
  sortBy: SortOrder;
  regions: { value: string; label: string; }[];
  categories: { value: string; label: string; }[];
  onRegionChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: SortOrder) => void;
}

export const Filters = ({
  selectedRegion,
  selectedCategory,
  sortBy,
  regions,
  categories,
  onRegionChange,
  onCategoryChange,
  onSortChange,
}: FiltersProps) => {
  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => onRegionChange(e.target.value);
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => onCategoryChange(e.target.value);
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => onSortChange(e.target.value as SortOrder);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Фільтри</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Область</label>
          <Select
            value={selectedRegion}
            onChange={handleRegionChange}
            options={regions}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Категорія</label>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={categories}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Сортування</label>
          <Select
            value={sortBy}
            onChange={handleSortChange}
            options={[
              { value: SortOrder.NEWEST, label: 'Найновіші' },
              { value: SortOrder.OLDEST, label: 'Найстаріші' },
            ]}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}; 