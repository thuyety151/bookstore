import { getTokenForNoti, onMessageListener } from "boot/firebase";
import FloatNoti, { RealtimeNoti } from "components/noti/FloatNoti";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAll } from "redux/actions/noti/getActions";

export type NotificationData = {
  title: string;
  body: string;
};

const Notification: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTokenFound, setTokenFound] = useState(false);
  const [noti, setNoti] = useState<RealtimeNoti | null>(null);
  const dispatch = useDispatch();

  getTokenForNoti(setTokenFound);

  onMessageListener()
    .then((payload: any) => {
      setNoti(payload.notification);

      dispatch(getAll());
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div style={{ alignItems: "center" }}>
      <FloatNoti model={noti} setModel={(value) => setNoti(value)} />
    </div>
  );
};

export default Notification;
