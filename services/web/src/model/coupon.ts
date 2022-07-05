export type Coupon = {
  id: string;
  code: string;
  description: string;
  couponAmount: number;
  discountType: DiscountType;
  expireDate: string;
  imageUrl: string;
  minSpend: number;
};
export enum DiscountType {
  FixedCart = 0,
  Percentage = 1,
}

