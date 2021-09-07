<template>
<div class="main">
    <users-list v-if="(users)" :users="users"/>
   <section class="pagination">
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
</div>
<aside>
</aside>
 </template>

<script>
import UsersList from '../components/UsersList.vue';
import userService from '../services/user.service';

export default {
  components: { UsersList },
  name: 'Users',
   data () {
        return {
            usersCount: 0,
            currentItem: 1,
            users: null
        };
    },
    computed: {
        pagenationCount () {
            return Math.ceil(this.usersCount / 10);
        }
    },
    methods: {
        getUsers (startPossition) {
          let url = '/users';
          if (startPossition) {
            url = url + `?skip=${(startPossition - 1) * 10}`;
          }
          this.$store.commit('onloadProcess', true);
          const responce = userService.getResponse(url);
          responce.then(
              (result) => {
                  const data = result.data;
                  this.usersCount = data.pagination.total;
                  this.users = result.data.data;
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
        goto (current) {
          this.currentItem = current;
          this.getUsers(current);
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
        }
    },
    async created () {
        this.$store.commit('onloadProcess', true);
        await this.getUsers();
        this.$store.commit('onloadProcess', false);
    }
};
</script>

<style lang="scss" scoped>
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
