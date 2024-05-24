import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const RootLayout = ({className, children, ...props}:ComponentProps<'div'>):React.ReactElement => {
  return <div className={twMerge('dark:bg-background dark:text-foreground font-poppins w-full flex flex-col justify-center items-center', className)} {...props}>
    {children}
  </div>
}
