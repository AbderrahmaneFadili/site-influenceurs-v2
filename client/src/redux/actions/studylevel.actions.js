import {
  GET_ALL_STUDY_LEVELS_START,
  GET_ALL_STUDY_LEVELS_SUCCESS,
  GET_ALL_STUDY_LEVELS_FAILURE,
  ADD_STUDY_LEVEL_START,
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
      dispatch(addStudyLevelAction(err));
      dispatch(setMessage(err.message));
      return Promise.reject();
    });
};

export { getAllStudyLevelsAction, addStudyLevelAction };
