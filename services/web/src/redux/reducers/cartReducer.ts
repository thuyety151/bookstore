import { sum } from "lodash";
import Item from "../../model/item";
import { NAME_ACTIONS } from "../constants/cart/actionTypes";
import { NAME_ACTIONS as ORDER_NAME_ACTIONS } from "../constants/order/actionTypes";
export type CartState = {
  requesting: Boolean;
  success: boolean;
  message: string;
  data: Item[];
  itemToCheckOut: Item[];
  subTotal: number;
};
const initState: CartState = {
  requesting: false,
  success: false,
  message: "",
  data: [],
  itemToCheckOut: [],
  subTotal: 0,
};

export const subTotal = (items: Item[]) => {
  return sum(items?.map((x) => x.quantity * x.price));
};

const cartReducer = (state: CartState = initState, payload: any): CartState => {
  switch (payload.type) {
    case NAME_ACTIONS.PAGE_CART.GET_ALL_ITEMS:
      return {
        ...initState,
        requesting: true,
      };
    case NAME_ACTIONS.PAGE_CART.GET_ALL_ITEMS_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        data: payload.data,
      };
    case NAME_ACTIONS.PAGE_CART.GET_ALL_ITEMS_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message,
      };
    case NAME_ACTIONS.DELETE_ITEM.DELETE_ITEM:
      return {
        ...state,
        requesting: true,
      };
    case NAME_ACTIONS.DELETE_ITEM.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
      };
    case NAME_ACTIONS.DELETE_ITEM.DELETE_ITEM_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message,
      };
    case NAME_ACTIONS.UPDATE_ITEM_IN_STATE.UPDATE_ITEM_IN_STATE:
      return {
        ...state,
        data: [
          ...state.data.filter((x) => x.id !== payload.item?.id),
          payload.item,
        ],
      };
    case NAME_ACTIONS.SET_ITEM_TO_CHECK_OUT.SET_ITEM_TO_CHECK_OUT:
      if (!state.itemToCheckOut.find((x) => x.id === payload.item.id)) {
        // add
        return {
          ...state,
          itemToCheckOut: [...state.itemToCheckOut, payload.item],
          subTotal: subTotal([...state.itemToCheckOut, payload.item]),
        };
      } else {
        return {
          ...state,
          itemToCheckOut: [
            ...state.itemToCheckOut.filter((x) => x.id !== payload.item.id),
          ],
          subTotal: subTotal([
            ...state.itemToCheckOut.filter((x) => x.id !== payload.item.id),
          ]),
        };
      }
    case NAME_ACTIONS.SET_ITEM_TO_CHECK_OUT.SET_LIST_ITEM_TO_CHECK_OUT:
      return {
        ...state,
        itemToCheckOut: payload.data,
      };
    case NAME_ACTIONS.SET_ITEM_TO_CHECK_OUT.SET_ALL_ITEM_TO_CHECK_OUT:
      return {
        ...state,
        itemToCheckOut: state.data,
      };
    case ORDER_NAME_ACTIONS.CHECKOUT.CLEAR_ORDER_STATE:

      return initState;
    default:
      return state;
  }
};
export default cartReducer;
