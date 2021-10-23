import api from "../../../boot/axios";
import { NAME_ACTIONS } from "../../constants/category/actionTypes";

export const getRoot = () => async (dispatch: any) => {
  try {
    dispatch({ type: NAME_ACTIONS.SIDEBAR.GET_ROOT_CATEGORY });

    const response = await api.get("/categories/root");
    dispatch({
      type: NAME_ACTIONS.SIDEBAR.GET_ROOT_SUCCESS,
      data: response.data.value,
    });
  } catch (error: any) {
    dispatch({
      type: NAME_ACTIONS.SIDEBAR.GET_ROOT_FAIL,
      message: error,
    });
  }
};

export const getSub = (obj: any) => async (dispatch: any) => {
  try {
    console.log("test id", obj.id);
    const response = await api.get("/categories/sub/", {
      params: {
        id: obj.id,
      },
    });
    dispatch(obj.onSuccess(response));
  } catch (error: any) {
    console.log(error);
    // dispatch({
    //   type: NAME_ACTIONS.SIDEBAR.GET_SUB_FAIL,
    //   message: error,
    // });
  }
};
