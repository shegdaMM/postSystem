<template>
  <div class="page-wrapper">
    <h1>Log in form</h1>
    <section class="login-form">
    <div class="q-pa-md" style="max-width: 400px">
        <q-form
        @submit.stop="login"
        class="q-gutter-md">

        <q-input filled v-model="email" type="email" label="email" hint="Enter valid email"
        :rules="[val => !!val || 'Email is missing', isValidEmail]" ref="email"
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-envelope" />
          </template>
        </q-input>

        <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="password"
          ref="password"  :rules="[val => (val && val.length > 5) || 'Password must be longer than 6 characters']"
        >
        <template v-slot:prepend>
            <q-icon name="fas fa-key" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'fas fa-eye' : 'fas fa-eye-slash'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <p class="text-center">Don’t have an account? <router-link to="/registration">Sign up now.</router-link></p>
        <div class="login-btn-group">
          <q-btn class="my-btn" label="Submit" type="submit" color="primary" icon="fas fa-sign-in-alt" />
          <q-btn label="Reset" @click.stop="reset" type="reset" color="primary" flat class="q-ml-sm my-btn" icon="fas fa-trash-alt"/>
        </div>
      </q-form>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'logIn',
  data () {
    return {
      email: '',
      password: '',
      isPwd: ref(true),
      error: ''
    };
  },
  methods: {
    async login () {
      if (this.email && this.password) {
        this.$store.commit('onloadProcess');
        await this.$store.dispatch('logIn', { email: this.email, password: this.password });
        this.$store.commit('onloadProcess');
      }
    },
    isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    },
    reset () {
      this.$refs.email.resetValidation();
      this.$refs.password.resetValidation();
      this.email = '';
      this.password = '';
    }
  },
  mounted () {
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  justify-content: center;
}
.login-btn-group {
  display: flex;
  justify-content: space-between;

  * {
    flex: 1 1 50%;
  }
}
</style>
