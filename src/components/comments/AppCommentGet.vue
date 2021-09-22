<template>
    <div class="comment-list">
        <app-comment-new-edit
            :postId="postId"
            v-if="this.$store.getters.isAuthenticated"
            @refresh-comment="getCommentsByPost({ postID: this.postId })"
        />
        <section class="comments" v-for="comment in currentCommentList" :key="comment._id">
            <app-comment-item
                :comment="comment"
                :postId="postId"
            />
        </section>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppCommentItem from '@/components/comments/AppCommentItem';
import AppCommentNewEdit from './AppCommentNewEdit.vue';

export default {
    components: {
        AppCommentItem, AppCommentNewEdit
    },
    props: {
        postId: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapGetters(['currentCommentList']),
        commentsTree () {
            const result = {};
            return result;
        }
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

</style>
