import { Pagination, paginationValue } from "helper/paginationValue";
import { ACTION_NAMES } from "redux/actions/coupon/actionType";

export type Coupon = {
    id: string;
    code: string;
    description: string;
    couponAmount: number;
    discountType: string;
    expireDate: Date;
};

export type CouponState = {
  requesting: boolean;
  message: string;
  success: boolean;
  data: Coupon[];
  pagination: Pagination;
};
const initState: CouponState = {
  requesting: false,
  message: "",
  success: false,
  data: [],
  pagination: { ...paginationValue },
};

const attributeReducer = (
  state: CouponState = initState,
  payload: any
): CouponState => {
  switch (payload.type) {
    case ACTION_NAMES.GET_PAGINATION.GET_COUPON_PAGINATION:
      return {
        ...state,
        requesting: true,
      };
    case ACTION_NAMES.GET_PAGINATION.GET_COUPON_PAGINATION_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload.data,
        pagination: JSON.parse(payload.pagination),
      };
    case ACTION_NAMES.GET_PAGINATION.GET_COUPON_PAGINATION_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };
    case ACTION_NAMES.UPSERT_COUPON.UPSERT_COUPON:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case ACTION_NAMES.UPSERT_COUPON.UPSERT_COUPON_SUCCESS:
      return {
        ...state,
        requesting: false,
        pagination: { ...paginationValue, pageIndex: 0 },
        success: true,
      };
    case ACTION_NAMES.UPSERT_COUPON.UPSERT_COUPON_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
        success: false,
      };
    case ACTION_NAMES.DELETE_COUPON.DELETE_COUPON:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case ACTION_NAMES.DELETE_COUPON.DELETE_COUPON_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
      };
    case ACTION_NAMES.DELETE_COUPON.DELETE_COUPON_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
      };
    default:
      return state;
  }
};
export default attributeReducer;
