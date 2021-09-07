<template>
    <aside class="posts-control">
        <button class="addPost-btn">
            <i class="fas fa-plus"></i>
            add new Post
        </button>
        <div class="search-wrapper">
            <input type="search" placeholder="Search post..." v-model="search" @keydown.enter.stop="runSearch">
            <a @click="runSearch">
                <i class="fas fa-search"></i>
            </a>
        </div>

        <h2>Search user posts:</h2>
        <ul class="users">
            <li class="users__item" v-for="user in nameUsersList" :key="user[0]">
                    <router-link :to="{ name: 'UserById', params: { id: user[0] }}">
                        {{user[1]}}
                    </router-link>
            </li>
        </ul>
    </aside>
</template>

<script>
export default {
    name: 'post-aside',
    data () {
        return {
            search: ''
        };
    },
    props: {
         nameUsersList: Array
    },
    methods: {
        runSearch () {
            this.$$emit('search', this.search);
        }
    },
    mounted () {
    }

};
</script>

<style lang="scss" scoped>
.posts-control{
         max-width: 300px;
         padding: 1rem 0.5rem 1rem 1rem;
         background: rgba(255, 255, 255, 0.671);
         border-radius: 1rem 0 0 1rem;
         border-left: 0.5rem #028165 solid;
         border-right: 0.15rem #028165 solid;
    }

    .addPost-btn {
        background: #ffffff;
        border: 3px solid #00ffff;
        border-radius: 10px;
        padding: 0.3rem 1.5rem;
        color: #00af89;
        display: block;
        font-size: 1.2rem;
        text-align: center;
        width: 100%;
    }

    // search
    .search-wrapper{
        position: relative;
        margin: 1rem 0;

        input {
            padding: 0.3rem 0.5rem;
            border-radius: 0.5rem;
            padding-right: 1.5rem;
            font-size: 1.2rem;
            width: 100%;
            border: 3px solid #00ffff;
        }

        a{
            color: #00af89;
            display: inline-block;
            height: 100%;
            font-size: 1rem;

            position: absolute;
            right: 0.5rem;
            top: 0;

            display: flex;
            flex-direction: column;
            justify-content: center;

        }
    }
    h2{
        margin-bottom: 0.2rem;
        margin-left: 0;
    }

    // users-list
    .users__item {
        list-style-type: none;
        a{
            width: 100%;
            padding: 0.25rem 0;
        }
    }
</style>
