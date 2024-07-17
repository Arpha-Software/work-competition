import { CategoryCard } from "@/components/CategoryCard";
import { Container } from "@/components/Container";
import { subcategories } from "@/utils/mockedContent";

export const Subcategories = () => {
  return (
    <Container className="my-5">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-16 gap-x-5 justify-items-center w-full lg:gap-x-8">
        {subcategories.map(({ content, image, linkHref }, index) => (
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
