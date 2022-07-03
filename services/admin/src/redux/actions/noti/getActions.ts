import api from "boot/axios";
import { Pagination } from "helper/paginationValue";
import { ACTION_NAMES } from "./actionTypes";

export const getAll = (pageIndex?: number) => async (dispatch: any) => {
  dispatch({ type: ACTION_NAMES.GET_ALL.GET_NOTI_PAGINATION });

  const res = await api.get("/notis", {
    params: {
      pageIndex: pageIndex || 1,
    },
  });

  dispatch({
    type: ACTION_NAMES.GET_ALL.GET_NOTI_PAGINATION_SUCCESS,
    pagination: JSON.parse(res.headers.pagination),
    data: res.data.value.map((x: any) => ({
      ...x,
      metadata: JSON.parse(x.metadata),
    })),
  });
};

export const getAllAdmin =
  (pagination: Pagination) => async (dispatch: any) => {
    dispatch({
      type: ACTION_NAMES.ADMIN_GET_ALL_NOTI.ADMIN_GET_NOTI_PAGINATION,
    });

    const res = await api.get("/notis/list-admin-noti", {
      params: {
        pageIndex: pagination.pageIndex || 1,
        pageSize: pagination.pageSize,
      },
    });
    dispatch({
      type: ACTION_NAMES.ADMIN_GET_ALL_NOTI.ADMIN_GET_NOTI_PAGINATION_SUCCESS,
      pagination: JSON.parse(res.headers.pagination),
      data: res.data.value.map((x: any) => ({
        ...x,
        metadata: JSON.parse(x.metadata),
      })),
    });
  };
