<template>
<h1> Information about your account in the system </h1>
    <user-by-id :id="id" v-if="!!id"/>
</template>

<script>
import UserById from '../components/UserById.vue';

export default {
  name: 'LoginUser',
  data () {
      return {};
  },
  methods: {
  },
  components: {
      UserById
  },
    computed: {
        id () {
            return this.$store.state.loginID._id;
        }
    },
  mounted () {
      if (!this.$store.state.loginID._id) {
          this.$router.push({ path: '/' });
      }
  }
};
</script>

<style lang="scss" scoped>
</style>
