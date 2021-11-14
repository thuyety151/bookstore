import api from "../../../boot/axios";
import { NAME_ACTIONS } from "../../constants/cart/actionTypes";

export const getPageCart = () => async (dispatch: any) => {
  try {
    dispatch({ type: NAME_ACTIONS.PAGE_CART.GET_ALL_ITEMS });

    const response = await api.get("/cart");
    console.log("re", response.data);
    dispatch({
      type: NAME_ACTIONS.PAGE_CART.GET_ALL_ITEMS_SUCCESS,
      data: response.data.value,
    });
  } catch (error: any) {
    dispatch({
      type: NAME_ACTIONS.PAGE_CART.GET_ALL_ITEMS_FAIL,
      message: error.message,
    });
  }
};
