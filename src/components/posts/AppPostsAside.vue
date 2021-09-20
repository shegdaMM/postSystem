<template>
    <aside class="posts-control">
        <template v-if="!statusAside">
        <div class="posts-control--hidden">
            <a @click="statusAside = true">
                <div><i class="fas fa-chevron-left" style="border: 0.15rem #028165 solid;"></i></div>
                <div><i class="fas fa-plus"></i></div>
                <div><i class="fas fa-search"></i></div>
            </a>
        </div>
        </template>
        <template v-if="statusAside">
        <div class="posts-control--show">
            <a @click="statusAside = false" class="hide-btn">
                <div><i class="fas fa-chevron-right"></i></div>
            </a>
            <button class="addPost-btn"
                @click="$router.push('/post-new')">
                <i class="fas fa-plus"></i>
                add new Post
            </button>
            <div class="search-wrapper">
                <input type="search" placeholder="Search post..." v-model="search" @input="filter($event)">
            </div>
            <app-post-aside-users-list-wrapper
                @filter-user="filterUser"
            />
        </div>
        </template>
    </aside>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex';
import AppPostAsideUsersListWrapper from './AppPostAsideUsersListWrapper.vue';

export default {
    components: { AppPostAsideUsersListWrapper },
    name: 'post-aside',
    data () {
        return {
            search: null,
            statusAside: true,
            userId: null,
            debounce: null
        };
    },
    emits: ['filter'],
    props: {
         usersList: Object
    },
    methods: {
        clearUserId () {
            this.userId = null;
            console.log('this.userId = null');
            this.sendResponce();
        },
        filter (event) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                this.search = event.target.value || '';
                this.sendResponce();
            }, 1000);
        },
        filterUser (userId) {
            if (userId) {
                this.userId = userId;
                this.sendResponce();
            } else {
                this.userId = '';
                this.sendResponce();
            }
        },
        sendResponce () {
            const data = {
                search: this.search,
                postedBy: this.userId
            };
                this.$emit('filter', data);
        }
    },
    mounted () {
    }

};
</script>

<style lang="scss" scoped>
    .posts-control{
         max-width: 320px;
         padding: 1rem 0.5rem 1rem 1rem;
         background: rgba(255, 255, 255, 0.671);
         border-radius: 1rem 0 0 1rem;
         border-left: 0.5rem #028165 solid;
         border-right: 0.15rem #028165 solid;
         margin-top: -20px;
    }

    .posts-control--hidden {
        font-weight: 700;
        text-align: center;
        font-size: 1.2rem;
        height: 100%;

        div{
            margin: 0.9rem 0;
        }
        a{
            display: block;
            height: 100%;
            color: #028165;
        }
        i{
            background: #fff;
            display: inline-block;
            border-radius: 50%;
            padding: 0.5rem;
            width: 100%;
        }
    }

    // show ...
    .hide-btn {
        display: block;
        height: 100%;
        color: #028165;
        font-weight: 700;
        font-size: 1.2rem;
        margin: 0.5rem auto 1rem 0;

        i{
            background: #fff;
            display: inline-block;
            border-radius: 50%;
            padding: 0.5rem;
            padding-left: 0.75rem;
            width: 2.5rem;
            border: 0.15rem #028165 solid;
        }
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
        position: relative;

         .unCheckUserId {
            display: inline-block;
            font-weight: 700;
            font-size: 1rem;
            margin: 0.1rem auto 0.5rem 0;
            color: red;
            position: absolute;
            top: -1px;
            right: 1rem;
            height: 100%;
            z-index: 5;

            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 0.5rem;
        }
        a{
            width: 100%;
            padding: 0.25rem 1.3rem 0.25rem 0.5rem;
            margin: 0.25rem 0.1rem 0.25rem 0;
            background: #ffffff;
            color: #00795e;
            font-weight: 500;
            display: block;
            border-radius: 0.8rem;
        }
        input {
            position: absolute;
            right: 1rem;
            height: 100%;
            background: #00af89;
        }
        label {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
</style>
