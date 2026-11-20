"use client";

import { Button, ButtonLink } from "@/components/common/Button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="type-section text-forest">Đã có lỗi xảy ra</h1>
      <p className="mt-4 max-w-md text-muted">Xin lỗi vì sự bất tiện. Bạn có thể thử tải lại trang.</p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>Thử lại</Button>
        <ButtonLink href="/" variant="secondary">
          Về trang chủ
        </ButtonLink>
      </div>
    </section>
  );
}
