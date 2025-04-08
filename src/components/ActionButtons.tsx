import type { Work } from '@/utils/types';
import { Button } from './Button';

interface ActionButtonsProps {
  selectedWorksCount: number;
  onPublish: () => void;
  onHide: () => void;
  works: Work[];
}

export const ActionButtons = ({ selectedWorksCount, onPublish, onHide, works }: ActionButtonsProps) => {
  if (selectedWorksCount === 0) return null;

  const hasUnpublishedWorks = works.filter(work => !work.public);
  const hasVisibleWorks = works.filter(work => work.public && !work.hidden);
  const hasHiddenWorks = works.filter(work => work.public && work.hidden);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col sm:flex-row gap-2">
      {hasUnpublishedWorks.length ? (
        <Button
          variant="primary"
          onClick={onPublish}
          className="w-full sm:w-auto shadow-lg"
        >
          Опублікувати ({hasUnpublishedWorks.length})
        </Button>
      ) : null}
      {hasVisibleWorks.length ? (
        <Button
          variant="secondary"
          onClick={onHide}
          className="w-full sm:w-auto shadow-lg bg-white/90 hover:bg-white"
        >
          Приховати ({hasVisibleWorks.length})
        </Button>
      ) : null}
      {hasHiddenWorks.length ? (
        <Button
          variant="primary"
          onClick={onHide}
          className="w-full sm:w-auto shadow-lg"
        >
          Показати ({hasHiddenWorks.length})
        </Button>
      ) : null}
    </div>
  );
};
