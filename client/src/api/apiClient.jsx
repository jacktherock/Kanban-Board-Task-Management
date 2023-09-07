import axios from "axios";

// const BASE_URL = "http://127.0.0.1:9000/api/"
// const BASE_URL = "https://task-management-backend-en5o.onrender.com/api/"
const BASE_URL = "http://13.126.115.45/api/"

const axiosClient = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
};

export default axiosClient;