import api from "boot/axios";
import { ACTION_NAMES } from "./actionTypes";

export const readNotis =
  (id?: string, isReadAll?: boolean) => async (dispatch: any) => {
    await api.post("/notis/read?id=" + id + "&isReadAll=" + isReadAll);
    dispatch({
      type: ACTION_NAMES.SET_READ_NOTI.SET_READ_NOTI_SUCCESS,
      id,
      isReadAll,
    });
  };

export const saveFcmToken = async (token: string) => {
  await api.post("/account/save-fcm-token?token=" + token);
};

export type SendToUserParams = {
  data: {
    userIds: string[] | null;
    title: string;
    contents: string;
  };
  onSuccess: () => void;
  onFailure: (e: any) => void;
};

export const sendToUsers =
  (props: SendToUserParams) => async (dispatch: any) => {
    dispatch({ type: ACTION_NAMES.SEND_TO_USERS.SEND_TO_USERS });
    try {
      const res = await api.post("/notis/send", props.data);
      if (res.data?.isSuccess) {
        props.onSuccess();
        dispatch({ type: ACTION_NAMES.SEND_TO_USERS.SEND_TO_USERS_SUCCESS });
        return;
      }
      throw new Error(res.data?.error);
    } catch (e: any) {
      props.onFailure(e);
    } finally {
      dispatch({ type: ACTION_NAMES.SEND_TO_USERS.SEND_TO_USERS_FINALLY });
    }
  };
