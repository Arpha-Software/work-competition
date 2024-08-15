'use client';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';

import { Categories } from '@/sections/Home/Categories';
import { Partners } from '@/sections/Home/Partners';
import { useEffect } from 'react';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <main>
      <h1 className='sr-only'>Категорії</h1>

      <Categories />

      <Partners />
    </main>
  );
}
