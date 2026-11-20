import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileContactFab } from "@/components/layout/MobileContactFab";
import { JsonLd, organizationJsonLd } from "@/components/common/JsonLd";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-forest focus:px-4 focus:py-2 focus:text-ivory"
      >
        Bỏ qua đến nội dung chính
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <MobileContactFab />
      <JsonLd data={organizationJsonLd()} />
    </>
  );
}
