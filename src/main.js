import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from 'vant';
import 'vant/lib/index.css';
import http from "./http";
import momunt from 'dayjs'

Vue.prototype.$momunt = momunt
Vue.config.productionTip = false;
Vue.use(Vant);
Vue.prototype.$axios = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
