import Item from "../../model/item";
import { NAME_ACTIONS } from "../constants/order/actionTypes";

export type OrderState = {
  requesting: Boolean;
  success: boolean;
  message: string;
  data: Item[];
};
const initState: OrderState = {
  requesting: false,
  success: false,
  message: "",
  data: [],
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
    default:
      return state;
  }
};
export default orderReducer;
