import { getTokenForNoti, onMessageListener } from "boot/firebase";
import FloatNoti, { NotiContent } from "components/noti/FloatNoti";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ACTION_NAMES } from "redux/actions/noti/actionTypes";

export type NotificationData = {
  title: string;
  body: string;
};

const Notification: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTokenFound, setTokenFound] = useState(false);
  const [noti, setNoti] = useState<NotiContent | null>(null);
  const dispatch = useDispatch();

  getTokenForNoti(setTokenFound);

  onMessageListener()
    .then((payload: any) => {
      setNoti(JSON.parse(payload.notification.body));
      dispatch({
        type: ACTION_NAMES.CATCH_NEW_NOTI,
        data: noti,
      });
      console.log(JSON.parse(payload.notification.body));
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div style={{ alignItems: "center" }}>
      <FloatNoti model={noti} setModel={(value) => setNoti(value)} />
    </div>
  );
};

export default Notification;
