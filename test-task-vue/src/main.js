import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import { clickOutside } from '@/utils/click-outside';
import '../node_modules/nprogress/nprogress.css';

axios.defaults.headers.Authorization =
  'Api-Key VSfHLDHK.MM3MeLZNV9HMDEY5s1zz4Yl79lbRwoux';

createApp(App)
  .use(store)
  .use(router)
  .directive('clickOut', clickOutside)
  /* .directive('clickOutside', vClickOutside) */
  .mount('#app');
