import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    SET_MESSAGE
} from "../constants/auth.constants";

import { authService } from "../../services/auth.service";

const register = (fullName, email, password) => dispatch => {
    return authService.register(fullName, email, password).then(response => {
        dispatch({
            type: REGISTER_SUCCESS,
        });

        dispatch({
            type: SET_MESSAGE,
            payload: response.data.message
        });

        return Promise.resolve();
    }).catch(error => {

        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();


        dispatch({
            type: REGISTER_FAIL
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message
        });

        return Promise.reject();
    });
}

export default {
    register
}