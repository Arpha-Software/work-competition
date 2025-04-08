import { Button } from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import cn from '@/tools/cn';

type ActionButtonsProps = {
  selectedWorksCount: number;
  onPublish: () => void;
  onHide: () => void;
};

export const ActionButtons = ({
  selectedWorksCount,
  onPublish,
  onHide,
}: ActionButtonsProps) => {
  return (
    <div className={cn(
      "fixed bottom-8 right-8 flex gap-4 transition-all duration-300 z-50",
      selectedWorksCount === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
    )}>
      <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col gap-4">
        <div className="text-sm text-gray-600">
          Обрано робіт: {selectedWorksCount}
        </div>
        <div className="flex gap-4">
          <Button
            onClick={onPublish}
            variant="primary"
            className="min-w-[120px]"
          >
            Опублікувати
          </Button>
          <Button
            variant="secondary"
            onClick={onHide}
            className="min-w-[120px]"
          >
            Приховати
          </Button>
        </div>
      </div>
    </div>
  );
}; 