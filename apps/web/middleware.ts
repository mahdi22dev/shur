export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!home|login|_next|.*\\..*).*)"],
};
