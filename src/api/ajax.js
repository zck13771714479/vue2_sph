import axios from 'axios';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const requests = axios.create({
    baseURL: '/api',
    timeout: 5000,
});

requests.interceptors.request.use((config) => {
    nprogress.start();
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    return config;
});

requests.interceptors.response.use((response) => {
    nprogress.done();
    return response.data;
}, (error) => {
    return Promise.reject(new Error('fail'));
})

export default requests