import api from "boot/axios";
import { omit } from "lodash";
import { Category } from "redux/reducers/categoryReducer";
import { ACTION_NAMES } from "./actionTypes";

export type CreateCategoryProps = {
  data: Category;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};
export const createCategory =
  (props: CreateCategoryProps) => async (dispatch: any) => {
    try {
      dispatch({ type: ACTION_NAMES.CREATE_CATEGORY.CREATE_CATEGORY });

      const response = await api.post("/categories", omit(props.data, "id"));
      if (response.data.isSuccess) {
        dispatch({
          type: ACTION_NAMES.CREATE_CATEGORY.CREATE_CATEGORY_SUCCESS,
        });
        props.onSuccess();
      } else {
        dispatch({ type: ACTION_NAMES.CREATE_CATEGORY.CREATE_CATEGORY_FAIL });
        props.onFailure(response.data.error);
      }
    } catch (error: any) {
      dispatch({ type: ACTION_NAMES.CREATE_CATEGORY.CREATE_CATEGORY_FAIL });
      props.onFailure(error);
    }
  };
