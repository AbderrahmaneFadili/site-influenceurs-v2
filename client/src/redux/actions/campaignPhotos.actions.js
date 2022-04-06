import axios from "axios";
import {
  ADD_CAMPAIGN_PHOTOS_START,
  ADD_CAMPAIGN_PHOTOS_SUCCESS,
  ADD_CAMPAIGN_PHOTOS_FAILURE,
  GET_CAMPAIGN_PHOTOS_BY_CAMPAIGN_ID_START,
  GET_CAMPAIGN_PHOTOS_BY_CAMPAIGN_ID_SUCCESS,
  GET_CAMPAIGN_PHOTOS_BY_CAMPAIGN_ID_FAILURE,
  DELETE_ALL_CMPS_PHOTOS_START,
  DELETE_ALL_CMPS_PHOTOS_SUCCESS,
  DELETE_ALL_CMPS_PHOTOS_FAILURE,
  DELETE_CAMPAIGN_PHOTO_START,
  DELETE_CAMPAIGN_PHOTO_SUCCESS,
  DELETE_CAMPAIGN_PHOTO_FAILURE,
} from "../constants/campaignPhotos.constants";
import { url } from "../../api/campaignPhotos";
import authHeader from "../../services/auth-header";
import { setMessage } from "./message.actions";

//add
const addCampaignPhotosStart = () => ({
  type: ADD_CAMPAIGN_PHOTOS_START,
});

const addCampaignPhotosSuccess = (payload) => ({
  type: ADD_CAMPAIGN_PHOTOS_SUCCESS,
  payload,
});

const addCampaignPhotosFailure = (payload) => ({
  type: ADD_CAMPAIGN_PHOTOS_FAILURE,
  payload,
});

const addCampaignPhotosAction = (photos, campaignId) => (dispatch) => {
  dispatch(addCampaignPhotosStart());

  //FormData
  let formData = new FormData();

  //set images form data
  for (const key of Object.keys(photos)) {
    formData.append("images", photos[key]);
  }
  formData.append("campaignId", campaignId);

  //Axios
  axios
    .post(`${url}/create`, formData, {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
      dispatch(addCampaignPhotosSuccess(response.data));
      dispatch(setMessage(response.data.message));
    })
    .catch((error) => {
      dispatch(addCampaignPhotosFailure(error));
      dispatch(setMessage(error.message));
    });
};

//get by campaign id
const getCampaignsPhotosByCampaignIdStart = () => ({
  type: GET_CAMPAIGN_PHOTOS_BY_CAMPAIGN_ID_START,
});

const getCampaignsPhotosByCampaignIdSuccess = (payload) => ({
  type: GET_CAMPAIGN_PHOTOS_BY_CAMPAIGN_ID_SUCCESS,
  payload,
});

const getCampaignsPhotosByCampaignIdFailure = (payload) => ({
  type: GET_CAMPAIGN_PHOTOS_BY_CAMPAIGN_ID_FAILURE,
  payload,
});

const getCampaignsPhotosByCampaignIdAction = (campaignId) => (dispatch) => {
  dispatch(getCampaignsPhotosByCampaignIdStart());
  axios
    .get(`${url}/findByCampaign?campaignId=${campaignId}`, {
      headers: authHeader(),
    })
    .then((response) => {
      dispatch(getCampaignsPhotosByCampaignIdSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getCampaignsPhotosByCampaignIdFailure(error));
    });
};

//delete all
const deleteAllCampaignsPhotosStart = () => ({
  type: DELETE_ALL_CMPS_PHOTOS_START,
});

const deleteAllCampaignsPhotosSuccess = (payload) => ({
  type: DELETE_ALL_CMPS_PHOTOS_SUCCESS,
});

const deleteAllCampaignsPhotosFailure = (payload) => ({
  type: DELETE_ALL_CMPS_PHOTOS_FAILURE,
  payload,
});

const deleteAllCampaignsPhotosAction = (campaignId) => (dispatch) => {
  dispatch(deleteAllCampaignsPhotosStart());
  axios
    .delete(`${url}/deleteAll/${campaignId}`, {
      headers: authHeader(),
    })
    .then((response) => {
      dispatch(deleteAllCampaignsPhotosSuccess(response.data));
      dispatch(setMessage(response.data.message));
    })
    .catch((error) => {
      dispatch(deleteAllCampaignsPhotosFailure(error));
      dispatch(setMessage(error.message));
    });
};

//delete
const deleteCampaignPhotoStart = () => ({
  type: DELETE_CAMPAIGN_PHOTO_START,
});

const deleteCampaignPhotoSuccess = (payload) => ({
  type: DELETE_CAMPAIGN_PHOTO_SUCCESS,
  payload,
});

const deleteCampaignPhotoFailure = (payload) => ({
  type: DELETE_CAMPAIGN_PHOTO_FAILURE,
  payload,
});

const deleteCampaignPhotoAction = (campaignPhotoId, imageUrl) => (dispatch) => {
  dispatch(deleteCampaignPhotoStart());
  axios
    .delete(`${url}/delete?id=${campaignPhotoId}&imageUrl=${imageUrl}`, {
      headers: authHeader(),
    })
    .then((response) => {
      dispatch(deleteCampaignPhotoSuccess(response.data));
    })
    .catch((error) => {
      dispatch(deleteCampaignPhotoFailure(error));
    });
};

export {
  addCampaignPhotosAction,
  getCampaignsPhotosByCampaignIdAction,
  deleteAllCampaignsPhotosAction,
  deleteCampaignPhotoAction,
};
