/** @format */

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
    dispatch({ type: NAME_ACTIONS.SIDEBAR.GET_SUB_CATEGORY });
    const response = await api.get(`/categories/sub?id=${obj.idCategory}`);
    dispatch({
      type: NAME_ACTIONS.SIDEBAR.GET_SUB_SUCCESS,
      data: response.data.value,
    });
  } catch (error: any) {
    dispatch({
      type: NAME_ACTIONS.SIDEBAR.GET_SUB_FAIL,
      message: error,
    });
  }
};

export const refreshSideBar = () => (dispatch: any) => {
  dispatch({ type: NAME_ACTIONS.SIDEBAR.REFRESH_SIDEBAR });
};
