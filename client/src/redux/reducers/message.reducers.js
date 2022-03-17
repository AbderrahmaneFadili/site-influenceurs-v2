import { SET_MESSAGE, CLEAR_MESSAGE } from "../constants/auth.constants";

const initialState = {
    message: "",
};

//message reducer
const messageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_MESSAGE:
            return { ...state, message: payload }
        case CLEAR_MESSAGE:
            return { ...state, message: "" }
        default:
            return state;
    }
}

export default messageReducer;