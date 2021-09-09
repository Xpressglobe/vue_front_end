// import Vue from "vue";
// import Vuex from "vuex";

// import auth from "./auth.module";
// import htmlClass from "./htmlclass.module";
// import config from "./config.module";
// import breadcrumbs from "./breadcrumbs.module";
// import profile from "./profile.module";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   modules: {
//     auth,
//     htmlClass,
//     config,
//     breadcrumbs,
//     profile
//   }
// });

import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errors: []
  },

  getters: {
    errors: state => state.errors
  },

  mutations: {
    setErrors(state, errors) {
      state.errors = errors;
    }
  },

  actions: {},

  modules: {
    auth
  }
});

