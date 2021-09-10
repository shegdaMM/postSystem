<template>
    <main class="post-wrapper">
         <post-item :post="post" :isPostPage="true" v-if="false"/>
        {{post}}
    </main>
</template>

<script>
import userService from '../../services/user.service';
import PostItem from '../../components/posts/PostItem.vue';

export default {
    name: 'PostById',
    data () {
        return {
            post: {
                likes: [],
                _id: '',
                title: '',
                fullText: '',
                description: '',
                dateCreated: '',
                postedBy: '',
                __v: '',
                image: ''
            }
        };
    },
    components: {
      PostItem
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    computed: {
    },
    emits: ['update-post'],
    methods: {
        update () {
            this.getPostFromApi(this.id);
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
