/** @format */
import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import authenticateReducer from "./authenticationReducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  authenticate: authenticateReducer
});

const root = (state: any, action: any) => rootReducer(state, action);

export default root;

// export default (state: any, action: any) => rootReducer(state, action);
