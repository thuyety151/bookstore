import { combineReducers } from "redux";
import addressReducer from "./addressReducer";
import attributeReducer from "./attributeReducer";
import categoryReducer from "./categoryReducer";
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
  attributes: attributeReducer,
  categories: categoryReducer
});

const root = (state: any, action: any) => rootReducer(state, action);

export default root;

// export default (state: any, action: any) => rootReducer(state, action);
