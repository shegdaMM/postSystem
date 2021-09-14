import { createStore } from 'vuex';
// import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
// import router from '../router/index';
// import axios from 'axios';
import users from './users.js';
import auth from './auth.js';

// const API_URL = process.env.VUE_APP_URL;

export default createStore({
  plugins: [createPersistedState({ paths: ['auth'] })],
  // namespaced: true,
  state: {
    qAlert: null,
    // for loader component
    loadProcess: false,
    // userId : userName
    usersIDMap: new Map()
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
    }
  },
  actions: {
  },
  modules: {
    users, auth
  }
});
