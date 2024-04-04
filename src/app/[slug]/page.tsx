import { Container } from '@/components/Container';

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

export default async function Page({ params: { slug } }: PageParams) {
  const { img, title, subtitle } = content[slug] || { img: '', title: '', subtitle: '' };

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

          <FormModal page={slug} />
        </div>
      </Container>
    </main>
  );
}
