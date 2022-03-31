import {
  ADD_CAMPAIGN_PHOTOS_START,
  ADD_CAMPAIGN_PHOTOS_SUCCESS,
  ADD_CAMPAIGN_PHOTOS_FAILURE,
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
    default:
      return state;
  }
};

export default campaignPhotosReducer;
