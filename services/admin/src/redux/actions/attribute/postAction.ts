import api from "boot/axios";
import { Attribute } from "redux/reducers/attributeReducer";
import { ACTION_NAMES } from "./actionTypes";

export type CreateAttriProps = {
  attr: Attribute;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};

export const createAttribute =
  (props: CreateAttriProps) => async (dispatch: any) => {
    dispatch({ type: ACTION_NAMES.GET_PAGINATION.GET_PAGINATION });
    const response = await api.get("/attributes", {
      params: props.attr,
    });

    if (response.data.isSuccess) {
      dispatch({
        type: ACTION_NAMES.GET_PAGINATION.GET_PAGINATION_SUCCESS,
        data: response.data.value,
      });
      props.onSuccess();
    } else {
      dispatch({
        type: ACTION_NAMES.GET_PAGINATION.GET_PAGINATION_FAIL,
        data: response.data.error,
      });
      props.onFailure(response.data.error);
    }
  };
