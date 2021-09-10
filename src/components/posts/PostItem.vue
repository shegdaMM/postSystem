<template>
    <article class="postsItem__wrapper">
        <header class="header">
                    <div>
                        <span v-if="this.getNameByID(post.postedBy) !== 'Removed User'">
                            <span class="text">Posted by:</span>
                            <span class="insert">
                                <router-link :to="{ name: 'UserById', params: { id: this.post.postedBy }}">
                                {{ this.getNameByID(post.postedBy) }}
                                </router-link>
                            </span>
                        </span>
                    </div>
                    <div>
                        <span class="text">Created on:</span>
                        <time :datetime="this.post.dateCreated" class="insert">{{ this.getDate() }}</time>
                    </div>
        </header>
        <main class="main">
            <section class="control" v-if="makeEdit">
                <span>
                <router-link :to="{name: 'EditPost', params: { 'id': post._id }}" >
                    <i class="fas fa-pen"></i> edit
                </router-link>
                <a>
                    <span onclick="uploadfile.click()">
                        <i class="fas fa-cloud-upload-alt"></i> update image
                        <input type="file" class="p-button-rounded"
                        alt="upload avatar" ref="file" style="display: none" id="uploadfile" @change="sendImage($event)">
                    </span>
                </a>
                </span>
                <a @click="removePost" class="removePost" title="remove post">
                    <i class="fas fa-trash-alt"></i> remove
                </a>
            </section>
            <h2>{{post.title}}</h2>
            <div class="main-wrapper">
                <section class="post__image-wrapper" v-if="post.image">
                    <img :src="`${API_URL}${post.image}`" :alt="post.description" class="post__image">
                    <a @click="updateImage" class="updateImage" v-if="makeEdit"></a>
                </section>

                <section class="post__description">

                    <span v-if="!isPostPage" >{{post.description}} </span>
                    <span v-if="isPostPage" >{{post.fullText}} </span>
                </section>
            </div>
        </main>
        <footer class="footer">
            <section class="footer__control">
                <div class="likes">
                    <a class="text" @click="setLikes" :class="{'like-active' : !this.isLikePost}">
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
                <div class="moreLink">
                     <router-link :to="{ name: 'PostById', params: { id: this.post._id }}">
                        More details
                     </router-link>
                </div>
            </section>
            <ul class="likesList" v-if="showLikes">
                <li class="likesItem" v-for="like in post.likes"
                :key="like" :class="{'isRemove' : this.getNameByID(like) == 'Removed User' }">
                        <router-link :to="{ name: 'UserById', params: { id: like }}" class="likeLink">
                            {{this.getNameByID(like)}}
                        </router-link>
                </li>
            </ul>
        </footer>
    </article>
    {{post._id}}
</template>

<script>
import userService from '../../services/user.service';

export default {
    name: 'PostItem',
    data () {
        return {
            API_URL: process.env.VUE_APP_URL.replace('/api/v1', ''),
            showLikes: false
        };
    },
    props: {
        post: Object,
        isPostPage: Boolean
    },
    computed: {
        likesCount () {
            let result = 0;
            if (this.post.likes) {
                this.post.likes.forEach((id) => {
                        if (this.getNameByID(id) !== 'Removed User') result++;
                    }
                );
            }
            return result;
        },
        isLikePost () {
            let result;
            if ((this.post.likes) && (this.$store.state.loginID._id)) {
                this.post.likes.forEach(element => {
                    if (element === this.$store.state.loginID._id) {
                        result = true;
                    }
                });
            } else result = false;
            return result;
        },
        makeEdit () {
            if (this.post.postedBy) {
                if ((this.isPostPage) && (this.$store.state.loginID._id === this.post.postedBy)) {
                    return true;
                }
            }
            return false;
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
        },
        setLikes () {
            if (!(this.$store.state.loginID._id === this.post.postedBy)) {
                this.$store.commit('onloadProcess', true);
                const response = userService.putResponseJwtLike(`/posts/like/${this.post._id}`);
                response.then(
                    (result) => {
                        let message;
                        if (!(this.isLikePost)) {
                            message = 'You add like for post';
                        } else {
                            message = 'You remove like for post';
                        }

                        this.$toast.open({
                            message: message,
                            type: 'info',
                            duration: 5000
                        });

                        this.$emit('update-post');
                    },
                    (error) => {
                        this.$store.commit('onloadProcess', false);
                        this.$toast.open({
                            message: `${error}`,
                            type: 'error',
                            duration: 5000
                        });
                    }
                );
                this.$store.commit('onloadProcess', false);
            } else {
                this.$toast.open({
                            message: 'You not can add like for your posts',
                            type: 'info',
                            duration: 5000
                });
            }
        },
        removePost () {
            this.$store.commit('onloadProcess', true);
            const resp = userService.deleteResponceJwt(`/posts/${this.post._id}`);
            resp.then(
                (result) => {
                    this.$toast.open({
                        message: 'You delete your account ! ',
                        type: 'info',
                        duration: 10000
                    });

                    this.$emit('update-post');
            },
            (error) => {
                    this.$store.commit('onloadProcess', false);
                    this.$toast.open({
                        message: `${error}`,
                        type: 'error',
                        duration: 5000
                    });
            });
            this.$store.commit('onloadProcess', false);
        },
        sendImage (event) {
            this.$store.commit('onloadProcess', true);
            if (this.$refs.file.files[0]) {
                const formData = new FormData();
                formData.append('image', this.$refs.file.files[0]);
                const response = userService.putResponseJwtImg(`/posts/upload/${this.post._id}`, formData);
                response.then(
                    (result) => {
                        this.$emit('update-post');
                        this.$toast.open({
                            message: 'You updated post image',
                            type: 'info',
                            duration: 5000
                        });
                },
                (error) => {
                        this.$store.commit('onloadProcess', false);
                        this.$toast.open({
                            message: `${error}`,
                            type: 'error',
                            duration: 5000
                        });
                    }
                );
            }
            this.$store.commit('onloadProcess', false);
        }
    },
    mounted () {
    }
};
</script>

<style lang="scss" scoped>
a {
    color: #028165;
}
.like-active {
    filter: opacity(25%);
}
.isRemove {
    display: none;
}
.postsList {
     margin: 0.5rem 0.1rem;
     list-style-type: none;
}

.postsItem {
    list-style-type: none;
}

.postsItem__wrapper {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 1rem;
    margin: 0.5rem 0.5rem 0.5rem 0;

    background: rgba(255, 255, 255, 0.397);
    clip-path: polygon(0 1rem, 1.5rem 0, calc(100% - 1.5rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1.5rem) 100%, 1.5rem 100%, 0 calc(100% - 1rem));
}

.header {
    display: flex;
    justify-content: space-between;
    font-family: "Bebas Neue", cursive;
    color: rgba(0, 0, 0, 0.781);
    flex-wrap: wrap;
    border-bottom: 0.15rem #028165 solid;

    & > div {
        text-align: center;
    }
    span {
        padding: 0 0.2rem;
    }
    a{
        color: #028165;
    }
}

.main {

    h2 {
        margin: 0.5rem 0.2rem;
    }

    .main-wrapper {
        background: rgba(255, 255, 255, 0.561);
        padding: 0.5rem;
        border-radius: 0.5rem;
        margin: 0 0 1rem 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .post__image-wrapper {
            max-width: 300px;
            margin: 0 0.5rem 0rem;
            height: 100%;
            flex-basis: 250px;
            flex-grow: 1;
            flex-shrink: 1;
            text-align: center;
        }

        .post__description {
            height: 100%;
            flex-basis: 400px;
            flex-grow: 3;
            margin: 0 0.5rem 0rem;
            flex-shrink: 1;
        }
    }

    .control {
        display: flex;
        justify-content: space-between;
        padding: 0.2rem 0.2rem;

        a{
            font-size: 0.8rem;
            padding: 0.2rem 0.5rem;
            background-color: rgba(255, 255, 255, 0.561);
            border-radius: 0.5rem;
            margin: 0 0.2rem;
            height: 100%;
        }
        .removePost{
            color: rgba(255, 0, 0, 0.664);
        }
    }
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
