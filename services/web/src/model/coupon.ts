export type Coupon = {
  id: string;
  couponAmount: number;
  code: string;
  discountType: DiscountType;
};
export enum DiscountType {
  FixedCart = "FixedCart",
  Percentage = "Percentage",
  FixedProduct = "FixedProduct",
}
