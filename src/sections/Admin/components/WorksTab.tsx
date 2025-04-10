import { useState, useMemo } from 'react';
import { WorksList } from '@/components/WorksList';
import { Filters } from '@/components/Filters';
import { ActionButtons } from '@/components/ActionButtons';
import { Loader } from '@/components/Loader';
import { getSubmissions, type Submission, updatePublicity, updateVisibility, deleteSubmission } from '@/api/submissions';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import type { Work } from '@/utils/types';
import { CATEGORIES, REGIONS, SORT_OPTIONS } from '@/utils/constants';
import { SortOrder } from '@/utils/enums';

interface WorksTabProps {
  isSuperuser: boolean;
}

const transformSubmissionToWork = (submission: Submission): Work => ({
  id: submission.id,
  title: submission.fullName,
  subtitle: submission.category,
  fileAccessLink: {
    accessType: 'public',
    url: `${submission.file.accessLink}`,
    mimeType: submission.file.mimeType
  },
  likes: submission.numberOfVotes,
  date: submission.submittedAt,
  region: submission.region,
  public: submission.public,
  hidden: submission.hidden,
});

export const WorksTab = ({ isSuperuser }: WorksTabProps) => {
  const { user } = useAuth();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOrder>(SortOrder.NEWEST);
  const [selectedWorks, setSelectedWorks] = useState<number[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filteredRegions = useMemo(() => {
    if (isSuperuser) {
      return REGIONS;
    }

    const allowedRegions = user?.allowedRegions || [];
    if (allowedRegions.length === 0) {
      return REGIONS;
    }

    return REGIONS.filter(region => allowedRegions.includes(region.value));
  }, [user?.allowedRegions, isSuperuser]);

  const filteredAndSortedWorks = useMemo(() => {
    let filtered = (submissions || []).map(transformSubmissionToWork);
    
    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === SortOrder.NEWEST ? dateB - dateA : dateA - dateB;
    });
    
    return filtered;
  }, [sortBy, submissions]);

  const handleWorkSelect = (workId: number) => {
    setSelectedWorks(prev => 
      prev.includes(workId) 
        ? prev.filter(id => id !== workId)
        : [...prev, workId]
    );
  };

  const handlePublish = async (workId: number) => {
    try {
      await updatePublicity({
        records: [{ id: workId, isPublic: true }]
      });
      toast.success('Роботу успішно опубліковано');
      const response = await getSubmissions(selectedRegion, selectedCategory);
      setSubmissions(response.content);
      setSelectedWorks(prev => prev.filter(id => id !== workId));
    } catch (error: any) {
      console.error('Publish error:', error);
      toast.error(error?.response?.data?.message || 'Помилка при публікації роботи');
    }
  };

  const handleHide = async (workId: number) => {
    try {
      const work = submissions.find(s => s.id === workId);
      if (!work) return;

      await updateVisibility({
        records: [{
          id: workId,
          isVisible: work.hidden
        }]
      });

      toast.success(work.hidden ? 'Роботу успішно приховано' : 'Роботу успішно показано');

      const response = await getSubmissions(selectedRegion, selectedCategory);
      setSubmissions(response.content);
      setSelectedWorks(prev => prev.filter(id => id !== workId));
    } catch (error: any) {
      console.error('Hide/Show error:', error);
      toast.error(error?.response?.data?.message || 'Помилка при зміні видимості роботи');
    }
  };

  const handleDelete = async (workId: number) => {
    try {
      await deleteSubmission(workId);
      toast.success('Роботу успішно видалено');
      const response = await getSubmissions(selectedRegion, selectedCategory);
      setSubmissions(response.content);
      setSelectedWorks(prev => prev.filter(id => id !== workId));
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(error?.response?.data?.message || 'Помилка при видаленні роботи');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <Filters
          regions={filteredRegions}
          categories={CATEGORIES}
          selectedRegion={selectedRegion}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          onRegionChange={setSelectedRegion}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSortBy}
        />
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Немає робіт для відображення</p>
        </div>
      ) : (
        <>
          <ActionButtons
            selectedWorksCount={selectedWorks.length}
            onPublish={() => selectedWorks.forEach(handlePublish)}
            onHide={() => selectedWorks.forEach(handleHide)}
            works={filteredAndSortedWorks.filter(work => selectedWorks.includes(work.id))}
          />
          <WorksList
            works={filteredAndSortedWorks}
            selectedWorks={selectedWorks}
            isSuperuser={isSuperuser}
            onWorkSelect={handleWorkSelect}
            onDelete={handleDelete}
            onPublish={handlePublish}
            onHide={handleHide}
          />
        </>
      )}
    </div>
  );
};
