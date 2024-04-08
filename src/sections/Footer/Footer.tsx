import Image from 'next/image';
import cn from '@/tools/cn';

import { Container } from '@/components/Container';

import styles from './Footer.module.scss';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='bg-black py-20 mt-20'>
      <Container className='text-center text-white md:flex md:justify-between md:items-center'>
        <ul className='list-none p-0 m-0 md:text-left'>
          <li className='mb-3.5'>
            <a className='text-white' href=''>
              Facebook
            </a>
          </li>

          <li className='mb-3.5'>
            <a className='text-white' href='tel:+380938514359'>
              +380938514359
            </a>
          </li>

          <li>
            <a className='text-white' href='mailto:example@gmail.com'>
              example@gmail.com
            </a>
          </li>
        </ul>

        <Link href='/' className='flex flex-col items-center mt-15 md:mt-0 md:grow'>
          <Image
            className='mx-auto'
            src='/images/logo_mobile.png'
            alt='Logo'
            width={112}
            height={40}
          />

          <div
            className={cn(styles.pattern, 'mt-4 w-full')}
          />
        </Link>

        <div className='mt-15 md:mt-0 md:text-right'>
          <div className='mb-3.5 text-base/["19px"]'>
            Створено командою Arpha Software
          </div>

          <div className='text-sm/["17px"]'>2024 © All rights reserved</div>
        </div>
      </Container>
    </footer>
  );
};
