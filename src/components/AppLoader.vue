<template>
<div class="spinner-wrapper" v-if="loadProcess">
  <ProgressSpinner style="width: 5rem; height: 5rem" strokeWidth="0.5rem"  animationDuration="1.5s"/>
</div>
</template>

<script>
import ProgressSpinner from 'primevue/progressspinner';

export default {
  name: 'app-loader',
  components: {
    ProgressSpinner
  },
  computed: {
    loadProcess () { return this.$store.state.loadProcess; }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.spinner-wrapper{
  position: absolute;
  width: 100vw;
  height: 100vh;

  top: 0;
  bottom: 0;
  background: rgba(3, 177, 96, 0.473);
  z-index: 5;

  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
</style>
