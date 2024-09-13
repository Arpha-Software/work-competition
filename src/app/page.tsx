'use client';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';

import { Categories } from '@/sections/Home/Categories';
import { Partners } from '@/sections/Home/Partners';
import { useEffect } from 'react';

export default function Home() {
  return (
    <main>
      <h1 className='sr-only'>Категорії</h1>

      <Categories />

      <Partners />
    </main>
  );
}
