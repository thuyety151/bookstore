import api from "../../../boot/axios";
import AddOrUpdateItem from "../../../model/AddOrUpdateItem";
import { NAME_ACTIONS } from "../../constants/cart/actionTypes";
import { getPageCart } from "./getAction";

export const addOrUpdateItem =
  (item: AddOrUpdateItem) => async (dispatch: any) => {
    try {
      dispatch({
        type: NAME_ACTIONS.ADD_OR_UPDATE_ITEM.ADD_OR_UPDATE_ITEM_REQUEST,
      });

      const response = await api.post("/cart/item", item);

      await dispatch({
        type: NAME_ACTIONS.ADD_OR_UPDATE_ITEM.ADD_OR_UPDATE_ITEM_SUCCESS,
        data: response.data.isSuccess,
      });

      dispatch(getPageCart());
    } catch (error: any) {
      dispatch({
        type: NAME_ACTIONS.ADD_OR_UPDATE_ITEM.ADD_OR_UPDATE_ITEM_FAIL,
        data: error.messages,
      });
    }
  };
