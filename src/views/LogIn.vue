<template>
  <div class="page-wrapper">
    <h1>Log in form</h1>

    <form id="authform"  class="authform" v-on:submit.prevent="login">

      <p>Don’t have an account? <router-link to="/registration">Sign up now.</router-link></p>
      <button>Submit</button>
    </form>

  </div>
</template>

<script>

export default {
  name: 'logIn',
  data () {
    return {
      email: '',
      password: '',
      error: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    login () {
      //
    }
  }

};
</script>

<style>

</style>
