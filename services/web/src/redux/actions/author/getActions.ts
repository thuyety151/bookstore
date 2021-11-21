import api from "../../../boot/axios";
import { NAME_ACTIONS } from "../../constants/author/actionTypes";

export const getAllAuthor = () => async (dispatch: any) => {
  dispatch({ type: NAME_ACTIONS.GET_ALL.GET_ALL });
  const response = await api.get("/authors");
  if (response.data) {
    dispatch({
      type: NAME_ACTIONS.GET_ALL.GET_ALL_SUCCESS,
      data: response.data.value,
    });
  } else {
    dispatch({
      type: NAME_ACTIONS.GET_ALL.GET_ALL_FAIL,
      message: response.data.error,
    });
  }
};
