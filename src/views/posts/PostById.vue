<template>
    <main class="post-wrapper">
        <postItem :post="post" @update-post="update" :isPostPage="true" />
    </main>
</template>

<script>
import userService from '../../services/user.service';
import postItem from '../../components/posts/PostItem.vue';

export default {
    name: 'PostById',
    data () {
        return {
            post: {
                _id: null,
                title: null,
                fullText: null,
                description: null,
                dateCreated: null,
                image: null,
                likes: [],
                postedBy: null,
                __v: null
            }
        };
    },
    components: {
        postItem
    },
    props: {
        id: String
    },
    computed: {
    },
    methods: {
        update () {
            this.getPostFromApi();
        },
        getPostFromApi () {
            this.$store.commit('onloadProcess', true);
            const response = userService.getResponse(`/posts/${this.id}`);
            response.then(
            (data) => {
                this.post = data.data;
            },
            (error) => {
                this.$toast.open({
                        message: error,
                        type: 'error',
                        duration: 5000
                });
            }
            );
            this.$store.commit('onloadProcess', false);
        }
    },
    mounted () {
            this.$store.commit('onloadProcess', true);
            this.getPostFromApi();
            this.$store.commit('onloadProcess', false);
    }
};
</script>

<style>

</style>
