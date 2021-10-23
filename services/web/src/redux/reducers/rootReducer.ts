/** @format */
import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import authenticateReducer from "./authenticationReducer";
import reviewReducer from "./reviewReducer";
import bookReducer from "./bookReducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  authenticate: authenticateReducer,
  review: reviewReducer,
  book: bookReducer
});

const root = (state: any, action: any) => rootReducer(state, action);

export default root;

// export default (state: any, action: any) => rootReducer(state, action);
