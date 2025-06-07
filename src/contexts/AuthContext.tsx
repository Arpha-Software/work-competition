'use client';

import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { EProvider } from '@/utils/enums';
import { decodeToken } from '@/tools/helpers';

interface User {
  role: string;
  allowedRegions: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  login: (provider: EProvider) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  setUser: () => {},
  login: async (provider: EProvider) => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('authToken');

    if (!token) {
      setIsLoading(false);
      return;
    }

    const decoded = decodeToken(token);

    if (decoded && decoded.role) {
      setUser({
        role: decoded.role,
        allowedRegions: decoded.regions || [],
      });
    } else {
      setUser(null);
    }

    setIsLoading(false);
  }, []);

  const login = async (provider: EProvider) => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/${provider}`);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
