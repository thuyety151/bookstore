import api from "../../../boot/axios";
import { booksContant } from "../../constants/books/actionTypes";

export const getNewReleases = () => async (dispatch: any) => {
  dispatch({ type: booksContant.GET_NEW_RELEASES.GET_NEW_RELEASES });
  const response = await api.get("/books/new-releases");

  if (response.data.isSuccess) {
    dispatch({
      type: booksContant.GET_NEW_RELEASES.GET_NEW_RELEASES_SUCCESS,
      data: response.data.value,
    });
  } else {
    dispatch({
      type: booksContant.GET_NEW_RELEASES.GET_NEW_RELEASES_SUCCESS,
      message: response.data.error,
    });
  }
};
