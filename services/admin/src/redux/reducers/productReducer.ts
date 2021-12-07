import { Pagination, paginationValue } from "helper/paginationValue";
import { Book, BookDetail } from "model/book";
import { ACTION_NAMES } from "redux/actions/product/actionTypes";

export type ProductState = {
  requesting: boolean;
  message: string;
  data: Book[];
  pagination: Pagination;
  currentObject: BookDetail;
};

const initState: ProductState = {
  requesting: false,
  message: "",
  data: [],
  pagination: { ...paginationValue },
  currentObject: {} as any,
};

const productReducer = (
  state: ProductState = initState,
  payload: any
): ProductState => {
  console.log("payyy:" + payload.type);
  switch (payload.type) {
    case ACTION_NAMES.GET_PRODUCT_PAGINATION.GET_PRODUCT_PAGINATION:
      return {
        ...state,
        requesting: true,
      };
    case ACTION_NAMES.GET_PRODUCT_PAGINATION.GET_PRODUCT_PAGINATION_SUCCESS:
      return {
        ...state,
        data: payload.data,
        requesting: false,
        pagination: JSON.parse(payload.pagination),
      };
    case ACTION_NAMES.GET_PRODUCT_PAGINATION.GET_PRODUCT_PAGINATION_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };
    case ACTION_NAMES.GET_PRODUCT_DETAIL.GET_PRODUCT_DETAIL:
      return {
        ...state,
        requesting: true,
      };
    case ACTION_NAMES.GET_PRODUCT_DETAIL.GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        requesting: false,
        currentObject: payload.data,
      };
    case ACTION_NAMES.GET_PRODUCT_DETAIL.GET_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };
    case ACTION_NAMES.EDIT_PRODUCT.EDIT_PRODUCT:
      return {
        ...state,
        requesting: true,
      };
    case ACTION_NAMES.EDIT_PRODUCT.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        requesting: false,
      };
    case ACTION_NAMES.EDIT_PRODUCT.EDIT_PRODUCT_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };
    case ACTION_NAMES.DELETE_PRODUCT.DELETE_PRODUCT:
      return {
        ...state,
        requesting: true,
      };
    case ACTION_NAMES.DELETE_PRODUCT.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        requesting: false,
      };
    case ACTION_NAMES.DELETE_PRODUCT.DELETE_PRODUCT_FAIL:
      return {
        ...state,
        requesting: false,
      };
    default:
      return state;
  }
};
export default productReducer;
