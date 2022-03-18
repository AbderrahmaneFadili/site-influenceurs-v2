import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    SET_MESSAGE,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from "../constants/auth.constants";

import authService from "../../services/auth.service";


const register = (fullName, email, password) => dispatch => {
    return authService.register(fullName, email, password).then(response => {
        const { message } = response.data;
        dispatch({
            type: REGISTER_SUCCESS,
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message
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
            type: REGISTER_FAIL,
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    });
}

const login = (email, password) => dispatch => {
    return authService.login(email, password)
        .then(data => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            });
            return Promise.resolve();
        })
        .catch(error => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message
            });
            return new Promise.reject();
        });
}


export default {
    register,
    login
}