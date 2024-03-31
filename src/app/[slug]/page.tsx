import { Container } from '@/components/Container';

import { content } from './content';
import styles from './InnerPage.module.scss';

type PageParams = {
  params: {
    slug:
      | 'inovative-solutions'
      | 'best-specialist'
      | 'effective-support'
      | 'art';
  };
};

export default async function Page({ params: { slug } }: PageParams) {
  return (
    <main>
      <Container className='pb-15 lg:flex lg:pt-10 lg:pb-20 lg:gap-x-8 xl:gap-x-20'>
        <div className='mb-10 -mr-5 lg:grow lg:w-1/2 lg:order-1 lg:mb-0 lg:-mt-10'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.img}
            src={content[slug].img}
            alt={`Картинка для ${content[slug].title} категорії`}
          />
        </div>

        <div className='lg:grow lg:w-1/2'>
          <h1 className='mb-4 text-2lg font-black text-primary lg:mb-6 lg:text-4.5xl/[55px]'>
            {content[slug].title}
          </h1>

          <p className='text-primary text-sm lg:text-base'>
            {content[slug].subtitle}
          </p>
        </div>
      </Container>
    </main>
  );
}
