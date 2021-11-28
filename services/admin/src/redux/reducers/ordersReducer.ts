import { Pagination, paginationValue } from "../../helper/paginationValue";
import { Order } from "../../model/order";
import { ACTION_NAMES } from "../actions/order/actionTypes";

export type OrderState = {
  requesting: boolean;
  message: string;
  data: Order[];
  pagination: Pagination;
  currentOrder: Order;
};
const initState: OrderState = {
  requesting: false,
  message: "",
  data: [],
  pagination: { ...paginationValue },
  currentOrder: {} as any,
};

const ordersReducer = (
  state: OrderState = initState,
  payload: any
): OrderState => {
  switch (payload.type) {
    case ACTION_NAMES.GET_ORDER_PAGINATION.GET_ORDER_PAGINATION:
      return {
        ...state,
        requesting: true,
      };
    case ACTION_NAMES.GET_ORDER_PAGINATION.GET_ORDER_PAGINATION_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload.data,
      };
    case ACTION_NAMES.GET_ORDER_PAGINATION.GET_ORDER_PAGINATION_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };
    case ACTION_NAMES.GET_DETAIL.GET_DETAIL:
      return {
        ...state,
        requesting: true,
      };
    case ACTION_NAMES.GET_DETAIL.GET_DETAIL_SUCCESS:
      return {
        ...state,
        requesting: false,
        currentOrder: payload.data
      };
    case ACTION_NAMES.GET_DETAIL.GET_DETAIL_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
        currentOrder: {...payload.data,
          orderDate:JSON.stringify(new Date())}
      };
    default:
      return state;
  }
};
export default ordersReducer;
