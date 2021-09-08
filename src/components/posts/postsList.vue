<template>
  <template v-if="!havePosts">
      <h2 class="postsNotHave">
          Sorry, we not have posts...
      </h2>
  </template>
{{this.posts}}
  <template v-if="havePosts">
      <ul class="postsList">
          <li class="postsList__item postsItem" v-for="post in posts" :key="post._id">
              <keep-alive>
                  <post-by-id :post="post" />
              </keep-alive>
          </li>
      </ul>
  </template>
</template>

<script>
import postById from '../../views/posts/PostById.vue';

export default {
    name: 'post-list',
    props: {
        posts: Array
    },
    components: {
        postById
    },
    methods: {
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
