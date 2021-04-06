import mainReducer from "./mainReducers";
import alertReducer from "./alertReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  mainReducer,
  alertReducer,
});

export default rootReducer;
