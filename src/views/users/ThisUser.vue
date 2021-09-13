<template>
<h1> Information about your account in the system </h1>
    <user-by-id :uid="loggedInUser._id" v-if="!!loggedInUser._id" :key="loggedInUser._id"/>
</template>

<script>
import { mapGetters } from 'vuex';
import UserById from '../../components/UserById.vue';

export default {
    name: 'LoginUser',
    components: {
        UserById
    },
    computed: {
        ...mapGetters(['loggedInUser'])
    }
};

</script>

<style>

</style>
