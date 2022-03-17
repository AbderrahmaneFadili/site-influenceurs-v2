import {
    SET_MESSAGE,
    CLEAR_MESSAGE
} from "../constants/auth.constants";

//set message action creator
const setMessage = (message) => {
    return {
        payload: message,
        type: SET_MESSAGE
    }
}

//clear message action creator
const clearMessage = () => {
    return {
        type: CLEAR_MESSAGE
    }
}

export {
    setMessage,
    clearMessage
}