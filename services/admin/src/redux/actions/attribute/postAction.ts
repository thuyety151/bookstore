import api from "boot/axios";
import { omit } from "lodash";
import { FnActionProps } from "model/actionProps";
import { Attribute } from "redux/reducers/attributeReducer";
import { ACTION_NAMES } from "./actionTypes";

export const upsertAttribute =
  (props: { data: Attribute } & FnActionProps) => async (dispatch: any) => {
    try {
      dispatch({ type: ACTION_NAMES.UPSERT_ATTRIBUTE.UPSERT_ATTRIBUTE });
      const response = props.data.id
        ? await api.post("/attributes", props.data)
        : await api.post("/attributes", omit(props.data, "id"));

      if (response.data.isSuccess) {
        dispatch({
          type: ACTION_NAMES.UPSERT_ATTRIBUTE.UPSERT_ATTRIBUTE_SUCCESS,
          data: response.data.value,
        });
        props.onSuccess();
      } else {
        dispatch({
          type: ACTION_NAMES.UPSERT_ATTRIBUTE.UPSERT_ATTRIBUTE_FAIL,
          data: response.data.error,
        });
        props.onFailure(response.data.error);
      }
    } catch (error: any) {
      dispatch({
        type: ACTION_NAMES.UPSERT_ATTRIBUTE.UPSERT_ATTRIBUTE_FAIL,
        data: error,
      });
      props.onFailure(error);
    }
  };

export const deleteAttribute =
  (props: { id: string } & FnActionProps) => async (dispatch: any) => {
    try {
      dispatch({ type: ACTION_NAMES.DELETE.DELETE });
      const response = await api.delete("/attributes", {
        data: {
          id: props.id,
        },
      });

      if (response.data.isSuccess) {
        dispatch({ type: ACTION_NAMES.DELETE.DELETE_SUCCESS });
        props.onSuccess();
      } else {
        dispatch({ type: ACTION_NAMES.DELETE.DELETE_FAIL });
        props.onFailure(response.data.error);
      }
    } catch (error: any) {
      dispatch({ type: ACTION_NAMES.DELETE.DELETE_FAIL });
      props.onFailure(error);
    }
  };
