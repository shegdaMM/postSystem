<template>
<h1>Login form</h1>

<form id="authform"  class="authform" v-on:submit.prevent="getLogin">
  <span class="p-float-label p-field">
    <InputText id="email" type="email" v-model="user.email" class="authform-input" />
    <label for="email">Email</label>
    <small id="email-help" class="p-error email-error" v-if="erroremail">{{ erroremail }}</small>
  </span>

  <span class="p-float-label p-field" style="margin-bottom: 0.4rem">
    <InputText id="password" type="password" v-model="user.password" class="authform-input" />
    <label for="password">Password</label>
    <small id="password-help" class="p-error password-error" v-if="errorpass"> {{ errorpass }} </small>
  </span>

  <p style="margin-bottom: 0.3rem; font-size: 0.9rem;">Don’t have an account? <router-link to="/registration" class="p-menuitem-link">Sign up now.</router-link></p>

  <button>Submit</button>
</form>
</template>

<script>
import axios from 'axios';
// import ValidationProvider from 'vee-validate';
import InputText from 'primevue/inputtext';
import userService from '../services/user.service.js';

const API_URL = process.env.VUE_APP_URL;

export default {
  name: 'Auth',
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      result: null,
      erroremail: null,
      errorpass: null
    };
  },
  components: {
    InputText
  },
  methods: {
    async getLoginID () {
      this.$store.commit('onloadProcess', true);
      const response = await userService.getResponseJwt('/auth/user');
      this.$store.commit('setLoginID', response.data);
      this.$store.commit('onloadProcess', false);
    },
    getLogin () {
      this.erroremail = null;
      this.errorpass = null;
       if (!this.user.email) {
        this.erroremail = 'Please enter your email';
      } else if (!this.user.password) {
        this.errorpass = 'Please enter your password';
      } else if (this.user.password.length <= 5) {
        this.errorpass = 'Password must be longer';
        return;
      }
      this.$store.commit('onloadProcess', true);
      try {
        axios.post(`${API_URL}/auth`, {
          email: this.user.email,
          password: this.user.password
        })
        .then((data) => {
          if (data.data.token) {
            localStorage.setItem('token', data.data.token);
            this.getLoginID();
            this.$router.push({ path: '/' });
             this.$toast.open({
                message: 'You are logged in!',
                type: 'info',
                duration: 5000
          });
          }
        }, (error) => {
          const err = JSON.parse(error.request.response);
          if (Array.isArray(err.error)) {
            for (let i = 0; i < err.error.length; i++) {
              const el = err.error[i];
              if (el.path[0] === 'email') { this.erroremail = el.message; }
              if (el.path[0] === 'password') { this.errorpass = el.message; }
            }
          } else {
              this.$toast.open({
                message: JSON.parse(error.request.response).error,
                type: 'error',
                duration: 5000
              });
          }
        });
      } catch (error) {
          this.$toast.open({
                message: error,
                type: 'error',
                duration: 5000
          });
      } finally {
        this.$store.commit('onloadProcess', false);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1{
  text-align: center;
  font-size: 1.4rem;
}
.authform{
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    background:    #ffffff;
    border:        3px solid #00ffff;
    border-radius: 10px;
    padding:       0.3rem 1.5rem;
    color:         #00af89;
    display:       block;
    font-size:     1.2rem;
    text-align:    center;
    width: 100%;
    max-width: 350px;
  }
}
.p-float-label{
  max-width: 350px;
  width: 100%;
}
.authform-input {
  width: 100%;
}
.p-field {
  margin-bottom: 1.8rem;
}

</style>
