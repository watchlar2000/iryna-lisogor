import { PiniaVuePlugin } from "pinia";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";

Vue.use(PiniaVuePlugin);
Vue.config.productionTip = false;

new Vue({
  pinia,
  router,
  render: (h) => h(App),
}).$mount("#app");
