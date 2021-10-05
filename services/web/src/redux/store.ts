/** @format */

import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/rootReducer";
import rootReducer from "./reducers/rootReducer";

const middleware = [thunk];


const store = createStore(reducers, applyMiddleware(...middleware));

export type RootStore = ReturnType<typeof rootReducer>;
export default store;
