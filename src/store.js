import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./modules/root/rootReducer";

const composeEnhancers = composeWithDevTools({});
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
