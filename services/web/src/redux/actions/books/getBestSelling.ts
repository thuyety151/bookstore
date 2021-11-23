import api from "../../../boot/axios";
import { booksContant } from "../../constants/books/actionTypes";

export const getBestSelling = () => async (dispatch: any) => {
  dispatch({ type: booksContant.GET_BEST_SELLING.GET_BEST_SELLING });

  const response = await api.get("/books/best-selling");
  if (response.data.isSuccess) {
    dispatch({
      type: booksContant.GET_BEST_SELLING.GET_BEST_SELLING_SUCCESS,
      data: response.data.value,
    });
  } else {
    dispatch({
      type: booksContant.GET_BEST_SELLING.GET_BEST_SELLING_FAIL,
      message: response.data.error,
    });
  }
};
