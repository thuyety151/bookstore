import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";

const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export type RootStore = ReturnType<typeof rootReducer>;

export default store;
