import axios from 'axios';
import router from '../router/index';

const API_URL = process.env.VUE_APP_URL;
// const IMG_URL = process.env.VUE_APP_IMG_URL;

export default {
    state: {
        postAlert: null,
        currentPost: null,
        postsListSize: 100,
        currentPostsList: []
    },
    getters: {
        postAlert (state) {
            return state.postAlert;
          },
        currentPost (state) {
            return state.currentPost;
        },
        postsListSize (state) {
            return state.postsListSize;
        },
        currentPostsList (state) {
            return state.currentPostsList;
        }
    },
    mutations: {
        setPostAlert (state, postAlert) {
            state.postAlert = postAlert;
        },
        errorMessage (state, message) {
            state.postAlert.open({
              message: message,
              type: 'error',
              duration: 5000
            });
        },
        GoodMessage (state, message) {
            state.postAlert.open({
              message: message,
              type: 'success',
              duration: 5000
            });
        },
        setPostById (state, post) {
            if (post) {
                state.currentPost = post;
            }
        },
        deletePostById (state) {
            // remove with map...
            state.currentPost = null;
        },
        setPostsListSize (state, count) {
            if (count) {
                state.postsListSize = count;
            }
        },
        setCurrentPostsList (state, list) {
            if (list) {
                state.currentPostsList = list;
            }
        },
        removePostsList (state) {
            state.currentPostsList = [];
            state.postsListSize = 0;
        }
    },
    actions: {
        getPostById: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            const Url = `${API_URL}/posts/${payload.id}`;
            try {
                await axios.get(Url).then(response => {
                    if (response.status === 200) {
                      commit('setPostById', response.data);
                    }
                  });
                } catch (e) {
                  // error
                  commit('errorMessage', e);
                }
              commit('onloadProcess');
        },
        removePostById: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
                const Url = `${API_URL}/posts/${payload.id}`;
            try {
                await axios.delete(Url).then(response => {
                  if (response.status === 200) {
                    commit('deletePostById');
                    commit('GoodMessage', 'You remove your post');
                    router.push({ path: '/posts' });
                  }
                });
              } catch (e) {
                commit('errorMessage', e);
              }
            commit('onloadProcess');
        },
        clearCurrentPost: ({ commit, dispatch }, payload) => {
            commit('deletePostById');
        }
    }
};
