'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCookie, deleteCookie } from 'cookies-next';
import { WorksList } from '@/components/WorksList';
import { Filters } from '@/components/Filters';
import { ActionButtons } from '@/components/ActionButtons';
import { Moderators } from '@/components/Moderators';
import { Loader } from '@/components/Loader';
import { getSubmissions, updateVisibility, type Submission, updatePublicity, deleteSubmission, getFeature, updateFeature } from '@/api/submissions';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { EUserRole, SortOrder } from '@/utils/enums';
import type { Work } from '@/utils/types';
import { UpdateSubmissionModal } from '@/components/UpdateSubmissionModal';
import { PAGE_SIZE } from '@/utils/constants';

const transformSubmissionToWork = (submission: Submission): Work => ({
  id: submission.id,
  title: submission.fullName,
  subtitle: submission.category,
  subcategory: submission.subcategory || null,
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
  const { user, setUser, isLoading: isAuthLoading } = useAuth();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOrder>(SortOrder.NEWEST);
  const [selectedWorks, setSelectedWorks] = useState<number[]>([]);
  const isSuperuser = user?.role === 'ADMIN';
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVotingEnabled, setIsVotingEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState<'works' | 'moderators'>('works');
  const [isVotingModalOpen, setIsVotingModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const categories = [
    { value: 'all', label: 'Всі категорії' },
    { value: 'Інноваційні та цифрові рішення для забезпечення безпеки на роботі', label: 'Інноваційні та цифрові рішення для забезпечення безпеки на роботі' },
    { value: 'Ефективні програми психосоціальної підтримки на роботі та її реалізація', label: 'Ефективні програми психосоціальної підтримки на роботі та її реалізація' },
    { value: 'Мистецтво, що рятує життя', label: 'Мистецтво, що рятує життя' },
  ];

  const filteredRegions = useMemo(() => {
    if (isSuperuser) {
      return regions;
    }

    const allowedRegions = user?.allowedRegions || [];

    const regionMapping: { [key: string]: string } = {
      'Ð\x92Ð¾Ð»Ð¸Ð½Ñ\x81Ñ\x8CÐºÐ°': 'Волинська',
      'Ð\x94Ð½Ñ\x96Ð¿Ñ\x80Ð¾Ð¿ÐµÑ\x82Ñ\x80Ð¾Ð²Ñ\x81Ñ\x8CÐºÐ°': 'Дніпропетровська',
      'Ð\x96Ð¸Ñ\x82Ð¾Ð¼Ð¸Ñ\x80Ñ\x81Ñ\x8CÐºÐ°': 'Житомирська',
      'Ð\x9BÑ\x8CÐ²Ñ\x96Ð²Ñ\x81Ñ\x8CÐºÐ°': 'Львівська'
    };

    const normalizedAllowedRegions = allowedRegions.map(region => {
      return regionMapping[region] || region;
    });

    if (normalizedAllowedRegions.length === 0) {
      return regions;
    }

    return regions.filter(region => normalizedAllowedRegions.includes(region.value));
  }, [user?.allowedRegions, isSuperuser]);

  useEffect(() => {
    if (isAuthLoading) return; // Don't proceed while auth is loading
    
    const token = getCookie('authToken');
    if (!token || (!user || user.role === EUserRole.USER)) {
      router.push('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [submissionsResponse, featureResponse] = await Promise.all([
          getSubmissions(selectedRegion, selectedCategory, undefined, page, PAGE_SIZE),
          getFeature('VOTING')
        ]);
        setSubmissions(submissionsResponse.content);
        setTotalPages(submissionsResponse.totalPages);
        setIsVotingEnabled(featureResponse.enabled);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Помилка при завантаженні даних');
        // If there's an error, we should still set loading to false
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router, pathname, selectedRegion, selectedCategory, page, user, isAuthLoading]);

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

      const response = await getSubmissions(selectedRegion, selectedCategory, undefined, page);
      const sortedSubmissions = [...response.content].sort((a, b) => {
        const dateA = new Date(a.submittedAt).getTime();
        const dateB = new Date(b.submittedAt).getTime();
        return sortBy === SortOrder.NEWEST ? dateB - dateA : dateA - dateB;
      });
      setSubmissions(sortedSubmissions);
      setSelectedWorks(prev => prev.filter(id => id !== workId));
    } catch (error: any) {
      if (error?.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => {
          toast.error(err.errorMessage || 'Помилка при публікації роботи');
        });
      } else {
        toast.error(error?.response?.data?.message || 'Помилка при публікації роботи');
      }
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

      toast.success(work.hidden ? 'Роботу успішно показано' : 'Роботу успішно приховано');

      const response = await getSubmissions(selectedRegion, selectedCategory, undefined, page);
      const sortedSubmissions = [...response.content].sort((a, b) => {
        const dateA = new Date(a.submittedAt).getTime();
        const dateB = new Date(b.submittedAt).getTime();
        return sortBy === SortOrder.NEWEST ? dateB - dateA : dateA - dateB;
      });
      setSubmissions(sortedSubmissions);
      setSelectedWorks(prev => prev.filter(id => id !== workId));
    } catch (error: any) {
      if (error?.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => {
          toast.error(err.errorMessage || 'Помилка при зміні видимості роботи');
        });
      } else {
        toast.error(error?.response?.data?.message || 'Помилка при зміні видимості роботи');
      }
    }
  };

  const handleDelete = async (workId: number) => {
    try {
      await deleteSubmission(workId);

      toast.success('Роботу успішно видалено');

      const response = await getSubmissions(selectedRegion, selectedCategory, undefined, page);
      const sortedSubmissions = [...response.content].sort((a, b) => {
        const dateA = new Date(a.submittedAt).getTime();
        const dateB = new Date(b.submittedAt).getTime();
        return sortBy === SortOrder.NEWEST ? dateB - dateA : dateA - dateB;
      });
      setSubmissions(sortedSubmissions);
      setSelectedWorks(prev => prev.filter(id => id !== workId));
    } catch (error: any) {
      if (error?.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => {
          toast.error(err.errorMessage || 'Помилка при видаленні роботи');
        });
      } else {
        toast.error(error?.response?.data?.message || 'Помилка при видаленні роботи');
      }
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
      if (error?.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => {
          toast.error(err.errorMessage || 'Помилка при зміні стану голосування');
        });
      } else {
        toast.error(error?.response?.data?.message || 'Помилка при зміні стану голосування');
      }
    } finally {
      setIsVotingModalOpen(false);
    }
  };

  const handleLogout = () => {
    deleteCookie('authToken');
    setUser(null);

    router.push('/admin/login');
    toast.success('Ви успішно вийшли з системи');
  };

  const handleUpdate = (workId: number) => {
    const submission = submissions.find(s => s.id === workId);
    if (submission) {
      setSelectedSubmission(submission);
      setIsUpdateModalOpen(true);
    }
  };

  const handleUpdateSuccess = async () => {
    try {
      const response = await getSubmissions(selectedRegion, selectedCategory, undefined, page);
      const sortedSubmissions = [...response.content].sort((a, b) => {
        const dateA = new Date(a.submittedAt).getTime();
        const dateB = new Date(b.submittedAt).getTime();
        return sortBy === SortOrder.NEWEST ? dateB - dateA : dateA - dateB;
      });
      setSubmissions(sortedSubmissions);
      setTotalPages(response.totalPages);
    } catch (error: any) {
      if (error?.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => {
          toast.error(err.errorMessage || 'Помилка при оновленні роботи');
        });
      } else {
        toast.error(error?.response?.data?.message || 'Помилка при оновленні роботи');
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSelectedWorks([]); // Clear selected works when changing page
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-semibold text-gray-900">Панель адміністратора</h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              {isSuperuser && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Голосування:</span>
                  <button
                    onClick={handleVotingToggle}
                    className={`px-3 py-1.5 rounded-md text-sm ${
                      isVotingEnabled
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                  >
                    {isVotingEnabled ? 'Увімкнено' : 'Вимкнено'}
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Роль:</span>
                <span className="text-sm font-medium text-gray-700">
                  {user?.role === 'ADMIN' ? 'Адміністратор' : 'Модератор'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-md bg-gray-500 hover:bg-gray-600 text-white text-sm"
              >
                Вийти
              </button>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('works')}
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
                  onClick={() => setActiveTab('moderators')}
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

          <div className="space-y-6">
            {activeTab === 'works' ? (
              <>
                <div className="bg-white rounded-lg shadow p-6">
                  <Filters
                    regions={filteredRegions}
                    categories={categories}
                    selectedRegion={selectedRegion}
                    selectedCategory={selectedCategory}
                    sortBy={sortBy}
                    onRegionChange={setSelectedRegion}
                    onCategoryChange={setSelectedCategory}
                    onSortChange={setSortBy}
                  />
                </div>

                {submissions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm p-6">
                    <p className="text-lg sm:text-xl text-gray-600 mb-2 text-center">Немає робіт для відображення</p>
                    <p className="text-sm sm:text-base text-gray-500 text-center">Спробуйте змінити фільтри або перевірте пізніше</p>
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
                      onUpdate={handleUpdate}
                    />

                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 py-4">
                        <button
                          onClick={() => handlePageChange(page - 1)}
                          disabled={page === 0}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Попередня
                        </button>
                        <span className="text-sm text-gray-700">
                          Сторінка {page + 1} із {totalPages}
                        </span>
                        <button
                          onClick={() => handlePageChange(page + 1)}
                          disabled={page + 1 >= totalPages}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Наступна
                        </button>
                      </div>
                    )}

                    {selectedWorks.length > 0 && (
                      <ActionButtons
                        selectedWorksCount={selectedWorks.length}
                        onPublish={() => selectedWorks.forEach(handlePublish)}
                        onHide={() => selectedWorks.forEach(handleHide)}
                        works={filteredAndSortedWorks.filter(work => selectedWorks.includes(work.id))}
                      />
                    )}
                  </>
                )}
              </>
            ) : (
              <Moderators isSuperuser={isSuperuser} />
            )}
          </div>
        </div>
      </div>

      {isVotingModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Підтвердження зміни стану голосування</h3>
            <p className="text-gray-600 mb-6">
              Ви впевнені, що хочете {isVotingEnabled ? 'вимкнути' : 'увімкнути'} голосування?
              {isVotingEnabled ? ' Це призведе до припинення можливості голосування для всіх користувачів.' : ''}
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setIsVotingModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
              >
                Скасувати
              </button>
              <button
                onClick={handleVotingConfirm}
                className={`px-4 py-2 text-white rounded-md w-full sm:w-auto ${
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

      {selectedSubmission && (
        <UpdateSubmissionModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedSubmission(null);
          }}
          submission={selectedSubmission}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};
