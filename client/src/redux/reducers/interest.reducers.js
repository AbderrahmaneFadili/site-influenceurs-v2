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

const initialState = {
  loading: false,
  interest: null,
  interests: null,
};

const interestReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_INTERESTS_START:
      return {
        ...state,
        loading: true,
        interest: null,
        interests: null,
      };
    case GET_ALL_INTERESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        interest: null,
        interests: payload,
      };
    case GET_ALL_INTERESTS_FAILURE:
      return {
        ...state,
        loading: false,
        interest: null,
        interests: null,
      };
    default:
      return state;
  }
};

export default interestReducer;
