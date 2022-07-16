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
  requesting: boolean;
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
  requesting: false,
};

const wishlistReducer = (
  state: WishlistState = initState,
  payload: any
): WishlistState => {
  switch (payload.type) {
    case ACTION_NAMES.GET_WISHLIST.GET_PAGINATION:
      return {
        ...state,
        requesting: true,
      };
    case ACTION_NAMES.GET_WISHLIST.GET_PAGINATION_SUCCESS:
      return {
        ...state,
        success: true,
        requesting: false,
        data: payload.data,
        pagination: JSON.parse(payload.pagination),
      };
    case ACTION_NAMES.ADD_TO_WISHLIST.ADD_TO_WISHLIST:
    case ACTION_NAMES.ADD_TO_CART.ADD_TO_CART:
    case ACTION_NAMES.DELETE_WISHLIST_ITEM.DELETE_WISHLIST_ITEM:
      return {
        ...state,
        requesting: true,
      };
    case ACTION_NAMES.ADD_TO_WISHLIST.ADD_TO_WISHLIST_SUCCESS:
    case ACTION_NAMES.ADD_TO_WISHLIST.ADD_TO_WISHLIST_FAILED:
    case ACTION_NAMES.ADD_TO_CART.ADD_TO_CART_SUCCESS:
    case ACTION_NAMES.ADD_TO_CART.ADD_TO_CART_FAILED:
    case ACTION_NAMES.DELETE_WISHLIST_ITEM.DELETE_WISHLIST_ITEM_SUCCESS:
    case ACTION_NAMES.DELETE_WISHLIST_ITEM.DELETE_WISHLIST_ITEM_FAILED:
      return {
        ...state,
        requesting: false,
      };
    default:
      return state;
  }
};

export default wishlistReducer;
