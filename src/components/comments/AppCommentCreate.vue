<template>
<div class="componens-create">
    <comment-edit :startText="''">
        CREATE COMMENT
    </comment-edit>
</div>
</template>

<script>
import CommentEdit from './CommentEdit.vue';

export default {
    components: {
            CommentEdit
    },
    props: {
        postId: {
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
