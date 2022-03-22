import {
  ADD_LANGAUGE_START,
  ADD_LANGAUGE_FAILURE,
  ADD_LANGAUGE_SUCCESS,
  DELETE_LANGAUGE_FAILURE,
  DELETE_LANGAUGE_START,
  DELETE_LANGAUGE_SUCCESS,
  GET_ALL_LANGAUGE_FAILURE,
  GET_ALL_LANGAUGE_SUCCESS,
  GET_ALL_LANGAUGE_START,
  EDIT_LANGAUGE_FAILURE,
  EDIT_LANGAUGE_START,
  EDIT_LANGAUGE_SUCCESS,
  CLEAR_ERROR,
  CLEAR_MESSAGE,
} from "../constants/langauges.constants";

const initialState = {
  loading: false,
  languages: null,
  error: null,
  message: "",
};

const langaugeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_LANGAUGE_START:
      return {
        ...state,
        loading: true,
      };
    case ADD_LANGAUGE_SUCCESS:
      return { ...state, loading: false, message: "une langue est ajoutée" };
    case ADD_LANGAUGE_FAILURE:
      return { ...state, loading: false, message: "", error: payload.message };
    case CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: "",
      };
    default:
      return state;
  }
};

export default langaugeReducer;
