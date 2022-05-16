import api from "boot/axios";
import { ACTION_NAMES } from "./actionTypes"

export type addPhotoType = {
    file: Blob;
    onSuccess: (image: any) => void;
    onFailure: (error: any) => void;
  };

  export type deletePhotoType = {
    id: string;
    onSuccess: () => void;
    onFailure: (error: any) => void;
  };

export const addPhoto  = (props : addPhotoType) => async (dispatch : any) => {
    dispatch({type: ACTION_NAMES.ADD_PHOTO.ADD_PHOTO});

    let formData = new FormData();
    formData.append('File', props.file);
    var response = await api.post('/medias', formData, {
        headers : {'Content-type': 'multipart/form-data'}
    });

    if(response.data?.isSuccess){
        dispatch({
            type: ACTION_NAMES.ADD_PHOTO.ADD_PHOTO_SUCCESS,
            data: response.data.value
        })
        props.onSuccess(response.data.value);
    }
    else {
        dispatch({
            type: ACTION_NAMES.ADD_PHOTO.ADD_PHOTO_FAIL,
            message: response.data.error,
          });
          props.onFailure(response.data.error);
    }
}

export const deletePhoto = (props : deletePhotoType) => async (dispatch : any) => {
    dispatch({type: ACTION_NAMES.DELETE_PHOTO.DELETE_PHOTO});

    const response = await api.delete("/medias?id="+props.id);

    if(response.data?.isSuccess){
        dispatch({
            type: ACTION_NAMES.DELETE_PHOTO.DELETE_PHOTO_SUCCESS,
            data: response.data.value
            });
        props.onSuccess();
    }
    else {
        dispatch({type: ACTION_NAMES.DELETE_PHOTO.DELETE_PHOTO_FAIL});
        props.onFailure(response.data.error);
    }

}