'use client';

import { Button } from "@/components/Button";
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

type SubcategoryImageProps = {
  subcategory: keyof typeof subcategories;
};

export const SubcategoryImage = ({ subcategory }: SubcategoryImageProps) => {
  const currentSubcategory = subcategories[subcategory];

  return (
    <div className='relative mb-10 -mr-5 lg:grow lg:w-1/2 lg:order-1 lg:mb-0 lg:-mt-10 lg:flex lg:flex-col'>
      <img
        className={styles.img}
        src={currentSubcategory.img}
        alt={`Картинка для ${currentSubcategory.title}`}
      />

      <Button
        tag="a"
        className="absolute bottom-0 right-0 lg:static lg:mt-6 lg:ml-auto"
        variant="primary"
        href='/art'
      >
        Повернутись назад
      </Button>
    </div>
  );
}; 