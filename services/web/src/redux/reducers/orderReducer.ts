import { sum } from "lodash";
import { formatVNDtoUSD } from "../../helper/format";
import { Coupon, DiscountType } from "../../model/coupon";
import Item from "../../model/item";
import { NAME_ACTIONS } from "../constants/order/actionTypes";
import { NAME_ACTIONS as NAME_ACTIONS_COUPON } from "../constants/coupon/actionTypes";
import store from "../store";
import { ServiceType } from "./deliveryReducer";

export type OrderState = {
  requesting: boolean;
  success: boolean;
  message: string;
  data: Item[];
  fee: number | null; // use null to check can check out or not
  note: string | null;
  currentService: ServiceType;
  coupon: Coupon;
};
const initState: OrderState = {
  requesting: false,
  success: false,
  message: "",
  data: [],
  fee: 0,
  note: null,
  currentService: {} as any,
  coupon: {} as Coupon,
};

export const total = () => {
  const { fee, coupon } = store.getState().order;
  const items = store.getState().cart.itemToCheckOut;

  const couponAmount =
    coupon.discountType === DiscountType.Percentage
      ? coupon.couponAmount / 100
      : formatVNDtoUSD(coupon.couponAmount) || 0;
  return (
    Math.floor(
      (sum(items.map((x) => x.quantity * x.price)) + (fee || 0)) *
        (1 - couponAmount) *
        100
    ) / 100 || 0
  );
};

const orderReducer = (
  state: OrderState = initState,
  payload: any
): OrderState => {
  switch (payload.type) {
    case NAME_ACTIONS.CREATE_ORDER.CREATE_ORDER:
      return {
        ...state,
        requesting: true,
      };
    case NAME_ACTIONS.CREATE_ORDER.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        requesting: false,
      };
    case NAME_ACTIONS.CREATE_ORDER.CREATE_ORDER_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };
    case NAME_ACTIONS.CREATE_DELIVERY_FOR_ORDER.CREATE_DELIVERY_FOR_ORDER:
      return {
        ...state,
        requesting: true,
      };
    case NAME_ACTIONS.CREATE_DELIVERY_FOR_ORDER
      .CREATE_DELIVERY_FOR_ORDER_SUCCESS:
      return {
        ...state,
        requesting: false,
      };
    case NAME_ACTIONS.CREATE_DELIVERY_FOR_ORDER.CREATE_DELIVERY_FOR_ORDER_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };
    case NAME_ACTIONS.GET_FEE.GET_FEE:
      return {
        ...state,
        requesting: true,
      };
    case NAME_ACTIONS.GET_FEE.GET_FEE_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        fee: payload.data,
        currentService: payload.service,
      };
    case NAME_ACTIONS.GET_FEE.GET_FEE_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message,
        fee: null,
      };
    case NAME_ACTIONS_COUPON.VERIFY_COUPON.VERIFY_COUPON_SUCCESS:
      return {
        ...state,
        coupon: payload.data,
      };
    default:
      return state;
  }
};
export default orderReducer;
