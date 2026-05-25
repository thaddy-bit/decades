import Image from "next/image";

type BrandLogoVariant = "navbar" | "navbar-overlay" | "footer" | "sidebar";

type BrandLogoProps = {
  variant?: BrandLogoVariant;
  priority?: boolean;
  className?: string;
};

const variantStyles: Record<
  BrandLogoVariant,
  { wrapper: string; image: string }
> = {
  navbar: {
    wrapper:
      "rounded-xl bg-white p-1 shadow-sm ring-1 ring-stone-200/60 ring-inset",
    image: "h-10 w-10 object-contain sm:h-11 sm:w-11",
  },
  "navbar-overlay": {
    wrapper:
      "rounded-xl bg-white/95 p-1 shadow-md ring-1 ring-white/50 ring-inset",
    image: "h-10 w-10 object-contain sm:h-11 sm:w-11",
  },
  footer: {
    wrapper:
      "rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-cream/40 ring-inset",
    image: "h-11 w-11 object-contain",
  },
  sidebar: {
    wrapper:
      "rounded-xl bg-white p-1 ring-1 ring-stone-200/70 ring-inset",
    image: "h-10 w-10 object-contain",
  },
};

export function BrandLogo({
  variant = "navbar",
  priority = false,
  className = "",
}: BrandLogoProps) {
  const v = variantStyles[variant];

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden ${v.wrapper} ${className}`}
    >
      <Image
        src="/logo.png"
        alt="LA DECADES"
        width={48}
        height={64}
        priority={priority}
        className={v.image}
      />
    </span>
  );
}
