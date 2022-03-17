import axios from "axios";
import authHeader from "./auth-header";
import API_URL from "./auth.url";

const getMe = () => {
    return axios.get(`${API_URL}/me`, {
        headers: authHeader()
    });
}

export {
    getMe
};