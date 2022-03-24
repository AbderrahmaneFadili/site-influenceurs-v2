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
  error: null,
  message: "",
};

const languageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //* add
    case ADD_LANGUAGE_START:
      return {
        ...state,
        loading: true,
        message: "",
        error: "",
      };
    case ADD_LANGUAGE_SUCCESS:
      return { ...state, loading: false, message: "une langue est ajoutée" };
    case ADD_LANGUAGE_FAILURE:
      return { ...state, loading: false, message: "", error: payload.message };
    //* Edit
    case EDIT_LANGUAGE_START:
      return {
        ...state,
        loading: true,
        message: "",
        error: "",
      };
    case EDIT_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: "la langue est modifiée",
        error: "",
      };
    case EDIT_LANGUAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.message,
      };
    //* clear message & error
    case LANGUAGE_CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };
    case LANGUAGE_CLEAR_MESSAGE:
      return {
        ...state,
        message: "",
      };
    //* get all
    case GET_ALL_LANGUAGE_START:
      return {
        ...state,
        loading: true,
        languages: null,
        language: null,
      };
    case GET_ALL_LANGUAGE_FAILURE:
      return {
        ...state,
        language: null,
        languages: null,
        error: payload.message,
      };
    case GET_ALL_LANGUAGE_SUCCESS:
      return {
        ...state,
        language: null,
        languages: {
          data: payload.results,
          page: payload.page,
          size: payload.size,
        },
      };
    //* Find one
    case FIND_LANGUAGE_START:
      return {
        ...state,
        language: null,
        error: "",
        message: "",
      };
    case FIND_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        language: payload,
        error: "",
      };
    case FIND_LANGUAGE_FAILURE:
      return {
        ...state,
        language: null,
        loading: null,
        error: payload.message,
      };
    //* delete language
    case DELETE_LANGUAGE_START:
      return {
        ...state,
        language: null,
        loading: false,
        message: "",
        error: null,
      };
    case DELETE_LANGUAGE_SUCCESS:
      return {
        ...state,
        language: null,
        loading: false,
        message: payload,
        error: "",
      };
    case DELETE_LANGUAGE_FAILURE:
      return {
        ...state,
        language: null,
        loading: null,
        message: "",
        error: payload,
      };
    default:
      return state;
  }
};

export default languageReducer;
