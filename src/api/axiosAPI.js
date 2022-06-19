import axios from "axios";

const axiosAPI = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: {
        'Content-Type' : 'application/json;charset=UTF-8'
    }
});

// api.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';

export default axiosAPI;