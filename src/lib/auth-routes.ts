export type AuthRole = "admin" | "staff" | "customer";

export const roleHomePath: Record<AuthRole, string> = {
  admin: "/admin/customers",
  staff: "/staff/customers",
  customer: "/mutations",
};

export function getRoleHomePath(role: string | null | undefined) {
  if (role === "admin" || role === "staff" || role === "customer") {
    return roleHomePath[role];
  }

  return "/auth/login";
}
