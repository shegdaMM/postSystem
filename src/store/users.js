import router from '../router/index';
import axios from 'axios';
const API_URL = process.env.VUE_APP_URL;
// eslint-disable-next-line no-unused-vars
const IMG_URL = process.env.VUE_APP_IMG_URL;
export default {
    state: {
        userAlert: null,
        currentUser: null,
        usersListSize: 0,
        currentUserList: []
    },
    getters: {
        userAlert (state) {
            return state.userAlert;
          },
        currentUser (state) {
            return state.currentUser;
        },
        usersListSize (state) {
            return state.usersListSize;
        },
        currentUserList (state) {
            return state.currentUserList;
        }
    },
    mutations: {
        setUserAlert (state, userAlert) {
            state.userAlert = userAlert;
        },
        errorMessage (state, message) {
            state.userAlert.open({
              message: message,
              type: 'error',
              duration: 5000
            });
        },
        GoodMessage (state, message) {
            state.userAlert.open({
              message: message,
              type: 'success',
              duration: 5000
            });
        },
        setUserById (state, user) {
            if (user) {
                state.currentUser = user;
            }
        },
        deleteUserById (state) {
                // remove with map...
                state.currentUser = null;
        },
        updateCurrentUser (state, user) {
            if (user) {
                state.currentUser = user;
            }
        },
        setUsersListSize (state, count) {
            if (count) {
                state.usersListSize = count;
            }
        },
        setCurrentUsersList (state, list) {
            if (list) {
                state.currentUserList = list;
            }
        },
        removeUsersList (state) {
            state.currentUserList = [];
            state.usersListSize = 0;
        }
    },
    actions: {
        getUserById: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            const Url = `${API_URL}/users/${payload.id}`;
            try {
                await axios.get(Url).then(response => {
                  if (response.status === 200) {
                    commit('setUserById', response.data);
                  }
                });
              } catch (e) {
                // error
                commit('errorMessage', e);
              }
            commit('onloadProcess');
        },
        removeUserById: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
                const Url = `${API_URL}/users/${payload.id}`;
            try {
                await axios.delete(Url).then(response => {
                  if (response.status === 200) {
                    commit('deleteUserById');
                    commit('GoodMessage', 'You remove your account');
                    router.push({ path: '/' });
                  }
                });
              } catch (e) {
                commit('errorMessage', e);
              }
            commit('onloadProcess');
        }, // CROS problems...
        getCurrentUserAvatar: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            let result;
            const apiurl = `${IMG_URL}${payload.avatar}`;
            try {
                if (payload.avatar) {
                    var http = new XMLHttpRequest();
                    await http.open('HEAD', apiurl, false);
                    http.send();
                    if (http.status !== 404) {
                        result = payload.avatar;
                    }
                }
            } catch (error) {
                commit('errorMessage', 'You not have avatar <br> Please unload your avatar!');
            }
            commit('onloadProcess');
            return result;
        },
        putCurrentUserAvatar: async ({ commit, dispatch }, payload) => {
            let resultStatus;
            const Url = `${API_URL}/users/upload/${payload.id}`;
            try {
                await axios({
                    method: 'put',
                    url: Url,
                    data: payload.data,
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    resultStatus = true;
                    commit('setUserById', response.data);
                    commit('setCurrentUserAvatar', response.data.avatar);
                    commit('GoodMessage', 'You update your avatar!');
                });
            } catch (error) {
                resultStatus = false;
                commit('errorMessage', 'You not updadte avatar!');
            }
            return resultStatus;
        },
        patchCurrentUser: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            const Url = `${API_URL}/users/${payload._id}`;
            const send = {
                name: payload.name || '',
                extra_details: payload.extra_details || '',
                skills: payload.skills || '',
                profession: payload.profession || '',
                details: payload.details || ''
            };
            try {
                await axios.patch(Url, send).then(response => {
                    if (response.status === 200) {
                        commit('updateCurrentUser', response.data);
                        commit('GoodMessage', 'You update your account');
                    }
                });
            } catch (error) {
                commit('errorMessage', error);
            }
            commit('onloadProcess');
        },
        createCurentUser: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            const Url = `${API_URL}/users`;
            try {
                await axios.post(Url, payload).then(response => {
                    if (response.status === 200) {
                        commit('GoodMessage', 'You create new account <br> Please login in system');
                        router.push({ path: '/login' });
                    }
                });
            } catch (error) {
                commit('errorMessage', error);
            }
            commit('onloadProcess');
        },
        getUsersList: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            const Url = `${API_URL}/users?limit=${payload.limit}&skip=${payload.skip}`;
            try {
                await axios.get(Url).then(response => {
                    if (response.status === 200) {
                        commit('setUsersListSize', response.data.pagination.total);
                        commit('setCurrentUsersList', response.data.data);
                    }
                });
            } catch (error) {
                commit('errorMessage', error);
            }
            commit('onloadProcess');
        },
        clearUsersList: ({ commit, dispatch }, payload) => {
            commit('removeUsersList');
        }
    }
};
