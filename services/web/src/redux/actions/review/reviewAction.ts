import api from "../../../boot/axios";
import {reviewConstants} from "../../constants/review/actionTypes";
import {CreateReview, Review} from "../../../model/review";


export const getReviews = (bookId: any) => async (dispatch: any ) => {
    try{
        dispatch({type: reviewConstants.GET_REQUEST});

        const response = await api.get(`/reviews?bookId=${bookId}`);
        
        dispatch({
            type: reviewConstants.GET_SUCCESS,
            data: response.data.value
        });

    } catch(error: any) {
        dispatch({
            type: reviewConstants.GET_FAILURE,
            message: error.messages
        })
    }
}

export const addReview = (review : CreateReview) => async (dispatch : any) => {
    try{
        dispatch({type: reviewConstants.ADD_REQUEST});

        const response = await api.post('/reviews', review);
        console.log(response);

        const temp : Review = {
            id: review.id,
            title: review.title,
            content: review.content,
            rate: review.rate,
            bookId: review.bookId,
            createDate: Date().toLocaleString()
        }
        
        dispatch({
            type: reviewConstants.ADD_SUCCESS,
            data: temp
        });
        
    
    } catch(error : any){
        dispatch({
            type: reviewConstants.ADD_FAILURE,
            message: error
        })
    }
}