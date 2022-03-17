import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/auth.reducers"
import messageReducer from "./reducers/message.reducers";

const rootReducer = combineReducers({
    authReducer,
    messageReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;