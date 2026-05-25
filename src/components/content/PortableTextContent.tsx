import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-8 font-serif text-2xl font-semibold text-ink">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 font-serif text-xl font-semibold text-ink">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mt-4 leading-relaxed text-stone">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="font-medium text-decades-orange underline-offset-2 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export function PortableTextContent({
  value,
}: {
  value?: PortableTextBlock[];
}) {
  if (!value?.length) return null;
  return (
    <div className="prose-decades">
      <PortableText value={value} components={components} />
    </div>
  );
}
