import { combineReducers } from "redux";
import addressReducer from "./addressReducer";
import attributeReducer from "./attributeReducer";
import authenticationReducer from "./authenticationReducer";
import authorReducer from "./authorReducer";
import categoryReducer from "./categoryReducer";
import couponReducer from "./couponReducer";
import languageReducer from "./languageReducer";
import mediaReducer from "./mediaReducer";
import notiReducer from "./notiReducer";
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
  authors: authorReducer,
  notis: notiReducer,
});

const root = (state: any, action: any) => rootReducer(state, action);

export default root;
