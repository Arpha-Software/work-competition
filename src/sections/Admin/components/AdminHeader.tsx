import { Button } from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import toast from 'react-hot-toast';

interface AdminHeaderProps {
  isVotingEnabled: boolean;
  onVotingToggle: () => void;
}

export const AdminHeader = ({ isVotingEnabled, onVotingToggle }: AdminHeaderProps) => {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = () => {
    deleteCookie('authToken');
    router.push('/admin/login');
    toast.success('Ви успішно вийшли з системи');
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-2xl font-semibold text-gray-900">Панель адміністратора</h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Голосування:</span>
          <button
            onClick={onVotingToggle}
            className={`px-3 py-1.5 rounded-md text-sm ${
              isVotingEnabled
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {isVotingEnabled ? 'Увімкнено' : 'Вимкнено'}
          </button>
        </div>
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
  );
}; 