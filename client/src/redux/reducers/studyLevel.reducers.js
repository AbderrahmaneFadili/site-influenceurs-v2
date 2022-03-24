import {
  GET_ALL_STUDY_LEVELS_FAILURE,
  GET_ALL_STUDY_LEVELS_SUCCESS,
  GET_ALL_STUDY_LEVELS_START,
} from "../constants/studyLevel.constants";

const initialState = {
  loading: false,
  studyLevel: null,
  studyLevels: null,
  message: null,
  error: null,
};

const studyLevelReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_STUDY_LEVELS_START:
      return { ...state, loading: true, studyLevels: null, error: null };
    case GET_ALL_STUDY_LEVELS_SUCCESS:
      return { ...state, loading: false, studyLevels: payload, error: null };
    case GET_ALL_STUDY_LEVELS_FAILURE:
      return { ...state, loading: false, studyLevels: null, error: payload };
    default:
      return state;
  }
};

export default studyLevelReducer;
