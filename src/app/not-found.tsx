import { ButtonLink } from "@/components/common/Button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">Lỗi 404</p>
      <h1 className="mt-4 type-page text-forest">Không tìm thấy trang</h1>
      <p className="mt-4 max-w-md text-muted">Trang bạn tìm có thể đã được đổi tên hoặc không còn tồn tại.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Về trang chủ</ButtonLink>
        <ButtonLink href="/products" variant="secondary">
          Xem sản phẩm
        </ButtonLink>
      </div>
    </section>
  );
}
