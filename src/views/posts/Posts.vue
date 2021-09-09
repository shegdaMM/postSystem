<template>
    <div class="posts-wrapper">
        <main class="posts-main">
            {{this.filter}}<br>
            <keep-alive>
                <posts-list :posts="posts"  @update-post="update" />
            </keep-alive>
        <!-- pagination -->
        <section class="pagination" v-if="pagenationCount > 1">
        <a @click="prevPage" title="previous" class="pagination__item">
          <i class="fas fa-angle-left"></i>
        </a>
        <a  @click="goto(1)"
        class="pagination__item" :class="{'pagination__item-active': 1 == this.currentItem}">
            <span> {{ 1 }} </span>
        </a>
        <span class="pagination__item pagination__item--more" v-if="this.currentItem > 3">...</span>
        <template v-for="i in pagenationCount" :key="i">
          <a @click="goto(i)" v-if="(!(i!=1) ^ (i!= pagenationCount)) &&  ((i >= currentItem - 2) && ((i <= currentItem + 2)))"
          class="pagination__item" :class="{'pagination__item-active': i == this.currentItem}">
                <span> {{ i }} </span>
          </a>
        </template>
        <span class="pagination__item pagination__item--more" v-if="this.currentItem < (pagenationCount - 3)">...</span>
        <a @click="goto(pagenationCount)"
        class="pagination__item" :class="{'pagination__item-active': pagenationCount == this.currentItem}">
            <span> {{ pagenationCount }} </span>
        </a>
        <a @click="nextPage" title="next" class="pagination__item">
          <i class="fas fa-angle-right"></i>
        </a>
    </section>
        </main>
        <post-aside @filter="PostsFilter"
        :usersList="this.usersList" />
    </div>
</template>

<script>
import userService from '../../services/user.service';
import postAside from '../../components/posts/AsidePosts.vue';
import postsList from '../../components/posts/postsList.vue';

export default {
    name: 'Posts',
    components: {
        postAside, postsList
    },
    data () {
        return {
            usersList: null,
            postsCount: 0,
            currentItem: 1,
            posts: null,
            filter: {
                search: null,
                userId: null
            },

            startPossition: 0
        };
    },
    computed: {
        pagenationCount () {
            return Math.ceil(this.postsCount / 5);
        }
    },
    methods: {
        clear () {
            this.filter.search = null;
            this.filter.userId = null;
            this.getPosts();
        },
        PostsFilter (data) {
            this.filter.search = data.search;
            this.filter.userId = data.userId;
            this.getPosts();
        },
        goto (current) {
          this.currentItem = current;
          this.getPosts(current);
        },
        nextPage () {
          if ((this.currentItem + 1) <= this.pagenationCount) {
            this.goto(this.currentItem);
          }
        },
        prevPage () {
           if ((this.currentItem - 1) > 0) {
            this.goto(this.currentItem - 1);
          }
        },
        getPosts (startPossition) {
            let url = '/posts?limit=5';
            if (startPossition) {
                this.startPossition = startPossition - 1;
                url = url + `&skip=${(this.startPossition) * 5}`;
            } else {
                url = url + `&skip=${(this.startPossition) * 5}`;
            }
            if (this.filter) {
                if (this.filter.search) {
                    url = url + `&search=${this.filter.search}`;
                }
                if (this.filter.userId) {
                    url = url + `&postedBy=${this.filter.userId}`;
                }
            }
            this.$store.commit('onloadProcess', true);
            const responce = userService.getResponse(url);
            responce.then(
              (result) => {
                  const data = result.data;
                  this.postsCount = data.pagination.total;
                  this.posts = result.data.data;
              },
              (error) => {
                  this.$store.commit('onloadProcess', false);
                  this.$toast.open({
                  message: error,
                  type: 'error',
                  duration: 5000
            });
              }
          );
            this.$store.commit('onloadProcess', false);
        },
        update () {
            // update
            this.getPosts();
        }
    },
    mounted () {
         this.usersList = this.$store.getters.getAllUser;
    },
    async created () {
        this.$store.commit('onloadProcess', true);
        // await
        this.getPosts();
        this.$store.commit('onloadProcess', false);
    }

};

</script>

<style lang="scss" scoped>
.posts-wrapper{
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr;
    min-height: calc(100vh - 100px);
}
 .pagination {
            display: flex;
            justify-content: center;
            margin: 0.7rem;
            font-size: 1.2rem;
    }
    .pagination__item {
        padding: 0.5rem 1rem;
        background: #fff;
        color: #025a47;
        margin: 0 0.5rem;
        border-radius: 50%;
        font-weight: 700;
        height: 100%;
        text-decoration: none;
        cursor: pointer;
        font-family: 'Bebas Neue', cursive;
    }
    .pagination__item-active {
         color: #fff;
         background: #025a47;
    }
    .pagination__item--more{
      background: transparent;
      cursor: default;
    }
</style>
