import Author from "../../model/author";
import { NAME_ACTIONS } from "../constants/author/actionTypes";

export type AuthorState = {
  requesting: boolean;
  success: Boolean;
  data: Author[];
  message?: string;
  listAuthor: Author[];
  pagination: {
    pageIndex: number;
    pageSize: number;
    totalPage: number;
    totalCount: number;
  };
  detail: Author | null;
};

const initState: AuthorState = {
  requesting: false,
  success: true,
  data: [],
  message: "",
  pagination: {
    pageIndex: 0,
    pageSize: 20,
    totalPage: 0,
    totalCount: 0,
  },
  listAuthor: [],
  detail: null,
};

const authorReducer = (
  state: AuthorState = initState,
  payload: any
): AuthorState => {
  switch (payload.type) {
    case NAME_ACTIONS.GET_ALL_AUTHOR.GET_ALL:
      return {
        ...state,
        requesting: true,
        data: [],
      };
    case NAME_ACTIONS.GET_ALL_AUTHOR.GET_ALL_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload.data,
        success: true,
      };
    case NAME_ACTIONS.GET_ALL_AUTHOR.GET_ALL_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
        success: false,
      };
    case NAME_ACTIONS.GET_AUTHORS_PAGINATION.GET_AUTHORS_PAGINATION:
      return {
        ...state,
        requesting: true,
        listAuthor: [],
      };
    case NAME_ACTIONS.GET_AUTHORS_PAGINATION.GET_AUTHORS_PAGINATION_SUCCESS:
      return {
        ...state,
        requesting: false,
        listAuthor: payload.data,
        success: true,
        pagination: JSON.parse(payload.pagination),
      };
    case NAME_ACTIONS.GET_AUTHOR_BY_ID.GET_AUTHOR_BY_ID:
      return {
        ...state,
        requesting: true,
        detail: null,
      };
    case NAME_ACTIONS.GET_AUTHOR_BY_ID.GET_AUTHOR_BY_ID_SUCCESS:
      return {
        ...state,
        requesting: false,
        detail: payload.data,
      };
    default:
      return state;
  }
};

export default authorReducer;
