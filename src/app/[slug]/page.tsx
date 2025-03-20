import { Container } from '@/components/Container';
import { Vote } from "@/sections/Vote";
import { Subcategories } from "@/sections/Home/Subcategories/Subcategories";
import { content } from './content';
import { CategoryContent, CategoryImage } from '@/components/Category';
import { Pages } from '@/utils/enums';

type PageParams = {
  params: {
    slug: Pages.inovativeSolutions | Pages.bestSpecialist | Pages.effectiveSupport | Pages.art;
  };
};

export default function Page({ params: { slug } }: PageParams) {
  const { img, category, title, subtitle, description, support, winners, final } = content[slug] || {
    img: '',
    title: '',
    subtitle: '',
    description: [],
    support: { title: '', content: '' },
    winners: { title: '', content: '' },
    final: ''
  };

  if (category === 'Мистецтво, що рятує життя') {
    return (
      <Container>
        <Subcategories />
      </Container>
    );
  }

  return (
    <main className='relative'>
      <Container className='pb-15 lg:flex lg:pt-10 lg:pb-20 lg:gap-x-8 xl:gap-x-20'>
        <CategoryImage img={img} category={category} />
        <CategoryContent
          slug={slug}
          category={category}
          title={title}
          subtitle={subtitle}
          description={description}
          support={support}
          winners={winners}
          final={final}
        />
      </Container>

      {category !== 'Кращий спеціаліст з охорони праці' && (
        <Container>
          <h2 className="text-primary font-extrabold text-3xl mb-6">
            Відкрите голосування триватиме з 01.07.24 до 31.10.24
          </h2>
          <h2 className="text-primary font-extrabold text-3xl mb-10">
            Конкурсні роботи:
          </h2>
          <Vote category={category} subcategory="" />
        </Container>
      )}
    </main>
  );
}
