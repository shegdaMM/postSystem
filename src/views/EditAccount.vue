<template>
<h1> Edit your account in the system </h1>
<div class="info">
  <div class="user-text" v-if="user.dateCreated">
    <span class="discriptoin">ACCOUNT CREATED:</span>
    <span class="user__dateCreated">{{user.dateCreated}}</span>
  </div>
  <div class="user-text">
    <span class="discriptoin">ID:</span>
    <span class="user__id" v-if="user._id">{{user._id}}</span>
  </div>
  <div class="user-text" v-if="user.email">
    <span class="discriptoin">EMAIL:</span>
    <span class="user__email"><a :href="'mailto:' + user.email">{{user.email}}</a></span>
  </div>
</div>

<form v-on:submit.prevent="save" class="edit-form">
  <div class="user-info">
    <span class="p-float-label p-field">
      <InputText id="name" @input="changeState=true" type="text" v-model="user.name" class="form-input" />
      <label for="name">Name: </label>
      <small id="name-help" class="p-error name-error" v-if="errorname">{{ errorname }}</small>
    </span>

    <span class="p-float-label p-field p-field-last">
      <Textarea id="e-details" @input="changeState=true" :autoResize="true" rows="5" cols="30" v-model="user.extra_details" class="form-input"/>
      <label for="e-details">Extra details: </label>
    </span>
  </div>

  <div class="user-profession">
    <span class="p-float-label p-field">
      <InputText id="profession" @input="changeState=true" type="text" v-model="user.profession" class="form-input" />
      <label for="profession">Profession: </label>
    </span>

    <span class="p-float-label p-field p-field-last">
      <Textarea id="skills" @input="changeState=true" :autoResize="true" rows="5" cols="30" v-model="user.skills" class="form-input"/>
      <label for="skills">Slills: </label>
    </span>
  </div>

  <div class="details">
     <span class="p-float-label p-field p-field-last">
      <Textarea id="details" @input="changeState=true" :autoResize="true" rows="5" cols="30" v-model="user.details" class="form-input"/>
      <label for="details">Details: </label>
    </span>
  </div>
  <button>SAVE</button>
</form>
</template>

<script>
// :disabled="checkState"
// :class="{'blocked' : checkState}"
import userService from '../services/user.service';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

export default {
  name: 'EditAccount',
  components: {
    InputText, Textarea
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
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
        },
        errorname: null,
        changeState: false
      };
  },
  async mounted () {
    this.$store.commit('onloadProcess', true);
    await userService.getResponse(`/users/${this.id}`).then(
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
    this.$store.commit('onloadProcess', false);
  },
  methods: {
    save () {
      this.errorname = '';
      // [([A-Z]{1}[a-z]+){1}[ ]{1}([A-Z]{1}[a-z]+){1}'
      const isBadValue = this.user.name.search('[0-9]+') > -1;
      if (isBadValue) {
        this.errorname = 'Not correct user name';
      } else {
        this.errorname = '';
        if (this.changeState) {
          const response = userService.patchResponceJwt(`/users/${this.id}`, {
            name: this.user.name,
            extra_details: this.user.extra_details,
            skills: this.user.skills,
            profession: this.user.profession,
            details: this.user.details
          });
          response.then(
          (data) => {
              this.$toast.open({
                message: 'You update your account ! ',
                type: 'info',
                duration: 10000
              });
              this.$router.push({ name: 'UserById', params: { id: this.user._id } });
          },
          (error) => {
              console.log(error);
              this.$toast.open({
                    message: error,
                    type: 'error',
                    duration: 5000
              });
          }
        );
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.info {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin: 0.2rem auto;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    flex-wrap: wrap;
}
.info > * {
    flex-grow: 1;
    flex-shrink: 1;
    margin: 0.25rem 0.4rem 0.1rem;
    padding: 0.2rem 0.7rem 0.1rem;
    border: #00af89 solid 0.1rem;
    border-radius: 1rem;
}
.user-text {
    margin-bottom: 0.5rem;
    display: flex;
  }
.discriptoin {
    font-family: 'Bebas Neue', cursive;
    display: inline-block;
    min-width: 6.5rem;
}
// form
.edit-form{
  padding: 1.5rem 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

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
  .p-float-label{
      width: 100%;
  }
  .form-input {
      width: 100%;
  }
  .p-field {
      margin-bottom: 1.8rem;
  }
  label {
    font-size: 1.2rem;
  }
}

.user-info, .user-profession, details, button{
  margin: 0.7rem 0.5rem;
  flex-basis: 48%;
  flex-grow: 1;
  flex-shrink: 1;
}
.details {
  flex-basis: 100%;
  padding: 0 0.45rem;
}

.edit-form .p-field-last {
  margin-bottom: 0.8rem;
}
.blocked {
  filter: sepia(50%);
}
</style>
