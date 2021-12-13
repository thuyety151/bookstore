import api from "boot/axios";
import { omit } from "lodash";
import { FnActionProps } from "model/actionProps";
import { Category } from "redux/reducers/categoryReducer";
import { ACTION_NAMES } from "./actionTypes";

export const upsertCategory =
  (props: { data: Category } & FnActionProps) => async (dispatch: any) => {
    try {
      dispatch({ type: ACTION_NAMES.UPSERT_CATEGORY.UPSERT_CATEGORY });

      const response = await api.post("/categories", omit(props.data, "media"));
      if (response.data.isSuccess) {
        dispatch({
          type: ACTION_NAMES.UPSERT_CATEGORY.UPSERT_CATEGORY_SUCCESS,
        });
        props.onSuccess();
      } else {
        dispatch({ type: ACTION_NAMES.UPSERT_CATEGORY.UPSERT_CATEGORY_FAIL });
        props.onFailure(response.data.error);
      }
    } catch (error: any) {
      dispatch({ type: ACTION_NAMES.UPSERT_CATEGORY.UPSERT_CATEGORY_FAIL });
      props.onFailure(error);
    }
  };

export type DeleteCategoryProps = {
  id: string;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};
export const deleteCategory =
  (props: DeleteCategoryProps) => async (dispatch: any) => {
    try {
      dispatch({ type: ACTION_NAMES.DELETE_CATEGORY.DELETE_CATEGORY });

      const response = await api.delete("/categories", {
        data: {
          id: props.id,
        },
      });
      if (response.data.isSuccess) {
        dispatch({
          type: ACTION_NAMES.DELETE_CATEGORY.DELETE_CATEGORY_SUCCESS,
        });
        props.onSuccess();
      } else {
        dispatch({
          type: ACTION_NAMES.DELETE_CATEGORY.DELETE_CATEGORY_FAIL,
        });
        props.onFailure(response.data.error);
      }
    } catch (error: any) {
      dispatch({
        type: ACTION_NAMES.DELETE_CATEGORY.DELETE_CATEGORY_FAIL,
      });
      props.onFailure(error);
    }
  };
