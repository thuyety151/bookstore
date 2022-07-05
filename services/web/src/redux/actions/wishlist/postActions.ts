import api from "../../../boot/axios";
import { ACTION_NAMES } from "../../constants/wishlist/actionTypes";
import { getPageCart } from "../cart/getAction";

export type AddToWishlistParams = {
  item: {
    productId: string;
    attributeId: string;
    quantity: number;
  };
  onSuccess: () => void;
  onFailure: (msg: any) => void;
};

export const addToWL =
  (props: AddToWishlistParams) => async (dispatch: any) => {
    dispatch({ type: ACTION_NAMES.ADD_TO_WISHLIST.ADD_TO_WISHLIST });
    try {
      const res = await api.post("/wishlist/item", props.item);
      if (res.data?.isSuccess) {
        props.onSuccess();
        dispatch({
          type: ACTION_NAMES.ADD_TO_WISHLIST.ADD_TO_WISHLIST_SUCCESS,
        });
      } else {
        throw new Error(res.data?.error);
      }
    } catch (e) {
      dispatch({ type: ACTION_NAMES.ADD_TO_WISHLIST.ADD_TO_WISHLIST_FAILED });
      props.onFailure(e);
    }
  };

export type AddToCartParams = {
  itemId: string;
  onSuccess: () => void;
  onFailure: (msg: any) => void;
};

export const addWLToCart =
  (props: AddToCartParams) => async (dispatch: any) => {
    dispatch({ type: ACTION_NAMES.ADD_TO_CART.ADD_TO_CART });
    try {
      const res = await api.post(`/wishlist?id=${props.itemId}`);
      if (res.data?.isSuccess) {
        props.onSuccess();
        dispatch({
          type: ACTION_NAMES.ADD_TO_CART.ADD_TO_CART_SUCCESS,
        });
        dispatch(getPageCart());
      } else {
        throw new Error(res.data?.error);
      }
    } catch (e) {
      dispatch({ type: ACTION_NAMES.ADD_TO_CART.ADD_TO_CART_FAILED });
      props.onFailure(e);
    }
  };

export const deleteWLItem =
  (props: AddToCartParams) => async (dispatch: any) => {
    dispatch({ type: ACTION_NAMES.DELETE_WISHLIST_ITEM.DELETE_WISHLIST_ITEM });
    try {
      const res = await api.delete(`/wishlist/item?id=${props.itemId}`);
      if (res.data?.isSuccess) {
        props.onSuccess();
        dispatch({
          type: ACTION_NAMES.DELETE_WISHLIST_ITEM.DELETE_WISHLIST_ITEM_SUCCESS,
        });
      } else {
        throw new Error(res.data?.error);
      }
    } catch (e) {
      dispatch({
        type: ACTION_NAMES.DELETE_WISHLIST_ITEM.DELETE_WISHLIST_ITEM_FAILED,
      });
      props.onFailure(e);
    }
  };
