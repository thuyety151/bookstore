import Item from "../../model/item";
import { NAME_ACTIONS } from "../constants/cart/actionTypes";

export type CartState = {
  requesting: Boolean;
  success: boolean;
  message: string;
  data: Item[];
};
const initState: CartState = {
  requesting: false,
  success: false,
  message: "",
  data: [],
};

const cartReducer = (state: CartState = initState, payload: any): CartState => {
  switch (payload.type) {
    case NAME_ACTIONS.PAGE_CART.GET_ALL_ITEMS:
      return {
        ...state,
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
    default:
      return state;
  }
};
export default cartReducer;
