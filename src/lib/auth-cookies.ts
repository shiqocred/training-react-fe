const ACCESS_TOKEN_COOKIE = "accessToken";
const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 24 * 7;

const isBrowser = () => typeof document !== "undefined";

export function getAccessTokenCookie() {
  if (!isBrowser()) return undefined;

  const token = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${ACCESS_TOKEN_COOKIE}=`))
    ?.split("=")[1];

  return token ? decodeURIComponent(token) : undefined;
}

export function setAccessTokenCookie(token: string) {
  if (!isBrowser()) return;

  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${ACCESS_TOKEN_COOKIE}=${encodeURIComponent(
    token,
  )}; Path=/; Max-Age=${ACCESS_TOKEN_MAX_AGE}; SameSite=Lax${secure}`;
}

export function removeAccessTokenCookie() {
  if (!isBrowser()) return;

  document.cookie = `${ACCESS_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}
