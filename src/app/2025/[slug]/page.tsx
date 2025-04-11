'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import cn from "@/tools/cn";
import { Toaster } from "react-hot-toast";

import { Container } from '@/components/Container';
import { ArrowLink } from '@/components/ArrowLink';
import { Button } from '@/components/Button';
import { Vote } from '@/sections/Vote';

import { Pages } from '@/utils/enums';
import { FormModal } from '@/components/Form/Form';
import { content } from './content';
import { getFeature } from '@/api/submissions';

import styles from './InnerPage.module.scss';
import { Loader } from "@/components/Loader";
import { Subcategories } from "@/sections/Home/Subcategories/Subcategories";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isVotingEnabled, setIsVotingEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const pageContent = content[slug];
  const { category, img } = pageContent;
  const title = typeof pageContent.title === 'function' ? pageContent.title(isVotingEnabled) : pageContent.title;
  const subtitle = typeof pageContent.subtitle === 'function' ? pageContent.subtitle(isVotingEnabled) : pageContent.subtitle;
  const description = typeof pageContent.description === 'function' ? pageContent.description(isVotingEnabled) : pageContent.description;
  const supportTitle = typeof pageContent.support.title === 'function' ? pageContent.support.title(isVotingEnabled) : pageContent.support.title;
  const supportContent = typeof pageContent.support.content === 'function' ? pageContent.support.content(isVotingEnabled) : pageContent.support.content;

  useEffect(() => {
    const fetchVotingState = async () => {
      try {
        const featureResponse = await getFeature('VOTING');
        setIsVotingEnabled(featureResponse.enabled);
      } catch (error) {
        console.error('Error fetching voting state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVotingState();
  }, []);

  const openModal = () => {
    if (!isVotingEnabled) {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  if (category === 'Мистецтво, що рятує життя' && isVotingEnabled) {
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
            alt={`Картинка для ${title} категорії`}
          />

          <Button
            tag="a"
            className="absolute bottom-0 right-0 lg:static lg:mt-6 lg:ml-auto"
            variant="primary"
            href='/2025'
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

          {isVotingEnabled ? (
            <h2 className='mt-6 mb-4 text-black font-bold text-base/[22px] lg:mt-8'>
              Як голосувати?
            </h2>
          ) : (
            <div className='mt-6 mb-4 lg:mt-8' />
          )}

          <ul className='m-0 pl-4 text-black list-decimal text-base/[22px]'>
            {description.map((item: string | string[], index: number) => {
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

          {isVotingEnabled && supportTitle && supportContent && (
            <div className="mt-10">
              <p className="font-bold text-base mb-2">{supportTitle}</p>
              <p className="font-bold text-base">{supportContent}</p>
            </div>
          )}

          {(!isVotingEnabled || slug === Pages.bestSpecialist) ? (
            <ArrowLink
              className={cn('mt-10', styles.arrowLink)}
              href={slug === Pages.bestSpecialist ? 'https://ratingop.expertus.com.ua/' : ''}
              target='_blank'
              onClick={openModal}
            >
              Взяти участь
            </ArrowLink>
          ) : null}

          {isOpen ? <FormModal page={slug} closeModal={closeModal} /> : null}
        </div>
      </Container>

      {isLoading ? (
        <div className="mt-10 text-center"><Loader /></div>
      ) : (isVotingEnabled && category !== 'Кращий спеціаліст з охорони праці') ? (
        <Container className="mt-10">
          <h2 className="text-primary font-extrabold text-3xl mb-6">Відкрите голосування триватиме з 01.07.25 до 31.10.25</h2>
          <Vote category={category} subcategory="all" />
        </Container>
      ): null}

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </main>
  );
}
