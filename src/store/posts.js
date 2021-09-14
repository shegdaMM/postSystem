/* import router from '../router/index';
import axios from 'axios';

const API_URL = process.env.VUE_APP_URL;
const IMG_URL = process.env.VUE_APP_IMG_URL; */

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

    }
};
