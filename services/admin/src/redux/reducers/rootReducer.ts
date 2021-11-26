import { combineReducers } from "redux";
import addressReducer from "./addressReducer";
import ordersReducer from "./ordersReducer";
import productReducer from "./productReducer";
// import authenticateReducer from "./authenticationReducer";

const rootReducer = combineReducers({
  // authenticate: authenticateReducer,
  orders: ordersReducer,
  addresses: addressReducer,
  books: productReducer,
});

const root = (state: any, action: any) => rootReducer(state, action);

export default root;

// export default (state: any, action: any) => rootReducer(state, action);
