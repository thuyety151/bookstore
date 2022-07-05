import api from "boot/axios";
import { omit } from "lodash";
import { FnActionProps } from "model/actionProps";
import { Author } from "model/author";
import { ACTION_NAMES } from "./actionTypes";

export const upsertAuthor =
  (props: { data: Author } & FnActionProps) => async (dispatch: any) => {
    try {
      dispatch({ type: ACTION_NAMES.UPSERT.UPSERT_AUTHOR });

      let { medias, ...data } = props.data;
      let media = medias[0];
      if (!data.id) {
        data = omit(data, "id");
      }
      if (medias && !medias[0]?.id) {
        // upload media
        let formData = new FormData();
        formData.append("File", medias[0] as any);
        const res = await api.post("/medias", formData, {
          headers: { "Content-type": "multipart/form-data" },
        });
        media = res.data.value;
      }
      const response = await api.post("/authors", {
        ...data,
        media: media,
      });
      if (response.data.isSuccess) {
        if (!data.id) {
          data.id = response.data.value;
        }
        dispatch({
          type: ACTION_NAMES.UPSERT.UPSERT_AUTHOR_SUCCESS,
          data: {
            ...data,
            media: media,
          },
        });
        props.onSuccess();
      } else {
        dispatch({
          type: ACTION_NAMES.UPSERT.UPSERT_AUTHOR_FAILED,
          data: response.data.error,
        });
        props.onFailure(response.data.error);
      }
    } catch (error: any) {
      dispatch({
        type: ACTION_NAMES.UPSERT.UPSERT_AUTHOR_FAILED,
        data: error,
      });
      props.onFailure(error);
    }
  };
