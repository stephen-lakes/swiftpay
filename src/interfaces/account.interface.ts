export interface IAccount {
  id: string;
  userId: string;
  accountNumber: string;
  balance: number;
  currency?: string;
  tierId?: string;
}
