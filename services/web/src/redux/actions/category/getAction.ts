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
      message: error.message,
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
      message: error.message,
    });
  }
};

export const refreshSideBar = () => (dispatch: any) => {
  dispatch({ type: NAME_ACTIONS.SIDEBAR.REFRESH_SIDEBAR });
};

export const getCategories = () => async (dispatch: any) => {
  dispatch({ type: NAME_ACTIONS.GET_CATEGORIES });

  var response = await api.get("/categories/all");

  if (response.data?.isSuccess) {
    dispatch({
      type: NAME_ACTIONS.GET_CATEGORIES.GET_CATEGORIES_SUCCESS,
      data: response.data.value,
    });
  } else {
    dispatch({
      type: NAME_ACTIONS.GET_CATEGORIES.GET_CATEGORIES_FAIL,
      message: response.data.error,
    });
  }
};

export const getCategoriesForHomepage = () => async (dispatch: any) => {
  dispatch({ type: NAME_ACTIONS.CATEGORY_FOR_HOME_PAGE.GET_ALL_CATEGORY });
  const response = await api.get("/categories");

  if (response.data?.isSuccess) {
    dispatch({
      type: NAME_ACTIONS.CATEGORY_FOR_HOME_PAGE.GET_ALL_CATEGORY_SUCCESS,
      data: response.data.value,
    });
  } else {
    dispatch({
      type: NAME_ACTIONS.CATEGORY_FOR_HOME_PAGE.GET_ALL_CATEGORY_FAIL,
      message: response.data.error,
    });
  }
};
