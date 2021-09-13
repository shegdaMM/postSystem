<template>
    <section class="user-wrap">
     <user-logo :avatar="currentUser.avatar" :name="this.currentUser.name" :ID="this.currentUser._id" class="user-logo"
            @user-update="userUpdate" @remove-user="removeUserDialog"/>
        <v-user :user="currentUser" :ID="this.currentUser._id" class="user-info"/>
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
import vUser from '../components/vUser.vue';
import UserLogo from '../components/UserLogo.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UserById',
  data () {
      return {
      };
  },
  props: {
      uid: {
        type: String,
        required: true
      }
  },
  components: {
     vUser, UserLogo
  },
  computed: {
    ...mapGetters(['currentUser'])

  },
  methods: {
    ...mapActions(['getUserById']),
    async userUpdate () {
      await this.getUserById({ id: this.uid });
    },
    removeUserDialog () {
      this.$q.dialog({
        title: 'Remove your accont',
        message: 'Are you sure you want to delete your account?',
        cancel: true,
        persistent: true,
        color: 'black'
      })
      .onOk(() => {
        this.removeUser();
      });
    },
    async removeUser () {
      await this.removeUserById({ id: this.uid });
    }
  },
  async mounted () {
    await this.getUserById({ id: this.uid });
  }
};
</script>
