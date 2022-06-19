import api from "boot/axios";
import { Pagination } from "helper/paginationValue";
import store from "redux/store";
import { ACTION_NAMES } from "./actionTypes";

export type getAtributeType = {
  onSuccess: (data?: any) => void;
  onFailure: (error?: any) => void;
};

export type getPaginationType = {
  pagination: Pagination;
  keywords: string;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};

export const getAuthorPagination =
  (props: getPaginationType) => async (dispatch: any) => {
    dispatch({ type: ACTION_NAMES.LIST.GET_LIST });
    const response = await api.get("/authors", {
      params: {
        ...props.pagination,
        keywords: props.keywords,
        predicate: "all",
      },
    });

    if (response.data.isSuccess) {
      dispatch({
        type: ACTION_NAMES.LIST.GET_LIST_SUCCESS,
        data: response.data.value,
        pagination: response.headers.pagination,
      });
      props.onSuccess();
    } else {
      dispatch({
        type: ACTION_NAMES.LIST.GET_LIST_FAILED,
        data: response.data.error,
      });
      props.onFailure(response.data.error);
    }
  };

export type getDetail = {
  id: String;
} & getAtributeType;
export const getAuthorById = (props: getDetail) => async (dispatch: any) => {
  dispatch({ type: ACTION_NAMES.DETAIL.DETAIL });
  const authorState = store.getState().authors;
  const data = authorState.data.find((x) => x.id === props.id);
  if (data) {
    dispatch({
      type: ACTION_NAMES.DETAIL.DETAIL_SUCCESS,
      data: data,
    });
    return;
  }
  const response = await api.get("/authors", {
    params: {
      id: props.id,
    },
  });

  if (response.data.isSuccess) {
    dispatch({
      type: ACTION_NAMES.DETAIL.DETAIL_SUCCESS,
      data: response.data.value,
      pagination: response.headers.pagination,
    });
    props.onSuccess();
  } else {
    dispatch({
      type: ACTION_NAMES.DETAIL.DETAIL_FAILED,
      data: response.data.error,
    });
    props.onFailure(response.data.error);
  }
};
