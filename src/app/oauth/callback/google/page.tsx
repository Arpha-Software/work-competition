'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { exchangeCode } from '@/api/oauth';
import { EProvider } from '@/utils/enums';
import { useAuth } from '@/context/AuthContext';
import { Loader } from 'lucide-react';

export default function GoogleCallback() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const router = useRouter();
  const pathname = useSearchParams();
  const query = new URLSearchParams(pathname);

  useEffect(() => {
    const authCode = query.get('code');

    const sendCode = async () => {
      if (authCode) {
        const payload = {
          code: authCode
        };

        const response = await exchangeCode(payload, EProvider.Google);

        if (response) {
          const { id_token, expires_in } = response;
          console.log('accessToken:', response);
          const expiresDate = new Date();
          expiresDate.setSeconds(expiresDate.getSeconds() + expires_in);

          document.cookie = `authToken=${id_token}; path=/; expires=${expiresDate.toUTCString()}`;
          setIsAuthenticated(true);
          router.replace('/')
        }
      } else {
        console.error('Authorization code not found');
      }
    }

    sendCode();

    if (query.get('error') || !isAuthenticated) {
      router.replace('/login');
    }
  }, [query]);


  return (
    <div className='mt-full'>
      <div className="top-0 left-0 w-full h-screen fixed bg-white bg-opacity-90 z-50 flex items-center justify-center">
        <Loader />
        <p>Processing Google OAuth...</p>
      </div>
    </div>
  );
}
