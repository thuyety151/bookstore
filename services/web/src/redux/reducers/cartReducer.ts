import Item from "../../model/item";
import { NAME_ACTIONS } from "../constants/cart/actionTypes";

export type CartState = {
  requesting: Boolean,
  success: Boolean,
  message: string,
  data: Item[],
}
const initState : CartState = {
  requesting: true,
  success: false,
  message: '',
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
          requesting: true,
          success: true,
          data: payload.data
        };
    default:
      return state;
  }
};
export default cartReducer;
