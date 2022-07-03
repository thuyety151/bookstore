import api from "boot/axios";
import { ROLE_ADMIN } from "shared/types";
import { userService } from "../../../service/auth.service";
import { ACTION_NAMES } from "./actionTypes";

type LoginProps = {
  form: any;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};
export const login = (props: LoginProps) => async (dispatch: any) => {
  dispatch({
    type: ACTION_NAMES.LOGIN.LOGIN,
    data: props.form.email,
  });
  userService.login(props.form).then(
    (user) => {
      dispatch({
        type: ACTION_NAMES.LOGIN.LOGIN_SUCCESS,
        data: user,
      });
      if (user?.role !== ROLE_ADMIN) {
        props.onFailure("Permission denied");
      } else {
        props.onSuccess();
      }
    },
    (error) => {
      props.onFailure(error.message);
      dispatch({
        type: ACTION_NAMES.LOGIN.LOGIN_FAIL,
        data: error,
      });
    }
  );
};

// function logout() {
//   userService.logout();
//   return { type: ACTION_NAMES.LOGOUT };
// }
