'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { setCookie } from 'cookies-next';

const GoogleCallback = () => {
  const { setUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('accessToken');

    if (searchParams.get('error') || !token) {
      router.replace('/');
    }

    setCookie('authToken', token, {
      maxAge: 60 * 60 * 24,
      path: '/'
    });

    setUser({
      role: "",
      allowedRegions: []
    });

    const lastRoute = localStorage.getItem('lastRoute');
    router.replace(lastRoute || '/');
  }, [searchParams, router]);

  return (
    <div className='mt-full'>
      <div className="top-0 left-0 w-full h-screen fixed bg-white bg-opacity-90 z-50 flex items-center justify-center">
        <Loader />
        <p>Processing Google OAuth...</p>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleCallback />
    </Suspense>
  );
}
