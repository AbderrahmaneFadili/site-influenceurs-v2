import {
  ADD_LANGAUGE_START,
  ADD_LANGAUGE_FAILURE,
  ADD_LANGAUGE_SUCCESS,
  DELETE_LANGAUGE_FAILURE,
  DELETE_LANGAUGE_START,
  DELETE_LANGAUGE_SUCCESS,
  GET_ALL_LANGAUGE_FAILURE,
  GET_ALL_LANGAUGE_SUCCESS,
  GET_ALL_LANGAUGE_START,
  EDIT_LANGAUGE_FAILURE,
  EDIT_LANGAUGE_START,
  EDIT_LANGAUGE_SUCCESS,
  CLEAR_ERROR,
  CLEAR_MESSAGE,
} from "../constants/langauges.constants";
import axios from "axios";
import { url } from "../../api/langauges";
import authHeader from "../../services/auth-header";

//language actions creators
const addLangaugeStart = () => ({
  type: ADD_LANGAUGE_START,
});

const addLangaugeSuccess = (payload) => ({
  type: ADD_LANGAUGE_SUCCESS,
  payload,
});

const addLangaugeFailure = (payload) => ({
  type: ADD_LANGAUGE_FAILURE,
  payload,
});

//clear error
export const clearError = () => ({
  type: CLEAR_ERROR,
});
//clear error
export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

// add langage action
const addLangauge = (language) => (dispatch) => {
  dispatch(addLangaugeStart());
  axios
    .post(
      `${url}/add`,
      {
        title: language,
      },
      {
        headers: authHeader(),
      }
    )
    .then((data) => dispatch(addLangaugeSuccess(data)))
    .catch((error) => dispatch(addLangaugeFailure(error)));
};

export { addLangauge };
