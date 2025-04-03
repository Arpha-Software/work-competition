interface AdminTabsProps {
  activeTab: 'works' | 'moderators';
  isSuperuser: boolean;
  onTabChange: (tab: 'works' | 'moderators') => void;
}

export const AdminTabs = ({ activeTab, isSuperuser, onTabChange }: AdminTabsProps) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
        <button
          onClick={() => onTabChange('works')}
          className={`${
            activeTab === 'works'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
        >
          Роботи
        </button>
        {isSuperuser && (
          <button
            onClick={() => onTabChange('moderators')}
            className={`${
              activeTab === 'moderators'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
          >
            Модератори
          </button>
        )}
      </nav>
    </div>
  );
}; 