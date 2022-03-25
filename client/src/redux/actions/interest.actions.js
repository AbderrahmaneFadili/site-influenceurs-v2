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
} from "../constants/interest.constnats";
import authHeaders from "../../services/auth-header";
import { url } from "../../api/interests";
import axios from "axios";

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

export { getAllInterestsAction };
