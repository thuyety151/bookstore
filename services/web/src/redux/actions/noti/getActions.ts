import api from "../../../boot/axios";
import { ACTION_NAMES } from "./actionTypes";

export const getAll = (pageIndex?: number) => async (dispatch: any) => {
  dispatch({ type: ACTION_NAMES.GET_ALL.GET_NOTI_PAGINATION });

  const res = await api.get("/notis/list-noti", {
    params: {
      pageIndex: pageIndex || 1,
    },
  });

  dispatch({
    type: ACTION_NAMES.GET_ALL.GET_NOTI_PAGINATION_SUCCESS,
    ...(res?.headers?.pagination && {
      pagination: JSON.parse(res.headers?.pagination),
    }),
    data: res?.data.value.map((x: any) => ({
      ...x,
      metadata: JSON.parse(x.metadata),
    })),
  });
};
