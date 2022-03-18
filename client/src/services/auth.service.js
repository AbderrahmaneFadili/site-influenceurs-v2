import axios from "axios";
import API_URL from "./auth.url";

//Register
const register = (fullName, email, password) => {
    return axios.post(`${API_URL}/signup`, {
        fullName, email, password
    });
}

// //Login
// const login = () => {

// }

// //Logout
// const logout = () => {

// }


export default {
    register
}