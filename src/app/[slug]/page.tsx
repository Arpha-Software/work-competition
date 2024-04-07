'use client';

import { useState } from "react";
import cn from "@/tools/cn";

import { Container } from '@/components/Container';
import { ArrowLink } from '@/components/ArrowLink';

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
  const { img, title, subtitle } = content[slug] || { img: '', title: '', subtitle: '' };
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
        <div className='mb-10 -mr-5 lg:grow lg:w-1/2 lg:order-1 lg:mb-0 lg:-mt-10'>
          <img
            className={styles.img}
            src={img}
            alt={`Картинка для ${title} категорії`}
          />
        </div>

        <div className='lg:grow lg:w-1/2'>
          <h1 className='mb-4 text-2lg font-black text-primary lg:mb-6 lg:text-4.5xl/[55px]'>
            {title}
          </h1>

          <p className='text-primary text-sm lg:text-base'>
            {subtitle}
          </p>

          <h2 className='mt-6 mb-4 text-black font-bold text-base/[22px] lg:mt-8'>Для участі в конкурсі потрібно зробити кілька кроків:</h2>

          <ul className='m-0 pl-4 text-black list-decimal text-base/[22px]'>
            <li className='mb-2'>
              Намалювати малюнок на папері на тему «Мистецтво, що рятує життя».
              Немає значення, скільки вам років, вмієте ви малювати чи користуєтеся відповідним програмним
              забезпеченням. Фантазія і почуття – ось що робить ескіз, постер, малюнок витвором мистецтва.
            </li>

            <li className='mb-2'>
              Завантажити фото чи сканкопію малюнку на сайт конкурсу, вказавши ім’я, прізвище, вік,
              місце постійного проживання та номер телефону.
            </li>

            <li className='mb-2'>
              На конкурс можна подати один малюнок.
            </li>

            <li className='mb-2'>
              Оригінал малюнку потрібно зберігати до оголошення фіналістів конкурсу.
            </li>

            <li>
              Фіналісти конкурси мають надіслати оригінал малюнка організатору конкурсу.
            </li>
          </ul>

          <ArrowLink
            className={
              cn(
                'mt-10',
                styles.arrowLink,
              )
            }
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
