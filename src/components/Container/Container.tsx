import cn from "@/tools/cn";

type ContainerProps = {
  children: React.ReactNode,
  className?: string,
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <section className={cn("mx-5 lg:mx-[60px]", className)}>
      { children }
    </section>
  )
}
