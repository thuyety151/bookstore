import { Coupon } from "../../model/coupon";
import { NAME_ACTIONS } from "../constants/coupon/actionTypes";

export type CouponsState = {
  success: Boolean;
  homepageCoupons: Coupon[];
  userCoupons: Coupon[];
  selectedCoupon: Coupon | undefined;
  requesting: boolean;
  message?: string | null;
};

const initState: CouponsState = {
  success: false,
  homepageCoupons: [],
  userCoupons: [],
  message: null,
  requesting: false,
  selectedCoupon:  undefined  
};

const couponsReducer = (
  state: CouponsState = initState,
  payload: any
): CouponsState => {
  switch (payload.type) {
    case NAME_ACTIONS.COUPON_HOMEPAGE.GET_COUPON_HOMEPAGE:
      return {
        ...state,
        success: false,
        requesting: true,
        message: "",
      };
    case NAME_ACTIONS.COUPON_HOMEPAGE.GET_COUPON_HOMEPAGE_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        homepageCoupons: payload.data,
        message: "",
      };
    case NAME_ACTIONS.COUPON_HOMEPAGE.GET_COUPON_HOMEPAGE_FAILED:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message,
        homepageCoupons: [],
      };
    case NAME_ACTIONS.COUPON_USER.GET_COUPON_USER:
      return {
        ...state,
        success: false,
        requesting: true,
        message: ""
      };
    case NAME_ACTIONS.COUPON_USER.GET_COUPON_USER_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        userCoupons: payload.data,
        message: "",
      };
    case NAME_ACTIONS.COUPON_USER.GET_COUPON_USER_FAILED:
      return {
        ...state,
        requesting: false,
        success: true,
        message: payload.message,
        userCoupons: []
      }
    case NAME_ACTIONS.SAVE_COUPON_USER.SAVE_COUPON_USER:
      return {
        ...state,
        requesting: true,
        message: ""
      };
    case NAME_ACTIONS.SAVE_COUPON_USER.SAVE_COUPON_USER_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        userCoupons: []
      }
    case NAME_ACTIONS.SAVE_COUPON_USER.SAVE_COUPON_USER_FAILED:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message
      }
    case NAME_ACTIONS.USER_APPLY_COUPON.USER_APPLY_COUPON_SUCCESS:
      return {
        ...state,
        selectedCoupon: state.userCoupons.find(x => x.id === payload.data) 
      }
    case NAME_ACTIONS.USER_REMOVE_APPLY_COUPON.USER_REMOVE_APPLY_COUPON_SUCCESS:
      return {
        ...state,
        selectedCoupon : undefined
      }
    default:
      return state;
  }
};

export default couponsReducer;
