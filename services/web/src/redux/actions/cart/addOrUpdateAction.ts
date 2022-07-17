import api from "../../../boot/axios";
import AddOrUpdateItem from "../../../model/AddOrUpdateItem";
import { NAME_ACTIONS } from "../../constants/cart/actionTypes";

export type AddToCartProps = {
  item: AddOrUpdateItem;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};
export const addOrUpdateItem =
  (props: AddToCartProps) => async (dispatch: any) => {
    try {
      dispatch({
        type: NAME_ACTIONS.ADD_OR_UPDATE_ITEM.ADD_OR_UPDATE_ITEM_REQUEST,
      });
      const response = await api.post("/cart/item", props.item);

      if (response.data.isSuccess) {
        await dispatch({
          type: NAME_ACTIONS.ADD_OR_UPDATE_ITEM.ADD_OR_UPDATE_ITEM_SUCCESS,
          data: response.data.isSuccess,
        });
        //dispatch(getPageCart());
        props.onSuccess();
      } else {
        props.onFailure(response.data.error);
        dispatch({
          type: NAME_ACTIONS.ADD_OR_UPDATE_ITEM.ADD_OR_UPDATE_ITEM_FAIL,
          data: response.data.error,
        });
      }
    } catch (error: any) {
      dispatch({
        type: NAME_ACTIONS.ADD_OR_UPDATE_ITEM.ADD_OR_UPDATE_ITEM_FAIL,
        data: error.message,
      });
    }
  };
