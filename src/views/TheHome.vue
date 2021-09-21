<template>
  <div class="home">
    <app-title-page>
        HOME
    </app-title-page>
    <app-input v-model="name" />
  </div>
</template>

<script>
import AppTitlePage from '@/components/ui/AppTitlePage';
import AppInput from '@/components/ui/AppInput';

export default {
  name: 'Home',
  components: {
    AppTitlePage,
    AppInput
  },
  data () {
    return {
      name: ''
    };
  },
  computed: {
  },
  mounted () {
  }
};
</script>
