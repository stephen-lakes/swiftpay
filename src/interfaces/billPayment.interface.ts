export enum BillPaymentStatus {
  PENDING = "pending",
  PAYED = "payed",
}

export interface IBillPayment {
  id: string;
  userId: string;
  accountId: string;
  billId: string;
  amount: number;
  currency?: string;
  date: Date;
  biller: string;
  status: BillPaymentStatus;
}
