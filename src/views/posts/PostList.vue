<template>
<div class="post-list-wrapper">
    <ul class="post-list">
        <li class="post-list_item" >
            <post-by-id
                :uid="'6139d6b3c46d5405b3586a23'"
                :isPostPage="false"
            />
        </li>
    </ul>
</div>
</template>

<script>
import PostById from '@/views/posts/PostById';
export default {
    components: {
        PostById
    },
    props: {
        postList: Array
    }
};
</script>

<style>

</style>
