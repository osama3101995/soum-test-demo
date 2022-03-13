import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";

const reducers = combineReducers({
  categories: categoryReducer,
});

export default reducers;
