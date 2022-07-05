import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

const composeEnhancers = compose;

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
