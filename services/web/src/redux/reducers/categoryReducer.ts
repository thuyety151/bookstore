import { SidebarCategoryResponse } from "../../model/category";
import { NAME_ACTIONS } from "../constants/category/actionTypes";

export type CategoryState = {
  requesting: Boolean;
  success: Boolean;
  message?: string | null;
  data: {
    root: SidebarCategoryResponse[];
    sub: SidebarCategoryResponse | null;
    homepage: SidebarCategoryResponse[];
  };
};
const initState: CategoryState = {
  requesting: false,
  success: true,
  message: null,
  data: {
    root: [],
    sub: null,
    homepage: [],
  },
};

const categoryReducer = (
  state: CategoryState = initState,
  payload: any
): CategoryState => {
  switch (payload.type) {
    //root
    case NAME_ACTIONS.SIDEBAR.GET_ROOT_CATEGORY:
      return {
        ...state,
        requesting: true,
      };
    case NAME_ACTIONS.SIDEBAR.GET_ROOT_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        data: { ...state.data, root: payload.data },
      };
    case NAME_ACTIONS.SIDEBAR.GET_ROOT_FAIL:
      return {
        ...state,
        success: false,
        requesting: false,
        message: payload.message,
      };

    //sub
    case NAME_ACTIONS.SIDEBAR.GET_SUB_CATEGORY:
      return {
        ...state,
        requesting: true,
        // refresh sub
        data: { ...state.data, sub: null },
      };
    case NAME_ACTIONS.SIDEBAR.GET_SUB_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        data: { ...state.data, sub: payload.data },
      };
    case NAME_ACTIONS.SIDEBAR.GET_SUB_FAIL:
      return {
        ...state,
        success: false,
        requesting: false,
        message: payload.message,
      };
    case NAME_ACTIONS.SIDEBAR.REFRESH_SIDEBAR:
      return {
        ...state,
        // data:{...state.data.sub}
      };
    case NAME_ACTIONS.CATEGORY_FOR_HOME_PAGE.GET_ALL_CATEGORY:
      return {
        ...state,
        requesting: true,
      };
    case NAME_ACTIONS.CATEGORY_FOR_HOME_PAGE.GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        data: { ...state.data, homepage: payload.data },
      };
    case NAME_ACTIONS.CATEGORY_FOR_HOME_PAGE.GET_ALL_CATEGORY_FAIL:
      return {
        ...state,
        success: false,
        requesting: false,
        message: payload.message,
      };

    default:
      return state;
  }
};
export default categoryReducer;
