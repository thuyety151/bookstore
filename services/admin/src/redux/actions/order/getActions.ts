import api from "../../../boot/axios";
import { Pagination } from "../../../helper/paginationValue";
import { ACTION_NAMES } from "./actionTypes";

export type getPaginationType = {
  pagination: Pagination;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};

export const getOrderPagination =
  (props: getPaginationType) => async (dispatch: any) => {
    dispatch({ type: ACTION_NAMES.GET_ORDER_PAGINATION.GET_ORDER_PAGINATION });
    const response = await api.post(
      "/orders",
      {},
      {
        params: props.pagination,
      }
    );
    // const response = await api.get("/orders",{data:{}}, {
    //   params: props.pagination
    // });

    if (response.data.isSuccess) {
      dispatch({
        type: ACTION_NAMES.GET_ORDER_PAGINATION.GET_ORDER_PAGINATION_SUCCESS,
        data: response.data.value,
      });
      props.onSuccess();
    } else {
      dispatch({
        type: ACTION_NAMES.GET_ORDER_PAGINATION.GET_ORDER_PAGINATION_FAIL,
        data: response.data.error,
      });
      props.onFailure(response.data.error);
    }
  };

export const getDetail = (id: string) => async (dispatch: any) => {
  dispatch({ type: ACTION_NAMES.GET_DETAIL.GET_DETAIL });

  const response = await api.get("/orders", {
    params: {
      id,
    },
  });
  if (response.data.isSuccess) {
    dispatch({
      type: ACTION_NAMES.GET_DETAIL.GET_DETAIL_SUCCESS,
      data: response.data.value,
    });
  } else {
    dispatch({
      type: ACTION_NAMES.GET_DETAIL.GET_DETAIL_FAIL,
      message: response.data.message,
    });
  }
};
