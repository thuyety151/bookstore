import api from "../../../boot/axios";
import { ACTION_NAMES } from "./actionType";

export type getAtributeType = {
  onSuccess: (data: any) => void;
  onFailure: (error: any) => void;
};

export const getAttributes = (props: getAtributeType) => async (
  dispatch: any
) => {
  dispatch({ type: ACTION_NAMES.GET_ATTRIBUTES });

  var response = await api.get("/attributes");

  if (response.data?.isSuccess) {
    dispatch({
      type: ACTION_NAMES.GET_ATTRIBUTES.GET_ATTRIBUTES_SUCCESS,
      data: response.data.value,
    });
    props.onSuccess(response.data.value);
  } else {
    dispatch({
      type: ACTION_NAMES.GET_ATTRIBUTES.GET_ATTRIBUTES_FAIL,
      message: response.data.error,
    });
    props.onFailure(response.data.error);
  }
};
