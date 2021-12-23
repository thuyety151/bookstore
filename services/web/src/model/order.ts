import { Address } from "./address";
import Item from "./item";

export type Order = {
  id: string;
  orderDate: string;
  status: string;
  paymentMethod: string;
  subTotal: number;
  orderNote: string;
  orderCode: string;
  userId: string;
  deliveryMethodId: string;
  items: Item[];
  addressToShip: Address;
  total: number;
};
