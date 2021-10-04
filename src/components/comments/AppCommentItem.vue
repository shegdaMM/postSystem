<template>
<div class="item-wrapper">
  <app-comment-content
    v-if="comment"
    :comment="comment"
    :postId="postId"
    @comment-update="this.$emit('comment-update');"
  />
    <div
        v-if="hasChildren"
    >
    <app-comment-item
                class="inner-comment"
                v-for="item of comment.children"
                :key="item._id"
                :comment="item"
                :postId="postId"
                @comment-update="this.$emit('comment-update');"
    />
    </div>
</div>
</template>

<script>
import AppCommentItem from './AppCommentItem';
import AppCommentContent from './AppCommentContent';
export default {
    name: 'appCommentItem',
    components: {
      AppCommentItem,
      AppCommentContent
    },
    data () {
        return {
          keyInList: 0
        };
    },
    emits: ['comment-update'],
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
      children () {
        return this.comment.children;
      },
      hasChildren () {
        return this.comment.children.length > 0;
      }
    }
};
</script>

<style lang="scss" scoped>
  .inner-comment {
    position: relative;
    margin-left: 1.5rem;
  }
  .inner-comment::before {
    content: '\f3e5';
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    position: absolute;
    width: 1.25rem;
    font-size: 1rem;
    height: 1rem;
    left: -1.5rem;
    top: -0.2rem;
    transform: rotate(180deg);
    color: #028165;
  }
  @media screen and (max-width: 700px) {
     .inner-comment {
      position: relative;
      margin-left: 0rem;
    }
    .inner-comment::before {
      content: '\f0dd';
      font-family: "Font Awesome 5 Free";
      font-weight: 900;
      position: absolute;
      width: 1.5rem;
      font-size: 1.5rem;
      height: 1rem;
      left: 0.5rem;
      top: -1.4rem;
      transform: none;
      color: #028165;
    }
  }
</style>
