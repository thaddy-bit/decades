import { CommunicationWidget } from "@/components/chat/CommunicationWidget";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getSiteSettings } from "@/lib/sanity/fetch";

export const revalidate = 120;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-0">{children}</main>
      <Footer />
      <CommunicationWidget
        contact={{
          phone: settings.contactPhone,
          email: settings.contactEmail,
        }}
      />
    </div>
  );
}
