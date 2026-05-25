type ContactQuickActionsProps = {
  phone?: string;
  email?: string;
};

export function ContactQuickActions({ phone, email }: ContactQuickActionsProps) {
  const phoneDigits = phone?.replace(/\D/g, "") ?? "";
  const whatsappHref = phoneDigits
    ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent(
        "Bonjour LA DECADES, je souhaite vous contacter.",
      )}`
    : null;

  const actions = [
    whatsappHref && {
      href: whatsappHref,
      external: true,
      label: "WhatsApp",
      desc: "Réponse rapide",
      className: "bg-[#25D366] text-white hover:opacity-90",
      icon: "whatsapp",
    },
    phone && {
      href: `tel:${phone}`,
      external: false,
      label: "Appeler",
      desc: phone,
      className:
        "border-2 border-decades-orange/30 bg-cream/50 text-ink hover:border-decades-orange",
      icon: "phone",
    },
    email && {
      href: `mailto:${email}`,
      external: false,
      label: "E-mail",
      desc: email,
      className:
        "border-2 border-stone-200 bg-white text-ink hover:border-decades-orange hover:bg-cream/50",
      icon: "email",
    },
  ].filter(Boolean) as Array<{
    href: string;
    external: boolean;
    label: string;
    desc: string;
    className: string;
    icon: string;
  }>;

  if (actions.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {actions.map((action) => (
        <a
          key={action.label}
          href={action.href}
          target={action.external ? "_blank" : undefined}
          rel={action.external ? "noopener noreferrer" : undefined}
          className={`flex flex-col rounded-2xl px-5 py-5 transition ${action.className}`}
        >
          <span className="text-sm font-bold">{action.label}</span>
          <span className="mt-1 truncate text-xs opacity-85">{action.desc}</span>
        </a>
      ))}
    </div>
  );
}
