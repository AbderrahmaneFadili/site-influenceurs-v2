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
  FIND_ALL_CLIENTS_START,
  FIND_ALL_CLIENTS_SUCCESS,
  FIND_ALL_CLIENTS_FAILURE,
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

//find
const findClientStart = () => ({
  type: FIND_CLIENT_START,
});

const findClientSuccess = (payload) => ({
  type: FIND_CLIENT_SUCCESS,
  payload,
});

const findClientFailure = (payload) => ({
  type: FIND_CLIENT_FAILURE,
  payload,
});

const findClientAction = (id) => (dispatch) => {
  dispatch(findClientStart());
  axios
    .get(`${url}/find/${id}`, {
      headers: authHeader(),
    })
    .then((response) => {
      dispatch(findClientSuccess(response.data));
    })
    .catch((error) => {
      dispatch(findClientFailure(error));
    });
};

//edit actios
const editClientStart = () => ({
  type: EDIT_CLIENT_START,
});

const editClientSuccess = (payload) => ({
  type: EDIT_CLIENT_SUCCESS,
  payload,
});

const editClientFailure = (payload) => ({
  type: EDIT_CLIENT_FAILURE,
  payload,
});

const editClientAction = (client, id) => (dispatch) => {
  dispatch(editClientStart());
  axios
    .put(
      `${url}/edit/${id}`,
      {
        companyName: client.companyName,
        country: client.country,
        city: client.city,
        street: client.street,
        directorName: client.directorName,
        tel: client.tel,
        email: client.email,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      dispatch(editClientSuccess(response.data));
      dispatch(getAllClientsAction(page, max_size));
      dispatch(setMessage("Le client est modifié avec succès"));
    })
    .catch((error) => {
      dispatch(editClientFailure(error));
      dispatch(setMessage(error.message));
    });
};

//* Delete action
const deleteClientStart = () => ({
  type: DELETE_CLIENT_START,
});

const deleteClientSuccess = (payload) => ({
  type: DELETE_CLIENT_SUCCESS,
  payload,
});

const deleteClientFailure = (payload) => ({
  type: DELETE_CLIENT_FAILURE,
  payload,
});

const deleteClientAction = (id) => (dispatch) => {
  dispatch(deleteClientStart());
  axios
    .delete(`${url}/delete/${id}`, {
      headers: authHeader(),
    })
    .then((response) => {
      dispatch(deleteClientSuccess(response.data));
      dispatch(getAllClientsAction(page, max_size));
    })
    .catch((error) => {
      dispatch(deleteClientFailure(error));
    });
};

//Find all clients without pagination
const findAllClientsStart = () => ({
  type: FIND_ALL_CLIENTS_START,
});

const findAllClientsSuccess = (payload) => ({
  type: FIND_ALL_CLIENTS_SUCCESS,
  payload,
});

const findAllClientsFailure = (payload) => ({
  type: FIND_ALL_CLIENTS_FAILURE,
  payload,
});

const findAllClientsAction = () => (dispatch) => {
  dispatch(findAllClientsStart());
  axios
    .get(`${url}/findAll`, {
      headers: authHeader(),
    })
    .then((response) => {
      dispatch(findAllClientsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(findAllClientsFailure(error));
    });
};

export {
  getAllClientsAction,
  addClientAction,
  findClientAction,
  editClientAction,
  deleteClientAction,
  findAllClientsAction,
};
