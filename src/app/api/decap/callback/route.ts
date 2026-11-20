import { cookies } from "next/headers";

/**
 * ĐĂNG NHẬP TRANG QUẢN TRỊ — bước 2: GitHub trả về mã, đổi lấy token
 * rồi gửi lại cho cửa sổ Decap CMS theo giao thức "authorization:github:…".
 */
export const dynamic = "force-dynamic";

function page(status: "success" | "error", payload: Record<string, string>, origin: string) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const html = `<!doctype html><html lang="vi"><meta charset="utf-8"><title>Đăng nhập</title><body>
<p>${status === "success" ? "Đăng nhập thành công, đang quay lại trang quản trị…" : "Đăng nhập không thành công. Bạn có thể đóng cửa sổ này."}</p>
<script>
(function () {
  var origin = ${JSON.stringify(origin)};
  var message = ${JSON.stringify(message)};
  function receive(e) {
    if (e.origin !== origin) return;
    window.opener.postMessage(message, origin);
    window.removeEventListener("message", receive);
  }
  window.addEventListener("message", receive);
  if (window.opener) window.opener.postMessage("authorizing:github", origin);
})();
</script></body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin = url.origin;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const jar = await cookies();
  const expected = jar.get("decap_oauth_state")?.value;
  jar.delete("decap_oauth_state");

  if (!code || !state || state !== expected) {
    return page("error", { message: "Phiên đăng nhập không hợp lệ, vui lòng thử lại." }, origin);
  }

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
      redirect_uri: `${origin}/api/decap/callback`,
    }),
  });
  const data = (await res.json().catch(() => ({}))) as { access_token?: string; error_description?: string };
  if (!data.access_token) {
    return page("error", { message: data.error_description ?? "Không lấy được quyền truy cập từ GitHub." }, origin);
  }
  return page("success", { token: data.access_token, provider: "github" }, origin);
}
