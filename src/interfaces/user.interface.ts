export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
  balance: number;
  role: string;
  isVerified: boolean;
  otp?: string;
  otpExpiresAt?: Date;
}
