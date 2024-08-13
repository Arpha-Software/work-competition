import { Pages } from "@/utils/enums";
import { Container } from '@/components/Container';
import { Vote } from "@/sections/Vote";
import { ArrowLink } from "@/components/ArrowLink";
import { content } from "../content";
import styles from '../InnerPage.module.scss';
import { Button } from "@/components/Button";
import Link from "next/link";

type PageParams = {
  params: {
    subcategory:
        Pages.postersAndInformation
      | Pages.postersAndInformation
      | Pages.drawings
      | Pages.videos
  };
};

export default function Page({ params: { subcategory } }: PageParams) {
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
  }

  const { img, category, title, subtitle, description, support, winners, final } = content['art']

  return (
    <main>
      <Container className='pb-15 lg:flex lg:pt-10 lg:pb-20 lg:gap-x-8 xl:gap-x-20'>
        <div className='relative mb-10 -mr-5 lg:grow lg:w-1/2 lg:order-1 lg:mb-0 lg:-mt-10 lg:flex lg:flex-col'>
          <img
            className={styles.img}
            src={subcategories[subcategory].img}
            alt={`Картинка для ${category} категорії`}
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

        <div className='lg:grow lg:w-1/2'>
          <h1 className='mb-4 text-2lg font-black lg:mb-6 lg:text-4.5xl/[55px]'>
            <Link
              href='/'
              className="text-primary"
            >
              Онлайн Голосування - Конкурс "Мистецтво, що рятує життя" - {subcategories[subcategory].title}
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
        </div>
      </Container>

      <Container>
        <h2 className="text-primary font-extrabold text-3xl mb-6">Відкрите голосування триватиме з 01.07.24 до 01.09.24</h2>
        <h2 className="text-primary font-extrabold text-3xl mb-10">Конкурсні роботи:</h2>

        <Vote category="Мистецтво, що рятує життя" subcategory={subcategories[subcategory].title} />
      </Container>
    </main>
  )
}
