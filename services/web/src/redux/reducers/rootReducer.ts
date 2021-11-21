import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import categoryReducer from "./categoryReducer";
import authenticateReducer from "./authenticationReducer";
import reviewReducer from "./reviewReducer";
import addressReducer from "./addressReducer";
import bookReducer from "./bookReducer";
import addOrUpdateItemReducer from "./addOrUpdateItemReducer";
import couponReducer from "./couponReducer";
import authorReducer from "./authorReducer";
import mostViewReducer from "./mostViewReducer";
import onSaleReducer from "./onSaleReducer";
import dealOfWeekReducer from "./dealOfWeekReducer";
import booksReducer from "./booksReducer";
import newReleasesReducer from "./newReleasesReducer";
import deliveryReducer from "./deliveryReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  cart: cartReducer,
  authenticate: authenticateReducer,
  review: reviewReducer,
  address: addressReducer,
  book: bookReducer,
  books: booksReducer,
  addOrUpdateItem: addOrUpdateItemReducer,
  coupon: couponReducer,
  mostView: mostViewReducer,
  onSale: onSaleReducer,
  dealOfWeek: dealOfWeekReducer,
  newReleases: newReleasesReducer,
  author: authorReducer,
  delivery: deliveryReducer,
  order:orderReducer
});

const root = (state: any, action: any) => rootReducer(state, action);

export default root;

// export default (state: any, action: any) => rootReducer(state, action);
