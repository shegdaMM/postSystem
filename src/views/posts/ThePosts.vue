<template>
  <div class="posts-wrapper">
    <h1>All POSTS IN SYSTEM</h1>
    <main class="posts-main">
      <post-list />
      <pagination :itemOnPage="itemOnPage" :listSize="postsListSize" @list-update="getPostsListByParams"/>
    </main>
  {{currentPostsList}}
  </div>
</template>

<script>
import Pagination from '../../components/ui/pagination.vue';
import { mapGetters, mapActions } from 'vuex';
import PostList from '@/views/posts/PostList';

export default {
  data () {
    return {
      itemOnPage: 5,
      currentItem: 0
    };
  },
  components: {
    Pagination, PostList
  },
  computed: {
    ...mapGetters(['postsListSize', 'currentPostsList'])
  },
   methods: {
    ...mapActions(['getPostsListByParams']),
    async getPostsListByParams (custum) {
      if (custum) {
        this.currentItem = custum;
      }
      await this.getPostsList({
        limit: this.itemOnPage,
        skip: this.currentItem
      });
    }
  },
  beforeUnmount () {
   // this.clearPostsList();
  }
};

</script>

<style>

</style>
