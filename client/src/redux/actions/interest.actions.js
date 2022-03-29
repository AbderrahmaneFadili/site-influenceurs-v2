import {
  GET_ALL_INTERESTS_FAILURE,
  GET_ALL_INTERESTS_SUCCESS,
  GET_ALL_INTERESTS_START,
  ADD_INTEREST_FAILURE,
  ADD_INTEREST_START,
  ADD_INTEREST_SUCCESS,
  FIND_INTEREST_FAILURE,
  FIND_INTEREST_START,
  FIND_INTEREST_SUCCESS,
  EDIT_INTEREST_FAILURE,
  EDIT_INTEREST_START,
  EDIT_INTEREST_SUCCESS,
  DELETE_INTEREST_FAILURE,
  DELETE_INTEREST_START,
  DELETE_INTEREST_SUCCESS,
  FIND_ALL_INTERESTS_START,
  FIND_ALL_INTERESTS_FAILURE,
  FIND_ALL_INTERESTS_SUCCESS,
} from "../constants/interest.constants";
import authHeaders from "../../services/auth-header";
import { url } from "../../api/interests";
import axios from "axios";
import { setMessage } from "./message.actions";
import { page, max_size } from "../../helpers/paginationsParams";

const getAllInterestsStart = () => ({
  type: GET_ALL_INTERESTS_START,
});

const getAllInterestsSuccess = (payload) => ({
  type: GET_ALL_INTERESTS_SUCCESS,
  payload,
});

const getAllInterestsFailure = (payload) => ({
  type: GET_ALL_INTERESTS_FAILURE,
  payload,
});

const getAllInterestsAction = (page, size) => (dispatch) => {
  dispatch(getAllInterestsStart());
  axios({
    method: "get",
    url: `${url}/all?page=${page}&size=${size}`,
    headers: authHeaders(),
  })
    .then((response) => {
      dispatch(getAllInterestsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getAllInterestsFailure());
    });
};

//add
const addInterestStart = () => ({
  type: ADD_INTEREST_START,
});

const addInterestSuccess = () => ({
  type: ADD_INTEREST_SUCCESS,
});

const addInterestFailure = () => ({
  type: ADD_INTEREST_FAILURE,
});

const addInterestAction = (interest) => (dispatch) => {
  dispatch(addInterestStart());
  axios
    .post(
      `${url}/add`,
      {
        title: interest,
      },
      {
        headers: authHeaders(),
      }
    )
    .then((response) => {
      dispatch(addInterestSuccess(response.data));
      dispatch(getAllInterestsAction(page, max_size));
      dispatch(setMessage("Un centre d'intérêt est ajoutée avec succés"));
    })
    .catch((error) => {
      dispatch(addInterestFailure(error));
      dispatch(setMessage(error.message));
    });
};

//find
const findInterestStart = () => ({
  type: FIND_INTEREST_START,
});

const findInterestSuccess = (payload) => ({
  type: FIND_INTEREST_SUCCESS,
  payload,
});

const findInterestFailure = (payload) => ({
  type: FIND_INTEREST_FAILURE,
  payload,
});

const findInterestAction = (id) => (dispatch) => {
  dispatch(findInterestStart());
  axios
    .get(`${url}/find/${id}`, {
      headers: authHeaders(),
    })
    .then((response) => {
      dispatch(findInterestSuccess(response.data));
    })
    .catch((error) => {
      dispatch(findInterestFailure(error));
    });
};

//edit
const editInterestStart = () => ({
  type: EDIT_INTEREST_START,
});

const editInterestSuccess = (payload) => ({
  type: EDIT_INTEREST_SUCCESS,
  payload,
});

const editInterestFailure = (payload) => ({
  type: EDIT_INTEREST_FAILURE,
  payload,
});

const editInterestAction = (interest, id) => (dispatch) => {
  dispatch(editInterestStart());
  axios
    .put(
      `${url}/edit/${id}`,
      {
        title: interest,
      },
      {
        headers: authHeaders(),
      }
    )
    .then((response) => {
      dispatch(editInterestSuccess(response.data));
      dispatch(getAllInterestsAction(page, max_size));
      dispatch(setMessage("le centre d'intérêt est modifié avec succés"));
    })
    .catch((error) => {
      dispatch(editInterestFailure(error));
      dispatch(setMessage(error.message));
    });
};

//delete
const deleteInterestStart = () => ({
  type: DELETE_INTEREST_START,
});

const deleteInterestSeccuss = (payload) => ({
  type: DELETE_INTEREST_SUCCESS,
  payload,
});

const deleteInterestFaiure = (payload) => ({
  type: DELETE_INTEREST_FAILURE,
  payload,
});

const deleteInterestAction = (id) => (dispatch) => {
  dispatch(deleteInterestStart());
  axios
    .delete(`${url}/delete/${id}`, {
      headers: authHeaders(),
    })
    .then((response) => {
      dispatch(deleteInterestSeccuss(response.data));
      dispatch(getAllInterestsAction(page, max_size));
    })
    .catch((error) => {
      dispatch(deleteInterestFaiure(error));
    });
};

//get all interests without pagination
const findAllInterestsStart = () => ({
  type: FIND_ALL_INTERESTS_START,
});

const findAllInterestsSuccess = (payload) => ({
  type: FIND_ALL_INTERESTS_SUCCESS,
  payload,
});

const findAllInterestsFailure = (payload) => ({
  type: FIND_ALL_INTERESTS_FAILURE,
  payload,
});

const findAllInterestAction = () => (dispatch) => {
  dispatch(findAllInterestsStart());
  axios
    .get(`${url}/findAll`, {
      headers: authHeaders(),
    })
    .then((response) => {
      dispatch(findAllInterestsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(findAllInterestsFailure(error));
    });
};

export {
  getAllInterestsAction,
  addInterestAction,
  findInterestAction,
  editInterestAction,
  deleteInterestAction,
  findAllInterestAction,
};
