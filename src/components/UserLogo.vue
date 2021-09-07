<template>
<div class="avatar-wrapper" v-if="avatar">
    <div class="avatar-view">
        <img :src="(this.avatar !== 'null') ? this.getAvatar() : this.defaultAvatar" :alt="`logo for - ${name}`" class="avatar">
        <template v-if="this.$store.state.loginID._id === this.ID">
          <span onclick="uploadfile.click()" class="avatar-button">
              <i class="fas fa-cloud-upload-alt"></i>
              <input type="file" class="p-button-rounded"
              alt="upload avatar" ref="file" style="display: none" id="uploadfile" @change="sendAvatar($event)">
          </span>
          <ul class="usercontrol">
              <li class="usercontrol__edit">
                <a @click="this.$emit('gotoedit')" title="edit user" style="padding: 0 0 0 0.2rem;">
                  <i class="fas fa-user-edit"></i>
                </a>
              </li>
              <li class="usercontrol__delete">
                <a title="Delete user" @click="removeUser">
                  <i class="fas fa-trash-alt" style="padding: 0 0.3rem;"></i>
                </a>
              </li>
          </ul>
        </template>
    </div>
</div>
</template>

<style lang="scss" scoped>
    .avatar {
        width: 100%;
        max-width: 170px;
    }
    .avatar-view {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 1rem 0.5rem 0;
    }
    .avatar-wrapper{
        margin: 0.2rem auto;
        padding: 1rem 0.2rem 0.1rem;
    }
    .avatar-button {
       background: #00af89;
       align-self: flex-end;
       margin-top: -2rem;
       margin-right: -0.5rem;
       padding: 0.2rem 0.4rem;
       border-radius: 50%;
       font-size: 1.3rem;
       color: #fff;
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
      font-size: 1.1rem;
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
// import base64 from 'image-to-base64';
import userService from '../services/user.service';

export default {
  name: 'UserLogo',
  data () {
    return {
      image: null,
      file: null,
      newFile: null,
      defaultAvatar: process.env.VUE_APP_DEFAULTAVATAR
    };
  },
  components: {
  },
  beforeUpdate () {
  },
  props: {
    avatar: String,
    name: String,
    ID: String
  },
  computed: {
    loadImg () {
      if (!this.avatar) {
        this.$store.commit('onloadProcess', true);
      } else {
        this.getAvatar();
        this.$store.commit('onloadProcess', false);
      }
      return !this.avatar;
    }
  },
  methods: {
      removeUser () {
        this.$emit('removeUser');
      },
      sendAvatar (event) {
          this.$store.commit('onloadProcess', true);
          if (this.$refs.file.files[0]) {
                const formData = new FormData();
                formData.append('avatar', this.$refs.file.files[0]);
                const response = userService.putResponseJwtImg(`/users/upload/${this.ID}`, formData);
                response.then(
                    (result) => {
                        this.$emit('updateuser', result.data);

                        this.$toast.open({
                            message: 'You updated your avatar',
                            type: 'info',
                            duration: 5000
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
          }
        this.$store.commit('onloadProcess', false);
      },
      getAvatar () {
          this.$store.commit('onloadProcess', true);
          const response = userService.getResponseImg(this.avatar);
          response.then(
              (data) => {
                this.image = data;
              },
              (error) => {
                  this.image = this.defaultAvatar;
                  this.$toast.open({
                          message: 'Not can load logo',
                          type: 'error',
                          duration: 5000
                  });
                  error = null;
              }
          );
        this.$store.commit('onloadProcess', false);
        return this.image;
      }
  }
};
</script>
