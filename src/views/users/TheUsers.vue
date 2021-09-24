<template>
  <h1>All USERS IN SYSTEM</h1>
  <user-list
    v-if="currentUserList"
    :users="currentUserList"
    :key="update"
    @user-update="getUsersListByParams"/>
  <pagination
    :itemOnPage="itemOnPage"
    :listSize="usersListSize"
    @list-update="getUsersListByParams"/>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Pagination from '../../components/ui/pagination.vue';
import UserList from '../../components/users/UsersList.vue';

export default {
  data () {
    return {
      itemOnPage: 10,
      currentItem: 0,
      update: 0
    };
  },
  components: {
    Pagination, UserList
  },
  computed: {
    ...mapGetters(['usersListSize', 'currentUserList'])
  },
  methods: {
    ...mapActions(['getUsersList', 'clearUsersList']),
    async getUsersListByParams (custum) {
      if (custum) {
        this.currentItem = custum;
      }
      await this.getUsersList({
        limit: this.itemOnPage,
        skip: this.currentItem
      });
      this.update = this.update + 1;
    }
  },
  mounted () {
  },
  beforeUnmount () {
    this.clearUsersList();
  }
};

</script>

<style>

</style>
