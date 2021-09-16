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
        PostErrorMessage (state, message) {
            state.postAlert.open({
              message: message,
              type: 'error',
              duration: 5000
            });
        },
        PostGoodMessage (state, message) {
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
                  if (payload.id) {
                    commit('PostErrorMessage', e);
                  }
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
                    commit('PostGoodMessage', 'You remove your post');
                    router.push({ path: '/posts' });
                  }
                });
              } catch (e) {
                commit('PostErrorMessage', e);
              }
            commit('onloadProcess');
        },
        clearCurrentPost: ({ commit, dispatch }, payload) => {
            commit('deletePostById');
        },
        updatePostImage: async ({ commit, dispatch }, payload) => {
            let resultStatus;
            const Url = `${API_URL}/posts/upload/${payload.id}`;
            try {
                await axios({
                    method: 'put',
                    url: Url,
                    data: payload.image,
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    resultStatus = response.data.image;
                    commit('PostGoodMessage', 'You update this post image!');
                });
            } catch (error) {
                resultStatus = false;
                commit('PostErrorMessage', 'You not update post image!');
            }
            return resultStatus;
        },
        likeToPost: async ({ commit, dispatch }, payload) => {
            let resultStatus;
            const Url = `${API_URL}/posts/like/${payload.id}`;
            try {
                await axios({
                    method: 'put',
                    url: Url
                })
                .then(response => {
                    resultStatus = true;
                });
            } catch (error) {
                resultStatus = false;
                commit('PostErrorMessage', 'You not add/remove like<br> to this post!');
            }
            return resultStatus;
        },
        getPostsList: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            const Url = `${API_URL}/users?limit=${payload.limit}&skip=${payload.skip}&search=${payload.search}&search=${payload.postedBy}`;
            
            commit('onloadProcess');
        }
    }
};
