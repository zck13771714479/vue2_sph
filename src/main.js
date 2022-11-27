import Vue from 'vue'
import App from './App.vue'

import router from '@/router/index'
import TypeNav from '@/components/TypeNav/TypeNav.vue'
import Carousel from '@/components/Carousel/Carousel.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import store from '@/store'
import '@/mock/server'
import 'swiper/css/swiper.css'
import * as API from '@/api/request'

import {MessageBox} from 'element-ui'
import VueLazyload from 'vue-lazyload'
import loadimage from '../public/images/banner4.jpg'
import '@/plugins/validate'

Vue.use(VueLazyload,{
  loading: loadimage,
})

Vue.component('TypeNav',TypeNav);
Vue.component('Carousel',Carousel);
Vue.component('Pagination',Pagination);

Vue.config.productionTip = false;

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  beforeMount(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app')
