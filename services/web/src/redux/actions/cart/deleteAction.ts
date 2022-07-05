import api from "../../../boot/axios";
import { NAME_ACTIONS } from "../../constants/cart/actionTypes";
import { getPageCart } from "./getAction";

type Props = {
  id: string;
  onSuccess: () => void;
  onFailure: (err: any) => void;
};
export const deleteItem = (props: Props) => async (dispatch: any) => {
  try {
    dispatch({
      type: NAME_ACTIONS.DELETE_ITEM.DELETE_ITEM,
    });
    const response = await api.delete(`/cart/item?id=${props.id}`);
    if (response.data) {
      dispatch({
        type: NAME_ACTIONS.DELETE_ITEM.DELETE_ITEM_SUCCESS,
        data: response.data.isSuccess,
      });
      dispatch(getPageCart());
      props.onSuccess();
    } else {
      dispatch({
        type: NAME_ACTIONS.DELETE_ITEM.DELETE_ITEM_FAIL,
        data: response.data.error.messages,
      });
      props.onFailure(response.data.error.messages);
    }
  } catch (error: any) {
    dispatch({
      type: NAME_ACTIONS.DELETE_ITEM.DELETE_ITEM_FAIL,
      data: error.message,
    });
    props.onFailure(error.message);
  }
};
