import { Coupon } from "../../model/coupon";
import { NAME_ACTIONS } from "../constants/coupon/actionTypes";
import { NAME_ACTIONS as ORDER_NAME_ACTIONS } from "../constants/order/actionTypes";

export type CouponState = {
  success: Boolean;
  data: Coupon;
  requesting: boolean;
  message?: string | null;
};

const initState: CouponState = {
  success: false,
  data: {} as Coupon,
  message: null,
  requesting: false,
};

const couponReducer = (
  state: CouponState = initState,
  payload: any
): CouponState => {
  switch (payload.type) {
    case NAME_ACTIONS.VERIFY_COUPON.VERIFY_COUPON:
      return {
        ...state,
        success: false,
        requesting: true,
        message: "",
      };
    case NAME_ACTIONS.VERIFY_COUPON.VERIFY_COUPON_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        data: payload.data,
        message: "",
      };
    case NAME_ACTIONS.VERIFY_COUPON.VERIFY_COUPON_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message,
        data: {} as Coupon,
      };
    case NAME_ACTIONS.REMOVE_COUPON.REMOVE_COUPON:
    case ORDER_NAME_ACTIONS.CHECKOUT.CLEAR_ORDER_STATE:
      return initState;
    default:
      return state;
  }
};

export default couponReducer;
