import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';

import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedLayout } from '@/components/ProtectedLayout';

import '@/styles/globals.css';

const nunitoSans = Nunito_Sans({ subsets: ['latin-ext'] });

export const metadata: Metadata = {
  title: 'Мистецтво Безпеки Праці',
  description: 'Мистецтво Безпеки Праці',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={nunitoSans.className}>
        <AuthProvider>
          <Header />
          <ProtectedLayout>{children}</ProtectedLayout>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
