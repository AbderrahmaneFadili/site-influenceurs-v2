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
import { max_size, page } from "../../helpers/paginationsParams";

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
        ...campaign,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      if (response.data) {
      }
    })
    .catch((error) => {
      dispatch(addCampaignFailure(error));
    });
};

export { getAllCampaignsAction };
