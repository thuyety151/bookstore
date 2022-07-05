// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import axios from "axios";
import Config from "../config/config";
import { saveFcmToken } from "../redux/actions/noti/postActions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZbclkRcIIIS9oAsKP-V25X4a2_Seiu5o",
  authDomain: "internship-august-2021-b1566.firebaseapp.com",
  databaseURL:
    "https://internship-august-2021-b1566-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "internship-august-2021-b1566",
  storageBucket: "internship-august-2021-b1566.appspot.com",
  messagingSenderId: "648438980588",
  appId: "1:648438980588:web:fe49df0e71a421489a2ac9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const getTokenForNoti = (setTokenFound: any) => {
  return getToken(messaging, { vapidKey: Config.webpushKey })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        saveFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const messaging = getMessaging(app);
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });

export const apiFCM = axios.create({
  baseURL: "https://fcm.googleapis.com/fcm",
});
// Authentication
apiFCM.interceptors.request.use((config) => {
  config.headers.common["Authorization"] = `key=${Config.firebaseServerKey}`;
  config.headers.common["Content-Type"] = "application/json";

  return config;
});
