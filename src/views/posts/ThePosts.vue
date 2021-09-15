<template>
  <div class="posts-wrapper">
    <h1>All POSTS IN SYSTEM</h1>
    <main class="posts-main">
      {{}}
      <pagination :itemOnPage="itemOnPage" :listSize="postsListSize" @list-update="getPostsListByParams"/>
    </main>

  </div>
</template>

<script>
import Pagination from '../../components/ui/pagination.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  data () {
    return {
      itemOnPage: 5,
      currentItem: 0
    };
  },
  components: {
    Pagination
  },
  computed: {
    ...mapGetters(['postsListSize', 'currentPostsList'])
  },
   methods: {
    ...mapActions([])
    /* async getPostsListByParams (custum) {
      if (custum) {
        this.currentItem = custum;
      }
      await this.getPostsList({
        limit: this.itemOnPage,
        skip: this.currentItem
      });
    } */
  },
  beforeUnmount () {
   // this.clearPostsList();
  }
};

</script>

<style>

</style>
