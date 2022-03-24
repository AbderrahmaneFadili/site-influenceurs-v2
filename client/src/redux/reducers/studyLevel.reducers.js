import {
  GET_ALL_STUDY_LEVELS_FAILURE,
  GET_ALL_STUDY_LEVELS_SUCCESS,
  GET_ALL_STUDY_LEVELS_START,
  ADD_STUDY_LEVEL_START,
  ADD_STUDY_LEVEL_SUCCESS,
  ADD_STUDY_LEVEL_FAILURE,
  FIND_STUDY_LEVEL_START,
  FIND_STUDY_LEVEL_FAILURE,
  FIND_STUDY_LEVEL_SUCCESS,
} from "../constants/studyLevel.constants";

const initialState = {
  loading: false,
  studyLevel: null,
  studyLevels: null,
};

const studyLevelReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //* all
    case GET_ALL_STUDY_LEVELS_START:
      return { ...state, loading: true, studyLevels: null };
    case GET_ALL_STUDY_LEVELS_SUCCESS:
      return { ...state, loading: false, studyLevels: payload };
    case GET_ALL_STUDY_LEVELS_FAILURE:
      return { ...state, loading: false, studyLevels: null };
    //* Add
    case ADD_STUDY_LEVEL_START:
      return {
        ...state,
        loading: true,
      };
    case ADD_STUDY_LEVEL_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_STUDY_LEVEL_FAILURE:
      return {
        ...state,
        loading: false,
      };
    //* Find
    case FIND_STUDY_LEVEL_START:
      return {
        ...state,
        loading: true,
        studyLevel: null,
      };
    case FIND_STUDY_LEVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        studyLevel: payload,
      };
    case FIND_STUDY_LEVEL_FAILURE:
      return {
        ...state,
        loading: false,
        studyLevel: null,
      };
    default:
      return state;
  }
};

export default studyLevelReducer;
