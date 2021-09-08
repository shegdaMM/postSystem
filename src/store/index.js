import { createStore } from 'vuex';

export default createStore({
  state: {
    id: '',
    loginID: '',
    loadProcess: false,
    usersIDMap: new Map()
  },
  mutations: {
    setLoginID (state, value) {
      state.loginID = value;
      state.id = value._id;
    },

    onloadProcess (state, bool) {
      state.loadProcess = bool;
    },
    setToUserIDMap (state, keyvalue) {
      if (keyvalue[0] && keyvalue[1]) {
       state.usersIDMap.set(keyvalue[0], keyvalue[1]);
      }
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getUserByID: (state) => (key) => {
      if (key && state.usersIDMap) {
        const name = state.usersIDMap.get(key);
        return name;
      }
    },
    getLoginId (state) {
      if (state.id) {
        return state.id;
      }
    },
    getAllUser (state) {
      return state.usersIDMap;
    }
  }
}
);
