'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { api } from '@/api/api';
import { setCookie, getCookie } from 'cookies-next';
import { useAuth } from '@/contexts/AuthContext';
import { EUserRole } from '@/utils/enums';

type Token = {
  value: string;
  type: string;
  expiresAt: string;
};

export const Login = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) return; // Don't redirect while loading
    
    if (user && (user?.role === EUserRole.ADMIN || user?.role === EUserRole.MODERATOR)) {
      router.push('/admin');
    }
  }, [router, user, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post<{ username: string; token: Token }>('/auth/login', {
        username,
        password
      });

      setCookie('authToken', response.data.token.value, {
        maxAge: 60 * 60 * 24,
        path: '/'
      });

      window.location.href = '/admin';
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError('Невірний логін або пароль');
      } else {
        setError('Помилка при вході. Спробуйте пізніше.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-52 flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Вхід в адмін-панель
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Введіть ваші облікові дані для входу
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Input
                label="Логін"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введіть ваш логін"
                autoComplete="username"
              />
            </div>

            <div>
              <Input
                label="Пароль"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введіть ваш пароль"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 py-2 px-4 rounded">
                {error}
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="w-full"
                variant={isLoading ? "disabled" : "primary"}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Завантаження...
                  </div>
                ) : (
                  'Увійти'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
