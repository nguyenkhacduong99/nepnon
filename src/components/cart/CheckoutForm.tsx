"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ClipboardCopy, Info } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { buildOrderDraft, formatOrderMessage, zaloSubmitter } from "@/lib/order";
import { getPhoneHref, getZaloUrl } from "@/lib/contact";
import { siteConfig } from "@/data/site-config";
import { useHydrated } from "@/lib/use-hydrated";
import { Button, ButtonLink } from "@/components/common/Button";
import { ZaloIcon } from "@/components/common/BrandIcons";
import type { CustomerInfo } from "@/types/order";

type Errors = Partial<Record<keyof CustomerInfo, string>>;

const PHONE_RE = /^(\+?84|0)\d{8,10}$/;

function validate(c: CustomerInfo): Errors {
  const e: Errors = {};
  if (c.name.trim().length < 2) e.name = "Vui lòng nhập họ tên.";
  if (!PHONE_RE.test(c.phone.replace(/[\s.-]/g, ""))) e.phone = "Số điện thoại chưa đúng (ví dụ 0912 345 678).";
  if (c.address.trim().length < 8) e.address = "Vui lòng nhập địa chỉ nhận hàng đầy đủ.";
  return e;
}

export function CheckoutForm() {
  const { lines, subtotal, hasQuoteItems } = useCart();
  const hydrated = useHydrated();
  const [customer, setCustomer] = useState<CustomerInfo>({ name: "", phone: "", address: "", note: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const zaloUrl = getZaloUrl();
  const phoneHref = getPhoneHref();

  if (!hydrated) return <div className="h-96 animate-pulse bg-bamboo/30" aria-busy="true" aria-label="Đang tải" />;

  if (lines.length === 0) {
    return (
      <div className="border border-dashed border-line px-6 py-20 text-center">
        <p className="font-serif text-3xl text-forest">Chưa có sản phẩm để đặt</p>
        <p className="mt-2 text-muted">Hãy thêm sản phẩm vào giỏ hàng trước khi đặt.</p>
        <ButtonLink href="/products" className="mt-8">
          Xem sản phẩm
        </ButtonLink>
      </div>
    );
  }

  const set = (k: keyof CustomerInfo) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomer((c) => ({ ...c, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(customer);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`field-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    const draft = buildOrderDraft(customer, lines);
    setMessage(formatOrderMessage(draft));
    const res = await zaloSubmitter.submit(draft);
    setStatus({ ok: res.ok, text: res.message });
    setCopied(res.ok);
  }

  async function copyAgain() {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const field = "mt-2 block w-full border border-line bg-white/70 px-4 py-3 text-base focus:border-forest focus:outline-none aria-[invalid=true]:border-red-700";

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_26rem]">
      <div>
        <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-describedby="checkout-note">
          <div className="flex gap-3 bg-bamboo/40 p-4 text-sm text-text/85" id="checkout-note">
            <Info className="mt-0.5 size-4 shrink-0 text-wood" aria-hidden="true" />
            <p>
              Đây là <strong>phiếu đặt hàng</strong>: website sẽ tạo nội dung đơn để bạn gửi cho shop qua Zalo. Đơn chỉ được xác nhận khi shop
              trả lời bạn. Website <strong>chưa thu tiền online</strong> và không lưu thông tin của bạn lên máy chủ.
            </p>
          </div>

          <fieldset className="space-y-5">
            <legend className="font-serif text-2xl text-forest">Thông tin nhận hàng</legend>
            <div>
              <label htmlFor="field-name" className="text-sm font-medium">
                Họ và tên <span className="text-wood">*</span>
              </label>
              <input id="field-name" autoComplete="name" value={customer.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} className={field} />
              {errors.name && <p id="err-name" className="mt-1.5 text-sm text-red-800">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="field-phone" className="text-sm font-medium">
                Số điện thoại <span className="text-wood">*</span>
              </label>
              <input id="field-phone" type="tel" inputMode="tel" autoComplete="tel" value={customer.phone} onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "err-phone" : undefined} className={field} />
              {errors.phone && <p id="err-phone" className="mt-1.5 text-sm text-red-800">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="field-address" className="text-sm font-medium">
                Địa chỉ nhận hàng <span className="text-wood">*</span>
              </label>
              <textarea id="field-address" rows={2} autoComplete="street-address" value={customer.address} onChange={set("address")} aria-invalid={!!errors.address} aria-describedby={errors.address ? "err-address" : undefined} className={field} placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" />
              {errors.address && <p id="err-address" className="mt-1.5 text-sm text-red-800">{errors.address}</p>}
            </div>
            <div>
              <label htmlFor="field-note" className="text-sm font-medium">
                Ghi chú <span className="font-normal text-muted">(không bắt buộc)</span>
              </label>
              <textarea id="field-note" rows={3} value={customer.note} onChange={set("note")} className={field} placeholder="Màu quai, lời nhắn trên thiệp, thời gian nhận hàng…" />
            </div>
          </fieldset>

          <Button type="submit" className="w-full sm:w-auto">
            {zaloUrl ? <ZaloIcon className="size-5" /> : <ClipboardCopy className="size-4" aria-hidden="true" />}
            {zaloUrl ? "Tạo đơn & gửi qua Zalo" : "Tạo nội dung đơn hàng"}
          </Button>
        </form>

        {message && (
          <section className="mt-10 border border-forest/30 bg-white/70 p-6" aria-labelledby="order-result" aria-live="polite">
            <h2 id="order-result" className="type-title text-forest">
              Nội dung đơn hàng của bạn
            </h2>
            {status && <p className={`mt-2 text-sm ${status.ok ? "text-grass" : "text-wood"}`}>{status.text}</p>}
            <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-text/85">
              <li>Nội dung đơn đã được tạo bên dưới{copied ? " và sao chép sẵn" : ""}.</li>
              <li>{zaloUrl ? "Mở Zalo của shop, dán nội dung vào khung chat và gửi." : "Gửi nội dung này cho shop qua điện thoại hoặc mạng xã hội."}</li>
              <li>Shop sẽ trả lời để xác nhận đơn, phí vận chuyển và cách thanh toán.</li>
            </ol>
            <pre className="mt-5 max-h-80 overflow-auto bg-ivory p-4 text-[0.82rem] leading-relaxed whitespace-pre-wrap text-text">{message}</pre>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button variant="secondary" onClick={copyAgain}>
                {copied ? <Check className="size-4" aria-hidden="true" /> : <ClipboardCopy className="size-4" aria-hidden="true" />}
                {copied ? "Đã sao chép" : "Sao chép nội dung"}
              </Button>
              {zaloUrl && (
                <a href={zaloUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 bg-forest px-6 text-ivory hover:bg-grass">
                  <ZaloIcon className="size-5" /> Mở Zalo của shop
                </a>
              )}
              {!zaloUrl && phoneHref && (
                <a href={phoneHref} className="inline-flex min-h-12 items-center justify-center gap-2 bg-forest px-6 text-ivory hover:bg-grass">
                  Gọi {siteConfig.contact.phone}
                </a>
              )}
            </div>
          </section>
        )}
      </div>

      <aside className="h-fit bg-white/60 p-6 ring-1 ring-line lg:sticky lg:top-28" aria-labelledby="checkout-summary">
        <div className="flex items-center justify-between">
          <h2 id="checkout-summary" className="type-title text-forest">
            Đơn hàng
          </h2>
          <Link href="/cart" className="text-sm text-forest underline underline-offset-4">
            Sửa giỏ hàng
          </Link>
        </div>
        <ul className="mt-5 divide-y divide-line text-sm">
          {lines.map(({ product, quantity }) => (
            <li key={product.slug} className="flex justify-between gap-4 py-3">
              <span>
                {product.name} <span className="text-muted">× {quantity}</span>
              </span>
              <span className="shrink-0">{product.price === null ? "Báo giá" : formatPrice(product.price * quantity)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Tạm tính</dt>
            <dd className="font-medium">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Vận chuyển</dt>
            <dd className="text-right">Báo khi xác nhận</dd>
          </div>
        </dl>
        {hasQuoteItems && <p className="mt-3 text-xs text-wood">Tạm tính chưa gồm sản phẩm cần báo giá.</p>}
      </aside>
    </div>
  );
}
