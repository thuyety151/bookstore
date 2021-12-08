import api from "boot/axios";
import { omit } from "lodash";
import { Attribute } from "redux/reducers/attributeReducer";
import { ACTION_NAMES } from "./actionTypes";

export type CreateAttriProps = {
  attr: any;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};

export const createAttribute =
  (props: CreateAttriProps) => async (dispatch: any) => {
    try {
      dispatch({ type: ACTION_NAMES.CREATE_ATTRIBUTE.CREATE_ATTRIBUTE });
      const response = await api.post("/attributes", props.attr);

      if (response.data.isSuccess) {
        dispatch({
          type: ACTION_NAMES.CREATE_ATTRIBUTE.CREATE_ATTRIBUTE_SUCCESS,
          data: response.data.value,
        });
        props.onSuccess();
      } else {
        dispatch({
          type: ACTION_NAMES.CREATE_ATTRIBUTE.CREATE_ATTRIBUTE_FAIL,
          data: response.data.error,
        });
        props.onFailure(response.data.error);
      }
    } catch (error: any) {
      dispatch({
        type: ACTION_NAMES.CREATE_ATTRIBUTE.CREATE_ATTRIBUTE_FAIL,
        data: error,
      });
      props.onFailure(error);
    }
  };
