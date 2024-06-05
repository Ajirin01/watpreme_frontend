import "@babel/polyfill";
// import 'mutationobserver-shim'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";

import store from "./store"; // Import your Vuex store

// Import BootstrapVue and BootstrapVue icons plugins
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Register BootstrapVue and IconsPlugin globally
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
