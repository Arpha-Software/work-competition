'use client';

import { useState } from "react";
import Link from "next/link";
import cn from "@/tools/cn";

import { Container } from '@/components/Container';
import { ArrowLink } from '@/components/ArrowLink';
import { Button } from '@/components/Button';

import { Pages } from '@/utils/enums';
import { FormModal } from '@/components/Form/Form';
import { content } from './content';

import styles from './InnerPage.module.scss';

type PageParams = {
  params: {
    slug:
        Pages.inovativeSolutions
      | Pages.bestSpecialist
      | Pages.effectiveSupport
      | Pages.art
  };
};

export default function Page({ params: { slug } }: PageParams) {
  const { img, title, subtitle, description } = content[slug] || { img: '', title: '', subtitle: '' };
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <main className='relative'>
      <Container className='pb-15 lg:flex lg:pt-10 lg:pb-20 lg:gap-x-8 xl:gap-x-20'>
        <div className='relative mb-10 -mr-5 lg:grow lg:w-1/2 lg:order-1 lg:mb-0 lg:-mt-10 lg:flex lg:flex-col'>
          <img
            className={styles.img}
            src={img}
            alt={`Картинка для ${title} категорії`}
          />

          <Button
            tag="a"
            className="absolute bottom-0 right-0 lg:static lg:mt-6 lg:ml-auto"
            variant="primary"
            href='/'
          >
            Повернутись назад
          </Button>
        </div>

        <div className='lg:grow lg:w-1/2'>
          <h1 className='mb-4 text-2lg font-black lg:mb-6 lg:text-4.5xl/[55px]'>
            <Link
              href='/'
              className="text-primary"
            >
              {title}
            </Link>
          </h1>

          <p className='text-primary text-sm lg:text-base'>
            {subtitle}
          </p>

          <h2 className='mt-6 mb-4 text-black font-bold text-base/[22px] lg:mt-8'>Для участі в конкурсі потрібно зробити кілька кроків:</h2>

          <ul className='m-0 pl-4 text-black list-decimal text-base/[22px]'>
            {description.map((item, index) => (
              <li key={index} className='mb-2'>{item}</li>
            ))}
          </ul>

          <ArrowLink
            className={
              cn(
                'mt-10',
                styles.arrowLink,
              )
            }
            href={slug === Pages.bestSpecialist ? 'https://ratingop.expertus.com.ua/' : ''}
            target='_blank'
            onClick={openModal}
          >
            Взяти участь
          </ArrowLink>

          {isOpen ? <FormModal page={slug} closeModal={closeModal} /> : null}
        </div>
      </Container>
    </main>
  );
}
