import axios from 'axios'
import router from "@/router";

// packaging axios

const request = axios.create({
    baseURL: '/api',
    timeout: 5000
})

// request Interceptor
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    let username = localStorage.getItem("username");
    if (!username) {
        router.push("/login");
    }

    return config
}, error => {
    return Promise.reject(error)
});

// response Interceptor
request.interceptors.response.use(
    response => {
        let res = response.data;
        // if return file
        if (response.config.responseType === 'blob') {
            return res
        }
        // if return string
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request

