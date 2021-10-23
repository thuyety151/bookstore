import { NAME_ACTIONS } from "../constants/cart/actionTypes";

const initState = {
  requesting: true,
  success: false,
  message: null,
  data: [],
};

const cartReducer = (state = initState, payload: any) => {
  switch (payload.type) {
    case NAME_ACTIONS.PAGE_CART.GET_ALL_ITEMS:
      return {
        ...state,
        requesting: true,
      };
    default:
      return state;
  }
};
export default cartReducer;
