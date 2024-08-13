'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation'; 
import { exchangeCode } from '@/api/oauth';
import { EProvider } from '@/utils/enums';

export default function GoogleCallback() {
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

        const { id_token, expires_in } = response;

        const expiresDate = new Date();
        expiresDate.setSeconds(expiresDate.getSeconds() + expires_in);

        document.cookie = `authToken=${id_token}; path=/; expires=${expiresDate.toUTCString()}`;
        router.replace('/')
      } else {
        console.error('Authorization code not found');
      }
    }

    sendCode();
  }, [query]);

  return (
    <div className='mt-full'>
      <p>Processing Google OAuth callback...</p>
    </div>
  );
}
