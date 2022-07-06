import { CategoryBooksForSale } from "../../../model/category";
import { NAME_ACTIONS } from "../../constants/category/actionTypes";

export type flattenCategoryState = {
  requesting: boolean;
  message: string;
  data: CategoryBooksForSale[];
};

const initState: flattenCategoryState = {
  requesting: false,
  message: "",
  data: [],
};

const flattenCategoryReducer = (
  state: flattenCategoryState = initState,
  payload: any
): flattenCategoryState => {
  switch (payload.type) {
    case NAME_ACTIONS.GET_FLATTEN_CATEGORIES.GET_FLATTEN_CATEGORIES:
      return {
        ...state,
        requesting: true,
      };
    case NAME_ACTIONS.GET_FLATTEN_CATEGORIES.GET_FLATTEN_CATEGORIES_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload.data,
      };
    case NAME_ACTIONS.GET_FLATTEN_CATEGORIES.GET_FLATTEN_CATEGORIES_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };
    default:
      return state;
  }
};

export default flattenCategoryReducer;
