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
import axios from "axios";
import authHeader from "../../services/auth-header";
import { url } from "../../api/campaigns";
import { url as campaignInterestsUrl } from "../../api/campaigninterests";
import { max_size, page } from "../../helpers/paginationsParams";
import { setMessage } from "./message.actions";

//get all campaigns actions
const getAllCampaignsStart = () => ({
  type: GET_ALL_CAMPAIGNS_START,
});

const getAllCampaignsSuccess = (payload) => ({
  type: GET_ALL_CAMPAIGNS_SUCCESS,
  payload,
});

const getAllCampaignsFailure = (payload) => ({
  type: GET_ALL_CAMPAIGNS_FAILURE,
  payload,
});

const getAllCampaignsAction = (page, size) => (dispatch) => {
  dispatch(getAllCampaignsStart());
  axios
    .get(`${url}/all?page=${page}&size=${size}`, {
      headers: authHeader(),
    })
    .then((response) => {
      dispatch(getAllCampaignsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getAllCampaignsFailure(error));
    });
};

//Add Campaing
const addCampaignStart = () => ({
  type: ADD_CAMPAIGN_START,
});

const addCampaignSuccess = (payload) => ({
  type: ADD_CAMPAIGN_SUCCESS,
  payload,
});

const addCampaignFailure = (payload) => ({
  type: ADD_CAMPAIGN_FAILURE,
  payload,
});

const addCampaignAction = (campaign) => (dispatch) => {
  dispatch(addCampaignStart());
  axios
    .post(
      `${url}/add`,
      {
        clientId: campaign.client,
        title: campaign.title,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        presence: campaign.presence,
        numberInfluencers: campaign.numberInfluencers,
        description: campaign.description,
        hashtage: campaign.hashtag,
        accounts: campaign.accounts,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      if (response.data) {
        //add interests
        let interestRequests = [];
        campaign.interests.forEach((interest) => {
          interestRequests.push(
            axios.post(
              `${campaignInterestsUrl}/add?interestId=${interest.id}&campaignId=${response.data.id}`,
              {},
              { headers: authHeader() }
            )
          );
        });

        Promise.all(interestRequests)
          .then((result) => {
            console.log(result);
            dispatch(addCampaignSuccess(response.data));
            dispatch(getAllCampaignsAction(page, max_size));
            dispatch(
              setMessage(
                "Une campagne est ajoutée avec succès, vous pouvez ajouter une galerie de campagne en bas."
              )
            );
          })
          .catch((error) => dispatch(setMessage(error)));
      }
    })
    .catch((error) => {
      dispatch(addCampaignFailure(error));
      dispatch(setMessage(error.message));
    });
};

//find
const findCampaignStart = () => ({
  type: FIND_CAMPAIGN_START,
});

const findCampaignSuccess = (payload) => ({
  type: FIND_CAMPAIGN_SUCCESS,
  payload,
});

const findCampaignFailure = (payload) => ({
  type: FIND_CAMPAIGN_FAILURE,
  payload,
});

const findCampaignAction = (id) => (dispatch) => {
  dispatch(findCampaignStart());
  axios
    .get(`${url}/find/${id}`, {
      headers: authHeader(),
    })
    .then((response) => {
      dispatch(findCampaignSuccess(response.data));
    })
    .catch((error) => {
      dispatch(findCampaignFailure(error));
    });
};

export { getAllCampaignsAction, findCampaignAction, addCampaignAction };
