export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
  role: string;
  isVerified: boolean;
  accountId: string;
}
