<template>
  <app-comment-create
  :postId="postId"
  v-if="this.$store.getters.isAuthenticated"
  />
</template>

<script>
import AppCommentCreate from './AppCommentCreate.vue';
export default {
  components: { AppCommentCreate },
    props: {
        postId: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
