/* // pages/_middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: "test" });

  const authPaths = ["/api/auth", "/registration", "/test"];

  // Проверяем, есть ли токен и не истёк ли его срок
  if (
    !token &&
    !authPaths.some((path) => req.nextUrl.pathname.includes(path))
  ) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
  // Токен действителен, продолжаем выполнение запроса
  return NextResponse.next();
}
 */

export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard"] };
