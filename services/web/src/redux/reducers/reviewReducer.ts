import { reviewConstants } from "../constants/review/actionTypes";
import { Review } from "../../model/review";

export type ReviewState = {
  success: Boolean;
  data: Review[];
  message?: string | null;
};

const initState: ReviewState = {
  success: true,
  data: [],
  message: null,
};

const reviewReducer = (
  state: ReviewState = initState,
  payload: any
): ReviewState => {
  switch (payload.type) {
    case reviewConstants.GET_REQUEST:
      return {
        ...state,
      };
    case reviewConstants.GET_SUCCESS:
      return {
        ...state,
        success: true,
        data: payload.data,
      };
    case reviewConstants.GET_FAILURE:
      return {
        ...state,
        success: false,
        message: payload.message,
      };

    case reviewConstants.ADD_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data, payload.data
        ],
        success: true,
        
      };
    case reviewConstants.ADD_FAILURE:
      return {
        ...state,
        success: false,
      };

    default:
      return state;
  }
};

export default reviewReducer;
