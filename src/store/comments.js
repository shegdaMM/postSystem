import axios from 'axios';
// import router from '../router/index';

const API_URL = process.env.VUE_APP_URL;

export default {
    state: {
        commentAlert: null,
        currentCommentList: ''
    },
    getters: {
        currentCommentList (state) {
            return state.currentCommentList;
        }
    },
    mutations: {
        setCommentAlert (state, CommentAlert) {
            state.commentAlert = CommentAlert;
        }, // create tree
        setCurrentCommentList (state, list) {
            if (list) {
                const obj = {};
                for (const comm of list) {
                    const id = comm._id;
                    obj[id] = { comment: comm, childs: {} };
                }
                // eslint-disable-next-line no-unused-vars
                const tree = {};
                for (const comm of Object.values(obj)) {
                    const parrent = comm.comment.followedCommentID;
                    if (!parrent) {
                        tree[comm.comment._id] = comm;
                    } else {
                        obj[parrent].childs[comm.comment._id] = comm;
                        if (tree[parrent]) {
                            tree[parrent] = obj[parrent];
                        }
                    }
                }
                console.log(tree);
                state.currentCommentList = tree;
            } else {
                state.currentCommentList = '';
            }
        },
        GoodCommentAlert (state, message) {
            state.commentAlert.open({
                message: message,
                type: 'success',
                duration: 5000
              });
        },
        BedCommentAlert (state, message) {
            state.commentAlert.open({
                message: message,
                type: 'error',
                duration: 5000
              });
        }
    },
    actions: {
        createComment: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            const Url = `${API_URL}/comments/post/${payload.postID}`;
            const data = {
                text: payload.text
            };
            if (payload.followedCommentID) {
                data.followedCommentID = payload.followedCommentID;
            }
            try {
                await axios.post(Url, data).then(response => {
                    if (response.status === 200) {
                    }
                });
            } catch (error) {
                commit('BedCommentAlert', error.message);
            }
            commit('onloadProcess');
        },
        getCommentsByPost: async ({ commit, dispatch }, payload) => {
            commit('onloadProcess');
            const url = `${API_URL}/comments/post/${payload.postID}`;
            try {
                await axios.get(url).then(response => {
                    if (response.status === 200) {
                        commit('setCurrentCommentList', response.data);
                    }
                });
            } catch (e) {
                console.log(e);
                if (payload) {
                    // commit('BedCommentAlert', e);
                }
            } finally {
                commit('onloadProcess');
            }
        },
        clearCommentsByPost: ({ commit, dispatch }, payload) => {
            commit('setCurrentCommentList');
        }
    }
};
