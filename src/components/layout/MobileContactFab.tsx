import { Phone } from "lucide-react";
import { ZaloIcon } from "@/components/common/BrandIcons";
import { getPhoneHref, getZaloUrl } from "@/lib/contact";

/** Nút liên hệ cố định trên di động. Ẩn nếu chưa cấu hình Zalo/điện thoại. */
export function MobileContactFab() {
  const zalo = getZaloUrl();
  const phone = getPhoneHref();
  if (!zalo && !phone) return null;
  const href = zalo ?? phone!;
  return (
    <a
      href={href}
      {...(zalo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={zalo ? "Nhắn Zalo cho NẾP NÓN" : "Gọi điện cho NẾP NÓN"}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 inline-flex size-14 items-center justify-center rounded-full bg-forest text-ivory shadow-[0_10px_30px_-10px_rgba(38,61,37,0.7)] ring-1 ring-ivory/20 md:hidden"
    >
      {zalo ? <ZaloIcon className="size-7" /> : <Phone className="size-6" strokeWidth={1.5} />}
    </a>
  );
}
