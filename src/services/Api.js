import axios from 'axios';

const url_base = 'http://127.0.0.1:3000/api';

const api = axios.create({
    baseURL: url_base,
    timeout: 30000
});

// interceptores


const apiService = {
    get: (url, params) => api.get(url, {params}),
    post: (url, data) => api.post(url, data),
    put: (url, data) => api.put(url, data),
    delete: (url) => api.delete(url)
}

export default apiService;
