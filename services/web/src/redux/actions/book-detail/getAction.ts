import api from "../../../boot/axios";
import { bookDetailConstant } from "../../constants/book-detail/actionTypes";

export const getBook = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: bookDetailConstant.GET_REQUEST });

    const response = await api.get(`/books?id=${id}`);

    dispatch({
      type: bookDetailConstant.GET_SUCCESS,
      data: response.data.value,
    });
  } catch (error: any) {
    dispatch({
      type: bookDetailConstant.GET_FAILURE,
      data: error.message,
    });
  }
};
