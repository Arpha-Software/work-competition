import WorkCard from './WorkCard';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import cn from '@/tools/cn';

type AdminWorkCardProps = {
  work: {
    id: number;
    title: string;
    subtitle: string;
    fileAccessLink: {
      accessType: string;
      url: string;
      mimeType: string;
    };
    likes: number;
    date: string;
    region: string;
    public: boolean;
    isVisible: boolean;
  };
  isSelected: boolean;
  isSuperuser: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onPublish: () => void;
  onHide: () => void;
  className?: string;
};

export const AdminWorkCard = ({
  work,
  isSelected,
  isSuperuser,
  onSelect,
  onDelete,
  onPublish,
  onHide,
  className,
}: AdminWorkCardProps) => {
  return (
    <div 
      className={cn(
        "relative group h-full",
        isSelected && "ring-2 ring-secondary rounded-lg",
        className
      )}
    >
      <div className="absolute top-2 right-2 z-10">
        <Checkbox
          checked={isSelected}
          onChange={onSelect}
          label=""
          className="bg-white/90 p-1"
        />
      </div>
      <WorkCard className="h-full rounded-lg">
        <WorkCard.File fileAccessLink={work.fileAccessLink} />
        <div className="p-4">
          <WorkCard.Subtitle subtitle={work.region} />
          <WorkCard.Title title={work.title} />
          <div className="text-sm text-gray-600 mb-2">
            {work.subtitle}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              {new Date(work.date).toLocaleDateString('uk-UA')}
            </div>
            <div className="flex gap-2">
              {isSuperuser && (
                <>
                  {!work.public && (
                    <Button
                      variant="primary"
                      onClick={onPublish}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Опублікувати
                    </Button>
                  )}
                  {work.public && (
                    <Button
                      variant="secondary"
                      onClick={onHide}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Приховати
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    onClick={onDelete}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Видалити
                  </Button>
                </>
              )}
            </div>
          </div>
          {work.public && (
            <div className="mt-2 text-sm text-green-600">
              Опубліковано
            </div>
          )}
        </div>
      </WorkCard>
    </div>
  );
}; 