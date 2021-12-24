import api from "boot/axios";
import { Setting } from "redux/reducers/settingsReducer";
import { ACTION_NAMES } from "./actionTypes";

type UpdateSettingProps = {
  data: Setting[];
  onSuccess: () => void;
  onFailure: () => void;
};
export const updateSettings =
  (props: UpdateSettingProps) => async (dispatch: any) => {
    try {
      dispatch({ type: ACTION_NAMES.UPDATE_SETTINGS.UPDATE });
      const response = await api.post("/settings", props.data);

      if (response.data.isSuccess) {
        dispatch({
          type: ACTION_NAMES.UPDATE_SETTINGS.UPDATE_SUCCESS,
          data: props.data,
        });
        props.onSuccess();
    } else {
        dispatch({ type: ACTION_NAMES.UPDATE_SETTINGS.UPDATE_FAIL });
        props.onFailure();
      }
    } catch (error: any) {
      dispatch({ type: ACTION_NAMES.UPDATE_SETTINGS.UPDATE_FAIL });
      props.onFailure();
    }
  };
