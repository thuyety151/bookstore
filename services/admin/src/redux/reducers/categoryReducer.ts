import { Media } from "model/media";
import { ACTION_NAMES } from "redux/actions/category/actionTypes";
import { Pagination, paginationValue } from "../../helper/paginationValue";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: any;
  mediaUrl?: any;
  count?: number;
  parentId?: string | null;
  mediaId?: string;
  media: Media[];
};

export type CategoryState = {
  requesting: boolean;
  dataOptions: Category[];
  data: Category[];
  pagination: Pagination;
  success: boolean;
};
const initState: CategoryState = {
  requesting: false,
  dataOptions: [],
  data: [],
  pagination: { ...paginationValue },
  success: false,
};

const categoryReducer = (
  state: CategoryState = initState,
  payload: any
): CategoryState => {
  switch (payload.type) {
    case ACTION_NAMES.GET_PAGINATION.GET_PAGINATION:
      return {
        ...state,
        requesting: true,
      };
    case ACTION_NAMES.GET_PAGINATION.GET_PAGINATION_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload.data,
        pagination: JSON.parse(payload.pagination),
      };
    case ACTION_NAMES.GET_PAGINATION.GET_PAGINATION_FAIL:
      return {
        ...state,
        requesting: false,
      };
    case ACTION_NAMES.GET_CATEGORIES.GET_CATEGORIES:
      return {
        ...state,
        requesting: true,
      };
    case ACTION_NAMES.GET_CATEGORIES.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        requesting: false,
        dataOptions: payload.data,
      };
    case ACTION_NAMES.GET_CATEGORIES.GET_CATEGORIES_FAIL:
      return {
        ...state,
        requesting: false,
      };
    case ACTION_NAMES.UPSERT_CATEGORY.UPSERT_CATEGORY:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case ACTION_NAMES.UPSERT_CATEGORY.UPSERT_CATEGORY_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
      };
    case ACTION_NAMES.UPSERT_CATEGORY.UPSERT_CATEGORY_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
      };
    case ACTION_NAMES.DELETE_CATEGORY.DELETE_CATEGORY:
      return {
        ...state,
        requesting: true,
      };
    case ACTION_NAMES.DELETE_CATEGORY.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        requesting: false,
      };
    case ACTION_NAMES.DELETE_CATEGORY.DELETE_CATEGORY_FAIL:
      return {
        ...state,
        requesting: false,
      };
    default:
      return state;
  }
};
export default categoryReducer;
