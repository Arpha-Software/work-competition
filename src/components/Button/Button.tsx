import { ReactNode } from "react";
import { cva } from "class-variance-authority";
import cn from "@/tools/cn";

type ButtonProps = {
  variant?: "primary" | "secondary" | "disabled";
  tag?: "button" | "div" | "a";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  href?: string;
  children: ReactNode;
}

export const Button = ({
  className,
  variant,
  tag: Tag = "button",
  children,
  type = "button",
  href,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <Tag
      {...props}
      className={cn(
        buttonVariants({ variant }),
        className
      )}
      type={type}
      href={href}
      onClick={onClick}
    >
      { children }
    </Tag>
  )
}

const buttonVariants = cva(
  "px-10 py-4 text-sm border-2 rounded transition-all",
  {
    variants: {
      variant: {
        primary: "bg-secondary border-secondary hover:bg-opacity-70",
        secondary: "bg-transparent border-secondary text-black hover:bg-secondary",
        disabled: "cursor-not-allowed"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);
