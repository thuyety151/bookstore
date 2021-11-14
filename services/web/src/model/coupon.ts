export type Coupon = {
  id: string;
  couponAmount: number;
  code: string;
  discountType: DiscountType;
};
export enum DiscountType {
  FixedCart,
  Percentage,
  FixedProduct,
}
