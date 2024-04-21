import Link from 'next/link';
import cn from '@/tools/cn';

import { Container } from '@/components/Container';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className='px-5 pt-7 pb-15 bg-primary rounded-b-lg sticky top-0 md:pt-4.5 z-10 overflow-hidden'>
      <Container>
        <Link href="/" className='block px-8 text-center text-white text-sm md:text-4.5xl/[56px] uppercase'>
          Мистецтво безпеки праці
        </Link>
      </Container>

      <div className={cn(styles.pattern, 'absolute bottom-0 left-0 h-10 w-full')}></div>
    </header>
  );
};
