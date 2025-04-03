import Image from "next/image";
import Link from 'next/link';

import cn from "@/tools/cn";

import { ArrowLink } from "../ArrowLink";

import type { ContentT, ImageT } from "@/utils/types";
import { Tag } from "../Tag";
import { ECardType } from "@/utils/enums";

type CategoryCardProps = {
  className?: string,
  image: ImageT,
  content: ContentT,
  linkHref: string,
  buttonText?: string,
  type?: ECardType,
  tagLabel?: string,
}

export const CategoryCard = ({
  className,
  image,
  content,
  linkHref,
  buttonText = 'Подивитись докладніше',
  type = ECardType.CATEGORY,
  tagLabel = '2025',
 }: CategoryCardProps) => {
  const { src, alt } = image;
  const { title, description } = content;

  return (
    <div className={cn("max-w-[600px] w-full lg:flex lg:flex-col lg:rounded lg:shadow-lg lg:pb-6 lg:overflow-hidden", className)}>
      <Link href={linkHref} className="block w-full h-[500px] lg:h-auto">
        <Image
          src={src}
          alt={alt}
          width={600}
          height={500}
          className="w-full h-full bg-slate-300 mb-6 object-cover lg:rounded-t"
        />
      </Link>

      <div className="lg:px-4 lg:flex lg:flex-col lg:pt-6 lg:grow">
        <h2 className="text-3.5xl font-black text-primary mb-4 lg:text-lg lg:font-extrabold">
          { title }
        </h2>

        <p className="text-primary mb-4 lg:mb-6">
          { description }
        </p>

        <div className="lg:mt-auto flex items-center justify-between">
          {type === ECardType.EVENT ? <Tag label={tagLabel} /> : null}
          <ArrowLink href={linkHref}>{buttonText}</ArrowLink>
        </div>
      </div>
    </div>
  )
}
