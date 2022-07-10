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
import bestSellingReducer from "./bestSelling";
import categoryBfsReducer from "./books-for-sale/categoryReducer";
import languageReducer from "./languageReducer";
import attributeReducer from "./attributeReducer";
import wishlistReducer from "./wishlistReducer";
import couponsReducer from "./couponsReducer";
import shopLocationReducer from "./shopLocationReducer";
import flattenCategoryReducer from "./books-for-sale/flattenCategoryReducer";

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
  order: orderReducer,
  bestSelling:bestSellingReducer,
  categoryBfs: categoryBfsReducer,
  languages: languageReducer ,
  attributes: attributeReducer,
  wishlist: wishlistReducer,
  coupons: couponsReducer,
  shopLocation:shopLocationReducer,
  flattenCategories: flattenCategoryReducer,
});

const root = (state: any, action: any) => rootReducer(state, action);

export default root;

// export default (state: any, action: any) => rootReducer(state, action);
