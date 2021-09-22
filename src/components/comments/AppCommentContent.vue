<template>
  <article class="commentsItem__wrapper" v-if="comment">
      <app-comment-content-header
        :commentedBy="commentedBy"
        :comment="comment"
      />
      <main>
{{comment}}
      </main>
      <app-comment-content-footer
        :likesCount="likesCount"
        :comment="comment"
        :makeEdit="makeEdit"
        :likes="likes"
        :isLikeComment="isLikeComment"
        @set-likes="setLikes"
        @add-comment="showNew"
      />
      <app-comment-new-edit
        v-if="newComment"
        :postId="postId"
        :followedCommentId="comment._id"
      />
  </article>
</template>
<script>
import AppCommentContentHeader from '@/components/comments/AppCommentContentHeader';
import UserNameMap from '@/services/UserNameMap';
import { mapActions } from 'vuex';
import AppCommentContentFooter from './AppCommentContentFooter.vue';
import AppCommentNewEdit from '@/components/comments/AppCommentNewEdit';
export default {
    components: {
        AppCommentContentHeader, AppCommentContentFooter, AppCommentNewEdit
    },
    props: {
        comment: {
            type: Object,
            required: true
        },
        postId: {
            type: String,
            required: true
        }
    },
    emits: ['comment-update'],
    data () {
        return {
            UserNameMap: UserNameMap,
            commentedBy: '',
            likes: {},
            newComment: false
        };
    },
    computed: {
        likesCount () {
            return this.comment?.likes.length;
        },
        makeEdit () {
            if (this.comment?.commentedBy) {
                if (this.$store.getters.loggedInUser._id === this.comment?.commentedBy) {
                    return true;
                }
            }
            return false;
        },
        isLikeComment () {
            let result;
            if ((this.comment?.likes) && (this.$store.getters.loggedInUser._id)) {
                this.comment.likes.forEach(element => {
                    if (element === this.$store.getters.loggedInUser._id) {
                        result = true;
                    }
                });
            } else result = false;
            return result;
        }
    },
    methods: {
        ...mapActions(['likeToComment']),
        async getNameByID (id) {
            const result = await UserNameMap.getUserName(id);
            return result;
        },
        showNew () {
            this.newComment = !this.newComment;
        },
        async setLikes () {
            if (!(this.$store.getters.loggedInUser._id === this.comment?.commentedBy)) {
                const result = await this.likeToComment({ id: this.comment._id });
                if (result) {
                    this.$emit('comment-update');
                }
            } else {
              this.$toast.open({
              message: 'You not can set like<br>to your comment',
              type: 'info',
              duration: 5000
            });
            }
        }
    },
    async mounted () {
        if (this.comment?.dateCreated) {
            if (this.comment?.commentedBy) {
                const result = await UserNameMap.getUserName(this.comment?.commentedBy);
                this.commentedBy = result;
            }
            this.comment.likes.forEach(async (likeUserId) => {
                const name = await UserNameMap.getUserName(likeUserId);
                this.likes[likeUserId] = name;
                console.log(this.likes);
            });
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
