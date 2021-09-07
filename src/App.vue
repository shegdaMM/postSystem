<template>
  <app-header />
  <div class="app-wrapper">
    <router-view/>
  </div>
  <app-loader />
  <Toast position="bottom-right" group="br" />
</template>

<script>
import AppHeader from './components/AppHeader';
import AppLoader from './components/AppLoader';
import userService from './services/user.service';
import Toast from 'primevue/toast';

async function GetLoginID () {
        return await userService.getResponseJwt('/auth/user');
}

async function SetUsersID () {
        return await userService.getResponse('/users?limit=0');
}

export default {
  name: 'app',
  components: {
    AppHeader, AppLoader, Toast
  },
  updated () {
  },
  mounted () {
    userService.setToast(this.$toast);
  },
  created () {
     if (localStorage.getItem('token')) {
      this.$store.commit('onloadProcess', true);
      setTimeout(() => {}, 10000);
      GetLoginID()
      .then(
        (data) => {
          this.$store.commit('setLoginID', data.data);
        },
        (error) => {
          console.log(error);
        })
        .catch(
          (error) => {
            console.log(error);
          }
        ).finally(
          () => {
            this.$store.commit('onloadProcess', false);
          }
        );
      SetUsersID().then(
         (users) => {
           const arr = users.data.data;
           for (let i = 0; i < arr.length; i++) {
            const el = arr[i];
            this.$store.commit('setToUserIDMap', [el._id, el.name]);
           }
         },
         (err) => {
           console.log(err);
         }
      ).catch(
        (error) => {
           console.log(error);
        }
      );
    }
  }
};
</script>
<style lang="scss">
 #app {
  width: 100vw;
  height: 100vh;
  position: relative;
 }
</style>
