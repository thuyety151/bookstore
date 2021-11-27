import { combineReducers } from "redux";
import addressReducer from "./addressReducer";
import mediaReducer from "./mediaReducer";
import ordersReducer from "./ordersReducer";
import productReducer from "./productReducer";
// import authenticateReducer from "./authenticationReducer";

const rootReducer = combineReducers({
  // authenticate: authenticateReducer,
  orders: ordersReducer,
  addresses: addressReducer,
  books: productReducer,
  media: mediaReducer,
});

const root = (state: any, action: any) => rootReducer(state, action);

export default root;

// export default (state: any, action: any) => rootReducer(state, action);
