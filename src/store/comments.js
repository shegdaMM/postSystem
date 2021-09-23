import axios from 'axios';
// import router from '../router/index';

const API_URL = process.env.VUE_APP_URL;

export default {
    state: {
        commentAlert: null,
        comments: []
    },
    getters: {
        comments (state) {
            return state.comments;
        }
    },
    mutations: {
        setCommentAlert (state, CommentAlert) {
            state.commentAlert = CommentAlert;
        }, // create tree as object in object (not use)
        setCurrentCommentList (state, list) {
            if (list) {
                state.currentCommentList = list;
                /* const let = {};
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
                */
            } else {
                state.currentCommentList = '';
            }
        }, // object in array
        setCurrentCommentList1 (state, list) {
            state.comments = [];
            let comment;
            const comments = {};
            let tmpComment;

            for (let i = 0, len = list.length; i < len; i++) {
                comment = list[i];
                comment.children = [];
                comments[comment._id] = comment;
            }

            for (var id in comments) {
                // eslint-disable-next-line no-prototype-builtins
                if (!comments.hasOwnProperty(id)) {
                    continue;
                }
                tmpComment = comments[id];
                if (tmpComment.followedCommentID) {
                    comments[tmpComment.followedCommentID].children.push(tmpComment);
                } else {
                    state.comments.push(tmpComment);
                }
            }
            console.log(state.comments);
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
            // commit('onloadProcess');
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
            // commit('onloadProcess');
        },
        getCommentsByPost: async ({ commit, dispatch }, payload) => {
            // commit('onloadProcess');
            const url = `${API_URL}/comments/post/${payload.postID}`;
            try {
                await axios.get(url).then(response => {
                    if (response.status === 200) {
                        commit('setCurrentCommentList1', response.data);
                    }
                });
            } catch (e) {
                console.log(e);
                if (payload) {
                    commit('BedCommentAlert', e);
                }
            } finally {
               // commit('onloadProcess');
            }
        },
        clearCommentsByPost: ({ commit, dispatch }, payload) => {
            commit('setCurrentCommentList');
        },
        likeToComment: async ({ commit, dispatch }, payload) => {
            let resultStatus;
            const Url = `${API_URL}/comments/like/${payload.id}`;
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
                commit('BedCommentAlert', 'You not add/remove like<br> to this comment!');
            }
            return resultStatus;
        },
        updateComment: async ({ commit, dispatch }, payload) => {
            // commit('onloadProcess');
            const Url = `${API_URL}/comments/${payload.id}`;
            const send = {
                text: payload.text || ''
            };
            try {
                await axios.patch(Url, send).then(response => {
                    if (response.status === 200) {
                        commit('GoodCommentAlert', 'Updated comment');
                    }
                });
            } catch (e) {
                commit('BedCommentAlert', e.error);
            }
           // commit('onloadProcess');
        },
        deleteComment: async ({ commit, dispatch }, payload) => {
            let resultStatus = false;
            // commit('onloadProcess');
            const Url = `${API_URL}/comments/${payload.id}`;
            try {
                await axios.delete(Url).then(response => {
                  if (response.status === 200) {
                    resultStatus = true;
                    commit('GoodCommentAlert', 'You are deleted comment');
                  }
                });
            } catch (e) {
                commit('BedCommentAlert', e.error);
            }
            // commit('onloadProcess');
            return resultStatus;
        }
    }
};
