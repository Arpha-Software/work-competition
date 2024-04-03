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
    <div className="relative">
      <label className="block">
        <span className="absolute bg-white left-4 -top-2 px-2 border-0 shadow-none text-[13px]">
          { label }
        </span>

        <input
          className={cn(
            "border border-black p-4 text-xs w-full",
            className
          )}
          {...props}
        />

        {error ? (
          <span className="text-red-500 text-xs">{ error }</span>
        ): null}
      </label>
    </div>
  )
}
