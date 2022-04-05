import {
  FIND_ALL_CAMPAIGN_INTERESTS_START,
  FIND_ALL_CAMPAIGN_INTERESTS_SUCCESS,
  FIND_ALL_CAMPAIGN_INTERESTS_FAILURE,
} from "../constants/campaignInterests.constants";

const initialState = {
  loading: false,
  campaignInterests: null,
  error: null,
};
const campaignInterestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_ALL_CAMPAIGN_INTERESTS_START:
      return {
        ...state,
        loading: true,
        campaignInterests: null,
        error: null,
      };
    case FIND_ALL_CAMPAIGN_INTERESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        campaignInterests: action.payload,
        error: null,
      };
    case FIND_ALL_CAMPAIGN_INTERESTS_FAILURE:
      return {
        ...state,
        loading: false,
        campaignInterests: null,
        error: null,
      };
    default:
      return {};
  }
};

export default campaignInterestsReducer;
