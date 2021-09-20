<template>
   <h2>
       <slot name="title"></slot>
   </h2>
    <ul class="users">
        <li class="users__item" v-for="user in usersList" :key="user[0]">
            <input type="radio" :id="user[0]" :value="user[0]" v-model="userId" style="display: none;">
            <label :for="user[0]" @click="sendResponce">
                <a @click="userId = user[0]"><i class="far fa-user" :class="{'fas': user[0] === this.$store.state.loginID._id}"></i> {{user[1]}}</a>
            </label>
            <span @click="clearUserId" class="unCheckUserId" v-if="userId == user[0]"><i class="fas fa-times"></i></span>
        </li>
    </ul>
    <pagination
        @list-update="loadUserList"
        :listSize="10"
        :itemOnPage="100"
    />
</template>

<script>
import Pagination from '../ui/pagination.vue';

export default {
    components: {
        Pagination
    },
    methods: {
        async loadUserList (current) {
            //
        }
    }
};
</script>

<style>

</style>
