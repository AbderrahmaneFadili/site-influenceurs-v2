import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/auth.reducers";
import messageReducer from "./reducers/message.reducers";
import langaugeReducer from "./reducers/langauges.reducers";

const rootReducer = combineReducers({
  authReducer,
  messageReducer,
  langaugeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
