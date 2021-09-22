<template>
  <app-comment-content
    :comment="comment.comment"
    :postId="postId"
  />
  <!-- <app-comment-list
    :childs="comment?.childs"
  /> -->
</template>

<script>
// import AppCommentList from '@/components/comments/AppCommentList';
import AppCommentContent from '@/components/comments/AppCommentContent';
export default {
    components: {
      //  AppCommentList
      AppCommentContent
    },
    data () {
        return {
        };
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
    computed: {
    }
};
</script>

<style lang="scss" scoped>

</style>
