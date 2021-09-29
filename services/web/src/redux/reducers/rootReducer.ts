/** @format */
import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  category: categoryReducer,
});

const root = (state: any, action: any) => rootReducer(state, action);

export default root;

// export default (state: any, action: any) => rootReducer(state, action);
