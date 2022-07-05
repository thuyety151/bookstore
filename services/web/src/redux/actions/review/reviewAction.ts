import api from "../../../boot/axios";
import { reviewConstants } from "../../constants/review/actionTypes";
import { CreateReview, Review } from "../../../model/review";

export const getReviews =
  (bookId: any, pagination?: any) => async (dispatch: any) => {
    try {
      dispatch({ type: reviewConstants.GET_REQUEST });

      const response = await api.get(`/reviews?bookId=${bookId}`, {
        params: pagination || {
          pageIndex: 1,
          pageSize: 5,
          totalPage: 0,
          totalCount: 0,
        },
      });

      dispatch({
        type: reviewConstants.GET_SUCCESS,
        data: response.data.value,
        pagination: response.headers.pagination,
      });
    } catch (error: any) {
      dispatch({
        type: reviewConstants.GET_FAILURE,
        message: error.message,
      });
    }
  };
export type CreateReviewType = {
  review: CreateReview;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};
export const addReview = (props: CreateReviewType) => async (dispatch: any) => {
  try {
    dispatch({ type: reviewConstants.ADD_REQUEST });
    Promise.all(
      (props.review.files || []).map(async (file: any) => {
        if (file.type) {
          //is file
          let formData = new FormData();
          formData.append("File", file);
          const res = await api.post("/medias", formData, {
            headers: { "Content-type": "multipart/form-data" },
          });
          return res.data.value;
        }
        return file;
      })
    ).then(async (results) => {
      const { files, ...reviewData } = props.review;
      const response = await api.post("/reviews", {
        ...reviewData,
        media: results,
      });
      const user = JSON.parse(localStorage.getItem("user")!);

      const temp: Review = {
        id: props.review.id,
        title: props.review.title,
        content: props.review.content,
        rate: props.review.rate,
        bookId: props.review.bookId,
        createDate: Date().toLocaleString(),
        media: results,
        avatarUrl: user.photo?.url,
        userName: user.userName,
      };
      if (response.data.isSuccess) {
        dispatch({
          type: reviewConstants.ADD_SUCCESS,
          data: temp,
        });
        props.onSuccess();
      } else {
        dispatch({
          type: reviewConstants.ADD_FAILURE,
          message: response.data.error,
        });
        props.onFailure(response.data.error);
      }
    });
  } catch (error: any) {
    dispatch({
      type: reviewConstants.ADD_FAILURE,
      message: error,
    });
    // props.onFailure(error);
  }
};
