import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/auth.reducers";
import messageReducer from "./reducers/message.reducers";
import languageReducer from "./reducers/languages.reducers";
import studyLevelReducer from "./reducers/studyLevel.reducers";

const rootReducer = combineReducers({
  authReducer,
  messageReducer,
  languageReducer,
  studyLevelReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
