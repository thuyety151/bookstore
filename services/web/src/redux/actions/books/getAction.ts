import api from "../../../boot/axios";
import { booksContant } from "../../constants/books/actionTypes";

export const getMostView = () => async (dispatch: any) => {
  try {
    dispatch({ type: booksContant.GET_MOST_VIEW_REQUEST });

    const response = await api.get("/books/books-for-sale", {
      params: {
        predicate: "home-most-view",
      },
    });
    console.log(response);

    dispatch({
      type: booksContant.GET_MOST_VIEW_SUCCESS,
      data: response.data.value,
    });
  } catch (error: any) {
    dispatch( {
        type: booksContant.GET_MOST_VIEW_FAIL,
        message: error.message
    })
  }
};
