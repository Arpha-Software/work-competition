'use client';

import Link from "next/link";
import { ArrowLink } from "@/components/ArrowLink";
import { DescriptionList, ContentSection } from '@/components/Content';
import { Pages } from "@/utils/enums";
import cn from "@/tools/cn";
import styles from '@/app/[slug]/InnerPage.module.scss';

type CategoryContentProps = {
  slug: Pages.inovativeSolutions | Pages.bestSpecialist | Pages.effectiveSupport | Pages.art;
  category: string;
  title: string;
  subtitle: string;
  description: (string | string[])[];
  support: {
    title: string;
    content: string;
  };
  winners: {
    title: string;
    content: string;
  };
  final: string;
};

export const CategoryContent = ({
  slug,
  category,
  title,
  subtitle,
  description,
  support,
  winners,
  final,
}: CategoryContentProps) => {
  const isBestSpecialist = category === "Кращий спеціаліст з охорони праці";

  return (
    <div className='lg:grow lg:w-1/2'>
      <h1 className='mb-4 text-2lg font-black lg:mb-6 lg:text-4.5xl/[55px]'>
        <Link href='/' className="text-primary">
          {title}
        </Link>
      </h1>

      {!isBestSpecialist && (
        <h2 className='text-primary text-sm lg:text-base'>
          Вітаємо на сторінці голосування!
        </h2>
      )}

      <p className='mt-4'>{subtitle}</p>

      {!isBestSpecialist && (
        <h2 className='mt-6 mb-4 text-black font-bold text-base/[22px] lg:mt-8'>
          Як голосувати?
        </h2>
      )}

      <DescriptionList items={description} />
      <ContentSection title={support.title} content={support.content} />
      <ContentSection title={winners.title} content={winners.content} />
      <div className="mt-4">
        <h3 className="indent-8">{final}</h3>
      </div>

      <div className="flex gap-10 items-center mt-10">
        {slug === Pages.bestSpecialist ? (
          <ArrowLink
            className={cn(styles.arrowLink, 'pointer-events-none')}
            variant="primary"
            href="https://ratingop.expertus.com.ua/"
            target='_blank'
          >
            Взяти участь
          </ArrowLink>
        ) : (
          <span className="font-bold text-red-700">Реєстрацію завершено</span>
        )}
      </div>
    </div>
  );
}; 