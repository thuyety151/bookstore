import api from "../../../boot/axios";
import { reviewConstants } from "../../constants/review/actionTypes";
import { CreateReview, Review } from "../../../model/review";

export const getReviews =
  (bookId: any, pagination?: any) => async (dispatch: any) => {
    console.log("get review");
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
      console.log(error);
      dispatch({
        type: reviewConstants.GET_FAILURE,
        message: error.messages,
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

    const response = await api.post("/reviews", props.review);
    const temp: Review = {
      id: props.review.id,
      title: props.review.title,
      content: props.review.content,
      rate: props.review.rate,
      bookId: props.review.bookId,
      createDate: Date().toLocaleString(),
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
  } catch (error: any) {
    dispatch({
      type: reviewConstants.ADD_FAILURE,
      message: error,
    });
    // props.onFailure(error);
  }
};
