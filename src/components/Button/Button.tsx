'use client';

import { ButtonHTMLAttributes, useState } from "react";
import { cva } from "class-variance-authority";
import Image from "next/image";
import cn from "@/tools/cn";
import { images } from "@/utils/constants";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "disabled";
}

export const Button = ({
  className,
  variant,
  children,
  ...props
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleHover = (isHovering: boolean) => setIsHovered(isHovering);

  return (
    <button
      className={cn(
        buttonVariants({ variant }),
        className
      )}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
      {...props}
    >
      { children }

      <span className={cn(buttonIconVariants({ variant }))}>
        <Image
          src={isHovered ? images.icons.arrowBlue : images.icons.arrowWhite}
          alt="Arrow icon"
          width={20}
          height={20}
        />
      </span>
    </button>
  )
}

const buttonVariants = cva(
  "bg-transparent w-full flex justify-between items-center pl-2 max-w-75 font-bold text-start rounded-r-full select-none transition-all",
  {
    variants: {
      variant: {
        primary: "bg-transparent hover:bg-secondary",
        secondary: "",
        disabled: "cursor-not-allowed"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);

const buttonIconVariants = cva(
  "flex justify-center items-center p-3 rounded-r-full",
  {
    variants: {
      variant: {
        primary: "bg-secondary",
        secondary: "",
        disabled: "bg-disabled"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);
