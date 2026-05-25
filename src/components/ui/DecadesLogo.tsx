import Image from "next/image";

type DecadesLogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
};

const dimensions = {
  sm: { w: 36, h: 48, display: "h-9 w-9" },
  md: { w: 56, h: 72, display: "h-14 w-14" },
  lg: { w: 80, h: 104, display: "h-20 w-20 sm:h-24 sm:w-24" },
};

export function DecadesLogo({
  size = "md",
  className = "",
  priority = false,
}: DecadesLogoProps) {
  const d = dimensions[size];
  return (
    <Image
      src="/logo.png"
      alt="LA DECADES"
      width={d.w}
      height={d.h}
      priority={priority}
      className={`object-contain ${d.display} ${className}`}
    />
  );
}
