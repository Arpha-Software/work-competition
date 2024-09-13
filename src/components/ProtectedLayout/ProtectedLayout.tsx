'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Pages } from '@/utils/enums';

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
