import { NotiContent } from "components/noti/FloatNoti";
import { Pagination, paginationValue } from "helper/paginationValue";
import { Media } from "model/media";
import { ACTION_NAMES } from "redux/actions/noti/actionTypes";

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
  resquesting: boolean;
  message: string;
  data: Media;
  listNoti: Notification[];
  pagination: Pagination;
};

const initialState: NotiState = {
  resquesting: false,
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
        resquesting: true,
      };
    case ACTION_NAMES.GET_ALL.GET_NOTI_PAGINATION_SUCCESS:
      return {
        ...state,
        resquesting: false,
        listNoti:
          payload.pagination?.pageIndex === 1
            ? payload.data
            : [...state.listNoti, ...payload.data],
        pagination: payload.pagination,
      };
    case ACTION_NAMES.SET_READ_NOTI.SET_READ_NOTI_SUCCESS:
      return {
        ...state,
        listNoti: state.listNoti.map((item: any) =>
          item.id === payload.id || payload.isReadAll
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
