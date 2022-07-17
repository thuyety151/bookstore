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
  isCustom: boolean;
  count: number;
};

export type NotiState = {
  requesting: boolean;
  message: string;
  data: Media;
  listNoti: Notification[];
  unread: number;
  pagination: Pagination;
  requestingSend: boolean;
  admin: {
    data: Notification[];
    pagination: Pagination;
    requesting: boolean;
  };
};

const initialState: NotiState = {
  requesting: false,
  message: "",
  data: {} as any,
  listNoti: [],
  pagination: { ...paginationValue },
  requestingSend: false,
  admin: {
    requesting: false,
    pagination: { ...paginationValue },
    data: [],
  },
  unread: 0,
};

const notiReducer = (
  state: NotiState = initialState,
  payload: any
): NotiState => {
  switch (payload.type) {
    case ACTION_NAMES.GET_ALL.GET_NOTI_PAGINATION:
    case ACTION_NAMES.ADMIN_GET_ALL_NOTI.ADMIN_GET_NOTI_PAGINATION:
      return {
        ...state,
        requesting: true,
      };
    case ACTION_NAMES.GET_ALL.GET_NOTI_PAGINATION_SUCCESS:
      return {
        ...state,
        requesting: false,
        listNoti:
          payload.pagination?.pageIndex === 1
            ? payload.data
            : [...state.listNoti, ...payload.data],
        unread: payload.unread,
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
        unread: payload.isReadAll ? 0 : state.unread - 1,
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
    case ACTION_NAMES.SEND_TO_USERS.SEND_TO_USERS:
      return {
        ...state,
        requestingSend: true,
      };
    case ACTION_NAMES.SEND_TO_USERS.SEND_TO_USERS_SUCCESS:
      return {
        ...state,
        pagination: { ...paginationValue, pageIndex: 0 },
      };
    case ACTION_NAMES.SEND_TO_USERS.SEND_TO_USERS_FINALLY:
      return {
        ...state,
        requestingSend: false,
      };
    case ACTION_NAMES.ADMIN_GET_ALL_NOTI.ADMIN_GET_NOTI_PAGINATION_SUCCESS:
      return {
        ...state,
        admin: {
          requesting: false,
          data: payload.data,
          pagination: payload.pagination,
        },
      };
    default:
      return state;
  }
};
export default notiReducer;
