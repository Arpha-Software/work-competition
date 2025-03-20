'use client';

import { Button } from "@/components/Button";
import styles from '@/app/[slug]/InnerPage.module.scss';

type CategoryImageProps = {
  img: string;
  category: string;
};

export const CategoryImage = ({ img, category }: CategoryImageProps) => {
  return (
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
  );
}; 