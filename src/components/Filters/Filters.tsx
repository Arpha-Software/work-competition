import { ChangeEvent } from 'react';
import { Select } from '../Select/Select';

interface FiltersProps {
  selectedRegion: string;
  selectedCategory: string;
  sortBy: string;
  regions: { value: string; label: string; }[];
  categories: { value: string; label: string; }[];
  onRegionChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
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
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => onSortChange(e.target.value);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <Select
        value={selectedRegion}
        onChange={handleRegionChange}
        options={regions}
        className="w-full md:w-1/3"
      />
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        options={categories}
        className="w-full md:w-1/3"
      />
      <Select
        value={sortBy}
        onChange={handleSortChange}
        options={[
          { value: 'newest', label: 'Спочатку нові' },
          { value: 'oldest', label: 'Спочатку старі' },
        ]}
        className="w-full md:w-1/3"
      />
    </div>
  );
}; 