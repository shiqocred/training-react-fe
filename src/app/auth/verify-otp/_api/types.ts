export type VerifyOtpPayload = {
  email: string;
  otp: string;
};

export type VerifyOtpData = {
  email: string;
  reset_token: string;
};
