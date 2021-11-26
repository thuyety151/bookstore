import { Media } from "model/media";
import { ACTION_NAMES } from "redux/actions/media/actionTypes";

export type MediaState = {
    resquesting: boolean;
    message: string;
    data: Media;
};

const initialState: MediaState ={
    resquesting: false,
    message: "",
    data : {} as any
}

const mediaReducer = (state: MediaState = initialState, payload: any): MediaState => {
    switch(payload.type){
        case ACTION_NAMES.ADD_PHOTO.ADD_PHOTO:
            return {
                ...state,
                resquesting: true
            };
        case ACTION_NAMES.ADD_PHOTO.ADD_PHOTO_SUCCESS:
            return {
                ...state,
                resquesting: false,
                data: payload.data
            };
        case ACTION_NAMES.ADD_PHOTO.ADD_PHOTO_FAIL:
            return {
                ...state,
                resquesting: false,
                message: payload.message
            };
        default:
            return state;
    }
}
export default mediaReducer;