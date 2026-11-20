import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

/**
 * ĐĂNG NHẬP TRANG QUẢN TRỊ (Decap CMS) BẰNG GITHUB — bước 1: chuyển sang GitHub.
 * Cần 2 biến môi trường trên Vercel (lấy từ GitHub OAuth App, xem README):
 *   GITHUB_OAUTH_CLIENT_ID, GITHUB_OAUTH_CLIENT_SECRET
 */
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new NextResponse("Chưa cấu hình GITHUB_OAUTH_CLIENT_ID — xem README, mục Trang quản trị.", { status: 500 });
  }
  const url = new URL(req.url);
  const state = randomBytes(16).toString("hex");
  const redirectUri = `${url.origin}/api/decap/callback`;
  const github = new URL("https://github.com/login/oauth/authorize");
  github.searchParams.set("client_id", clientId);
  github.searchParams.set("redirect_uri", redirectUri);
  github.searchParams.set("scope", url.searchParams.get("scope") ?? "repo");
  github.searchParams.set("state", state);

  const res = NextResponse.redirect(github.toString());
  res.cookies.set("decap_oauth_state", state, { httpOnly: true, secure: url.protocol === "https:", sameSite: "lax", maxAge: 600, path: "/" });
  return res;
}
