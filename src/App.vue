<template>
  <div class="app-wrapper">
    <app-header />
      <div id="page-container">
        <router-view />
      </div>
    <app-loader v-if="this.$store.getters.loadProcess" />
  </div>
</template>

<script>
// import { ref } from 'vue';
import AppLoader from './components/AppLoader';
import AppHeader from './components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppLoader, AppHeader
  },
  data () {
    return {
    };
  },
  mounted () {
    this.$store.commit('setUserAlert', this.$toast);
    this.$store.commit('setAuthAlert', this.$toast);
    this.$store.commit('setPostAlert', this.$toast);
    this.$store.commit('setCommentAlert', this.$toast);
  }
};
</script>

<style lang="scss">
.app-wrapper {
  height: 100%;
}
#header * {

  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.733);
  a{
    color: rgba(0, 0, 0, 0.733);
  }
}

#header .my-user-menu {
  min-width: 50px;
  img.q-icon {
    width: 60px;
    height: 60px;
    display: block;
  }
}

.q-menu {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    padding: 0.5rem 0.2rem;
  }

  #page-container {
    padding: 0.8rem 0rem;
    max-width: 1400px;
    padding: 20px;
    width: 100%;
    margin: 0 auto;
  }
</style>
