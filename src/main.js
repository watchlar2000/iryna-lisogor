import "nprogress/nprogress.css";
import { createPinia, PiniaVuePlugin } from "pinia";
import Vue from "vue";
import App from "./App.vue";
import "./assets/styles/index.scss";
import router from "./router";

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

Vue.config.productionTip = false;

new Vue({
  pinia,
  router,
  render: (h) => h(App),
}).$mount("#app");
