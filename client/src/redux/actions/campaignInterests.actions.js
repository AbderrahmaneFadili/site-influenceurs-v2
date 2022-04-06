import axios from "axios";
import {
  FIND_ALL_CAMPAIGN_INTERESTS_FAILURE,
  FIND_ALL_CAMPAIGN_INTERESTS_SUCCESS,
  FIND_ALL_CAMPAIGN_INTERESTS_START,
} from "../constants/campaignInterests.constants";
import { url } from "../../api/campaigninterests";
import authHeader from "../../services/auth-header";

const findCampaignInterestsByCampaignStart = () => ({
  type: FIND_ALL_CAMPAIGN_INTERESTS_START,
});

const findCampaignInterestsByCampaignSuccess = (payload) => ({
  type: FIND_ALL_CAMPAIGN_INTERESTS_SUCCESS,
  payload,
});

const findCampaignInterestsByCampaignFailure = (payload) => ({
  type: FIND_ALL_CAMPAIGN_INTERESTS_FAILURE,
  payload,
});

const findCampaignInterestsByCampaignAction = (campaignId) => (dispatch) => {
  dispatch(findCampaignInterestsByCampaignStart());
  axios
    .get(`${url}/findByCampaign?campaignId=${campaignId}`, {
      headers: authHeader(),
    })
    .then((response) => {
      console.log(response.data);
      dispatch(findCampaignInterestsByCampaignSuccess(response.data));
    })
    .catch((error) => {
      dispatch(findCampaignInterestsByCampaignFailure(error));
    });
};

export { findCampaignInterestsByCampaignAction };
