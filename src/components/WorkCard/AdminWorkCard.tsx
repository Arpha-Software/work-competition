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
        "group relative bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:border-primary transition-colors",
        isSelected && "ring-2 ring-secondary",
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

      <div className="aspect-w-16 aspect-h-9 relative">
        <WorkCard.File fileAccessLink={work.fileAccessLink} />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2 p-4">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {!work.public && (
              <Button
                variant="primary"
                onClick={onPublish}
                className="w-full sm:w-auto shadow-lg"
              >
                Опублікувати
              </Button>
            )}
            {work.public && (
              <Button
                variant="secondary"
                onClick={onHide}
                className="w-full sm:w-auto shadow-lg bg-white/90 hover:bg-white"
              >
                Приховати
              </Button>
            )}
            {isSuperuser && (
              <Button
                variant="secondary"
                onClick={onDelete}
                className="w-full sm:w-auto shadow-lg bg-white/90 hover:bg-white"
              >
                Видалити
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900 truncate">{work.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{work.subtitle}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {work.region}
          </span>
          <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            work.public
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          )}>
            {work.public ? 'Опубліковано' : 'Приховано'}
          </span>
        </div>

        <div className="mt-4">
          <Button
            variant="secondary"
            onClick={() => window.open(work.fileAccessLink.url, '_blank')}
            className="w-full flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Відкрити файл
          </Button>
        </div>
      </div>
    </div>
  );
}; 