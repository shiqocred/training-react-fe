export type UpdateProfilePayload = {
  name: string;
  email: string;
};

export type UpdatePasswordPayload = {
  old_password: string;
  new_password: string;
  verify_password: string;
};
