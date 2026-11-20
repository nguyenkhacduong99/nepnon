import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { categories } from "@/data/categories";
import { policies } from "@/data/policies";
import { siteConfig } from "@/data/site-config";
import { getEmailHref, getPhoneHref, getZaloUrl } from "@/lib/contact";
import { FacebookIcon, TikTokIcon, ZaloIcon } from "@/components/common/BrandIcons";
import { Logo } from "./Logo";

export function Footer() {
  const zalo = getZaloUrl();
  const phone = getPhoneHref();
  const email = getEmailHref();
  const socials = [
    zalo && { href: zalo, label: "Zalo", Icon: ZaloIcon },
    siteConfig.social.facebook && { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
    siteConfig.social.tiktok && { href: siteConfig.social.tiktok, label: "TikTok", Icon: TikTokIcon },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof ZaloIcon }[];

  const heading = "mb-5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-bamboo";
  const link = "text-ivory/75 transition-colors hover:text-ivory";

  return (
    <footer className="bg-forest text-ivory">
      <div className="rule-weave opacity-60" aria-hidden="true" />
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-5 font-script text-2xl text-bamboo">{siteConfig.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-ivory/70">{siteConfig.description}</p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex size-11 items-center justify-center border border-ivory/25 text-ivory/85 transition-colors hover:border-bamboo hover:text-bamboo"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className={heading}>Sản phẩm</h2>
          <ul className="space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products?category=${c.slug}`} className={link}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>Thông tin</h2>
          <ul className="space-y-3 text-sm">
            <li><Link href="/story" className={link}>Câu chuyện của mẹ</Link></li>
            <li><Link href="/craftsmanship" className={link}>Quy trình làm nón</Link></li>
            <li><Link href="/culture" className={link}>Góc văn hóa</Link></li>
            {policies.map((p) => (
              <li key={p.slug}>
                <Link href={`/policies/${p.slug}`} className={link}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>Liên hệ</h2>
          <ul className="space-y-4 text-sm text-ivory/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-bamboo" strokeWidth={1.5} aria-hidden="true" />
              <span>{siteConfig.contact.address}</span>
            </li>
            {phone && (
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-bamboo" strokeWidth={1.5} aria-hidden="true" />
                <a href={phone} className={link}>{siteConfig.contact.phone}</a>
              </li>
            )}
            {email && (
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-bamboo" strokeWidth={1.5} aria-hidden="true" />
                <a href={email} className={link}>{siteConfig.contact.email}</a>
              </li>
            )}
            <li className="text-ivory/60">{siteConfig.contact.workingHours}</li>
          </ul>
          <Link href="/contact" className="mt-6 inline-block border-b border-bamboo/60 pb-0.5 text-sm text-bamboo hover:border-bamboo">
            Trang liên hệ →
          </Link>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ivory/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. Bảo lưu mọi quyền.</p>
          <p>
            Làm thủ công tại {siteConfig.origin}. ·{" "}
            <Link href="/brand" className="hover:text-ivory">
              Nhận diện thương hiệu
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
