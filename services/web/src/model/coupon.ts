export type Coupon = {
  id: string;
  couponAmount: number;
  discountType: DiscountType;
};
export enum DiscountType {
  FixedCart,
  Percentage,
  FixedProduct,
}
