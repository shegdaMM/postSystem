import { createStore } from 'vuex';
// import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
import router from '../router/index';
import axios from 'axios';
import api from '../services/auth.js';
import users from './users.js';

const API_URL = process.env.VUE_APP_URL;

export default createStore({
  // { paths: ['Auth'] }
  plugins: [createPersistedState()],
  namespaced: true,
  state: {
    qAlert: null,
    // for loader component
    loadProcess: false,
    // userId : userName
    usersIDMap: new Map(),
    // for auth
    access_token: localStorage.getItem('token') || '',
    loggedInUser: {},
    isAuthenticated: false
  },
  getters: {
    qalert (state) {
      return state.qAlert;
    },
    loadProcess (state) {
      // $q.notify('Some other message');
      return state.loadProcess;
    },
    // set userid to map
    getUserByID: (state) => (key) => {
      if (key && state.usersIDMap) {
        const name = state.usersIDMap.get(key);
        return name;
      }
    },
    getAllUser (state) {
      return state.usersIDMap;
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
    setAlert (state, qAlert) {
      state.qAlert = qAlert;
    },
    // for loader component
    onloadProcess (state) {
        state.loadProcess = !state.loadProcess;
    },
    // set userid to map
    setToUserIDMap (state, keyvalue) {
      if (keyvalue[0] && keyvalue[1]) {
       state.usersIDMap.set(keyvalue[0], keyvalue[1]);
      }
    },
    // for auth
    setAccessToken (state, accessToken) {
      state.access_token = accessToken;
      state.qAlert.open({
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
      state.qAlert.open({
        message: 'You are unauthorized!',
        type: 'info',
        duration: 5000
      });
    },
    errorMessage (state, message) {
      state.qAlert.open({
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
        const err = JSON.parse(error.request.response);
        if (Array.isArray(err.error)) {
          for (let i = 0; i < err.error.length; i++) {
            const el = err.error[i];
            commit('errorMessage', el.message);
          }
        } else {
            commit('errorMessage', err.error);
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
      commit('errorMessage', 'Log out is finished');
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
        commit('errorMessage', e.error);
      }
    }
  },
  modules: {
    users
  }
});
