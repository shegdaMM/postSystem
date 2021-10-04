<template>
  <div class="app-wrapper">
    <app-header />
      <div id="page-container">
        <app-breadcrumbs />
        <router-view />
      </div>
    <app-loader v-if="isLoaderStatus" />
    <app-notify />
  </div>
</template>

<script>
import AppLoader from './components/AppLoader';
import AppHeader from './components/AppHeader.vue';
import AppBreadcrumbs from './components/AppBreadcrumbs.vue';
import AppNotify from '@/components/ui/AppNotify';

export default {
  name: 'App',
  components: {
    AppLoader, AppHeader, AppBreadcrumbs, AppNotify
  },
  computed: {
    isLoaderStatus () {
      return this.$store.getters.loadProcess;
    }
  }
};
</script>

<style lang="scss">
.app-wrapper {
  min-height: 100vh;
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
    width: 55px;
    height: 55px;
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
    max-width: 1400px;
    padding: 20px;
    width: 100%;
    margin: 0 auto;
  }
  // transition
  .moveInUp-enter-active {
    opacity: 0;
    transition: opacity 1s ease-in;
  }
</style>
