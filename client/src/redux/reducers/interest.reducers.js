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

const initialState = {
  loading: false,
  interest: null,
  interests: null,
  interestsList: null,
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
    //* add
    case ADD_INTEREST_START:
      return { ...state, loading: true };
    case ADD_INTEREST_SUCCESS:
      return { ...state, loading: false };
    case ADD_INTEREST_FAILURE:
      return { ...state, loading: false };
    //* find
    case FIND_INTEREST_START:
      return {
        ...state,
        loading: true,
        interest: null,
      };
    case FIND_INTEREST_SUCCESS:
      return {
        ...state,
        loading: false,
        interest: payload,
      };
    case FIND_INTEREST_FAILURE:
      return {
        ...state,
        loading: false,
        interest: null,
      };
    //* delete
    case DELETE_INTEREST_START:
      return { ...state, loading: true };
    case DELETE_INTEREST_SUCCESS:
      return { ...state, loading: false };
    case DELETE_INTEREST_FAILURE:
      return { ...state, loading: false };
    //edit
    case EDIT_INTEREST_START:
      return { ...state, loading: true };
    case EDIT_INTEREST_SUCCESS:
      return { ...state, loading: false };
    case EDIT_INTEREST_FAILURE:
      return { ...state, loading: false };
    //find all (without pagination)
    case FIND_ALL_INTERESTS_START:
      return {
        ...state,
        loading: true,
        interestsList: null,
      };
    case FIND_ALL_INTERESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        interestsList: payload,
      };
    case FIND_ALL_INTERESTS_FAILURE:
      return {
        ...state,
        loading: false,
        interestsList: null,
      };
    default:
      return state;
  }
};

export default interestReducer;
