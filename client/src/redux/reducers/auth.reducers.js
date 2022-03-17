import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../constants/auth.constants";

const manager = JSON.parse(localStorage.getItem('manager'));

const initialState = manager ? {
    isLoggedIn: true, manager
} : {
    isLoggedIn: false, manager: null
};


const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            }
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            }
        default:
            return state;
    }
}

export default authReducer;