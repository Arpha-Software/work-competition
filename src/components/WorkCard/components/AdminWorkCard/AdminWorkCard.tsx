import WorkCard from '../../WorkCard';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import cn from '@/tools/cn';
import type { Work } from '@/utils/types';
import { Tag } from '../Tag';

type AdminWorkCardProps = {
  work: Work;
  isSelected: boolean;
  isSuperuser: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onPublish: () => void;
  onHide: () => void;
  onUpdate: () => void;
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
  onUpdate,
  className,
}: AdminWorkCardProps) => {
  return (
    <div
      className={cn(
        "group relative bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:border-primary transition-colors flex flex-col",
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

            {work.public && !work.hidden && (
              <Button
                variant="secondary"
                onClick={onHide}
                className="w-full sm:w-auto shadow-lg bg-white/90 hover:bg-white"
              >
                Приховати
              </Button>
            )}

            {work.public && work.hidden && (
              <Button
                variant="primary"
                onClick={onHide}
                className="w-full sm:w-auto shadow-lg"
              >
                Показати
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

      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <WorkCard.LikeCount count={work.likes} />

          <div className="min-w-0 mt-4">
            <WorkCard.Title title={work.title} />
            <WorkCard.Subtitle subtitle={work.subtitle} />
            {work.subcategory ? <WorkCard.Subtitle subtitle={work.subcategory} className='opacity-50'/> : null }
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Tag label={new Date(work.date).toLocaleString('uk-UA')} variant='secondary' />
            <Tag label={work.region} variant='primary' />
            <Tag
              label={
                work.public
                ? work.hidden
                  ? 'Приховано'
                  : 'Опубліковано'
                : 'Не опубліковано'
                }
              variant={
                work.public
                ? work.hidden
                  ? "hidden"
                  : "visible"
                : "non-public"
              }
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Button
            variant="secondary"
            onClick={() => window.open(work.fileAccessLink.url, '_blank')}
            className="w-full flex-1 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Відкрити файл
          </Button>
          {isSuperuser && (
            <Button
              variant="secondary"
              onClick={onUpdate}
              className="w-full flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Редагувати
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
