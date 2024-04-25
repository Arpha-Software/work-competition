import Link from 'next/link';
import Image from 'next/image';
import cn from '@/tools/cn';

import { Container } from '@/components/Container';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={cn('pb-10 rounded-b-lg sticky top-0 z-10 overflow-hidden', styles.bg)}>
      <Container className='mx-0 lg:mx-0'>
        <Link href="/" className='block relative text-center text-white text-sm md:text-4.5xl/[56px] uppercase'>
          <Image
            src='/images/image.jpg'
            alt='logo'
            width={240}
            height={50}
            className='block w-full h-20 md:h-full'
          />
          <h1 className='absolute text-[#1960C4] font-bold text-base lg:text-5xl flex h-full top-0 justify-center items-center w-full'>Мистецтво безпеки праці</h1>
        </Link>
      </Container>

      <div className={cn(styles.pattern, 'absolute bottom-0 left-0 h-10 w-full bg-primary')}></div>
    </header>
  );
};
