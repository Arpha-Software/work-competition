'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { EProvider } from '@/utils/enums';
import { usePathname, useRouter } from 'next/navigation';

interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string;
  login: (provider: EProvider) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const login = async (provider: EProvider) => {
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/${provider}`);
  };

  useEffect(() => {
    const authToken = document.cookie.split(';').find(cookie => cookie.includes('authToken'));

    if (authToken) {
      setAccessToken(authToken.split('=')[1]);
      setIsAuthenticated(true);
    }
  }, [pathname, accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, accessToken }}>
        {children}
    </AuthContext.Provider>
  );
}
