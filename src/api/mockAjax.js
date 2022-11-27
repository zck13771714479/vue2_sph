import axios from 'axios';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const requests = axios.create({
    baseURL: '/mock',
    timeout: 5000,
});

requests.interceptors.request.use((config) => {
    nprogress.start();
    return config;
});

requests.interceptors.response.use((response) => {
    nprogress.done();
    return response.data;
}, (error) => {
    return Promise.reject(new Error('fail'));
})

export default requests