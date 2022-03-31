import axios from "axios";
import {
  ADD_CAMPAIGN_PHOTOS_START,
  ADD_CAMPAIGN_PHOTOS_SUCCESS,
  ADD_CAMPAIGN_PHOTOS_FAILURE,
} from "../constants/campaignPhotos.constants";
import { url } from "../../api/campaignPhotos";
import authHeader from "../../services/auth-header";
import { setMessage } from "./message.actions";

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

export { addCampaignPhotosAction };
