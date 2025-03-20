import { Pages } from "@/utils/enums";
import { Container } from '@/components/Container';
import { Vote } from "@/sections/Vote";
import { content } from "../content";
import { SubcategoryContent, SubcategoryImage } from '@/components/Subcategory';

type PageParams = {
  params: {
    subcategory:
      | Pages.postersAndInformation
      | Pages.photosAndCollages
      | Pages.drawings
      | Pages.videos;
  };
};

export default function Page({ params: { subcategory } }: PageParams) {
  const { category, subtitle, description, support, winners, final } = content['art'];

  return (
    <main>
      <Container className='pb-15 lg:flex lg:pt-10 lg:pb-20 lg:gap-x-8 xl:gap-x-20'>
        <SubcategoryImage subcategory={subcategory} />
        <SubcategoryContent
          subcategory={subcategory}
          category={category}
          subtitle={subtitle}
          description={description}
          support={support}
          winners={winners}
          final={final}
        />
      </Container>

      <Container>
        <h2 className="text-primary font-extrabold text-3xl mb-6">
          Відкрите голосування триватиме з 01.07.24 до 31.10.24
        </h2>
        <h2 className="text-primary font-extrabold text-3xl mb-10">
          Конкурсні роботи:
        </h2>

        <Vote 
          category="Мистецтво, що рятує життя" 
          subcategory={subcategory} 
        />
      </Container>
    </main>
  );
}
