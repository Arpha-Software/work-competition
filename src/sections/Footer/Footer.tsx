import Image from 'next/image';

import { Container } from '@/components/Container';

export const Footer = () => {
  return (
    <footer className='bg-black py-20'>
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

        <div className='mt-15 md:mt-0'>
          <Image
            className='mx-auto'
            src='/images/logo_mobile.png'
            alt='Logo'
            width={112}
            height={40}
          />
        </div>

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
