import Item from "../../model/item";
import { ACTION_NAMES } from "../constants/wishlist/actionTypes";

export type WishlistState = {
  success: Boolean;
  data: Item[];
  message?: string | null;
  pagination: {
    pageIndex: number;
    pageSize: number;
    totalPage: number;
    totalCount: number;
  };
};

const initState: WishlistState = {
  success: true,
  data: [],
  message: null,
  pagination: {
    pageIndex: 0,
    pageSize: 5,
    totalPage: 0,
    totalCount: 0,
  },
};

const wishlistReducer = (
  state: WishlistState = initState,
  payload: any
): WishlistState => {
  switch (payload.type) {
    case ACTION_NAMES.GET_WISHLIST.GET_PAGINATION:
      return {
        ...state,
      };
    case ACTION_NAMES.GET_WISHLIST.GET_PAGINATION_SUCCESS:
      return {
        ...state,
        success: true,
        data: payload.data,
        pagination: JSON.parse(payload.pagination),
      };
    default:
      return state;
  }
};

export default wishlistReducer;
