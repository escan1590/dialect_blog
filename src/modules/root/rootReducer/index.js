import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import { categories } from "../../reducers/menu";
import { posts } from "../../reducers/post";

export default combineReducers({
  categories,
  posts,
});
