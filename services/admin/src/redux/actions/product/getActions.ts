import api from "boot/axios";
import { Pagination } from "helper/paginationValue";
import { ACTION_NAMES } from "./actionTypes";

export type getPaginationType = {
  pagination: Pagination;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};

export type getProductDetailType = {
  id: string;
  onSuccess: (data: any) => void;
  onFailure: (error: any) => void;
};

export const getProductPagination = (props: getPaginationType) => async (
  dispatch: any
) => {
  dispatch({
    type: ACTION_NAMES.GET_PRODUCT_PAGINATION.GET_PRODUCT_PAGINATION,
  });

  var response = await api.get("/books/admin", {
    params: {
      pageSize: props.pagination.pageSize,
      pageIndex: props.pagination.pageIndex,
    },
  });

  if (response.data.isSuccess) {
    dispatch({
      type: ACTION_NAMES.GET_PRODUCT_PAGINATION.GET_PRODUCT_PAGINATION_SUCCESS,
      data: response.data.value,
      pagination: response.headers.pagination,
    });
    props.onSuccess();
  } else {
    dispatch({
      type: ACTION_NAMES.GET_PRODUCT_PAGINATION.GET_PRODUCT_PAGINATION_FAIL,
      message: response.data.error,
    });
    props.onFailure(response.data.error);
  }
};

export const getProductDetail = (props: getProductDetailType) => async (
  dispatch: any
) => {
  dispatch({ type: ACTION_NAMES.GET_PRODUCT_DETAIL.GET_PRODUCT_DETAIL });

  var response = await api.get("/books?id=" + props.id);
  if (response.data?.isSuccess) {
    dispatch({
      type: ACTION_NAMES.GET_PRODUCT_DETAIL.GET_PRODUCT_DETAIL_SUCCESS,
      data: response.data.value,
    });
    props.onSuccess(response.data.value as any);
  } else {
    dispatch({
      type: ACTION_NAMES.GET_PRODUCT_DETAIL.GET_PRODUCT_DETAIL_FAIL,
      message: response.data.error,
    });
    props.onFailure(response.data.error);
  }
};
