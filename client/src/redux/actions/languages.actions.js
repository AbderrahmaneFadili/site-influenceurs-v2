import {
  ADD_LANGUAGE_START,
  ADD_LANGUAGE_FAILURE,
  ADD_LANGUAGE_SUCCESS,
  FIND_LANGUAGE_SUCCESS,
  FIND_LANGUAGE_FAILURE,
  DELETE_LANGUAGE_FAILURE,
  DELETE_LANGUAGE_START,
  DELETE_LANGUAGE_SUCCESS,
  GET_ALL_LANGUAGE_FAILURE,
  GET_ALL_LANGUAGE_SUCCESS,
  GET_ALL_LANGUAGE_START,
  EDIT_LANGUAGE_FAILURE,
  EDIT_LANGUAGE_START,
  EDIT_LANGUAGE_SUCCESS,
  LANGUAGE_CLEAR_ERROR,
  LANGUAGE_CLEAR_MESSAGE,
  FIND_LANGUAGE_START,
} from "../constants/languages.constants";
import axios from "axios";
import { url } from "../../api/languages";
import authHeader from "../../services/auth-header";

//language actions creators
const addlanguageStart = () => ({
  type: ADD_LANGUAGE_START,
});

const addlanguageSuccess = (payload) => ({
  type: ADD_LANGUAGE_SUCCESS,
  payload,
});

const addlanguageFailure = (payload) => ({
  type: ADD_LANGUAGE_FAILURE,
  payload,
});

// add langage action
const addlanguageAction = (language) => (dispatch) => {
  dispatch(addlanguageStart());
  return axios
    .post(
      `${url}/add`,
      {
        title: language,
      },
      {
        headers: authHeader(),
      }
    )
    .then((data) => {
      dispatch(addlanguageSuccess(data));
    })
    .catch((error) => {
      dispatch(addlanguageFailure(error));
    });
};

const editLanguageStart = (payload) => ({
  type: EDIT_LANGUAGE_START,
});

const editLanguageSuccess = (payload) => ({
  type: EDIT_LANGUAGE_SUCCESS,
  payload,
});

const editLanguageFailure = (payload) => ({
  type: EDIT_LANGUAGE_FAILURE,
  payload,
});

//edit action
const editLanguageAction = (language, id) => (dispatch) => {
  dispatch(editLanguageStart());
  console.log(`${url}/edit/${id}`);
  return axios
    .put(
      `${url}/edit/${id}`,
      {
        title: language,
      },
      {
        headers: authHeader(),
      }
    )
    .then((data) => {
      dispatch(editLanguageSuccess(data));
      return Promise.resolve();
    })
    .catch((error) => {
      dispatch(editLanguageFailure(error));
      return Promise.reject();
    });
};

//find action
const findLanguageStart = () => ({
  type: FIND_LANGUAGE_START,
});

const findLanguageSuccess = (payload) => ({
  type: FIND_LANGUAGE_SUCCESS,
  payload,
});

const findLanguageFailure = (payload) => ({
  type: FIND_LANGUAGE_FAILURE,
  payload,
});

const findLanguageAction = (id) => (dispatch) => {
  dispatch(findLanguageStart());
  axios({
    method: "get",
    url: `${url}/find/${id}`,
    headers: authHeader(),
  })
    .then((response) => {
      dispatch(findLanguageSuccess(response.data));
    })
    .catch((error) => {
      dispatch(findLanguageFailure(error));
    });
};

//get all languages actions creators
const getAlllanguagesStart = () => ({
  type: GET_ALL_LANGUAGE_START,
});

const getAlllanguagesSuccess = (payload) => ({
  type: GET_ALL_LANGUAGE_SUCCESS,
  payload,
});

const getAlllanguagesFailure = (payload) => ({
  type: GET_ALL_LANGUAGE_FAILURE,
  payload,
});

//get all languages
const getAlllanguagesAction = (page, size) => (dispatch) => {
  dispatch(getAlllanguagesStart());
  axios({
    method: "get",
    url: `${url}/all?page=${page}&size=${size}`,
    headers: authHeader(),
  })
    .then((results) =>
      dispatch(getAlllanguagesSuccess({ results: results.data, page, size }))
    )
    .catch((error) => dispatch(getAlllanguagesFailure(error)));
};

//clear error
export const clearError = () => ({
  type: LANGUAGE_CLEAR_ERROR,
});
//clear error
export const clearMessage = () => ({
  type: LANGUAGE_CLEAR_MESSAGE,
});

//delete languages
const deleteLanguageStart = () => ({
  type: DELETE_LANGUAGE_START,
});

const deleteLanguageSuccess = (payload) => ({
  type: DELETE_LANGUAGE_SUCCESS,
  payload,
});

const deleteLanguageFailure = (payload) => ({
  type: DELETE_LANGUAGE_FAILURE,
  payload,
});

const deleteLanguageAction = (id) => (dispatch) => {
  dispatch(deleteLanguageStart());
  console.log(`${url}/delete/${id}`);
  return axios
    .delete(`${url}/delete/${id}`, {
      headers: authHeader(),
    })
    .then((response) => {
      dispatch(deleteLanguageSuccess(response.data));
      return Promise.resolve();
    })
    .catch((error) => {
      dispatch(deleteLanguageFailure(error));
      return Promise.reject();
    });
};

export {
  addlanguageAction,
  editLanguageAction,
  getAlllanguagesAction,
  findLanguageAction,
  deleteLanguageAction,
};
