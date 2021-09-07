import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vue-toast-notification/dist/theme-sugar.css';
import Dialog from 'primevue/dialog';
import AppHeader from '@/components/AppHeader.vue';
import Menubar from 'primevue/menubar';

import 'primevue/resources/themes/saga-green/theme.css';
import 'primevue/resources/primevue.min.css';

import './assets/material-icons/material-design-icons.css';
import './main.scss';
import PrimeVue from 'primevue/config';
import Toast from 'primevue/toast';
import VueToast from 'vue-toast-notification';

createApp(App)
.use(store)
.use(router)
.use(PrimeVue)
.use(VueToast)
.component('Dialog', Dialog)
.component('AppHeader', AppHeader)
.component('Menubar', Menubar)
.component('Toast', Toast)
.mount('#app');
