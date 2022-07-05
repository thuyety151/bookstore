import api from "../../../boot/axios";
import { ACTION_NAMES } from "../../constants/wishlist/actionTypes";
export type paginationParams = {
  pageSize: number;
  pageIndex: number;
};
export type filterParams = {
  categoryId: string | null;
  authorId: string | null;
  languageIds: string | null;
  attributeId: string | null;
  minPrice: number;
  maxPrice: number;
  rates: number;
  keywords?: string;
};
export const getWishlist =
  (params?: paginationParams) => async (dispatch: any) => {
    dispatch({ type: ACTION_NAMES.GET_WISHLIST.GET_PAGINATION });
    const response = await api.get("/wishlist", {
      params: {
        pageSize: params?.pageSize,
        pageIndex: params?.pageIndex,
      },
    });

    if (response.data.value) {
      dispatch({
        type: ACTION_NAMES.GET_WISHLIST.GET_PAGINATION_SUCCESS,
        data: response.data.value,
        pagination: response.headers.pagination,
      });
    } else {
      dispatch({
        type: ACTION_NAMES.GET_WISHLIST.GET_PAGINATION_FAILED,
        data: response.data.error,
      });
    }
  };
