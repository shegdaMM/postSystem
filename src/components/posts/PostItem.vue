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
            <section class="footer__control">
                <div class="likes">
                    <span class="text"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTAgNTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUwIDUwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBzdHlsZT0iZmlsbDojQzAzQTJCOyIgZD0iTTI0Ljg1LDEwLjEyNmMyLjAxOC00Ljc4Myw2LjYyOC04LjEyNSwxMS45OS04LjEyNWM3LjIyMywwLDEyLjQyNSw2LjE3OSwxMy4wNzksMTMuNTQzDQoJYzAsMCwwLjM1MywxLjgyOC0wLjQyNCw1LjExOWMtMS4wNTgsNC40ODItMy41NDUsOC40NjQtNi44OTgsMTEuNTAzTDI0Ljg1LDQ4TDcuNDAyLDMyLjE2NWMtMy4zNTMtMy4wMzgtNS44NC03LjAyMS02Ljg5OC0xMS41MDMNCgljLTAuNzc3LTMuMjkxLTAuNDI0LTUuMTE5LTAuNDI0LTUuMTE5QzAuNzM0LDguMTc5LDUuOTM2LDIsMTMuMTU5LDJDMTguNTIyLDIsMjIuODMyLDUuMzQzLDI0Ljg1LDEwLjEyNnoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNFRDcxNjE7IiBkPSJNNiwxOC4wNzhjLTAuNTUzLDAtMS0wLjQ0Ny0xLTFjMC01LjUxNCw0LjQ4Ni0xMCwxMC0xMGMwLjU1MywwLDEsMC40NDcsMSwxcy0wLjQ0NywxLTEsMQ0KCWMtNC40MTEsMC04LDMuNTg5LTgsOEM3LDE3LjYzMSw2LjU1MywxOC4wNzgsNiwxOC4wNzh6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="></span>
                    <span class="insert">{{ likesCount }}</span>
                </div>
                <div>
                    <a @click="this.$router.push({ name: 'PostById', params: { id: post._id } })">
                        More details
                    </a>
                </div>
            </section>
            <ul class="likesList" v-if="likesCount > 0">
                <li class="likesItem" v-for="like in post.likes" :key="like">
                   {{this.getNameByID(like)}}
                </li>
            </ul>
        </footer>
    </article>
</template>

<script>

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
        likesCount () {
            let result;
            if (this.post.likes) {
                result = this.post.likes.length;
            } else {
                result = 0;
            }
            return result;
        }
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
    }
};
</script>

<style lang="scss" scoped>

</style>
