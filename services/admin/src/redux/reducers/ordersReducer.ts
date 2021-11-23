import { Pagination, paginationValue, rowsPerPageOptions } from "../../helper/paginationValue";
import Item from "../../model/item";
import { Order } from "../../model/order";
import { ACTION_NAMES } from "../actions/actionNames";

export type OrderState = {
  requesting: Boolean;
  message: string;
  data: Order[];
  pagination: Pagination;
};
const initState: OrderState = {
  requesting: false,
  message: "",
  data: [],
  pagination: { ...paginationValue },
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
        data: [...state.data, payload.data],
      };
    case ACTION_NAMES.GET_ORDER_PAGINATION.GET_ORDER_PAGINATION_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };
    default:
      return state;
  }
};
export default ordersReducer;
