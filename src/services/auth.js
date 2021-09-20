import axios from 'axios';
import store from '../store';
import router from '../router/index.js';

// const API_URL = process.env.VUE_APP_URL;

export default function axiosSetUp () {
    // axios.defaults.baseURL = API_URL;
    axios.interceptors.request.use(
      function (config) {
        const token = store.state.auth.access_token;
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`
          };
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    // Add a response interceptor
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        // Do something with response error
        const originalRequest = error.config;
        if (error.response.status === 401 || error.response.status === 403) {
          store.commit('clearUserData');
          router.push('/login');
          return Promise.reject(error);
        } else if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          return axios(originalRequest);
        }
        return Promise.reject(error);
      }
    );
  }
