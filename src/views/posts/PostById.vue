<template>
    <div class="post-wrapper">
        <app-post :post="thisPost"/>
    </div>
</template>

<script>
import AppPost from '@/components/posts/AppPost';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'PostById',
    data () {
        return {
        };
    },
    emits: ['post-update'],
    components: {
       AppPost
    },
    props: {
        uid: {
            type: String
        },
        post: {
            type: Object
        }
    },
    computed: {
        ...mapGetters(['currentPost']),
        thisPost () {
            let result;
            if (this.post) {
                result = this.post;
            } else {
                result = this.currentPost;
            }
            return result;
        }
    },
    methods: {
        ...mapActions(['getPostById', 'clearCurrentPost']),
        removePostDialog () {
            this.$q.dialog({
                title: 'Remove this post?',
                message: 'Are you sure you want to delete your post?',
                cancel: true,
                persistent: true,
                color: 'black'
            })
            .onOk(() => {
                this.removePost();
            });
        },
        async removePost () {
            await this.removePostById({ id: this.uid ? this.uid : this.post._id });
            this.$emit('post-update');
        }
    },
    async mounted () {
        if (this.uid) {
            await this.getPostById({ id: this.uid });
        }
    },
    beforeUnmount () {
        this.clearCurrentPost();
    }
};
</script>

<style>

</style>
