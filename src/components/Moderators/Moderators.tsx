import { useState, useEffect } from 'react';
import { getModerators, createModerator, deleteModerator, type Moderator } from '@/api/submissions';
import toast from 'react-hot-toast';
import { Select } from '@/components/Select';
import { MultiSelect } from '@/components/MultiSelect';
import { Modal } from '@/components/Modal';
import cn from '@/tools/cn';

const regions = [
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
  { value: 'Автономна Республіка Крим', label: 'Автономна Республіка Крим' },
];

const MAX_VISIBLE_REGIONS = 2;

interface ModeratorsProps {
  isSuperuser: boolean;
}

type RegionsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  regions: string[];
}

const RegionsModal = ({ isOpen, onClose, regions }: RegionsModalProps) => {
  if (!isOpen) return null;

  return (
    <Modal closeModal={onClose}>
      <div className="p-6 w-[500px]">
        <h3 className="text-lg font-semibold mb-4">Дозволені регіони</h3>
        <div className="space-y-2">
          {regions.map((region, index) => (
            <div key={index} className="p-2 bg-gray-50 rounded">
              {region}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export const Moderators = ({ isSuperuser }: ModeratorsProps) => {
  const [moderators, setModerators] = useState<Moderator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [moderatorToDelete, setModeratorToDelete] = useState<Moderator | null>(null);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [isRegionsModalOpen, setIsRegionsModalOpen] = useState(false);
  const [newModerator, setNewModerator] = useState({
    username: '',
    password: '',
    allowedRegions: [] as string[],
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    fetchModerators();
  }, []);

  const fetchModerators = async () => {
    try {
      const data = await getModerators();
      setModerators(data);
    } catch (error) {
      toast.error('Помилка при завантаженні модераторів');
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {
      username: '',
      password: '',
    };

    if (!newModerator.username) {
      newErrors.username = "Ім&apos;я користувача обов'язкове";
    }

    if (!newModerator.password) {
      newErrors.password = "Пароль обов'язковий";
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleCreateModerator = async () => {
    if (!validateForm()) return;

    try {
      await createModerator(newModerator);
      toast.success('Модератора успішно створено');
      setIsModalOpen(false);
      setNewModerator({ username: '', password: '', allowedRegions: [] });
      setErrors({ username: '', password: '' });
      fetchModerators();
    } catch (error: any) {
      console.error('Create moderator error:', error);
      toast.error(error?.response?.data?.message || 'Помилка при створенні модератора');
    }
  };

  const handleDeleteModerator = async (id: number) => {
    try {
      await deleteModerator(id);
      toast.success('Модератор успішно видалений');
      fetchModerators();
    } catch (error) {
      toast.error('Помилка при видаленні модератора');
    }
  };

  const handleDeleteClick = (moderator: Moderator) => {
    setModeratorToDelete(moderator);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (moderatorToDelete) {
      await handleDeleteModerator(moderatorToDelete.id);
      setIsDeleteModalOpen(false);
      setModeratorToDelete(null);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Завантаження...</div>;
  }

  const isFormValid = newModerator.username && newModerator.password;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Модератори</h2>
        {isSuperuser && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Додати модератора
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ім&apos;я користувача
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дозволені регіони
              </th>
              {isSuperuser && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дії
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {moderators.map((moderator) => (
              <tr key={moderator.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {moderator.username}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {moderator.allowedRegions.length === 0 ? (
                    'Всі регіони'
                  ) : (
                    <div>
                      {moderator.allowedRegions
                        .slice(0, MAX_VISIBLE_REGIONS)
                        .map((region) => regions.find((r) => r.value === region)?.label)
                        .join(', ')}
                      {moderator.allowedRegions.length > MAX_VISIBLE_REGIONS && (
                        <>
                          {' '}
                          <button
                            onClick={() => {
                              setSelectedRegions(
                                moderator.allowedRegions.map(
                                  (region) => regions.find((r) => r.value === region)?.label || region
                                )
                              );
                              setIsRegionsModalOpen(true);
                            }}
                            className="text-primary hover:text-primary-dark font-medium"
                          >
                            +{moderator.allowedRegions.length - MAX_VISIBLE_REGIONS} більше
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </td>
                {isSuperuser && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteClick(moderator)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Видалити
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Додати модератора</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ім&apos;я користувача
                </label>
                <input
                  type="text"
                  value={newModerator.username}
                  onChange={(e) => {
                    setNewModerator({ ...newModerator, username: e.target.value });
                    setErrors({ ...errors, username: '' });
                  }}
                  className={cn(
                    "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                    errors.username ? "border-red-500" : "border-gray-300"
                  )}
                  placeholder="Введіть ім&apos;я користувача"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Пароль
                </label>
                <input
                  type="password"
                  value={newModerator.password}
                  onChange={(e) => {
                    setNewModerator({ ...newModerator, password: e.target.value });
                    setErrors({ ...errors, password: '' });
                  }}
                  className={cn(
                    "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                    errors.password ? "border-red-500" : "border-gray-300"
                  )}
                  placeholder="Введіть пароль"
                />
                {errors.password ? (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                ) : (
                  <p className="mt-2 text-sm text-red-500">
                    ⚠️ Збережіть пароль! Після створення модератора ви не зможете його переглянути.
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Дозволені регіони
                </label>
                <MultiSelect
                  value={regions.filter(region => newModerator.allowedRegions.includes(region.value))}
                  onChange={(selected) => {
                    setNewModerator({
                      ...newModerator,
                      allowedRegions: selected.map(option => option.value),
                    });
                  }}
                  options={regions}
                  placeholder="Виберіть регіони"
                  className="w-full"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Якщо не вибрано жодного регіону, модератор матиме доступ до всіх регіонів
                </p>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setNewModerator({ username: '', password: '', allowedRegions: [] });
                  setErrors({ username: '', password: '' });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Скасувати
              </button>
              <button
                onClick={handleCreateModerator}
                disabled={!isFormValid}
                className={cn(
                  "px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                  isFormValid
                    ? "bg-primary hover:bg-primary-dark"
                    : "bg-gray-400 cursor-not-allowed"
                )}
              >
                Створити модератора
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && moderatorToDelete && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Підтвердження видалення</h3>
            <p className="text-gray-600 mb-6">
              Ви впевнені, що хочете видалити модератора {moderatorToDelete.username}?
              Цю дію неможливо скасувати.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setModeratorToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Скасувати
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}

      <RegionsModal
        isOpen={isRegionsModalOpen}
        onClose={() => setIsRegionsModalOpen(false)}
        regions={selectedRegions}
      />
    </div>
  );
}; 