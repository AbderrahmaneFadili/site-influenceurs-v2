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
  FIND_ALL_CLIENTS_FAILURE,
  FIND_ALL_CLIENTS_SUCCESS,
} from "../constants/client.constants";

const initialState = {
  loading: false,
  client: null,
  clients: null,
  clientsList: null,
  error: null,
};

const clientReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    //* Get all CLients
    case GET_ALL_CLIENTS_START:
      return {
        ...state,
        loading: true,
        clients: null,
      };
    case GET_ALL_CLIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        clients: payload,
      };
    case GET_ALL_CLIENTS_FAILURE:
      return {
        ...state,
        loading: false,
        clients: null,
      };
    //* Add Client
    case ADD_CLIENT_START:
      return {
        ...state,
        loading: true,
      };
    case ADD_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_CLIENT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    //* Find CLient
    case FIND_CLIENT_START:
      return {
        ...state,
        loading: true,
        client: null,
      };
    case FIND_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        client: payload,
      };
    case FIND_CLIENT_FAILURE:
      return {
        ...state,
        loading: false,
        client: null,
      };
    //* Edit
    case EDIT_CLIENT_START:
      return {
        ...state,
        loading: true,
      };
    case EDIT_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case EDIT_CLIENT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    //* Delete
    case DELETE_CLIENT_START:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_CLIENT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    // Find All
    case FIND_ALL_CLIENTS_START:
      return {
        ...state,
        loading: true,
        clientsList: null,
      };
    case FIND_ALL_CLIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        clientsList: payload,
      };
    case FIND_ALL_CLIENTS_FAILURE:
      return {
        ...state,
        loading: false,
        clientsList: null,
      };
    default:
      return state;
  }
};

export default clientReducer;
