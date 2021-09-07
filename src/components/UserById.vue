<template>
    <section class="user-wrap">
            <user-logo :avatar="this.getAvatar" :name="this.user.name" :ID="this.user._id" class="user-logo"
            @updateuser="update" @removeuser="removeUser" @gotoedit="pushToEdit"/>
            <v-user :user="user" :ID="this.user._id" @updateuser="update" class="user-info"/>
    </section>
</template>

<style lang="scss" scoped>
.user-wrap {
  height: 100%;
  padding: 1.2rem 0.5rem;
}
.user-wrap {
  background: rgba(255, 255, 255, 0.397);
  clip-path: polygon(0 1rem, 1.5rem 0, calc(100% - 1.5rem) 0,
  100% 1rem, 100% calc(100% - 1rem), calc(100% - 1.5rem) 100%,
  1.5rem 100%,  0 calc(100% - 1rem));
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  min-width: 300px;
}
 @media (max-width: 900px) {
      .user-wrap{
        width: 100%;
      }
    }
.user-logo {
  flex-shrink: 1;
  flex-grow: 1;
  max-width: 200px;
  min-width: 180px;
}
.user-info {
  flex-shrink: 1;
  flex-grow: 1;
  min-width: 300px;
}
 @media (max-width: 1100px) {
   .user-wrap{
     flex-wrap: wrap;
   }
 }
  @media (max-width: 651px) {
    .user-wrap{
      flex-direction: row;
    }
  }
.usercontrol {
    display: inline-block;
    text-align: center;

    list-style-type: none;
    li {
      display: inline-block;
      margin: 0.5em 0.2rem;
      padding: 0.4rem;
      text-align: center;
      background: #00af89;
      font-size: 1.2rem;
      border-radius: 50%;
      i{
        padding: 0;
      }
      a{
        color: #fff;
      }
    }
}
</style>

<script>
import userService from '../services/user.service';
import vUser from '../components/vUser.vue';
import UserLogo from '../components/UserLogo.vue';

export default {
  name: 'UserById',
  data () {
      return {
        user: {
            _id: '',
            email: '',
            name: '',
            avatar: '',
            extra_details: '',
            skills: '',
            profession: '',
            details: '',
            dateCreated: '',
            __v: ''
        }
      };
  },
  props: {
      id: String,
      propsUser: Object
  },
  components: {
     vUser, UserLogo
  },
  computed: {
    getAvatar () {
      let result;
      if (this.user.avatar !== undefined) {
        result = this.user.avatar;
      } else {
        result = 'null';
      }
      return result;
    },
    loadUser () {
      if (!this.id) {
        this.$store.commit('onloadProcess', true);
      } else {
        this.getUser();
        this.$store.commit('onloadProcess', false);
      }
      return !this.avatar;
    }
  },
  methods: {
    pushToEdit () {
      this.$router.push({ name: 'EditAccount', params: { id: this.user._id } });
    },
    getUser () {
      if (this.propsUser) {
        this.user = this.propsUser;
      } else {
        const response = userService.getResponse(`/users/${this.id}`);
        response.then(
          (data) => {
              this.user = data.data;
          },
          (error) => {
              this.$toast.open({
                    message: error,
                    type: 'error',
                    duration: 5000
              });
          }
        );
      }
    },
    update (upuser) {
      if (upuser) {
        // this.user = upuser;
      }
    },
    removeUser () {
      this.$store.commit('onloadProcess', true);
     /* const resp = userService.deleteResponceJwt(`/users/${this.ID}`);
      resp.then(
        (result) => {
            this.$toast.open({
              message: 'You delete your account ! ',
              type: 'info',
              duration: 10000
            });
        },
        (error) => {
          this.$store.commit('onloadProcess', false);
          this.$toast.open({
              message: `${error}`,
              type: 'error',
              duration: 5000
            });
          }
                );
      */
      // localStorage.removeItem('token');
      // this.$store.commit('setLoginID', null);
      this.$store.commit('onloadProcess', false);
      this.$router.push({ path: '/' });
    }
  },
  async mounted () {
    this.$store.commit('onloadProcess', true);
    if (this.id) {
       await this.getUser();
    }
    this.$store.commit('onloadProcess', false);
  }
};
</script>
