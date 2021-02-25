import mainReducer from "./reducers/mainReducers";
import { createStore } from "redux";

const store = createStore(mainReducer);

export default store;
