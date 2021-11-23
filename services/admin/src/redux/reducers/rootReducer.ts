import { combineReducers } from "redux";
import ordersReducer from "./ordersReducer";
// import authenticateReducer from "./authenticationReducer";

const rootReducer = combineReducers({
  // authenticate: authenticateReducer,
  orders: ordersReducer,
});

const root = (state: any, action: any) => rootReducer(state, action);

export default root;

// export default (state: any, action: any) => rootReducer(state, action);
