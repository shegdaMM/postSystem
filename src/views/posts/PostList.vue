<template v-if="isLoad">
<div class="post-list-wrapper">
    <template v-if="!havePosts">
        <h2 class="postsNotHave">
            Sorry, we not have posts...
        </h2>
    </template>
    <template v-if="havePosts">
       <ul class="post-list">
            <li class="post-list_item"
                v-for="post in postList"
                :key="post._id">
                <post-by-id
                    :post="post"
                    :isPostPage="false"
                    @post-update="this.$emit('post-update')"
                />
            </li>
        </ul>
  </template>
</div>
</template>

<script>
import PostById from '@/views/posts/PostById';
export default {
    components: {
        PostById
    },
    emits: ['post-update'],
    props: {
        postList: Array
    },
    data () {
        return {
            isLoad: false
        };
    },
    computed: {
        havePosts () {
            let result = false;
            if (this.postList) {
                result = this.postList.length > 0;
            }
            return result;
        }
    },
    mounted () {
            this.isLoad = true;
    }
};
</script>

<style>
 .postsNotHave{
        text-align: center;
  }
  .post-list {
      list-style-type: none;
  }
</style>
