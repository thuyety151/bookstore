import { Address } from "./address";
import { Coupon } from "./coupon";
import Item from "./item";

export type Order = {
  id: string;
  orderDate: string;
  status: string;
  paymentMethod: string;
  subTotal: number;
  orderNote: string;
  orderFee: number;
  orderCode: string;
  userId: string;
  deliveryMethodId: string;
  items: Item[];
  addressToShip: Address;
  total: number;
  coupon: Coupon;
};
