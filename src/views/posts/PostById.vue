<template>
  <article class="postsItem__wrapper">
                <p>{{post._id}}</p>
                <h2>{{post.title}}</h2>
                <main>
                    <section class="post__description">
                        {{post.description}}
                    </section>
                </main>
    </article>
</template>

<script>
// import userService from '../services/user.service';

export default {
    name: 'post-by-id',
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
    props: {
        id: String
    },
    methods: {
    },
    mounted () {
        if (!this.id) {
            this.$store.commit('onloadProcess', true);
            this.getPostFromApi();
            this.$store.commit('onloadProcess', false);
        }
    }
};
</script>

<style>

</style>
