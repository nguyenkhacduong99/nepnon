import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { getEmailHref, getPhoneHref, getZaloUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/common/PageHeader";
import { ZaloButton } from "@/components/common/ZaloButton";
import { FacebookIcon, TikTokIcon } from "@/components/common/BrandIcons";
import { SampleBadge } from "@/components/common/SampleNotice";
import { pages } from "@/data/pages";

export const metadata = pageMetadata({
  title: "Liên hệ – Đặt nón lá",
  description: "Liên hệ NẾP NÓN để mua nón lá thủ công, đặt nón làm quà tặng hoặc đặt số lượng lớn cho sự kiện, doanh nghiệp.",
  path: "/contact",
});

export default function ContactPage() {
  const phone = getPhoneHref();
  const email = getEmailHref();
  const zalo = getZaloUrl();
  const unconfigured = !phone && !email && !zalo;
  const { facebook, tiktok } = siteConfig.social;

  const row = "flex gap-4 border-b border-line py-6";
  const icon = "mt-1 size-5 shrink-0 text-wood";

  return (
    <>
      <PageHeader
        eyebrow={pages.contact.eyebrow}
        title={pages.contact.title}
        intro={pages.contact.intro}
        crumbs={[{ label: "Liên hệ" }]}
      />
      <section className="container-page grid gap-14 pb-24 lg:grid-cols-2">
        <div>
          {unconfigured && siteConfig.showSampleNotices && (
            <div className="mb-6">
              <SampleBadge>Chưa cấu hình số điện thoại / Zalo / email — xem src/data/site-config.ts</SampleBadge>
            </div>
          )}
          <ul className="border-t border-line">
            <li className={row}>
              <MapPin className={icon} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <p className="text-sm text-muted">Địa chỉ</p>
                <p className="mt-1 text-lg">{siteConfig.contact.address}</p>
              </div>
            </li>
            {phone && (
              <li className={row}>
                <Phone className={icon} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="text-sm text-muted">Điện thoại</p>
                  <a href={phone} className="mt-1 block text-lg text-forest hover:text-wood">
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </li>
            )}
            {email && (
              <li className={row}>
                <Mail className={icon} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="text-sm text-muted">Email</p>
                  <a href={email} className="mt-1 block text-lg text-forest hover:text-wood">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </li>
            )}
            <li className={row}>
              <Clock className={icon} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <p className="text-sm text-muted">Thời gian hỗ trợ</p>
                <p className="mt-1 text-lg">{siteConfig.contact.workingHours}</p>
              </div>
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <ZaloButton variant="primary" label="Nhắn Zalo cho chúng tôi" />
            {facebook && (
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 border border-forest px-5 text-forest hover:bg-forest hover:text-ivory">
                <FacebookIcon /> Facebook
              </a>
            )}
            {tiktok && (
              <a href={tiktok} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 border border-forest px-5 text-forest hover:bg-forest hover:text-ivory">
                <TikTokIcon /> TikTok
              </a>
            )}
          </div>
        </div>

        <div className="bg-forest p-8 text-ivory sm:p-12">
          <p className="eyebrow text-bamboo">{pages.contact.bulkEyebrow}</p>
          <h2 className="mt-3 type-section text-ivory">{pages.contact.bulkTitle}</h2>
          <p className="mt-5 text-ivory/80">
            {pages.contact.bulkText} Năng lực của xưởng: {siteConfig.commerce.dailyCapacity}.
          </p>
          <p className="mt-6 text-sm text-bamboo">Khi liên hệ, bạn có thể cho chúng tôi biết:</p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ivory/85 marker:text-bamboo">
            {pages.contact.bulkChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
