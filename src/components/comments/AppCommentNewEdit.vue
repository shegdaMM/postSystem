<template>
<div class="componens-create">
    <comment-edit
        :startText="comment?.text || ''"
        @form-submit="modify"
    >
        <span v-if="!comment">CREATE COMMENT</span>
        <span v-if="comment">SAVE</span>
    </comment-edit>
</div>
</template>

<script>
import CommentEdit from './CommentEdit.vue';
import { mapActions } from 'vuex';

export default {
    components: {
        CommentEdit
    },
    data () {
        return {
            debounce: null
        };
    },
    emits: ['refresh-comment'],
    props: {
        postId: {
            type: String,
            required: true
        },
        followedCommentId: {
            type: String
        },
        comment: {
            type: Object
        }
    },
    methods: {
        ...mapActions(['createComment']),
        async modify (text) {
            console.log(text);
            await this.createComment({ postID: this.postId, text: text, followedCommentID: this.followedCommentId || null });
            this.$emit('refresh-comment');
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
