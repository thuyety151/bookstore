import api from "boot/axios";
import { ACTION_NAMES } from "./actionTypes";

export const getAll = () => async (dispatch: any) => {
  try {
    dispatch({ type: ACTION_NAMES.GET_ALL_SETTINGS.GET_ALL });
    const response = await api.get("/settings");

    if (response.data.isSuccess) {
      dispatch({
        type: ACTION_NAMES.GET_ALL_SETTINGS.GET_ALL_SUCCESS,
        data: response.data.value,
      });
    } else {
      dispatch({ type: ACTION_NAMES.GET_ALL_SETTINGS.GET_ALL_FAIL });
    }
  } catch (error: any) {
    dispatch({ type: ACTION_NAMES.GET_ALL_SETTINGS.GET_ALL_FAIL });
  }
};
