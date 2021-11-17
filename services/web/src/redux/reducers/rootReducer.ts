/** @format */
import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import categoryReducer from "./categoryReducer";
import authenticateReducer from "./authenticationReducer";
import reviewReducer from "./reviewReducer";
import bookReducer from "./bookReducer";
import addOrUpdateItemReducer from "./addOrUpdateItemReducer";
import authorReducer from "./authorReducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  cart: cartReducer,
  authenticate: authenticateReducer,
  review: reviewReducer,
  book: bookReducer,
  addOrUpdateItem: addOrUpdateItemReducer,
  author: authorReducer,
});

const root = (state: any, action: any) => rootReducer(state, action);

export default root;

// export default (state: any, action: any) => rootReducer(state, action);
