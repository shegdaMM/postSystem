<template>
  <div class="posts-wrapper">
    <main class="posts-main">
      <h1>All POSTS IN SYSTEM</h1>
      <input type="text" v-model="filter.search">
      <input type="text" v-model="filter.postedBy">
      <post-list
        @post-update="getPostsListByParams"
        :postList="currentPostsList"
      />
      <pagination :itemOnPage="itemOnPage" :listSize="postsListSize" @list-update="getPostsListByParams"/>
    </main>
    <aside>
      <app-posts-aside />
    </aside>
  </div>
</template>

<script>
import Pagination from '../../components/ui/pagination.vue';
import { mapGetters, mapActions } from 'vuex';
import PostList from '@/views/posts/PostList';
import AppPostsAside from '@/components/posts/AppPostsAside';

export default {
  data () {
    return {
      itemOnPage: 5,
      filter: {
        currentItem: 0,
        search: '',
        postedBy: ''
      },
      oldFilter: {
        currentItem: 0,
        search: '',
        postedBy: ''
      }
    };
  },
  components: {
    Pagination, PostList, AppPostsAside
  },
  computed: {
    ...mapGetters(['postsListSize', 'currentPostsList'])
  },
  watch: {
    filter: {
      handler: function () {
        let item, search, postedBy;
        let isAdd = false;
        if (this.filter.currentItem) {
          item = (isAdd ? '&' : '?') +
          `currentItem=${this.filter.currentItem}`;
          isAdd = true;
        }
        if (this.filter.search) {
          search = (isAdd ? '&' : '?') +
          `search=${this.filter.search}`;
          isAdd = true;
          if (this.filter.search !== this.oldFilter.search) {
            this.filter.currentItem = 0;
          }
        }
        if (this.filter.postedBy) {
          postedBy = (isAdd ? '&' : '?') +
          `postedBy=${this.filter.postedBy}`;
          isAdd = true;
          if (this.filter.postedBy !== this.oldFilter.postedBy) {
            this.filter.currentItem = 0;
          }
        }
        const url = `${window.location.pathname}` + `${item || ''}` + `${search || ''}` + `${postedBy || ''}`;
        console.log(url);
        window.history.pushState(
          null, document.title, url
        );
        // run
        if (this.filter.postedBy !== this.oldFilter.postedBy ||
        this.filter.search !== this.oldFilter.search) {
          this.oldFilter.postedBy = this.filter.postedBy;
          this.oldFilter.search = this.filter.search;
          this.getPostsListByParams();
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['getPostsList', 'clearPostsList']),
    async getPostsListByParams (custum) {
      this.filter.currentItem = custum;
      await this.getPostsList({
        limit: this.itemOnPage || 5,
        skip: this.filter.currentItem || 0,
        search: this.filter.search || null,
        postedBy: this.filter.postedBy || null
      });
    }
  },
  mounted () {
    const windowData = Object.fromEntries(new URL(window.location).searchParams.entries());
    if (windowData) {
        this.filter.currentItem = windowData.currentItem || 0;
      if (windowData.search) {
        this.filter.search = windowData.search;
      }
      if (windowData.postedBy) {
        this.filter.postedBy = windowData.postedBy;
      }
    }
  },
  beforeUnmount () {
    this.clearPostsList();
  }
};

</script>

<style>

</style>
