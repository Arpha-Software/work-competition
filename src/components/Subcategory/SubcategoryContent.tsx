'use client';

import Link from "next/link";
import { Button } from "@/components/Button";
import { DescriptionList, ContentSection } from '@/components/Content';
import styles from '@/app/[slug]/InnerPage.module.scss';
import { Pages } from "@/utils/enums";

const subcategories = {
  [Pages.postersAndInformation]: {
    title: 'Постери та інформаційні плакати',
    img: '/images/posters.png',
  },
  [Pages.photosAndCollages]: {
    title: 'Художні фото та колажі',
    img: '/images/photo_collages.png',
  },
  [Pages.drawings]: {
    title: 'Малюнки',
    img: '/images/pictures.png',
  },
  [Pages.videos]: {
    title: 'Відеоролики',
    img: '/images/videos.png',
  },
} as const;

type SubcategoryContentProps = {
  subcategory: keyof typeof subcategories;
  category: string;
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

export const SubcategoryContent = ({
  subcategory,
  category,
  subtitle,
  description,
  support,
  winners,
  final,
}: SubcategoryContentProps) => {
  const currentSubcategory = subcategories[subcategory];

  return (
    <div className='lg:grow lg:w-1/2'>
      <h1 className='mb-4 text-2lg font-black lg:mb-6 lg:text-4.5xl/[55px]'>
        <Link href='/' className="text-primary">
          Онлайн Голосування - Конкурс &quot;Мистецтво, що рятує життя&quot; - {currentSubcategory.title}
        </Link>
      </h1>

      <h2 className='text-primary text-sm lg:text-base'>
        Вітаємо на сторінці голосування!
      </h2>

      <p className='mt-4'>{subtitle}</p>

      <h2 className='mt-6 mb-4 text-black font-bold text-base/[22px] lg:mt-8'>
        Як голосувати?
      </h2>

      <DescriptionList items={description} />
      <ContentSection title={support.title} content={support.content} />
      <ContentSection title={winners.title} content={winners.content} />
      <div className="mt-4">
        <h3 className="indent-8">{final}</h3>
      </div>
    </div>
  );
}; 