import api from "../../../boot/axios";
import { NAME_ACTIONS } from "../../constants/cart/actionTypes";
import { getPageCart } from "./getAction";

export const deleteItem = (id: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: NAME_ACTIONS.DELETE_ITEM.DELETE_ITEM,
    });
    const response = await api.delete(`/cart/item?id=${id}`);
    if (response.data) {
      dispatch({
        type: NAME_ACTIONS.DELETE_ITEM.DELETE_ITEM_SUCCESS,
        data: response.data.isSuccess,
      });
      dispatch(getPageCart());
    }
  } catch (error: any) {
    dispatch({
      type: NAME_ACTIONS.DELETE_ITEM.DELETE_ITEM_FAIL,
      data: error.messages,
    });
  }
};
