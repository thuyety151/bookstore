import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import categoryReducer from "./categoryReducer";
import authenticateReducer from "./authenticationReducer";
import reviewReducer from "./reviewReducer";
import addressReducer from "./addressReducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  cart: cartReducer,
  authenticate: authenticateReducer,
  review: reviewReducer,
  address: addressReducer,
});

const root = (state: any, action: any) => rootReducer(state, action);

export default root;

// export default (state: any, action: any) => rootReducer(state, action);
