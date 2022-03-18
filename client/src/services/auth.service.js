import axios from "axios";
import API_URL from "./auth.url";

//Register
export const register = (fullName, email, password) => {
    return axios.post(`${API_URL}/signup`, {
        fullName, email, password
    });
}

//Login
const login = (email, password) => {
    return axios.post(`${API_URL}/signin`, {
        email,
        password
    }).then(response => {
        if (response.data.accessToken) {
            localStorage.setItem("manager", JSON.stringify(response.data));
        }
        return response.data;
    });

}

// //Logout
// const logout = () => {

// }




export default {
    register,
    login
}