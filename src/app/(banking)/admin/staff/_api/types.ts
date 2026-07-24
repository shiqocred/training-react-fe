export type StaffListQuery = {
  q?: string;
  page?: number;
  per_page?: number;
};

export type StaffPayload = {
  name: string;
  email: string;
  password?: string;
};
