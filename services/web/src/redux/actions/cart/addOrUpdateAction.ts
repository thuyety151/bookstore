import api from "../../../boot/axios";
import AddOrUpdateItem from "../../../model/AddOrUpdateItem";
import Item from "../../../model/item";
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
export const updateItemInState = (item: Item) => async (dispatch: any) => {
  dispatch({
    type: NAME_ACTIONS.UPDATE_ITEM_IN_STATE.UPDATE_ITEM_IN_STATE,
    item: item,
  });
};
