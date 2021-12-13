import { ACTION_NAMES } from "redux/actions/attribute/actionTypes";
import { Pagination, paginationValue } from "../../helper/paginationValue";

export type Attribute = {
  id: string;
  name: string;
  slug: string;
};

export type OrderState = {
  requesting: boolean;
  message: string;
  success: boolean;
  data: Attribute[];
  pagination: Pagination;
};
const initState: OrderState = {
  requesting: false,
  message: "",
  success: false,
  data: [],
  pagination: { ...paginationValue },
};

const attributeReducer = (
  state: OrderState = initState,
  payload: any
): OrderState => {
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
        message: payload.message,
      };
    case ACTION_NAMES.UPSERT_ATTRIBUTE.UPSERT_ATTRIBUTE:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case ACTION_NAMES.UPSERT_ATTRIBUTE.UPSERT_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        requesting: false,
        pagination: { ...paginationValue, pageIndex: 0 },
        success: true,
      };
    case ACTION_NAMES.UPSERT_ATTRIBUTE.UPSERT_ATTRIBUTE_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
        success: false,
      };
    case ACTION_NAMES.DELETE.DELETE:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case ACTION_NAMES.DELETE.DELETE_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
      };
    case ACTION_NAMES.DELETE.DELETE_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
      };
    default:
      return state;
  }
};
export default attributeReducer;
