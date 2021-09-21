<template>
  <div class="posts-wrapper">
    <main class="posts-main">
      <app-title-page>
        All POSTS IN SYSTEM
      </app-title-page>
      <post-list
        @post-update="getPostsListByParams"
        :postList="currentPostsList"
      />
      <pagination
        :itemOnPage="itemOnPage"
        :listSize="postsListSize"
        @list-update="getPostsListByParams"
        v-if="currentPostsList.length > 0"
        :propCurrentItem="filter.currentItem"
      />
    </main>
    <div class="asideList">
      <app-posts-aside @filter="getFilter" :currentFilter="filter"/>
    </div>
  </div>
</template>

<script>
import Pagination from '../../components/ui/pagination.vue';
import { mapGetters, mapActions } from 'vuex';
import PostList from '@/views/posts/PostList';
import AppPostsAside from '@/components/posts/AppPostsAside';
import AppTitlePage from '../../components/ui/AppTitlePage.vue';

export default {
  data () {
    return {
      itemOnPage: 5,
      filter: {
        currentItem: 1,
        search: '',
        postedBy: ''
      },
      oldFilter: {
        currentItem: 1,
        search: '',
        postedBy: ''
      }
    };
  },
  components: {
    Pagination,
    PostList,
    AppPostsAside,
    AppTitlePage
  },
  computed: {
    ...mapGetters(['postsListSize', 'currentPostsList']),
    currentStart () {
      return (this.filter.currentItem + 1) * this.itemOnPage;
    }
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
            this.filter.currentItem = 1;
          }
        }
        if (this.filter.postedBy) {
          postedBy = (isAdd ? '&' : '?') +
          `postedBy=${this.filter.postedBy}`;
          isAdd = true;
          if (this.filter.postedBy !== this.oldFilter.postedBy) {
            this.filter.currentItem = 1;
          }
        }
        const url = `${window.location.pathname}` + `${item || ''}` + `${search || ''}` + `${postedBy || ''}`;
        window.history.pushState(
          null, document.title, url
        );
        // run
          if (this.filter.postedBy !== this.oldFilter.postedBy) {
            this.oldFilter.postedBy = this.filter.postedBy;
            this.getPostsListByParams();
          }
          if (this.filter.search !== this.oldFilter.search) {
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
      const poss = (custum - 1) * this.itemOnPage;
      await this.getPostsList({
        limit: this.itemOnPage || 5,
        skip: poss || 0,
        search: this.filter.search || null,
        postedBy: this.filter.postedBy || null
      });
    },
    getFilter (data) {
      if (data.search) {
        this.filter.search = data?.search || '';
      } else {
        this.filter.search = '';
      }
      if (data.postedBy) {
        this.filter.postedBy = data?.postedBy;
      } else {
         this.filter.postedBy = '';
      }
    }
  },
  async mounted () {
    const windowData = await Object.fromEntries(new URL(window.location).searchParams.entries());
    if (windowData) {
      this.filter.currentItem = windowData.currentItem;
      console.log(this.filter.currentItem);
      if (windowData.search) {
        this.filter.search = windowData.search;
      }
      if (windowData.postedBy) {
        this.filter.postedBy = windowData.postedBy;
      }
    }
    await this.getPostsListByParams();
  },
  beforeUnmount () {
    this.clearPostsList();
  }
};

</script>

<style>
    .posts-wrapper{
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-rows: 1fr;
      min-height: calc(100vh - 100px);
    }
</style>
