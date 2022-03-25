import {
  GET_ALL_STUDY_LEVELS_START,
  GET_ALL_STUDY_LEVELS_SUCCESS,
  GET_ALL_STUDY_LEVELS_FAILURE,
  ADD_STUDY_LEVEL_START,
  FIND_STUDY_LEVEL_FAILURE,
  FIND_STUDY_LEVEL_SUCCESS,
  FIND_STUDY_LEVEL_START,
  EDIT_STUDY_LEVEL_START,
  EDIT_STUDY_LEVEL_SUCCESS,
  EDIT_STUDY_LEVEL_FAILURE,
  DELETE_STUDT_LEVEL_START,
  DELETE_STUDT_LEVEL_SUCCESS,
  DELETE_STUDT_LEVEL_FAILURE,
} from "../constants/studyLevel.constants.js";
import axios from "axios";
import { url } from "../../api/studyLevels";
import authHeader from "../../services/auth-header";
import { page, max_size } from "../../helpers/paginationsParams";
import { setMessage } from "./message.actions.js";
//get all actions
const getAllStudyLevelsStart = () => ({
  type: GET_ALL_STUDY_LEVELS_START,
});

const getAllStudyLevelsSuccess = (payload) => ({
  type: GET_ALL_STUDY_LEVELS_SUCCESS,
  payload,
});

const getAllStudyLevelsFailure = (payload) => ({
  type: GET_ALL_STUDY_LEVELS_FAILURE,
  payload,
});

const getAllStudyLevelsAction = (page, size) => (dispatch) => {
  dispatch(getAllStudyLevelsStart());
  axios({
    method: "get",
    url: `${url}/all?page=${page}&size=${size}`,
    headers: authHeader(),
  })
    .then((response) => {
      dispatch(getAllStudyLevelsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getAllStudyLevelsFailure());
    });
};

//add study level ations
const addStudyLevelStart = () => ({
  type: ADD_STUDY_LEVEL_START,
});

const addStudyLevelSuccess = (payload) => ({
  type: ADD_STUDY_LEVEL_START,
  payload,
});

const addStudyLevelFailure = (payload) => ({
  type: ADD_STUDY_LEVEL_START,
  payload,
});

const addStudyLevelAction = (studyLevel) => (dispatch) => {
  dispatch(addStudyLevelStart());
  return axios
    .post(
      `${url}/add`,
      {
        title: studyLevel,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      dispatch(addStudyLevelSuccess(response.data));
      dispatch(setMessage("un niveau d'étude est ajouté"));
      dispatch(getAllStudyLevelsAction(page, max_size));
      return Promise.resolve();
    })
    .catch((err) => {
      dispatch(addStudyLevelFailure(err));
      dispatch(setMessage(err.message));
      return Promise.reject();
    });
};

//find study level actions
const findStudyLevelStart = () => ({
  type: FIND_STUDY_LEVEL_START,
});

const findStudyLevelSuccess = (payload) => ({
  type: FIND_STUDY_LEVEL_SUCCESS,
  payload,
});

const findStudyLevelFailure = (payload) => ({
  type: FIND_STUDY_LEVEL_FAILURE,
  payload,
});

const findStudyLevelAction = (id) => (dispatch) => {
  dispatch(findStudyLevelStart());
  axios({
    method: "get",
    url: `${url}/find/${id}`,
    headers: authHeader(),
  })
    .then((response) => {
      dispatch(findStudyLevelSuccess(response.data));
    })
    .catch((error) => {
      dispatch(findStudyLevelFailure(error));
    });
};

//edit study level actions
const editStudyLevelStart = () => ({
  type: EDIT_STUDY_LEVEL_START,
});

const editStudyLevelSuccess = (payload) => ({
  type: EDIT_STUDY_LEVEL_SUCCESS,
  payload,
});

const editStudyLevelFailure = (payload) => ({
  type: EDIT_STUDY_LEVEL_FAILURE,
  payload,
});

const editStudyLevelAction = (studyLevel, id) => (dispatch) => {
  dispatch(editStudyLevelStart());
  axios
    .put(
      `${url}/edit/${id}`,
      {
        title: studyLevel,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      dispatch(editStudyLevelSuccess(response.data));
      dispatch(getAllStudyLevelsAction(page, max_size));
      dispatch(setMessage("un niveau d'étude est modifié"));
    })
    .catch((error) => {
      dispatch(editStudyLevelFailure(error));
      dispatch(setMessage(error.message));
    });
};

//delete
const deleteStudyLevelStart = () => ({
  type: DELETE_STUDT_LEVEL_START,
});

const deleteStudyLevelSuccess = () => ({
  type: DELETE_STUDT_LEVEL_SUCCESS,
});

const deleteStudyLevelFailure = () => ({
  type: DELETE_STUDT_LEVEL_FAILURE,
});

const deleteStudyLevelAction = (id) => (dispatch) => {
  dispatch(deleteStudyLevelStart());
  axios
    .delete(`${url}/delete/${id}`, {
      headers: authHeader(),
    })
    .then((response) => {
      dispatch(deleteStudyLevelSuccess(response.data));
    })
    .catch((error) => {
      dispatch(deleteStudyLevelFailure(error));
    });
};

export {
  getAllStudyLevelsAction,
  addStudyLevelAction,
  findStudyLevelAction,
  editStudyLevelAction,
  deleteStudyLevelAction,
};
