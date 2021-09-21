<template>
   <app-title-page>
       USERS LIST
   </app-title-page>
   <app-users-list
    :user-list="usersFullList.filter(item => item[0] === currentUser)"
    v-if="currentUser"
    :currentUser="currentUser"
    @filter="filterUser"
    />
   <app-users-list
    :user-list="usersList"
    v-if="usersFullList"
    @filter="filterUser"
    :currentUser="currentUser"
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
    props: {
        currentUser: String
    },
    computed: [
    ],
    methods: {
        loadUserList (current) {
            this.usersList = this.usersFullList.slice((current - 1) * 14, ((current - 1) * 14) + 14);
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
