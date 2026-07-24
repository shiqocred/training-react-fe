export type ResetPasswordPayload = {
  email: string;
  reset_token: string;
  password: string;
  verify_password: string;
};
