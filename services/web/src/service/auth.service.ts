
import api from "../boot/axios";

export const userService = {
  login,
  logout,
  register,
};

function login(email: any, password: any) {
  return api.post("/account/login", { email, password }).then((response) => {
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  });
}
function register(firstName: any, lastName: any, email: any, password: any) {
  return api
    .post("/account/register", { firstName, lastName, email, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
}
function logout() {
  localStorage.removeItem("user");
}


export type FacebookLoginType = {
  accessToken: string;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};
export const loginFacebook = (props: FacebookLoginType) => async (
  dispatch: any
) => {
  var response = await api.post(
    `/account/facebook-login?accessToken=${props.accessToken}`,
    {}
  );

  console.log(JSON.stringify(response));

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    props.onSuccess();
  } else {
    props.onFailure("Unauthorize");
  }
};
