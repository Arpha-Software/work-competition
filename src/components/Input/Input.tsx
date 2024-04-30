import cn from "@/tools/cn"
import { InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string,
  label?: string,
  error?: string,
}

export const Input = ({
  className,
  label,
  error,
  ...props
}: InputProps) => {
  return (
    <label className="relative block">
      <span className="absolute bg-white left-4 -top-2 px-2 text-xs md:text-[13px] truncate max-w-48 sm:max-w-full">
        { label }
      </span>

      <input
        className={cn(
          "border p-4 text-xs w-full",
          error ? "border-red-500" : "border-black",
          className
        )}
        {...props}
      />

      {error ? (
        <span className="absolute top-full left-0 text-red-500 text-xs">{ error }</span>
      ): null}
    </label>
  )
}
