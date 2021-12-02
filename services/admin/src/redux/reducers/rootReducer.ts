import { combineReducers } from "redux";
import addressReducer from "./addressReducer";
import attributeReducer from "./attributeReducer";
import ordersReducer from "./ordersReducer";
// import authenticateReducer from "./authenticationReducer";

const rootReducer = combineReducers({
  // authenticate: authenticateReducer,
  orders: ordersReducer,
  addresses: addressReducer,
  attribute: attributeReducer,
});

const root = (state: any, action: any) => rootReducer(state, action);

export default root;

// export default (state: any, action: any) => rootReducer(state, action);
