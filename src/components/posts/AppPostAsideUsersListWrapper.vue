<template>
   <app-title-page>
       USERS LIST
   </app-title-page>
   <app-users-list
    :user-list="usersFullList.filter(item => item[0] === userId)"
    v-if="userId"
    :id="userId"
    @filter="filterUser"
    />
   <app-users-list
    :user-list="usersList"
    v-if="usersFullList"
    :id="userId"
    @filter="filterUser"
    />
   <pagination
        @list-update="loadUserList"
        :listSize="usersFullList.length"
        :itemOnPage="15"
        :seeOnPage="1"
    />
</template>

<script>

import AppTitlePage from '../ui/AppTitlePage.vue';
import Pagination from '../ui/pagination.vue';
import UserNameMap from '@/services/UserNameMap';
import AppUsersList from '../users/AppUserShortList.vue';

export default {
    components: {
        Pagination,
        AppTitlePage,
        AppUsersList
    },
    emits: ['filter-user'],
    data () {
        return {
            usersFullList: '',
            usersList: [],
            userId: ''
        };
    },
    computed: [
    ],
    methods: {
        loadUserList (current) {
            this.usersList = this.usersFullList.slice(current, current + 15);
        },
        filterUser (userId) {
            if (userId) {
                this.userId = userId;
                this.$emit('filter-user', userId);
            } else {
                this.$emit('filter-user');
                this.userId = '';
            }
        }
    },
    async mounted () {
        if (Object.entries(UserNameMap.map) > 0) {
            this.usersFullList = Object.entries(UserNameMap.map);
        } else {
             this.usersFullList = Object.entries(await UserNameMap.updateAllMap());
        }
        this.usersList = this.usersFullList.slice(0, 15);
    }
};
</script>

<style>

</style>
