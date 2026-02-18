import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "main" | "div" | "section";
}

export default function Container({
  children,
  className = "",
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={`w-full md:w-[75%] lg:w-[50%] p-5 sm:p-2 md:p-4 lg:p-5 mx-auto ${className}`}
    >
      {children}
    </Component>
  );
}
