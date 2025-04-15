import { CategoryCard } from '@/components/CategoryCard';
import { Container } from '@/components/Container';
import { bestArtsContent } from '@/utils/mockedContent';

export const BestArtsCategories = () => {
  return (
    <Container className="my-5">
      <section className='flex flex-col md:flex-row justify-center gap-4 md:gap-8'>
        {bestArtsContent.map(({ image, content, linkHref, buttonText, type, tagLabel }, index) => (
          <CategoryCard
            image={image}
            content={content}
            linkHref={linkHref}
            key={`${content.title}-${index}`}
            buttonText={buttonText}
            type={type}
            tagLabel={tagLabel}
          />
        ))}
      </section>
    </Container>
  );
}; 