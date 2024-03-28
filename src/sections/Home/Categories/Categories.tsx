import { CategoryCard } from "@/components/CategoryCard";
import { Container } from "@/components/Container";
import { categories } from "@/utils/mockedContent";

export const Categories = () => {
  return (
    <Container className="my-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 gap-x-5 justify-items-center w-full">
        {categories.map(({ content, image, linkHref }, index) => (
          <CategoryCard
            image={image}
            content={content}
            linkHref={linkHref}
            key={`${content.title}-${index}`}
          />
        ))}
      </div>
    </Container>
  )
}
