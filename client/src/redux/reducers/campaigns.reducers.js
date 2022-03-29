import {
  GET_ALL_CAMPAIGNS_FAILURE,
  GET_ALL_CAMPAIGNS_SUCCESS,
  GET_ALL_CAMPAIGNS_START,
  ADD_CAMPAIGN_FAILURE,
  ADD_CAMPAIGN_START,
  ADD_CAMPAIGN_SUCCESS,
  FIND_CAMPAIGN_FAILURE,
  FIND_CAMPAIGN_START,
  FIND_CAMPAIGN_SUCCESS,
  EDIT_CAMPAIGN_FAILURE,
  EDIT_CAMPAIGN_START,
  EDIT_CAMPAIGN_SUCCESS,
  DELETE_CAMPAIGN_FAILURE,
  DELETE_CAMPAIGN_START,
  DELETE_CAMPAIGN_SUCCESS,
} from "../constants/campaigns.constants";

const initialState = {
  loading: false,
  campaigns: null,
  campaign: null,
  error: null,
};

const campaignReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_CAMPAIGNS_START:
      return {
        ...state,
        loading: true,
        campaigns: null,
        error: null,
      };
    case GET_ALL_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        loading: false,
        campaigns: payload,
        error: null,
      };
    case GET_ALL_CAMPAIGNS_FAILURE:
      return {
        ...state,
        loading: false,
        campaigns: null,
        error: payload,
      };
    default:
      return state;
  }
};

export default campaignReducer;