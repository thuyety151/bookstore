import { Author } from "model/author";
import { ACTION_NAMES } from "redux/actions/author/actionTypes";
import { Pagination, paginationValue } from "../../helper/paginationValue";

export type AuthorState = {
  requesting: boolean;
  message: string;
  success: boolean;
  data: Author[];
  pagination: Pagination;
};
const initState: AuthorState = {
  requesting: false,
  message: "",
  success: false,
  data: [],
  pagination: { ...paginationValue },
};

const authorReducer = (
  state: AuthorState = initState,
  payload: any
): AuthorState => {
  switch (payload.type) {
    case ACTION_NAMES.LIST.GET_LIST:
      return {
        ...state,
        requesting: true,
      };
    case ACTION_NAMES.LIST.GET_LIST_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload.data.map((x: any) => ({
          ...x,
          medias: [x.media],
        })),
      };
    case ACTION_NAMES.UPSERT.UPSERT_AUTHOR:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case ACTION_NAMES.UPSERT.UPSERT_AUTHOR_SUCCESS:
      const rest = state.data.filter((x) => x.id !== payload.data.id);
      return {
        ...state,
        requesting: false,
        data: payload.data?.isDeleted
          ? rest
          : [
              ...rest,
              {
                ...payload.data,
                medias: [payload.data.media],
                imageUrl: payload.data.media.url,
                count:
                  state.data.find((x) => x.id === payload.data?.id)?.count || 0,
              },
            ],
        success: true,
      };
    default:
      return state;
  }
};
export default authorReducer;
