<template>
    <div
        class="comment-list"
        v-if="Object.keys(childs).length"
    >
        {{childs}}
    </div>
</template>

<script>
export default {
    props: {
        childs: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
