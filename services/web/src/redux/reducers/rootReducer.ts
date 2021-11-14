import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import categoryReducer from "./categoryReducer";
import authenticateReducer from "./authenticationReducer";
import reviewReducer from "./reviewReducer";
import addressReducer from "./addressReducer";
import bookReducer from "./bookReducer";
import addOrUpdateItemReducer from "./addOrUpdateItemReducer";
import booksReducer from "./booksReducer";
import mostViewReducer from "./mostViewReducer";
import onSaleReducer from "./onSaleReducer";
import dealOfWeekReducer from "./dealOfWeekReducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  cart: cartReducer,
  authenticate: authenticateReducer,
  review: reviewReducer,
  address: addressReducer,
  book: bookReducer,
  addOrUpdateItem: addOrUpdateItemReducer,
  mostView : mostViewReducer,
  onSale: onSaleReducer,
  dealOfWeek: dealOfWeekReducer
});

const root = (state: any, action: any) => rootReducer(state, action);

export default root;

// export default (state: any, action: any) => rootReducer(state, action);
