<template>
  <div class="postCreate">
      <app-title-page>
        CREATE NEW POST
      </app-title-page>
      <app-post-edit @form-submit="createPost">
        CREATE
      </app-post-edit>
  </div>
</template>

<script>
import AppTitlePage from '../../components/ui/AppTitlePage.vue';
import AppPostEdit from '@/components/posts/AppPostEdit';
export default {
  components: {
    AppTitlePage, AppPostEdit
  },
  methods: {
    createPost (data) {
      
    }
  }
};
</script>

<style>

</style>
