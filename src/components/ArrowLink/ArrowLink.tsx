import Link from "next/link";
import { cva } from "class-variance-authority";
import cn from "@/tools/cn";

import ArrowIcon from "/public/icons/arrow.svg";

import type { UrlObject } from 'url';

type ArrowLinkProps = {
  href?: string | UrlObject;
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "disabled";
  onClick?: () => void;
  target?: string;
}

export const ArrowLink = ({
  className,
  variant,
  children,
  href,
  onClick,
  target,
  ...props
}: ArrowLinkProps) => {
  if (!href) {
    return (
      <button
        className={cn(
          arrowLinkVariants({ variant }),
          className
        )}
        onClick={onClick}
        {...props}
      >
        { children }

        <span className={cn(arrowLinkIconVariants({ variant }))}>
          <ArrowIcon />
        </span>
      </button>
    )
  }

  return (
    <Link
      className={cn(
        arrowLinkVariants({ variant }),
        className
      )}
      target={target}
      href={href}
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
