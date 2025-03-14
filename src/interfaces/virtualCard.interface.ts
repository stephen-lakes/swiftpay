export interface IVirtualCard {
  id: string;
  userId: string;
  CardHolderName: string;
  cardNumber: string;
  cvv: string;
  pin: string;
  expirationDate: Date;
}
