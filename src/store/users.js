import router from '../router/index';
import axios from 'axios';
const API_URL = process.env.VUE_APP_URL;

export default {
    state: {
        userAlert: null,
        currentUser: null,
        currentUserAvatar: null
    },
    getters: {
        userAlert (state) {
            return state.userAlert;
          },
        currentUser (state) {
            return state.currentUser;
        },
        currentUserAvatar (state) {
            return state.currentUserAvatar;
        }
    },
    mutations: {
        setUserAlert (state, userAlert) {
            state.qAlert = userAlert;
        },
        errorMessage (state, message) {
            state.qAlert.open({
              message: message,
              type: 'error',
              duration: 5000
            });
        },
        GoodMessage (state, message) {
            state.qAlert.open({
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
        setCurrentUserAvatar (state, avatar) {
            if (avatar) {
                state.currentUserAvatar = avatar;
            }
        },
        updateCurrentUser (state, user) {
            if (user) {
                state.currentUser = user;
            }
        }
    },
    actions: {
        getUserById: async ({ commit, dispatch }, payload) => {
            console.log('update user');
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
                commit('errorMessage', e.error);
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
                commit('errorMessage', e.error);
              }
            commit('onloadProcess');
        }, // CROS problems...
        getCurrentUserAvatar: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            let apiurl = API_URL.replace('/api/v1', '');
            apiurl = `${apiurl}${payload.avatar}`;
            try {
               /* const resp = await axios.get(apiurl);
                resp.then(response => { */
                    commit('setCurrentUserAvatar', apiurl);
               /* }); */
            } catch (error) {
                commit('errorMessage', 'You not have avatar <br> Please unload your avatar!');
            }
            commit('onloadProcess');
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
                    commit('GoodMessage', 'You update your avatar!');
                });
            } catch (error) {
                resultStatus = false;
                commit('errorMessage', 'You not updadte avatar!');
            }
            console.log(resultStatus);
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
                commit('errorMessage', error.error);
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
                commit('errorMessage', error.error);
            }
            commit('onloadProcess');
        }
    }
};
