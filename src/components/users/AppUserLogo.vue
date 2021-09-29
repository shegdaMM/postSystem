<template>
<div class="avatar-wrapper">
    <div class="avatar-view">
      <a style="text-decoration: none; cursor: pointer;" @click="this.$router.push({ name: 'UserById', params: { uid: this.ID } })">
            <img v-if="!image" :key="image" :src="defaultAvatar" :alt="`logo for - ${name}`" class="avatar">
            <img v-if="image" :key="image" :src="image ? `${IMG_URL}${image}` : defaultAvatar" :alt="`logo for - ${name}`" class="avatar">

      </a>
       <template v-if="this.$store.getters.loggedInUser._id === this.ID">
          <span onclick="uploadfile.click()" class="avatar-button">
              <i class="fas fa-cloud-upload-alt"></i>
              <input type="file" class="p-button-rounded"
              alt="upload avatar" ref="file" style="display: none" id="uploadfile" @change.stop="sendAvatar($event)">
          </span>
          <ul class="usercontrol">
              <li class="usercontrol__edit">
                <a @click="editUser" title="edit user" style="padding: 0 0 0 0.2rem;">
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
         <q-btn @click="this.$router.push({ name: 'ThePosts', query: { postedBy: this.ID } });">
            Show all posts
          </q-btn>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AppUserLogo',
  data () {
    return {
      file: null,
      image: null,
      IMG_URL: process.env.VUE_APP_IMG_URL,
      defaultAvatar: process.env.VUE_APP_DEFAULTAVATAR
    };
  },
  emits: ['remove-user', 'user-update'],
  components: {
  },
  props: {
    avatar: String,
    name: String,
    ID: String
  },
  computed: {
    ...mapGetters(['currentUserAvatar'])
  },
  methods: {
      ...mapActions(['getCurrentUserAvatar', 'putCurrentUserAvatar']),
      removeUser () {
        this.$emit('remove-user');
      },
      editUser () {
        this.$router.push({ name: 'UserEdit', params: { uid: this.ID } });
      },
      async sendAvatar (event) {
        if (this.$refs.file.files[0]) {
            const formData = new FormData();
            formData.append('avatar', this.$refs.file.files[0]);
            const result = await this.putCurrentUserAvatar({ id: this.ID, data: formData });
            if (result) {
              this.$emit('user-update');
              // this.image = await this.getCurrentUserAvatar({ avatar: this.avatar });
            }
        }
      }
  },
  async mounted () {
    this.image = await this.getCurrentUserAvatar({ avatar: this.avatar });
  }
};
</script>

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
