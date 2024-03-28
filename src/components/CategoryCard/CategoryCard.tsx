import Image from "next/image";
import cn from "@/tools/cn";
import { ArrowLink } from "../ArrowLink";

type ImageT = {
  src: string,
  alt: string,
}

type ContentT = {
  title: string,
  description: string,
}

type CategoryCardProps = {
  className?: string,
  image: ImageT,
  content: ContentT,
  linkHref: string,
}

export const CategoryCard = ({
  className,
  image,
  content,
  linkHref
 }: CategoryCardProps) => {
  const { src, alt } = image;
  const { title, description } = content;

  return (
    <div className={cn("max-w-[600px] w-full", className)}>
      <Image
        src={src}
        alt={alt}
        width={600}
        height={500}
        className="w-full h-[500px] bg-slate-300 mb-6 object-cover"
      />

      <div className="space-y-4">
        <h2 className="text-3.5xl font-black text-primary">
          { title }
        </h2>

        <p className="text-primary">
          { description }
        </p>

        <ArrowLink href={linkHref}>Подивитись докладніше</ArrowLink>
      </div>
    </div>
  )
}
