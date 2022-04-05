import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/auth.reducers";
import messageReducer from "./reducers/message.reducers";
import languageReducer from "./reducers/languages.reducers";
import studyLevelReducer from "./reducers/studyLevel.reducers";
import interestReducer from "./reducers/interest.reducers";
import clientReducer from "./reducers/client.reducer";
import campaignReducer from "./reducers/campaigns.reducers";
import campaignPhotosReducer from "./reducers/campaignPhotos.reducers";
import campaignInterestsReducer from "./reducers/campaignInterests.reducers";

const rootReducer = combineReducers({
  authReducer,
  messageReducer,
  languageReducer,
  studyLevelReducer,
  interestReducer,
  clientReducer,
  campaignReducer,
  campaignPhotosReducer,
  campaignInterestsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
