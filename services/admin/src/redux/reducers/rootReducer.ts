import { combineReducers } from "redux";
import addressReducer from "./addressReducer";
import attributeReducer from "./attributeReducer";
import categoryReducer from "./categoryReducer";
import couponReducer from "./couponReducer";
import languageReducer from "./languageReducer";
import mediaReducer from "./mediaReducer";
import ordersReducer from "./ordersReducer";
import productReducer from "./productReducer";
import reportReducer from "./reportReducer";
import settingsReducer from "./settingsReducer";
// import authenticateReducer from "./authenticationReducer";

const rootReducer = combineReducers({
  // authenticate: authenticateReducer,
  orders: ordersReducer,
  addresses: addressReducer,
  attributes: attributeReducer,
  books: productReducer,
  media: mediaReducer,
  categories: categoryReducer,
  languages: languageReducer,
  coupons: couponReducer,
  reports: reportReducer,
  settings: settingsReducer,
  coupons: couponReducer,
});

const root = (state: any, action: any) => rootReducer(state, action);

export default root;

// export default (state: any, action: any) => rootReducer(state, action);
