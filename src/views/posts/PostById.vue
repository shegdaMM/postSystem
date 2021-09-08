<template>
  <article class="postsItem__wrapper">
                <h2>{{post.title}}</h2>
                <main>
                    <section class="post__description">
                        {{post.description}}
                    </section>
                </main>
    </article>
</template>

<script>
export default {
    name: 'post-by-id',
    props: {
        post: Object,
        postId: String
    }
};
</script>

<style>

</style>
