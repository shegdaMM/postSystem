import { createStore } from 'vuex';
// import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
// import router from '../router/index';
// import axios from 'axios';
import users from './users.js';
import auth from './auth.js';
import posts from './posts.js';
import comments from './comments.js';

// const API_URL = process.env.VUE_APP_URL;

export default createStore({
  plugins: [createPersistedState({ paths: ['auth'] })],
  // namespaced: true,
  state: {
    loadProcess: false
  },
  getters: {
    loadProcess (state) {
      return state.loadProcess;
    }
  },
  mutations: {
    setAlert (state, qAlert) {
      state.qAlert = qAlert;
    },
    // for loader component
    onloadProcess (state) {
      state.loadProcess = !state.loadProcess;
    }
  },
  actions: {
  },
  modules: {
    users, auth, posts, comments
  }
});
