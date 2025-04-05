import { CategoryCard } from '@/components/CategoryCard';
import { Container } from '@/components/Container';
import { bestArtsContent } from '@/utils/mockedContent';

export const Categories = () => {
  return (
    <Container className="my-5">
      <section className='flex justify-center gap-8'>
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