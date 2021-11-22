import { NewReleaseType } from "../../model/newRelease";
import { booksContant } from "../constants/books/actionTypes";

export type NewReleaseState = {
  success: Boolean;
  data: NewReleaseType[];
  message: string | null;
  requesting: boolean;
};

const initialState: NewReleaseState = {
  success: true,
  data: [] as NewReleaseType[],
  message: null,
  requesting: false,
};

const newReleasesReducer = (
  state: NewReleaseState = initialState,
  payload: any
): NewReleaseState => {
  switch (payload.type) {
    case booksContant.GET_NEW_RELEASES.GET_NEW_RELEASES:
      return {
        ...state,
        requesting: true,
      };
    case booksContant.GET_NEW_RELEASES.GET_NEW_RELEASES_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload.data,
        success: true,
      };
    case booksContant.GET_NEW_RELEASES.GET_NEW_RELEASES_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        data: [],
        message: payload.message,
      };
    default:
      return state;
  }
};

export default newReleasesReducer;
