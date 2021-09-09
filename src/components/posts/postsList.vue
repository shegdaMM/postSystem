<template>
  <template v-if="!havePosts">
      <h2 class="postsNotHave">
          Sorry, we not have posts...
      </h2>
  </template>
  <template v-if="havePosts">
      <ul class="postsList">
          <li class="postsList__item postsItem" v-for="post in posts" :key="post._id">
                  <postItem :post="post" @update-post="update" :isPostPage="true" />
          </li>
      </ul>
  </template>
</template>

<script>
import postItem from '../../components/posts/PostItem.vue';

export default {
    name: 'post-list',
    props: {
        posts: Array
    },
    components: {
        postItem
    },
    methods: {
        update () {
            this.$emit('update-post');
        }
    },
    computed: {
        havePosts () {
            let result = false;
            if (this.posts) {
                result = this.posts.length > 0;
            }
            return result;
        }
    },
    mounted () {
    }

};
</script>

<style lang="scss" scoped>
    .postsNotHave{
        text-align: center;
    }
    .postsList {
    }
</style>
