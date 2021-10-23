import api from "../../../boot/axios";
import { NAME_ACTIONS } from "../../constants/cart/actionTypes";

export const getPageCart = () => async (dispatch: any) => {
  try {
    dispatch({ type: NAME_ACTIONS.PAGE_CART.GET_ALL_ITEMS });

    const response = await api.get(
      "/cart/334ddc75-8e62-4d7b-6099-08d990bd94db" // -->  CHANGE CART ID
    );
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
