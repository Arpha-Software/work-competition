import { useAuth } from '@/contexts/AuthContext';
import { EProvider } from '@/utils/enums';
import { Button } from '../Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Увійти для голосування</h2>
        <p className="text-gray-600 mb-6">
          Будь ласка, увійдіть через Google, щоб проголосувати за роботу.
        </p>
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => login(EProvider.Google)}
            className="w-full"
          >
            Увійти через Google
          </Button>
          <Button
            onClick={onClose}
            variant="secondary"
            className="w-full"
          >
            Скасувати
          </Button>
        </div>
      </div>
    </div>
  );
}; 