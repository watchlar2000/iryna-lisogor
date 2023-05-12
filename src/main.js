import "nprogress/nprogress.css";
import { PiniaVuePlugin } from "pinia";
import Vue from "vue";
import App from "./App.vue";
import "./assets/styles/index.scss";
import router from "./router";
import pinia from "./stores";

Vue.use(PiniaVuePlugin);
Vue.config.productionTip = false;

new Vue({
  pinia,
  router,
  render: (h) => h(App),
}).$mount("#app");
