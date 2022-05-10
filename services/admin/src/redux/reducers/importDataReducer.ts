import { Media } from "model/media";
import { ACTION_NAMES } from "redux/actions/attribute/actionTypes";
import { Pagination, paginationValue } from "../../helper/paginationValue";

export type ImportDataState = {
  requesting: boolean;
  message: string;
  success: boolean;
  data: Media[];
  pagination: Pagination;
};
const initState: ImportDataState = {
  requesting: false,
  message: "",
  success: false,
  data: [],
  pagination: { ...paginationValue },
};

const importDataReducer = (
  state: ImportDataState = initState,
  payload: any
): ImportDataState => {
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
    default:
      return state;
  }
};
export default importDataReducer;
