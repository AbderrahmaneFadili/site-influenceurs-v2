import axios from "axios";
import { url } from "../../api/clients";
import { max_size, page } from "../../helpers/paginationsParams";
import authHeader from "../../services/auth-header";
import {
  GET_ALL_CLIENTS_FAILURE,
  GET_ALL_CLIENTS_SUCCESS,
  GET_ALL_CLIENTS_START,
  ADD_CLIENT_FAILURE,
  ADD_CLIENT_START,
  ADD_CLIENT_SUCCESS,
  FIND_CLIENT_FAILURE,
  FIND_CLIENT_START,
  FIND_CLIENT_SUCCESS,
  EDIT_CLIENT_FAILURE,
  EDIT_CLIENT_START,
  EDIT_CLIENT_SUCCESS,
  DELETE_CLIENT_FAILURE,
  DELETE_CLIENT_START,
  DELETE_CLIENT_SUCCESS,
} from "../constants/client.constants";
import { setMessage } from "./message.actions";

//All
const getAllCLientsStart = () => ({
  type: GET_ALL_CLIENTS_START,
});

const getAllCLientsSuccess = (payload) => ({
  type: GET_ALL_CLIENTS_SUCCESS,
  payload,
});

const getAllCLientsFailure = (payload) => ({
  type: GET_ALL_CLIENTS_FAILURE,
  payload,
});

const getAllClientsAction = (page, size) => (dispatch) => {
  dispatch(getAllCLientsStart());
  axios({
    method: "GET",
    url: `${url}/all?page=${page}&size=${size}`,
    headers: authHeader(),
  })
    .then((response) => {
      dispatch(getAllCLientsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getAllCLientsFailure(error));
    });
};

//add
const addClientStart = () => ({
  type: ADD_CLIENT_START,
});

const addClientSuccess = (payload) => ({
  type: ADD_CLIENT_SUCCESS,
  payload,
});

const addClientFailure = (payload) => ({
  type: ADD_CLIENT_FAILURE,
  payload,
});

const addClientAction =
  (companyName, country, city, street, directorName, tel, email) =>
  (dispatch) => {
    dispatch(addClientStart());
    axios
      .post(
        `${url}/add`,
        {
          companyName,
          country,
          city,
          street,
          directorName,
          tel,
          email,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        dispatch(addClientSuccess(response.data));
        dispatch(getAllClientsAction(page, max_size));
        dispatch(setMessage("Un client est ajouté avec succès"));
      })
      .catch((error) => {
        dispatch(addClientFailure(error));
        dispatch(setMessage(error.message));
      });
  };

export { getAllClientsAction, addClientAction };