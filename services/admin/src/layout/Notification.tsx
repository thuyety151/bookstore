import { Button } from "@material-ui/core";
import { getTokenForNoti, onMessageListener } from "boot/firebase";
import FloatNoti, { NotiContent } from "components/noti/FloatNoti";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "redux/actions/noti/getActions";
import { sendNoti } from "redux/actions/noti/postActions";
import { RootStore } from "redux/store";

export type NotificationData = {
  title: string;
  body: string;
};

const Notification: React.FC = () => {
  const [isTokenFound, setTokenFound] = useState(false);
  const [noti, setNoti] = useState<NotiContent | null>(null);
  const { data } = useSelector((state: RootStore) => state.notis);
  const dispatch = useDispatch();

  getTokenForNoti(setTokenFound);

  // inside the jsx being returned:
  useEffect(() => console.log("TOKEN:...", isTokenFound), [isTokenFound]);

  onMessageListener()
    .then((payload: any) => {
      setNoti(JSON.parse(payload.notification.body));
    })
    .catch((err) => console.log("failed: ", err));

  const demoSendNoti = () => {
    console.log("trigger");

    dispatch(sendNoti());
  };

  return (
    <div style={{ alignItems: "center" }}>
      <FloatNoti model={noti} setModel={(value) => setNoti(value)} />
      <Button onClick={demoSendNoti}>Test send noti</Button>
    </div>
  );
};

export default Notification;
