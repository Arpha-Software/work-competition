'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCookie, deleteCookie } from 'cookies-next';
import { WorksList } from '@/components/WorksList';
import { Filters } from '@/components/Filters';
import { ActionButtons } from '@/components/ActionButtons';
import { Moderators } from '@/components/Moderators';
import { getSubmissions, updateVisibility, type Submission, updatePublicity, deleteSubmission, getFeature, updateFeature } from '@/api/submissions';
import toast from 'react-hot-toast';

type Work = {
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bicp2-15a28878e665.herokuapp.com';

const transformSubmissionToWork = (submission: Submission): Work => ({
  id: submission.id,
  title: submission.fullName,
  subtitle: submission.category,
  fileAccessLink: {
    accessType: 'public',
    url: `http://${submission.file.accessLink}`,
    mimeType: submission.file.mimeType
  },
  likes: 0,
  date: submission.submittedAt,
  region: submission.region,
  public: submission.public,
  isVisible: submission.isVisible
});

const regions = [
  { value: 'all', label: 'Всі області' },
  { value: 'Автономна Республіка Крим', label: 'Автономна Республіка Крим' },
  { value: 'Вінницька', label: 'Вінницька область' },
  { value: 'Волинська', label: 'Волинська область' },
  { value: 'Дніпропетровська', label: 'Дніпропетровська область' },
  { value: 'Донецька', label: 'Донецька область' },
  { value: 'Житомирська', label: 'Житомирська область' },
  { value: 'Закарпатська', label: 'Закарпатська область' },
  { value: 'Запорізька', label: 'Запорізька область' },
  { value: 'Івано-Франківська', label: 'Івано-Франківська область' },
  { value: 'Київська', label: 'Київська область' },
  { value: 'Кіровоградська', label: 'Кіровоградська область' },
  { value: 'Луганська', label: 'Луганська область' },
  { value: 'Львівська', label: 'Львівська область' },
  { value: 'Миколаївська', label: 'Миколаївська область' },
  { value: 'Одеська', label: 'Одеська область' },
  { value: 'Полтавська', label: 'Полтавська область' },
  { value: 'Рівненська', label: 'Рівненська область' },
  { value: 'Сумська', label: 'Сумська область' },
  { value: 'Тернопільська', label: 'Тернопільська область' },
  { value: 'Харківська', label: 'Харківська область' },
  { value: 'Херсонська', label: 'Херсонська область' },
  { value: 'Хмельницька', label: 'Хмельницька область' },
  { value: 'Черкаська', label: 'Черкаська область' },
  { value: 'Чернівецька', label: 'Чернівецька область' },
  { value: 'Чернігівська', label: 'Чернігівська область' },
];

export const Admin = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedWorks, setSelectedWorks] = useState<number[]>([]);
  const [isSuperuser] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVotingEnabled, setIsVotingEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState<'works' | 'moderators'>('works');
  const [isVotingModalOpen, setIsVotingModalOpen] = useState(false);

  const categories = [
    { value: 'all', label: 'Всі категорії' },
    { value: 'Інноваційні та цифрові рішення для забезпечення безпеки на роботі', label: 'Інноваційні та цифрові рішення для забезпечення безпеки на роботі' },
    { value: 'Ефективні програми психосоціальної підтримки на роботі та її реалізація', label: 'Ефективні програми психосоціальної підтримки на роботі та її реалізація' },
    { value: 'Мистецтво, що рятує життя', label: 'Мистецтво, що рятує життя' },
  ];

  useEffect(() => {
    const token = getCookie('adminToken');
    if (!token && pathname === '/admin') {
      router.push('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [submissionsResponse, featureResponse] = await Promise.all([
          getSubmissions(selectedRegion, selectedCategory),
          getFeature('VOTING')
        ]);
        setSubmissions(submissionsResponse.content);
        setIsVotingEnabled(featureResponse.enabled);
      } catch (error) {
        toast.error('Помилка при завантаженні даних');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router, pathname, selectedRegion, selectedCategory]);

  const filteredAndSortedWorks = useMemo(() => {
    let filtered = (submissions || []).map(transformSubmissionToWork);
    
    // Sort by date
    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
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
      await updateVisibility({
        records: [{ id: workId, isVisible: true }]
      });
      toast.success('Роботу успішно опубліковано');
      // Refresh submissions
      const response = await getSubmissions(selectedRegion, selectedCategory);
      setSubmissions(response.content);
      // Unselect the work
      setSelectedWorks(prev => prev.filter(id => id !== workId));
    } catch (error: any) {
      console.error('Publish error:', error);
      toast.error(error?.response?.data?.message || 'Помилка при публікації роботи');
    }
  };

  const handleHide = async (workId: number) => {
    try {
      await updatePublicity({
        records: [{ id: workId, isPublic: false }]
      });
      await updateVisibility({
        records: [{ id: workId, isVisible: false }]
      });
      toast.success('Роботу успішно приховано');
      // Refresh submissions
      const response = await getSubmissions(selectedRegion, selectedCategory);
      setSubmissions(response.content);
      // Unselect the work
      setSelectedWorks(prev => prev.filter(id => id !== workId));
    } catch (error: any) {
      console.error('Hide error:', error);
      toast.error(error?.response?.data?.message || 'Помилка при приховуванні роботи');
    }
  };

  const handleDelete = async (workId: number) => {
    try {
      await deleteSubmission(workId);
      toast.success('Роботу успішно видалено');
      // Refresh submissions
      const response = await getSubmissions(selectedRegion, selectedCategory);
      setSubmissions(response.content);
      // Unselect the work
      setSelectedWorks(prev => prev.filter(id => id !== workId));
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(error?.response?.data?.message || 'Помилка при видаленні роботи');
    }
  };

  const handleVotingToggle = async () => {
    setIsVotingModalOpen(true);
  };

  const handleVotingConfirm = async () => {
    try {
      await updateFeature('VOTING', !isVotingEnabled);
      setIsVotingEnabled(!isVotingEnabled);
      toast.success(`Голосування ${!isVotingEnabled ? 'увімкнено' : 'вимкнено'}`);
    } catch (error: any) {
      console.error('Voting toggle error:', error);
      toast.error(error?.response?.data?.message || 'Помилка при зміні стану голосування');
    } finally {
      setIsVotingModalOpen(false);
    }
  };

  const handleLogout = () => {
    deleteCookie('adminToken');
    router.push('/admin/login');
    toast.success('Ви успішно вийшли з системи');
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Завантаження...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Панель адміністратора</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Голосування:</span>
            <button
              onClick={handleVotingToggle}
              className={`px-4 py-2 rounded-md ${
                isVotingEnabled
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              {isVotingEnabled ? 'Увімкнено' : 'Вимкнено'}
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white"
          >
            Вийти
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('works')}
              className={`${
                activeTab === 'works'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Роботи
            </button>
            {isSuperuser && (
              <button
                onClick={() => setActiveTab('moderators')}
                className={`${
                  activeTab === 'moderators'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Модератори
              </button>
            )}
          </nav>
        </div>
      </div>

      {activeTab === 'works' ? (
        <>
          <Filters
            selectedRegion={selectedRegion}
            selectedCategory={selectedCategory}
            sortBy={sortBy}
            regions={regions}
            categories={categories}
            onRegionChange={setSelectedRegion}
            onCategoryChange={setSelectedCategory}
            onSortChange={setSortBy}
          />

          {submissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-600 mb-4">Немає робіт для відображення</p>
              <p className="text-gray-500">Спробуйте змінити фільтри або перевірте пізніше</p>
            </div>
          ) : (
            <>
              <WorksList
                works={filteredAndSortedWorks}
                selectedWorks={selectedWorks}
                isSuperuser={isSuperuser}
                onWorkSelect={handleWorkSelect}
                onDelete={handleDelete}
                onPublish={handlePublish}
                onHide={handleHide}
              />

              <ActionButtons
                selectedWorksCount={selectedWorks.length}
                onPublish={() => selectedWorks.forEach(handlePublish)}
                onHide={() => selectedWorks.forEach(handleHide)}
              />
            </>
          )}
        </>
      ) : (
        <Moderators isSuperuser={isSuperuser} />
      )}

      {isVotingModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Підтвердження зміни стану голосування</h3>
            <p className="text-gray-600 mb-6">
              Ви впевнені, що хочете {isVotingEnabled ? 'вимкнути' : 'увімкнути'} голосування?
              {isVotingEnabled ? ' Це призведе до припинення можливості голосування для всіх користувачів.' : ''}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsVotingModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Скасувати
              </button>
              <button
                onClick={handleVotingConfirm}
                className={`px-4 py-2 text-white rounded-md ${
                  isVotingEnabled
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isVotingEnabled ? 'Вимкнути' : 'Увімкнути'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 