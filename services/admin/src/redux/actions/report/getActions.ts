import api from "boot/axios";
import { ACTION_NAMES } from "./actionTypes";

export const getReports = (range: string) => async (dispatch: any) => {
  dispatch({ type: ACTION_NAMES.GET_REPORTS.GET_REPORTS });

  const response = await api.get("/reports", {
    params: {
      range,
    },
  });
  if (response.data.isSuccess) {
    dispatch({
      type: ACTION_NAMES.GET_REPORTS.GET_REPORTS_SUCCESS,
      data: response.data.value,
    });
  } else {
    dispatch({ type: ACTION_NAMES.GET_REPORTS.GET_REPORTS_FAIL });
  }
};
