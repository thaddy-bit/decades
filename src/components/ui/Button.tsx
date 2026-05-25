import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-decades-orange text-white hover:bg-decades-orange-dark shadow-md shadow-decades-orange/20",
  outline:
    "border-2 border-decades-orange/80 text-decades-orange hover:bg-cream",
  ghost: "text-ink hover:bg-cream",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-all ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
