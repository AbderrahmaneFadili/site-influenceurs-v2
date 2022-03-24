import {
  ADD_LANGUAGE_START,
  ADD_LANGUAGE_FAILURE,
  ADD_LANGUAGE_SUCCESS,
  FIND_LANGUAGE_FAILURE,
  FIND_LANGUAGE_SUCCESS,
  FIND_LANGUAGE_START,
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
} from "../constants/languages.constants";

const initialState = {
  loading: false,
  languages: null,
  language: null,
};

const languageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //* add
    case ADD_LANGUAGE_START:
      return {
        ...state,
        loading: true,
      };
    case ADD_LANGUAGE_SUCCESS:
      return { ...state, loading: false };
    case ADD_LANGUAGE_FAILURE:
      return { ...state, loading: false };
    //* Edit
    case EDIT_LANGUAGE_START:
      return {
        ...state,
        loading: true,
      };
    case EDIT_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case EDIT_LANGUAGE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    //* get all
    case GET_ALL_LANGUAGE_START:
      return {
        ...state,
        loading: false,
        languages: null,
        language: null,
      };
    case GET_ALL_LANGUAGE_FAILURE:
      return {
        ...state,
        loading: false,
        language: null,
        languages: null,
      };
    case GET_ALL_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        language: null,
        languages: payload,
      };
    //* Find one
    case FIND_LANGUAGE_START:
      return {
        ...state,
        loading: false,
        language: null,
      };
    case FIND_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        language: payload,
      };
    case FIND_LANGUAGE_FAILURE:
      return {
        ...state,
        language: null,
        loading: null,
      };
    //* delete language
    case DELETE_LANGUAGE_START:
      return {
        ...state,
        language: null,
        loading: false,
      };
    case DELETE_LANGUAGE_SUCCESS:
      return {
        ...state,
        language: null,
        loading: false,
      };
    case DELETE_LANGUAGE_FAILURE:
      return {
        ...state,
        language: null,
        loading: null,
      };
    default:
      return state;
  }
};

export default languageReducer;
