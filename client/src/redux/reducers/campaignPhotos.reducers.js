import {
  ADD_CAMPAIGN_PHOTOS_START,
  ADD_CAMPAIGN_PHOTOS_SUCCESS,
  ADD_CAMPAIGN_PHOTOS_FAILURE,
  GET_CAMPAIGN_PHOTOS_BY_CAMPAIGN_ID_FAILURE,
  GET_CAMPAIGN_PHOTOS_BY_CAMPAIGN_ID_START,
  GET_CAMPAIGN_PHOTOS_BY_CAMPAIGN_ID_SUCCESS,
} from "../constants/campaignPhotos.constants";

const initialState = {
  loading: false,
  campaignsPhotos: null,
  error: null,
  createdGallery: null,
};

const campaignPhotosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //Add Campaign photos
    case ADD_CAMPAIGN_PHOTOS_START:
      return {
        ...state,
        loading: true,
      };
    case ADD_CAMPAIGN_PHOTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        createdGallery: payload,
      };
    case ADD_CAMPAIGN_PHOTOS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    // Get Campaign photos id
    case GET_CAMPAIGN_PHOTOS_BY_CAMPAIGN_ID_START:
      return {
        ...state,
        loading: true,
        campaignsPhotos: null,
      };
    case GET_CAMPAIGN_PHOTOS_BY_CAMPAIGN_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        campaignsPhotos: payload,
      };
    case GET_CAMPAIGN_PHOTOS_BY_CAMPAIGN_ID_FAILURE:
      return {
        ...state,
        loading: false,
        campaignsPhotos: null,
      };
    default:
      return state;
  }
};

export default campaignPhotosReducer;
