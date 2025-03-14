export interface IAirtimeTopup {
  id: string;
  useId: string;
  phoneNumber: string;
  amount: number;
  currency?: string;
  date: Date;
  provider: string;
}
