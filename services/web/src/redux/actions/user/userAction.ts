import { userConstants } from "../../constants/user/userTypes";
import { userService } from "../../../service/auth.service";
import { alertActions } from "../alertAction";
import api from "../../../boot/axios";

export const userActions = {
  login,
  logout,
  register,
  updateAccount
};



function login(email: any, password: any) {
  return (dispatch: any) => {
    dispatch({
      type: userConstants.LOGIN_REQUEST,
      data: email,
    });

    userService.login(email, password).then(
      (user) => {
        dispatch({
          type: userConstants.LOGIN_SUCCESS,
          data: user,
        });
      },
      (error) => {
        dispatch({
          type: userConstants.LOGIN_FAILURE,
          data: error,
        });
        dispatch(alertActions.error(error));
      }
    );
  };
}

function register(firstName: any, lastName: any, email: any, password: any) {
  return (dispatch: any) => {
    dispatch({
      type: userConstants.REGISTER_REQUEST,
      data: email,
    });

    userService.register(firstName, lastName, email, password).then(
      (user) => {
        dispatch({
          type: userConstants.REGISTER_SUCCESS,
          data: user,
        });
      },
      (error) => {
        dispatch({
          type: userConstants.LOGIN_FAILURE,
          data: error,
        });
        dispatch(alertActions.error(error));
      }
    );
  };
}

function updateAccount(
  firstName: any,
  lastName: any,
  currentPassword: any,
  newPassword: any
) {
  return (dispatch: any) => {
    dispatch({ type: userConstants.UPDATE_REQUEST });

    userService
      .updateAccount(firstName, lastName, currentPassword, newPassword)
      .then(
        (user) => {
          dispatch({
            type: userConstants.UPDATE_SUCCESS,
            data: user,
          });
        },
        (error) => {
          dispatch({
            type: userConstants.UPDATE_FAILURE,
            data: error,
          });
        }
      );
  };
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}



