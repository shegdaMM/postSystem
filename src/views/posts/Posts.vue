<template>
    <div class="posts-wrapper">
        <main class="posts-main">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque consequuntur similique laborum recusandae eveniet amet rem? Suscipit voluptatum totam placeat quis reprehenderit consequatur, autem illum dolorem at corporis inventore voluptatem?
        </main>
        <!--
        <post-aside @search="search" :nameUsersList="nameUsersList" />
        -->
        <right-aside></right-aside>
    </div>
</template>

<script>
import postAside from '../../components/posts/AsidePosts.vue';
import rightAside from '../../components/posts/RightAside.vue';

export default {
    name: 'Posts',
    components: [
        postAside, rightAside
    ],
    data () {
        return {
            nameUsersList: []
        };
    },
    methods: {
        search (searchText) {
            // search
        }
    },
    mounted () {
         this.nameUsersList = this.$store.getters.getAllUser;
    }

};

</script>

<style lang="scss" scoped>

</style>
