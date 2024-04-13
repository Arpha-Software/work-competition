import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/Container';

export const Footer = () => {
  const footerLinks = [
    { href: "https://t.me/bezpeka_pratsi", label: "Telegram" },
    { href: "https://www.facebook.com/mystetstvobezpekypratsi", label: "Facebook" },
    { href: "tel:+380668685220", label: "+38066-868-52-20*", title: "*Вартість дзвінків згідно з тарифами вашого оператора" },
    { href: "mailto:mystetstvobp@gmail.com", label: "mystetstvobp@gmail.com" }
  ];

  return (
    <footer className='relative bg-primary py-20 mt-20'>
      <Container className='text-center text-white md:flex md:justify-between md:items-center'>
        <ul className='list-none p-0 m-0 md:text-left'>
          {footerLinks.map(({ href, label, title }) => (
            <li key={href} className='mb-3.5'>
              <a href={href} className='text-white' title={title || ''}>
                { label }
              </a>
            </li>
          ))}
        </ul>

        <Link href='/' className='flex flex-col items-center mt-15 md:mt-0 md:grow'>
          <Image
            src='/images/logo_mobile.png'
            alt='Logo'
            width={112}
            height={40}
          />
        </Link>

        <div className='mt-15 md:mt-0 md:text-right'>
          <div className='mb-3.5 text-base'>
            Створено командою ДСУ з питань праці
          </div>
          <div className='text-sm'>2024 © All rights reserved</div>
        </div>
      </Container>
    </footer>
  );
};
