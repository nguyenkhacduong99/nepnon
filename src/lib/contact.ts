import { siteConfig } from "@/data/site-config";

/** Link chat Zalo. Trả về null nếu chưa cấu hình số Zalo. */
export function getZaloUrl(): string | null {
  const digits = siteConfig.contact.zaloPhone.replace(/\D/g, "");
  return digits ? `https://zalo.me/${digits}` : null;
}

export function getPhoneHref(): string | null {
  const digits = siteConfig.contact.phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
}

export function getEmailHref(): string | null {
  return siteConfig.contact.email ? `mailto:${siteConfig.contact.email}` : null;
}
