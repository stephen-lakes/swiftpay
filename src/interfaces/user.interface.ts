export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phoneNumber?: string;
  gender: string;
  dob: string;
  password: string;
  role: string;
  isVerified: boolean;
  accountId: string;
}
