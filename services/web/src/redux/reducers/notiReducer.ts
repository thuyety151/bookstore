import { NotiContent } from "../../components/noti/FloatNoti";
import { paginationValue } from "../../helper/paginationValue";
import Media from "../../model/media";
import { Pagination } from "../../model/pagination";
import { ACTION_NAMES } from "../actions/noti/actionTypes";

export type Notification = {
  id: string;
  metadata: {
    body: NotiContent;
    title: string;
  };
  createdDate: any;
  isRead: boolean;
};

export type NotiState = {
  requesting: boolean;
  message: string;
  data: Media;
  listNoti: Notification[];
  pagination: Pagination;
};

const initialState: NotiState = {
  requesting: false,
  message: "",
  data: {} as any,
  listNoti: [],
  pagination: { ...paginationValue },
};

const notiReducer = (
  state: NotiState = initialState,
  payload: any
): NotiState => {
  switch (payload.type) {
    case ACTION_NAMES.GET_ALL.GET_NOTI_PAGINATION:
      return {
        ...state,
        requesting: true,
      };
    case ACTION_NAMES.GET_ALL.GET_NOTI_PAGINATION_SUCCESS:
      return {
        ...state,
        requesting: false,
        listNoti: [...state.listNoti, ...payload.data],
        pagination: {
          ...payload.pagination,
          pageIndex: payload.pagination.pageIndex + 1,
        },
      };
    case ACTION_NAMES.SET_READ_NOTI.SET_READ_NOTI_SUCCESS:
      return {
        ...state,
        listNoti: state.listNoti.map((item: any) =>
          item.id === payload.id
            ? {
                ...item,
                isRead: true,
              }
            : item
        ),
      };
    case ACTION_NAMES.CATCH_NEW_NOTI:
      return {
        ...state,
        listNoti: [payload.data, ...state.listNoti],
        pagination: {
          ...state.pagination,
          totalCount: state.pagination.totalCount + 1,
        },
      };
    default:
      return state;
  }
};
export default notiReducer;
