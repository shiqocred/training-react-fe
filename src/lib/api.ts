import { apiUrl } from "@/config";
import { getAccessTokenCookie } from "@/lib/auth-cookies";

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  auth?: boolean;
  body?: unknown;
  token?: string;
};

type ErrorResponse = { message?: string };

export const apiRequest = async <T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> => {
  const { auth = true, body, token, headers, ...requestOptions } = options;
  const accessToken = token ?? (auth ? getAccessTokenCookie() : undefined);

  const response = await fetch(`${apiUrl}${path}`, {
    ...requestOptions,
    headers: {
      Accept: "application/json",
      ...(!!body && { "Content-Type": "application/json" }),
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const responseBody =
    response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    const errorResponse = responseBody as ErrorResponse | null;

    throw new Error(
      errorResponse?.message ?? `Request failed with status ${response.status}`,
    );
  }

  return responseBody as T;
};
