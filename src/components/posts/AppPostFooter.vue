<template>
     <footer class="footer">
            <section class="footer__control">
                <div class="likes">
                    <a class="text" @click="this.$emit('setLikes')" :class="{'like-active' : !this.isLikePost}">
                        <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTAgNTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUwIDUwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBzdHlsZT0iZmlsbDojQzAzQTJCOyIgZD0iTTI0Ljg1LDEwLjEyNmMyLjAxOC00Ljc4Myw2LjYyOC04LjEyNSwxMS45OS04LjEyNWM3LjIyMywwLDEyLjQyNSw2LjE3OSwxMy4wNzksMTMuNTQzDQoJYzAsMCwwLjM1MywxLjgyOC0wLjQyNCw1LjExOWMtMS4wNTgsNC40ODItMy41NDUsOC40NjQtNi44OTgsMTEuNTAzTDI0Ljg1LDQ4TDcuNDAyLDMyLjE2NWMtMy4zNTMtMy4wMzgtNS44NC03LjAyMS02Ljg5OC0xMS41MDMNCgljLTAuNzc3LTMuMjkxLTAuNDI0LTUuMTE5LTAuNDI0LTUuMTE5QzAuNzM0LDguMTc5LDUuOTM2LDIsMTMuMTU5LDJDMTguNTIyLDIsMjIuODMyLDUuMzQzLDI0Ljg1LDEwLjEyNnoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNFRDcxNjE7IiBkPSJNNiwxOC4wNzhjLTAuNTUzLDAtMS0wLjQ0Ny0xLTFjMC01LjUxNCw0LjQ4Ni0xMCwxMC0xMGMwLjU1MywwLDEsMC40NDcsMSwxcy0wLjQ0NywxLTEsMQ0KCWMtNC40MTEsMC04LDMuNTg5LTgsOEM3LDE3LjYzMSw2LjU1MywxOC4wNzgsNiwxOC4wNzh6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==">
                    </a>
                    <div v-if="likesCount > 0" @click="showLikes = !showLikes">
                        <span class="insert">
                            <span> {{ likesCount }} </span>
                        </span>
                        <span class="showLikeList">
                            <i class="fas fa-eye" v-if="!showLikes"></i>
                            <i class="fas fa-eye-slash" v-if="showLikes"></i>
                        </span>
                    </div>
                </div>
                <div class="moreLink" v-if="!makeEdit">
                     <router-link :to="
                     { name: 'PostById', params: { uid: this.post._id }}
                     ">
                        More details
                     </router-link>
                </div>
            </section>
            <ul class="likesList" v-if="showLikes">
              <li class="likesItem" v-for="like in post.likes" :key="like">
                        <router-link :to="{ name: 'UserById', params: { pid: like }}" v-if="likes[like]" class="likeLink">
                            {{likes[like]}}
                        </router-link>
                </li>
            </ul>
        </footer>
</template>

<script>
export default {
     data () {
        return {
            showLikes: false
        };
    },
    emits: ['post-update', 'setLikes'],
    props: {
        likesCount: Number,
        post: Object,
        makeEdit: Boolean,
        likes: Object,
        isLikePost: Boolean
    },
    computed: {
    }

};
</script>

<style lang="scss" scoped>
.like-active {
    filter: opacity(25%);
}
a {
    color: #028165;
}
.footer {
    display: flex;
    flex-direction: column;
    font-family: "Bebas Neue", cursive;
    color: rgba(0, 0, 0, 0.781);

    border-top: 0.15rem #028165 solid;
    padding: 0.5rem;
}

.footer__control {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .likes {
        padding: 0 1.5rem 0 0rem;
        width: 3.5rem;

        position: relative;

        .insert {
            position: absolute;
            display: inline-block;
            top: -0.2rem;
            right: 0rem;
            width: 1.5rem;
            text-align: center;
            font-weight: 700;
            color: #028165;
        }

        .showLikeList {
                display: inline-block;
                position: absolute;
                bottom: 0;
                right: 0;
                width: 1.5rem;
                color: #028165;
                text-align: center;
        }
    }
    .moreLink {
        padding: 0 0.25rem;
        color: #028165;
    }
}

.likesList {
    display: flex;
    flex-wrap: wrap;

    list-style-type: none;

    .likesItem {
        padding: 0.1rem 0.5rem;
        background: rgba(255, 255, 255, 0.561);
        border-radius: 0.5rem 0.5rem 0.3rem 0.5rem;
        margin: 0.2rem 0.5rem 0.2rem 0;

        a{
            display: block;
            height: 100%;
        }
    }
}
</style>
