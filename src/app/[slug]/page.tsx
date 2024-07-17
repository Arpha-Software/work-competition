'use client';

import { useState } from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

import { Container } from '@/components/Container';
import { ArrowLink } from '@/components/ArrowLink';
import { Button } from '@/components/Button';
import { Vote } from "@/sections/Vote";
import { Subcategories } from "@/sections/Home/Subcategories/Subcategories";

import { Pages } from '@/utils/enums';
import { FormModal } from '@/components/Form/Form';
import { content } from './content';
import cn from "@/tools/cn";

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
  const { img, category, title, subtitle, description, support, winners, final } = content[slug]
    || {
        img: '',
        title: '',
        subtitle: '',
        description: [],
        support: {
          title: '',
          content: ''
        },
        winners: {
          title: '',
          content: ''
        },
        final: ''
      };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  if (category === 'Мистецтво, що рятує життя') {
    return (
      <Container>
        <Subcategories />
      </Container>
    )
  }

  return (
    <main className='relative'>
      <Container className='pb-15 lg:flex lg:pt-10 lg:pb-20 lg:gap-x-8 xl:gap-x-20'>
        <div className='relative mb-10 -mr-5 lg:grow lg:w-1/2 lg:order-1 lg:mb-0 lg:-mt-10 lg:flex lg:flex-col'>
          <img
            className={styles.img}
            src={img}
            alt={`Картинка для ${category} категорії`}
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

          <h2 className='text-primary text-sm lg:text-base'>Вітаємо на сторінці голосування!</h2>

          <p className='mt-4'>
            {subtitle}
          </p>

          <h2 className='mt-6 mb-4 text-black font-bold text-base/[22px] lg:mt-8'>Як голосувати?</h2>

          <ul className='m-0 pl-4 text-black list-decimal text-base/[22px]'>
            {description.map((item, index) => {
              if (Array.isArray(item)) {
                return (
                  <ul key={index} className='pl-4'>
                    {item.map((subItem, subIndex) => (
                      <li key={subIndex} className='mb-2'>{subItem}</li>
                    ))}
                  </ul>
                );
              }

              return (
                <li key={index} className='mb-2'>{item}</li>
              );
            })}
          </ul>

          <div className="mt-4">
            <h3 className="text-primary font-semibold text-sm lg:text-base">{support.title}</h3>
            <p className="mt-2 indent-8">{support.content}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-primary font-semibold text-sm lg:text-base">{winners.title}</h3>
            <p className="mt-2 indent-8">{winners.content}</p>
          </div>

          <div className="mt-4">
            <h3 className="indent-8">{final}</h3>
          </div>

          <div className="flex gap-10 items-center mt-10">
            <ArrowLink
              className={
                cn(
                  styles.arrowLink,
                  'pointer-events-none'
                )
              }
              variant="disabled"
              href={slug === Pages.bestSpecialist ? 'https://ratingop.expertus.com.ua/' : ''}
              target='_blank'
              onClick={openModal}
            >
              Взяти участь
            </ArrowLink>

            <span className="font-bold text-red-700">Реєстрацію завершено</span>
          </div>

          {isOpen ? <FormModal page={slug} closeModal={closeModal} /> : null}

        </div>
      </Container>

      {category !== 'Кращий спеціаліст з охорони праці' ? (
        <Container>
          <h2 className="text-primary font-extrabold text-3xl mb-6">Відкрите голосування триватиме з 01.07.24 до 01.09.24</h2>
          <h2 className="text-primary font-extrabold text-3xl mb-10">Конкурсні роботи:</h2>

          <Vote category={category} subcategory="" />
        </Container>
      ) : null}

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </main>
  );
}
