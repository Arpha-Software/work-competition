import { AdminWorkCard } from '@/components/WorkCard';
import type { Work } from '@/utils/types';

type WorksListProps = {
  works: Work[];
  selectedWorks?: number[];
  isSuperuser?: boolean;
  onWorkSelect?: (workId: number) => void;
  onDelete?: (workId: number) => void;
  onPublish?: (workId: number) => void;
  onHide?: (workId: number) => void;
};

export const WorksList = ({
  works,
  selectedWorks = [],
  isSuperuser = false,
  onWorkSelect,
  onDelete,
  onPublish,
  onHide,
}: WorksListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
      {works.map((work) => (
        <AdminWorkCard
          key={work.id}
          work={work}
          isSelected={selectedWorks.includes(work.id)}
          isSuperuser={isSuperuser}
          onSelect={() => onWorkSelect?.(work.id)}
          onDelete={() => onDelete?.(work.id)}
          onPublish={() => onPublish?.(work.id)}
          onHide={() => onHide?.(work.id)}
        />
      ))}
    </div>
  );
}; 