import { Category } from "../../../model/category";
import { NAME_ACTIONS } from "../../constants/category/actionTypes";

export type CategoryState = {
  requesting: boolean;
  message: string;
  data: Category[];
};

const initState: CategoryState = {
  requesting: false,
  message: "",
  data: [],
};

const categoryBfsReducer = (
  state: CategoryState = initState,
  payload: any
): CategoryState => {
  switch (payload.type) {
    case NAME_ACTIONS.GET_CATEGORIES.GET_CATEGORIES:
      return {
        ...state,
        requesting: true,
      };
    case NAME_ACTIONS.GET_CATEGORIES.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload.data,
      };
    case NAME_ACTIONS.GET_CATEGORIES.GET_CATEGORIES_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };
    default:
      return state;
  }
};

export default categoryBfsReducer;
