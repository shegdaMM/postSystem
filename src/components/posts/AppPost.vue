<template>
<article class="postsItem__wrapper">
    {{post}}
   <header class="header" v-if="post">
        <div>
            <span v-if="this.getNameByID(post.postedBy) !== ''">
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
</article>
</template>

<script>
import UserNameMap from '@/services/UserNameMap';

export default {
  data () {
        return {
            API_IMG: process.env.VUE_APP_IMG_URL,
            showLikes: false,
            UserNameMap: UserNameMap
        };
    },
    props: {
        post: Object,
        isPostPage: {
            type: Boolean,
            default: false
        }
    },
    emits: ['post-update'],
    methods: {
        getDate () {
            const date = new Date(this.post.dateCreated);
            let mounth = date.getUTCMonth() + 1;
            if (mounth < 10) mounth = '0' + mounth;
            const result = date.getUTCDate() + '.' + mounth + '.' + date.getUTCFullYear();
            return result;
        },
        getNameByID (id) {
            const userName = UserNameMap.getUserName(id);
            return userName;
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
