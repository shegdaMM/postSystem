<template>
    <article class="postsItem__wrapper">
        <header class="header">
            <div class="header__info">
                <div class="postedBy">
                    <div>
                        <span class="text">Posted by:</span>
                        <span class="insert">{{ this.getNameByID(post.postedBy) }}</span>
                    </div>
                    <div>
                        <span class="text">Created on:</span>
                        <span class="insert">{{ this.getDate() }}</span>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <h2>{{post.title}}</h2>
            <div class="main-wrapper">
                <section class="post__image-wrapper" v-if="post.image">
                    <img :src="`${API_URL}${post.image}`" :alt="post.description" class="post__image">
                </section>
                <section class="post__description">
                    {{post.description}}
                </section>
            </div>
        </main>
        <footer class="footer">
            <div class="footer__top">
                        <span class="insert">{{ this.getNameByID(post.postedBy) }}</span>
            </div>
            <div>
                <a @click="this.$router.push({ name: 'PostById', params: { id: post._id } })">
                    More details
                </a>
            </div>

        </footer>
    </article>
</template>

<script>
const API_URL = process.env.VUE_APP_URL.replace('/api/v1', '');

export default {
    name: 'post-item',
    data () {
        return {
            API_URL: process.env.VUE_APP_URL.replace('/api/v1', '')
        };
    },
    props: {
        post: Object
    },
    computed: {
    },
    methods: {
        getDate () {
            const date = new Date(this.post.dateCreated);
            let mounth = date.getUTCMonth() + 1;
            if (mounth < 10) mounth = '0' + mounth;
            const result = date.getUTCDate() + '.' + mounth + '.' + date.getUTCFullYear();
            return result;
        },
        getNameByID (id) {
            const userName = this.$store.getters.getUserByID(id);
            if (userName == null) {
                return 'Removed User';
            };
            return userName;
        }
    },
    mounted () {
        console.log(API_URL);
    }
};
</script>

<style lang="scss" scoped>

</style>
