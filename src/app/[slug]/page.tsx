import cn from "@/tools/cn";

import { Container } from '@/components/Container';
import { ArrowLink } from "@/components/ArrowLink";

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

          <h2 className='mt-6 mb-4 text-black font-bold text-base/[22px] lg:mt-8'>Для участі в конкурсі потрібно зробити кілька кроків:</h2>

          <ul className='m-0 pl-4 text-black list-decimal text-base/[22px]'>
            <li className='mb-2'>
              Намалювати малюнок на папері на тему «Мистецтво, що рятує життя».
              Немає значення, скільки вам років, вмієте ви малювати чи користуєтеся відповідним програмним
              забезпеченням. Фантазія і почуття – ось що робить ескіз, постер, малюнок витвором мистецтва.
            </li>

            <li className='mb-2'>
              Завантажити фото чи сканкопію малюнку на <a className="text-primary hover:underline" href="">сайт конкурсу</a>, вказавши ім’я, прізвище, вік,
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
            href=''
          >
            Взяти участь
          </ArrowLink>
        </div>
      </Container>
    </main>
  );
}
