import { ButtonHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import cn from "@/tools/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "disabled";
}

export const Button = ({
  className,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        buttonVariants({ variant }),
        className
      )}
      {...props}
    />
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
