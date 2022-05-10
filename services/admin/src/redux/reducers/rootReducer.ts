import { combineReducers } from "redux";
import addressReducer from "./addressReducer";
import attributeReducer from "./attributeReducer";
import authenticationReducer from "./authenticationReducer";
import categoryReducer from "./categoryReducer";
import couponReducer from "./couponReducer";
import languageReducer from "./languageReducer";
import mediaReducer from "./mediaReducer";
import ordersReducer from "./ordersReducer";
import productReducer from "./productReducer";
import reportReducer from "./reportReducer";
import settingsReducer from "./settingsReducer";
import importDataReducer from "./importDataReducer";

const rootReducer = combineReducers({
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
  authentication: authenticationReducer,
  importData: importDataReducer,
});

const root = (state: any, action: any) => rootReducer(state, action);

export default root;
