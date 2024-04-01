import { Container } from '@/components/Container';

import { Modal } from '@/components/Modal';
import { content } from './content';

import styles from './InnerPage.module.scss';
import { Input } from '@/components/Input';
import { Form } from '@/components/Form';

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

          <Modal className='w-[620px] h-[550px] top-4 overflow-auto'>
            <div className='space-y-4'>
              <h2 className='text-3xl text-center uppercase'>Реєстрація</h2>
              <p className='text-sm text-center uppercase w-96 mx-auto'>Категорія: Інноваційні та цифрові рішення для забезпечення безпеки на роботі</p>
            </div>

            <Form />
          </Modal>
        </div>
      </Container>
    </main>
  );
}
