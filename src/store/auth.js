import router from '../router/index';
import axios from 'axios';
import api from '../services/auth.js';
const API_URL = process.env.VUE_APP_URL;

export default {
    state: {
        authAlert: null,
        // for auth
        access_token: localStorage.getItem('token') || '',
        loggedInUser: {},
        isAuthenticated: false
    },
    getters: {
        authAlert (state) {
          return state.authAlert;
        },
        // for auth
        access_token (state) {
          return state.access_token;
        },
        isAuthenticated (state) {
          return state.isAuthenticated;
        },
        loggedInUser (state) {
          return state.loggedInUser;
        }
    },
    mutations: {
        setAuthAlert (state, authAlert) {
          state.authAlert = authAlert;
        },
        // for auth
        setAccessToken (state, accessToken) {
        state.access_token = accessToken;
        state.authAlert.open({
          message: 'You are autorizeited!',
          type: 'info',
          duration: 5000
        });
        },
        setLoggedInUser (state, user) {
            state.loggedInUser = user;
            state.isAuthenticated = true;
        },
        clearUserData (state) {
            state.access_token = '';
            state.loggedInUser = {};
            state.isAuthenticated = false;
            state.authAlert.open({
            message: 'You are unauthorized!',
            type: 'info',
            duration: 5000
            });
        },
        AuthErrorMessage (state, message) {
            state.authAlert.open({
            message: message,
            type: 'error',
            duration: 5000
            });
        }
    },
    actions: {
        logIn: async ({ commit, dispatch }, payload) => {
          commit('onloadProcess');
          const Url = `${API_URL}/auth`;
          try {
            await axios.post(Url, payload).then(response => {
              if (response.status === 200) {
                commit('setAccessToken', response.data.token);
                localStorage.setItem('token', response.data.token);
                dispatch('fetchUser');
                api();
                router.push({ path: '/' });
              }
            });
          } catch (error) {
            console.log(error);
            const err = JSON.parse(error.request.response);
            if (Array.isArray(err.error)) {
              for (let i = 0; i < err.error.length; i++) {
                const el = err.error[i];
                commit('AuthErrorMessage', el.message);
              }
            } else {
                commit('AuthErrorMessage', err.error);
              }
            }
          commit('onloadProcess');
        },
        logOut: async ({ commit, dispatch }) => {
          commit('clearUserData');
          localStorage.setItem('token', '');
          // eslint-disable-next-line dot-notation
          delete axios.defaults.headers.common['Authorization'];
          api();
          commit('AuthErrorMessage', 'Log out is finished');
          router.push({ path: '/' });
        },
        fetchUser: async ({ commit }) => {
          const Url = `${API_URL}/auth/user`;
          try {
            await axios.get(Url).then(response => {
              if (response.status === 200) {
                commit('setLoggedInUser', response.data);
              }
            });
          } catch (e) {
            // error
            commit('AuthErrorMessage', e.error);
          }
        }
      }
};
