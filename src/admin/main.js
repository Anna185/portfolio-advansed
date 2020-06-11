import Vue from 'vue';
import App from './App.vue'
import VueRouter from 'vue-router'
import {store} from './store';
import router from './routes.js';
import $axios from "./requests";
import Vuelidate from 'vuelidate';

store.$axios = $axios;
 
Vue.use(VueRouter)
Vue.router = router

new Vue({
 el: "#app-root",
  render: h => h(App),
  router,
  store,
  

  render: h => h(App)

});

