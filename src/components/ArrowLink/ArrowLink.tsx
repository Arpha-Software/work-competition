import { AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { LinkProps } from "next/link";
import { cva } from "class-variance-authority";
import cn from "@/tools/cn";

import ArrowIcon from "/public/icons/arrow.svg";

type ArrowLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "disabled";
}

export const ArrowLink = ({
  className,
  variant,
  children,
  ...props
}: ArrowLinkProps) => {
  return (
    <Link
      className={cn(
        arrowLinkVariants({ variant }),
        className
      )}
      {...props}
    >
      { children }

      <span className={cn(arrowLinkIconVariants({ variant }))}>
        <ArrowIcon />
      </span>
    </Link>
  )
}

const arrowLinkVariants = cva(
  "group bg-transparent w-full flex justify-between items-center pl-2 max-w-75 font-bold text-start rounded-r-full select-none transition-all",
  {
    variants: {
      variant: {
        primary: "bg-transparent hover:bg-secondary",
        disabled: "cursor-not-allowed"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);

const arrowLinkIconVariants = cva(
  "flex justify-center items-center p-3 rounded-r-full text-white transition-all",
  {
    variants: {
      variant: {
        primary: "bg-secondary group-hover:text-primary",
        disabled: "bg-disabled"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);
