import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTokenForNoti, onMessageListener } from "../boot/firebase";
import FloatNoti, { NotiContent } from "../components/noti/FloatNoti";
import { getAll } from "../redux/actions/noti/getActions";

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
      setNoti(payload.notification);

      dispatch(getAll());
    })
    .catch((err: any) => console.log("failed: ", err));

  return (
    <div style={{ alignItems: "center" }}>
      <FloatNoti model={noti} setModel={(value) => setNoti(value)} />
    </div>
  );
};

export default Notification;
