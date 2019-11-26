import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

Vue.config.ignoredElements = [
  // `RegExp` to ignore all custom elements that start with "pn-"
  // This is needed for the holistic components
  /^pn-/
];

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
