# NẾP NÓN — Website nón lá thủ công

Website thương hiệu + bán hàng cho NẾP NÓN (làng nghề Quảng Nạp, Thái Bình).
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · lucide-react.

## Chạy thử

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build & kiểm tra

```bash
npm run typecheck    # TypeScript
npm run lint         # ESLint
npm run build        # build production
npm run start        # chạy bản production
```

## Deploy

Cách đơn giản nhất: đẩy code lên GitHub rồi import vào **Vercel** (miễn phí cho site nhỏ).
Đặt biến môi trường `NEXT_PUBLIC_SITE_URL=https://ten-mien-cua-ban.vn` để canonical, sitemap và Open Graph dùng đúng tên miền.
Có thể deploy lên bất kỳ máy chủ Node.js nào bằng `npm run build && npm run start`.

## Trang quản trị (Decap CMS)

Mọi nội dung web (chữ, giá, sản phẩm, ảnh, câu chuyện, chính sách, liên hệ…) được sửa ở **/admin** bằng ô nhập liệu tiếng Việt. Không cần đụng vào code.
Nội dung được lưu trong thư mục `content/` (file JSON). Ảnh tải lên nằm ở `public/images/uploads/`. Cấu hình các ô nhập: `public/admin/config.yml`.

### Chạy thử trên máy (chưa cần GitHub)

Mở 2 cửa sổ terminal trong thư mục dự án:

```bash
npm run dev     # web: http://localhost:3000
npm run cms     # cầu nối để /admin ghi thẳng vào thư mục content/
```

Mở http://localhost:3000/admin, bấm **Đăng nhập** (chế độ trên máy không cần mật khẩu), sửa xong bấm **Công bố → Công bố ngay**. Trang web tự cập nhật.

### Dùng thật trên mạng (một lần thiết lập)

1. **Đưa code lên GitHub**: tạo repo (nên để Private) rồi push toàn bộ thư mục dự án.
2. **Deploy lên Vercel**: import repo đó. Đặt biến `NEXT_PUBLIC_SITE_URL` = tên miền chính thức.
3. **Tạo GitHub OAuth App** ở GitHub → Settings → Developer settings → OAuth Apps → New:
   - Homepage URL: `https://ten-mien-cua-ban.vn`
   - Authorization callback URL: `https://ten-mien-cua-ban.vn/api/decap/callback`
   - Chép **Client ID** và tạo **Client secret**.
4. Trên Vercel, thêm 2 biến môi trường `GITHUB_OAUTH_CLIENT_ID` và `GITHUB_OAUTH_CLIENT_SECRET`, rồi deploy lại.
5. Sửa `public/admin/config.yml`: `repo: <tài-khoản>/<tên-repo>`, đổi `base_url` và `site_url` thành tên miền chính thức.
6. Người được sửa web cần có tài khoản GitHub và được mời làm cộng tác viên (Collaborator) của repo.

Sau đó vào `https://ten-mien-cua-ban.vn/admin` → **Đăng nhập với GitHub**. Mỗi lần bấm Công bố, Decap tạo một commit trên GitHub và Vercel tự build lại web sau khoảng 1–2 phút. Mọi thay đổi đều có lịch sử trên GitHub, nên khôi phục được khi sửa nhầm.

### Sửa trực tiếp file (cho người kỹ thuật)

| Nội dung | File |
|---|---|
| Thương hiệu, liên hệ, Zalo, mạng xã hội, menu, bật/tắt nhãn mẫu | `content/site.json` |
| Chữ trên các trang (tiêu đề, nút, giới thiệu) | `content/pages.json` |
| Sản phẩm / danh mục | `content/products.json`, `content/categories.json` |
| Câu chuyện, quy trình, triết lý, lý do chọn | `content/story.json` |
| Bài viết, đánh giá, chính sách | `content/articles.json`, `content/testimonials.json`, `content/policies.json` |
| Ảnh chung các trang | `content/images.json` |
| Màu sắc, thang chữ (design tokens) | `src/styles/tokens.css` |
| Font chữ (Lora · Be Vietnam Pro · Dancing Script) | `src/app/layout.tsx` |

## Nhận diện thương hiệu

Xem toàn bộ bộ nhận diện tại trang **/brand** (không hiện trên Google): logo, bảng màu, chữ, nút, hướng ảnh và bao bì.

- **Màu chính thức** (`src/styles/tokens.css`): forest #263D25 · grass #405A35 · ivory #F8F4EA · wood #8B6846 · bamboo #E8D9BD · text #292820 · muted #777367 · white. Tỉ lệ: 50% ivory · 25% forest · 15% bamboo · 7% grass · 3% wood.
- **Thang chữ**: dùng class `type-display`, `type-page`, `type-section`, `type-title`, `type-product`, `type-caption`.
- **Logo**: component `src/components/brand/BrandLogo.tsx` (variant `horizontal | stacked | icon`, tone `color | dark | reverse`). File SVG cho in ấn nằm ở `public/logo/`. Chữ NẾP NÓN đã được chuyển thành nét vector (font Lora), nên không cần cài font. Muốn tạo lại: `node scripts/generate-logos.mjs`.
- **Thành phần thương hiệu**: `src/components/brand/` gồm BrandLogo, BrandImage (khung ảnh chuẩn: portrait, product, process 4:5; landscape 16:9; lifestyle 3:2), BrandSectionHeading, BrandStory và Packaging (túi kraft, hộp nón, nhãn treo, thiệp cảm ơn, thẻ QR, hộp quà).
- **Bao bì**: tải từng file SVG ở trang /brand. Trước khi mở file trong Illustrator hoặc Figma, hãy cài các font Lora, Be Vietnam Pro và Dancing Script.

## Thay ảnh thật

Toàn bộ ảnh hiện tại là **ảnh minh họa SVG** (vẽ bằng code, có chữ "ẢNH MINH HỌA") — không phải ảnh thật.

1. Chép ảnh thật vào đúng thư mục:
   - `public/images/hero/` — ảnh lớn đầu trang chủ (ngang, ~1920×1100)
   - `public/images/products/` — ảnh sản phẩm (dọc 4:5, ~1000×1250), mỗi sản phẩm 3 ảnh
   - `public/images/story/` — chân dung mẹ, đôi tay khâu nón, làng nghề, ảnh xưởng
   - `public/images/craftsmanship/` — 4 ảnh cho 4 công đoạn
   - `public/images/culture/` — ảnh bài viết
2. Cách dễ nhất: vào /admin, mở mục ảnh cần đổi, bấm chọn ảnh mới, nhập kích thước ảnh và tắt ô “ảnh minh họa”.
3. Hoặc sửa trực tiếp `src` trong `content/images.json` / `content/products.json`, cập nhật `width`/`height` và đặt `placeholder` là `false`.

Ảnh JPG/PNG sẽ tự được tối ưu sang AVIF/WebP, lazy-load và co giãn theo màn hình.
Muốn tạo lại ảnh minh họa: `node scripts/generate-placeholders.mjs`.

## Luồng đặt hàng (phiên bản 1)

Giỏ hàng lưu trong trình duyệt (localStorage). Ở trang **Đặt hàng**, khách điền tên, SĐT, địa chỉ, ghi chú →
website tạo nội dung đơn, tự sao chép và mở Zalo của shop để khách dán và gửi.
**Không** lưu đơn lên máy chủ, **không** thu tiền online.
Để thêm backend/thanh toán sau này: tạo một `OrderSubmitter` mới (xem `src/types/order.ts`, `src/lib/order.ts`).

## Cấu trúc

```
src/
  app/            các trang (/, /products, /products/[slug], /story, /craftsmanship,
                  /culture, /culture/[slug], /contact, /cart, /checkout, /policies/[slug]),
                  sitemap.ts, robots.ts
  components/     layout/ home/ products/ cart/ storytelling/ common/
  data/           dữ liệu kinh doanh (tách khỏi giao diện)
  lib/            cart, order, format, seo, contact
  types/          kiểu dữ liệu Product, Order
public/images/    ảnh theo nhóm
scripts/          sinh ảnh minh họa
```

## Việc cần thông tin thật từ gia đình

- [ ] Số Zalo, số điện thoại, email, link Facebook/TikTok (`site-config.ts`) — **chưa có thì nút Zalo bị ẩn trên bản production**
- [ ] Địa chỉ chi tiết của xưởng
- [ ] Giá bán chính thức của từng sản phẩm (đang là giá mẫu)
- [ ] Kích thước, trọng lượng, loại lá, quai… thật của từng loại nón
- [ ] Ảnh chụp thật: mẹ, đôi tay làm nón, xưởng, làng, từng sản phẩm
- [ ] Câu chuyện thật của mẹ (các đoạn đánh dấu `draft: true` trong `content.ts`)
- [ ] Thông tin đã kiểm chứng về làng nghề Quảng Nạp
- [ ] Chính sách giao hàng/đổi trả thực tế
- [ ] Đánh giá thật của khách (đã được khách đồng ý đăng)
- [ ] Tên miền (để tạo mã QR thật trên thẻ câu chuyện), ảnh chia sẻ mạng xã hội (Open Graph)
- [ ] Duyệt logo SVG, gửi nhà in kiểm tra file bao bì
- [ ] Sau khi xong: đặt `showSampleNotices: false`
