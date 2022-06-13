import api from "boot/axios";
import { apiFCM } from "boot/firebase";
import { ACTION_NAMES } from "./actionTypes";

export const sendNoti = () => async (dispatch: any) => {
  const res = await apiFCM.post("/send", {
    to: "f3Jo4HzELfMGfMkIrIFwEB:APA91bG6CDyYBYVTgf1_6bHuMvB9FDHVGJHqKffloL_21XcH2cypKui6savSrZVBxkxX38R3ImV675ai_n5GZOX07obwS58XEWqVHQSVtdfxgPjPtI7qaIqTbTGLpE1dXpUlGJw2fmrV",
    notification: {
      title: "new",
      body: JSON.stringify({
        type: "Ready To Pick",
        orderCode: "ABCDEF",
        orderId: "123-456",
        contents: `You have a new order ABC`,
      }),
      mutable_content: true,
      sound: "Tri-tone",
    },
  });
  if (res.data?.success) {
    const saveNoti = await api.post("/notis/create", {
      userIds: ["b6ae2fe7-9059-4ab3-a618-2e37086f84e7"],
      metadata: JSON.stringify({
        title: "new",
        body: {
          type: "Ready To Pick",
          orderCode: "ABCDEF",
          orderId: "123-456",
          contents: `You have a new order ABC`,
        },
        mutable_content: true,
        sound: "Tri-tone",
      }),
      createdDate: new Date(),
    });
    console.log(saveNoti);
  }
};

export const readNotis =
  (id?: string, isReadAll?: boolean) => async (dispatch: any) => {
    await api.post("/notis/read?id=" + id + "&isReadAll=" + isReadAll);
    dispatch({ type: ACTION_NAMES.SET_READ_NOTI.SET_READ_NOTI_SUCCESS, id ,isReadAll});
  };

export const saveFcmToken = async (token: string) => {
  await api.post("/account/save-fcm-token?token=" + token);
};
