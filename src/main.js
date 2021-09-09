import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/core/services/store";
import axios from "axios";
// import ApiService from "@/core/services/api.service";
// import MockService from "@/core/mock/mock.service";
// import { VERIFY_AUTH } from "@/core/services/store/auth.module";
// import { RESET_LAYOUT_CONFIG } from "@/core/services/store/config.module";

Vue.config.productionTip = false;

// Global 3rd party plugins
import "popper.js";
import "tooltip.js";
import PerfectScrollbar from "perfect-scrollbar";
window.PerfectScrollbar = PerfectScrollbar;
import ClipboardJS from "clipboard";
window.ClipboardJS = ClipboardJS;

// Vue 3rd party plugins
// import i18n from "@/core/plugins/vue-i18n";
// import vuetify from "@/core/plugins/vuetify";
import "@/core/plugins/portal-vue";
import "@/core/plugins/bootstrap-vue";
import "@/core/plugins/perfect-scrollbar";
import "@/core/plugins/highlight-js";
import "@/core/plugins/inline-svg";
import "@/core/plugins/apexcharts";
import "@/core/plugins/treeselect";
import "@/core/plugins/metronic";
import "@mdi/font/css/materialdesignicons.css";

// API service init
// ApiService.init();

// Remove this to disable mock API
// MockService.init();

// router.beforeEach((to, from, next) => {
//   // Ensure we checked auth before each page load.
//   Promise.all([store.dispatch(VERIFY_AUTH)]).then(next);

//   // reset config to initial state
//   store.dispatch(RESET_LAYOUT_CONFIG);

//   // Scroll page to top on every route change
//   setTimeout(() => {
//     window.scrollTo(0, 0);
//   }, 100);
// });

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 422) {
      store.commit("setErrors", error.response.data.errors);
    } else if (error.response.status === 401) {
      store.commit("auth/setUserData", null);
      localStorage.removeItem("authToken");
      router.push({ name: "Login" });
    } else {
      return Promise.reject(error);
    }
  }
);

axios.interceptors.request.use(function(config) {
  config.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  return config;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
