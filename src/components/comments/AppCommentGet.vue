<template>
    <div class="comments-list" :key="reload">
        <app-comment-new-edit
            style="margin-bottom: 0.4rem;"
            :postId="postId"
            v-if="this.$store.getters.isAuthenticated"
            @refresh-comment="getCommentsByPost({ postID: this.postId })"
        />
        <section class="comments">
            <app-comment-item
                v-for="comment in comments"
                :key="comment._id"
                :comment="comment"
                :postId="postId"
                @comment-update="getCommentsByPost({ postID: this.postId })"
            />
        </section>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppCommentItem from './AppCommentItem';
import AppCommentNewEdit from './AppCommentNewEdit.vue';

export default {
    components: {
        AppCommentItem, AppCommentNewEdit
    },
    data () {
        return {
            reload: 0
        };
    },
    props: {
        postId: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapGetters(['comments'])
    },
    methods: {
        ...mapActions(['getCommentsByPost', 'clearCommentsByPost'])
    },
    async mounted () {
        await this.getCommentsByPost({ postID: this.postId });
    },
    beforeUnmount () {
        this.clearCommentsByPost();
  }
};
</script>

<style lang="scss" scoped>
    .comment-list{
        margin: 0.2rem 0.4rem;
    }
</style>
